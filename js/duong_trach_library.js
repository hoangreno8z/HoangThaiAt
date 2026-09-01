// Thư viện Dương Trạch: chỉ trình bày dữ liệu đã qua QA-H từ corpus của dự án.
// Không suy diễn hoặc tự sinh nội dung học thuật ở lớp giao diện.
(function () {
  'use strict';

  const DATA_ROOT = 'data/duong-trach';
  const ROUTE_ROOT = '#/thu-vien/duong-trach';
  const STORE_KEYS = {
    original: 'dt-show-original-v1',
    hanViet: 'dt-show-han-viet-v1'
  };

  const KIND_LABELS = {
    article: 'Bài đọc',
    source: 'Nguồn',
    claim: 'Mệnh đề',
    rule: 'Quy tắc',
    case: 'Tình huống',
    term: 'Thuật ngữ',
    conflict: 'Xung đột',
    document: 'Tài liệu'
  };

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function safeJson(value) {
    return escapeHtml(JSON.stringify(value, null, 2));
  }

  function readPreference(key, fallback) {
    try {
      const stored = window.localStorage.getItem(key);
      return stored == null ? fallback : stored === 'true';
    } catch (_) {
      return fallback;
    }
  }

  function savePreference(key, value) {
    try { window.localStorage.setItem(key, String(value)); } catch (_) { /* private mode */ }
  }

  function foldText(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase();
  }

  function isSafeHttpUrl(value) {
    try {
      const url = new URL(String(value));
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
      return false;
    }
  }

  function formatValue(value) {
    if (value == null || value === '') return '<span class="dt-muted">—</span>';
    if (typeof value === 'string' && isSafeHttpUrl(value)) {
      const safe = escapeHtml(value);
      return `<a href="${safe}" target="_blank" rel="noopener noreferrer">${safe}</a>`;
    }
    if (Array.isArray(value)) return escapeHtml(value.join(' · '));
    if (typeof value === 'object') return `<pre>${safeJson(value)}</pre>`;
    return escapeHtml(value);
  }

  function evidenceInfo(rawValue) {
    const value = String(rawValue || '').trim();
    const upper = value.toUpperCase();
    const warning = /BLOCK|UNKNOWN|DISPUT|CONFLICT|CAUTION|NO DIRECT|UNVERIFIED|UNSAFE|INVALID|PENDING/.test(upper);
    let label = 'Trạng thái theo corpus';
    if (/VERIFIED_PRIMARY/.test(upper)) label = 'Đã đối chiếu nguồn sơ cấp';
    else if (/VERIFIED_SECONDARY/.test(upper)) label = 'Đã đối chiếu nguồn thứ cấp';
    else if (/TEXT_VERIFIED/.test(upper)) label = 'Văn bản đã đối chiếu';
    else if (/NO DIRECT/.test(upper)) label = 'Chưa thấy bằng chứng trực tiếp trong lõi đã kiểm';
    else if (/DISPUT/.test(upper)) label = 'Quy thuộc tác giả hoặc cách hiểu còn tranh luận';
    else if (/BLOCK|INVALID|UNSAFE/.test(upper)) label = 'Không được dùng để tạo khuyến nghị';
    else if (/UNKNOWN|PENDING|UNVERIFIED/.test(upper)) label = 'Chưa đủ điều kiện xác nhận';
    return { label, raw: value || 'CORPUS_STATE_NOT_STATED', warning };
  }

  class DuongTrachLibrary {
    constructor() {
      this.root = null;
      this.basePromise = null;
      this.searchPromise = null;
      this.researchPromise = null;
      this.renderToken = 0;
      this.preferences = {
        original: readPreference(STORE_KEYS.original, true),
        hanViet: readPreference(STORE_KEYS.hanViet, true)
      };
    }

    async fetchJson(name) {
      const response = await fetch(`${DATA_ROOT}/${name}`, { cache: 'no-cache' });
      if (!response.ok) throw new Error(`Không tải được ${name} (${response.status}).`);
      return response.json();
    }

    loadBase() {
      if (!this.basePromise) {
        this.basePromise = Promise.all([
          this.fetchJson('manifest.json'),
          this.fetchJson('articles.json'),
          this.fetchJson('sources.json')
        ]).then(([manifest, articles, sources]) => ({ manifest, articles, sources }));
      }
      return this.basePromise;
    }

    loadSearch() {
      if (!this.searchPromise) this.searchPromise = this.fetchJson('search-index.json');
      return this.searchPromise;
    }

    loadResearch() {
      if (!this.researchPromise) {
        this.researchPromise = Promise.all([
          this.fetchJson('records.json'),
          this.fetchJson('documents.json')
        ]).then(([records, documents]) => ({ records, documents }));
      }
      return this.researchPromise;
    }

    bindRoot() {
      this.root = document.getElementById('duong-trach-app');
      if (!this.root || this.root.dataset.bound === 'true') return;
      this.root.dataset.bound = 'true';
      this.root.addEventListener('click', event => {
        const toggle = event.target.closest('[data-dt-toggle]');
        if (!toggle) return;
        const key = toggle.dataset.dtToggle;
        if (!(key in this.preferences)) return;
        this.preferences[key] = !this.preferences[key];
        savePreference(STORE_KEYS[key], this.preferences[key]);
        this.applyLayerVisibility();
      });
      this.root.addEventListener('submit', event => {
        const form = event.target.closest('[data-dt-search-form]');
        if (!form) return;
        event.preventDefault();
        const formData = new FormData(form);
        const query = new URLSearchParams();
        const term = String(formData.get('q') || '').trim();
        const kind = String(formData.get('loai') || 'all');
        if (term) query.set('q', term);
        if (kind !== 'all') query.set('loai', kind);
        window.location.hash = `/thu-vien/duong-trach/tra-cuu${query.toString() ? `?${query}` : ''}`;
      });
    }

    async render(params) {
      this.bindRoot();
      if (!this.root) return;
      const token = ++this.renderToken;
      this.root.innerHTML = '<div class="dt-app"><div class="dt-loading" role="status" aria-live="polite">Đang mở corpus đã kiểm định…</div></div>';
      try {
        const base = await this.loadBase();
        if (token !== this.renderToken) return;
        const segments = (params && params.segments) || ['duong-trach'];
        const query = (params && params.query) || new URLSearchParams();
        const section = segments[0] === 'duong-trach' ? (segments[1] || 'home') : (segments[0] || 'home');
        const slug = segments[0] === 'duong-trach' ? segments[2] : segments[1];

        if (section === 'bai') this.renderArticle(base, slug, query);
        else if (section === 'tra-cuu') await this.renderSearch(base, query, token);
        else if (section === 'nguon') this.renderSource(base, slug);
        else if (section === 'nghien-cuu') await this.renderResearch(base, query, token);
        else this.renderHome(base);
      } catch (error) {
        if (token === this.renderToken) this.renderError(error);
      }
    }

    shell(content, breadcrumbItems) {
      const crumbs = [
        '<a href="#/">Sảnh</a>',
        '<a href="#/thu-vien/duong-trach">Dương Trạch</a>'
      ].concat((breadcrumbItems || []).map(item => escapeHtml(item)));
      return `<div class="dt-app"><div class="dt-shell"><nav class="dt-breadcrumbs" aria-label="Đường dẫn">${crumbs.join('<span aria-hidden="true">›</span>')}</nav>${content}</div></div>`;
    }

    renderHome({ manifest }) {
      document.title = 'Thư Viện Dương Trạch Có Nguồn — Huyền Học Mụ';
      const topics = manifest.topics.map(topic => `
        <a class="dt-topic-link" href="${ROUTE_ROOT}/bai/${escapeHtml(topic.id)}">
          <span class="dt-topic-number">CHỦ ĐỀ ${escapeHtml(topic.batch)}</span>
          <span>
            <h3>${escapeHtml(topic.title)}</h3>
            <p>${escapeHtml(topic.description)}</p>
          </span>
          <span class="dt-topic-meta">${topic.entryCount ? `${topic.entryCount} mục đọc` : 'Chưa phát hành mục đọc cấu trúc'} →</span>
        </a>`).join('');
      const qaPass = Object.values(manifest.qa || {}).filter(value => value === 'PASS').length;
      const content = `
        <header class="dt-hero">
          <div>
            <div class="dt-eyebrow">Corpus Dương Trạch · Batch 01–20 · QA-H</div>
            <h1>Đọc sâu, truy nguồn, không lấp chỗ trống bằng suy diễn.</h1>
            <p>Nội dung được xuất bản từ bộ tài liệu người dùng cung cấp. Mỗi mục giữ riêng nguyên văn chữ Hán, Hán‑Việt, dịch sát, giảng nghĩa và trạng thái chứng cứ; các lớp hiện đại, cổ pháp và trường phái không bị trộn lẫn.</p>
            <div class="dt-hero-actions" style="margin-top:1.2rem">
              <a class="dt-primary-link" href="${ROUTE_ROOT}/bai/batch-01">Bắt đầu từ phương pháp</a>
              <a class="dt-secondary-link" href="${ROUTE_ROOT}/tra-cuu">Tra cứu toàn corpus</a>
              <a class="dt-secondary-link" href="${ROUTE_ROOT}/nghien-cuu">Hồ sơ nghiên cứu</a>
            </div>
          </div>
          <div class="dt-stats" aria-label="Thống kê corpus">
            <div class="dt-stat"><strong>${manifest.counts.articleEntries}</strong><span>mục đọc có cấu trúc</span></div>
            <div class="dt-stat"><strong>${manifest.counts.sources}</strong><span>nguồn đã đăng ký</span></div>
            <div class="dt-stat"><strong>${manifest.counts.records}</strong><span>bản ghi máy kiểm</span></div>
            <div class="dt-stat"><strong>${qaPass}/${Object.keys(manifest.qa || {}).length}</strong><span>cổng QA-H đạt</span></div>
          </div>
        </header>
        <section class="dt-section" aria-labelledby="dt-topics-title">
          <div class="dt-section-header"><div><h2 id="dt-topics-title">20 chủ đề theo đúng thứ tự corpus</h2><p>An toàn, pháp lý và điều kiện hiện đại luôn được giữ thành lớp độc lập.</p></div></div>
          <div class="dt-topic-grid">${topics}</div>
        </section>
        <aside class="dt-trust-note"><strong>Nguyên tắc hiển thị:</strong> “Đã đối chiếu văn bản” không đồng nghĩa “mọi quy thuộc tác giả hoặc diễn giải đều đã được xác quyết”. Trạng thái gốc của corpus luôn được giữ lại để người đọc kiểm tra.</aside>`;
      this.root.innerHTML = this.shell(content);
    }

    topicNav(topics, activeId) {
      return `<nav class="dt-topic-nav" aria-label="20 chủ đề Dương Trạch">${topics.map(topic => `
        <a href="${ROUTE_ROOT}/bai/${escapeHtml(topic.id)}" ${topic.id === activeId ? 'aria-current="page"' : ''}>
          ${escapeHtml(topic.batch)}. ${escapeHtml(topic.title)}
        </a>`).join('')}</nav>`;
    }

    renderEntry(entry, article) {
      const evidence = evidenceInfo(entry.evidence);
      const original = entry.original ? `<div class="dt-layer dt-layer-original" data-dt-layer="original"><span class="dt-layer-label">Nguyên văn chữ Hán</span><p lang="zh-Hant">${escapeHtml(entry.original)}</p></div>` : '';
      const hanViet = entry.hanViet ? `<div class="dt-layer dt-layer-hanviet" data-dt-layer="hanViet"><span class="dt-layer-label">Phiên âm Hán‑Việt</span><p>${escapeHtml(entry.hanViet)}</p></div>` : '';
      const literal = entry.literal ? `<div class="dt-layer dt-layer-literal"><span class="dt-layer-label">Dịch sát</span><p>${escapeHtml(entry.literal)}</p></div>` : '';
      const commentaryText = entry.commentary || 'Corpus chưa có phần giảng nghĩa xuất bản cho mục này; giao diện giữ nguyên trạng thái để tránh suy diễn.';
      const warning = evidence.warning ? `<div class="dt-warning"><strong>Cần đọc thận trọng:</strong> ${escapeHtml(evidence.label)}. Xem mã trạng thái nguyên gốc bên dưới.</div>` : '';
      const sourceMeta = entry.sourceId
        ? `<a class="dt-badge" href="${ROUTE_ROOT}/nguon/${encodeURIComponent(entry.sourceId)}">Nguồn: ${escapeHtml(entry.sourceId)}</a>`
        : `<span class="dt-badge">Tệp gốc: ${escapeHtml(article.sourceFile)}</span>`;
      return `<article class="dt-entry" id="${escapeHtml(entry.id)}">
        <header class="dt-entry-header"><div class="dt-entry-id">${escapeHtml(entry.id)}</div><h2>${escapeHtml(entry.title || entry.id)}</h2></header>
        <div class="dt-entry-body">
          ${literal}${original}${hanViet}
          <div class="dt-layer dt-layer-commentary"><span class="dt-layer-label">Giảng nghĩa từ corpus</span><p>${escapeHtml(commentaryText)}</p></div>
          ${warning}
          ${entry.application ? `<div class="dt-layer"><span class="dt-layer-label">Phạm vi áp dụng ghi trong corpus</span><p>${escapeHtml(entry.application)}</p></div>` : ''}
        </div>
        <footer class="dt-entry-meta">${sourceMeta}<span class="dt-badge ${evidence.warning ? 'dt-badge-warning' : 'dt-badge-evidence'}" title="Mã trạng thái nguyên gốc: ${escapeHtml(evidence.raw)}">${escapeHtml(evidence.label)} · ${escapeHtml(evidence.raw)}</span></footer>
      </article>`;
    }

    renderArticle({ manifest, articles }, slug, query) {
      const article = articles.find(item => item.id === slug) || articles[0];
      document.title = `${article.title} — Thư Viện Dương Trạch`;
      const entries = article.entries.length
        ? article.entries.map(entry => this.renderEntry(entry, article)).join('')
        : `<div class="dt-empty"><strong>Chưa có mục đọc cấu trúc để xuất bản.</strong><br>Chủ đề này có hồ sơ quy trình/hard gate trong kho nghiên cứu, nhưng không có đủ bốn lớp văn bản để tạo bài đọc. Hệ thống không tự bịa phần còn thiếu. <a href="${ROUTE_ROOT}/nghien-cuu">Mở hồ sơ nghiên cứu</a>.</div>`;
      const content = `<div class="dt-reader-layout">
        ${this.topicNav(manifest.topics, article.id)}
        <main>
          <header class="dt-page-header"><div class="dt-eyebrow">Chủ đề ${escapeHtml(article.batch)} · ${article.entries.length} mục đọc</div><h1 class="dt-page-title">${escapeHtml(article.title)}</h1><p class="dt-page-lead">${escapeHtml(article.description)}</p></header>
          ${article.overview ? `<aside class="dt-state-note">${escapeHtml(article.overview)}</aside>` : ''}
          <div class="dt-toolbar" aria-label="Tùy chọn văn bản">
            <span>Chọn lớp văn bản muốn đọc</span>
            <div class="dt-toggle-group">
              <button class="dt-toggle" type="button" data-dt-toggle="original" aria-pressed="${this.preferences.original}">Chữ Hán</button>
              <button class="dt-toggle" type="button" data-dt-toggle="hanViet" aria-pressed="${this.preferences.hanViet}">Phiên âm Hán‑Việt</button>
            </div>
          </div>
          <div class="dt-entry-list">${entries}</div>
        </main>
      </div>`;
      this.root.innerHTML = this.shell(content, [article.title]);
      this.applyLayerVisibility();
      const targetId = query.get('muc');
      if (targetId) window.requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ block: 'start' }));
    }

    applyLayerVisibility() {
      if (!this.root) return;
      Object.entries(this.preferences).forEach(([key, visible]) => {
        this.root.querySelectorAll(`[data-dt-layer="${key}"]`).forEach(element => { element.hidden = !visible; });
        const button = this.root.querySelector(`[data-dt-toggle="${key}"]`);
        if (button) button.setAttribute('aria-pressed', String(visible));
      });
    }

    async renderSearch(base, query, token) {
      document.title = 'Tra Cứu Corpus — Thư Viện Dương Trạch';
      this.root.innerHTML = this.shell('<div class="dt-loading" role="status" aria-live="polite">Đang nạp chỉ mục tra cứu…</div>', ['Tra cứu']);
      const index = await this.loadSearch();
      if (token !== this.renderToken) return;
      const term = query.get('q') || '';
      const kind = query.get('loai') || 'all';
      const needle = foldText(term);
      const hasFilter = Boolean(needle) || kind !== 'all';
      const results = hasFilter
        ? index.filter(item => (kind === 'all' || item.kind === kind) && (!needle || foldText(`${item.id} ${item.title} ${item.text}`).includes(needle))).slice(0, 200)
        : [];
      const options = ['all', ...new Set(index.map(item => item.kind))].map(value => `<option value="${escapeHtml(value)}" ${value === kind ? 'selected' : ''}>${value === 'all' ? 'Tất cả lớp dữ liệu' : (KIND_LABELS[value] || value)}</option>`).join('');
      const resultHtml = results.length ? results.map(item => `<a class="dt-result" href="${escapeHtml(item.route)}">
        <span class="dt-result-kind">${escapeHtml(KIND_LABELS[item.kind] || item.kind)}</span>
        <span class="dt-result-title"><strong>${escapeHtml(item.title || item.id)}</strong></span>
        <span class="dt-result-id">${escapeHtml(item.id)}</span>
      </a>`).join('') : `<div class="dt-empty">${hasFilter ? 'Không tìm thấy mục phù hợp. Thử từ khóa ngắn hơn, chữ Hán, Hán‑Việt hoặc mã nguồn/quy tắc.' : 'Nhập từ khóa hoặc chọn một lớp dữ liệu để bắt đầu tra cứu.'}</div>`;
      const content = `<main>
        <header class="dt-page-header"><div class="dt-eyebrow">Tra cứu đa lớp</div><h1 class="dt-page-title">Tìm trong toàn bộ corpus</h1><p class="dt-page-lead">Tìm đồng thời trong bài đọc, chữ Hán, Hán‑Việt, nguồn, mệnh đề, quy tắc, tình huống và hồ sơ nghiên cứu. Kết quả chỉ dẫn tới dữ liệu gốc; không tự tổng hợp thành kết luận mới.</p></header>
        <form class="dt-search-form" data-dt-search-form role="search">
          <div class="dt-field"><label for="dt-search-q">Từ khóa</label><input class="dt-input" id="dt-search-q" name="q" value="${escapeHtml(term)}" placeholder="Ví dụ: 明堂, minh đường, SRC-YZSS-001" autocomplete="off"></div>
          <div class="dt-field"><label for="dt-search-kind">Lớp dữ liệu</label><select class="dt-select" id="dt-search-kind" name="loai">${options}</select></div>
          <button class="dt-button dt-button-primary" type="submit" style="align-self:end">Tìm kiếm</button>
        </form>
        <p class="dt-page-lead" role="status" aria-live="polite">${hasFilter ? `Hiển thị ${results.length}${results.length === 200 ? '+' : ''} kết quả${term ? ` cho “${escapeHtml(term)}”` : ''}.` : `Chỉ mục có ${index.length} mục; chưa áp dụng bộ lọc.`}</p>
        <div class="dt-search-results">${resultHtml}</div>
      </main>`;
      this.root.innerHTML = this.shell(content, ['Tra cứu']);
    }

    renderSource({ sources }, slug) {
      const decoded = decodeURIComponent(slug || '');
      const source = sources.find(item => item.source_id === decoded);
      if (!source) {
        this.root.innerHTML = this.shell('<div class="dt-error"><strong>Không tìm thấy nguồn.</strong><br>Mã nguồn này không có trong registry xuất bản.</div>', ['Nguồn']);
        return;
      }
      document.title = `${source.title_vi || source.canonical_title_vi || source.name || source.source_id} — Hồ Sơ Nguồn`;
      const rows = Object.entries(source).map(([key, value]) => `<dt>${escapeHtml(key)}</dt><dd>${formatValue(value)}</dd>`).join('');
      const content = `<main><header class="dt-page-header"><div class="dt-eyebrow">Hồ sơ nguồn · ${escapeHtml(source.source_id)}</div><h1 class="dt-page-title">${escapeHtml(source.title_vi || source.canonical_title_vi || source.name || source.source_id)}</h1><p class="dt-page-lead">Các trường dưới đây được hiển thị nguyên trạng từ registry; trạng thái văn bản, quy thuộc và ngữ nghĩa có thể khác nhau.</p></header><dl class="dt-source-grid">${rows}</dl></main>`;
      this.root.innerHTML = this.shell(content, ['Nguồn', source.source_id]);
    }

    async renderResearch(base, query, token) {
      document.title = 'Hồ Sơ Nghiên Cứu — Thư Viện Dương Trạch';
      this.root.innerHTML = this.shell('<div class="dt-loading" role="status" aria-live="polite">Đang nạp hồ sơ nghiên cứu nguyên bản…</div>', ['Nghiên cứu']);
      const { records, documents } = await this.loadResearch();
      if (token !== this.renderToken) return;
      const recordId = query.get('ban-ghi');
      const documentId = query.get('tai-lieu');
      const record = recordId ? records.find(item => item.id === recordId) : null;
      const document = documentId ? documents.find(item => item.id === documentId) : null;
      let selected = '';
      if (record) {
        selected = `<section class="dt-section"><div class="dt-warning"><strong>Bản ghi máy kiểm:</strong> dữ liệu thô phục vụ đối chiếu, không tự động là khuyến nghị.</div><details class="dt-research-record" open><summary>${escapeHtml(record.id)} — ${escapeHtml(record.title)}</summary><pre>${safeJson(record.data)}</pre></details></section>`;
      } else if (document) {
        selected = `<section class="dt-section"><div class="dt-state-note"><strong>${escapeHtml(document.title)}</strong><br>Tệp: ${escapeHtml(document.file)}</div><details class="dt-research-record" open><summary>Mở nội dung Markdown nguyên bản</summary><pre>${escapeHtml(document.content)}</pre></details></section>`;
      }
      const recordLinks = records.slice(0, 80).map(item => `<details class="dt-research-record"><summary>${escapeHtml(item.id)} — ${escapeHtml(item.title)}</summary><div class="dt-entry-meta"><span class="dt-badge">${escapeHtml(KIND_LABELS[item.category] || item.category)}</span>${item.state ? `<span class="dt-badge">${escapeHtml(item.state)}</span>` : ''}<a class="dt-secondary-link" href="${ROUTE_ROOT}/nghien-cuu?ban-ghi=${encodeURIComponent(item.id)}">Xem JSON gốc</a></div></details>`).join('');
      const documentLinks = documents.slice(0, 40).map(item => `<details class="dt-research-record"><summary>${escapeHtml(item.title)}</summary><div class="dt-entry-meta"><span class="dt-badge">${escapeHtml(item.file)}</span><a class="dt-secondary-link" href="${ROUTE_ROOT}/nghien-cuu?tai-lieu=${encodeURIComponent(item.id)}">Đọc bản gốc</a></div></details>`).join('');
      const content = `<main>
        <header class="dt-page-header"><div class="dt-eyebrow">Kho đối chiếu</div><h1 class="dt-page-title">Hồ sơ nghiên cứu & dữ liệu máy kiểm</h1><p class="dt-page-lead">Khu vực này giữ lịch sử nghiên cứu và cấu trúc kiểm định. JSON/Markdown thô được đặt trong khối mở rộng để không lấn át bài đọc dành cho người dùng.</p></header>
        <div class="dt-stats"><div class="dt-stat"><strong>${records.length}</strong><span>bản ghi máy</span></div><div class="dt-stat"><strong>${documents.length}</strong><span>tài liệu Markdown</span></div></div>
        ${selected}
        <section class="dt-section"><div class="dt-section-header"><div><h2>Bản ghi tiêu biểu</h2><p>Hiển thị 80 mục đầu; dùng trang Tra cứu để tìm đủ ${records.length} bản ghi.</p></div><a class="dt-secondary-link" href="${ROUTE_ROOT}/tra-cuu?loai=rule">Tra cứu quy tắc</a></div>${recordLinks}</section>
        <section class="dt-section"><div class="dt-section-header"><div><h2>Tài liệu nghiên cứu</h2><p>Hiển thị 40 tài liệu đầu; toàn bộ ${documents.length} tài liệu đều có trong chỉ mục.</p></div><a class="dt-secondary-link" href="${ROUTE_ROOT}/tra-cuu?loai=document">Tra cứu tài liệu</a></div>${documentLinks}</section>
      </main>`;
      this.root.innerHTML = this.shell(content, ['Nghiên cứu']);
    }

    renderError(error) {
      const content = `<div class="dt-error" role="alert"><strong>Không thể mở thư viện Dương Trạch.</strong><br>${escapeHtml(error && error.message ? error.message : 'Lỗi không xác định.')}</div>`;
      this.root.innerHTML = this.shell(content, ['Lỗi']);
    }
  }

  window.duongTrachLibrary = new DuongTrachLibrary();
}());
