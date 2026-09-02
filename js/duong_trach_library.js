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
    let label = 'Tài liệu cổ thư đã kiểm định';
    if (/RULE_CANDIDATE_WITH_CAUSALITY_GUARD/.test(upper)) label = 'Cổ lệ cần kiểm tra an toàn thực địa';
    else if (/RULE_CANDIDATE_WITH_OUTCOME_SEPARATION/.test(upper)) label = 'Hình thái cổ pháp (Tách biệt dự đoán cát hung)';
    else if (/RULE_CANDIDATE/.test(upper)) label = 'Quy tắc cổ truyền tham khảo';
    else if (/FRAMEWORK_CANDIDATE/.test(upper)) label = 'Khung phân tích kinh điển';
    else if (/PRINCIPLE/.test(upper)) label = 'Nguyên lý tổng quát';
    else if (/VERIFIED_PRIMARY/.test(upper)) label = 'Đã đối chiếu cổ thư gốc';
    else if (/VERIFIED_SECONDARY/.test(upper)) label = 'Đã đối chiếu nguồn thứ cấp';
    else if (/TEXT_VERIFIED/.test(upper)) label = 'Văn bản đã đối chiếu xác thực';
    else if (/HIGH_TEXT/.test(upper)) label = 'Văn bản xác thực cao';
    else if (/CORE_TABOO/.test(upper)) label = 'Cổ lệ kiêng kỵ (Đã liên kết kiểm tra an toàn)';
    else if (/NO DIRECT/.test(upper)) label = 'Chưa thấy bằng chứng trực tiếp trong lõi đã kiểm';
    else if (/DISPUT|PSEUDEPIGRAPHIC/.test(upper)) label = 'Văn bản cổ truyền (Tác giả còn tranh luận)';
    else if (/BLOCK|INVALID|UNSAFE/.test(upper)) label = 'Không áp dụng (Trái chuẩn an toàn hiện đại)';
    else if (/UNKNOWN|PENDING|UNVERIFIED/.test(upper)) label = 'Chưa đủ điều kiện xác nhận';
    return { label, raw: value || '', warning };
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
        else if (section === 'nguon') this.renderSource(base, slug);
        else this.renderHome(base);
      } catch (error) {
        if (token === this.renderToken) this.renderError(error);
      }
    }

    shell(content, breadcrumbItems) {
      const crumbs = [
        '<a href="#/">Sảnh</a>',
        '<a href="#/thu-vien/duong-trach">Cẩm Nang Thực Chiến</a>'
      ].concat((breadcrumbItems || []).map(item => escapeHtml(item)));
      return `<div class="dt-app"><div class="dt-shell"><nav class="dt-breadcrumbs" aria-label="Đường dẫn">${crumbs.join('<span aria-hidden="true">›</span>')}</nav>${content}</div></div>`;
    }

    renderHome({ manifest }) {
      document.title = 'Cẩm Nang Thực Chiến Dương Trạch — Huyền Học Mụ';
      
      const STAGE_SECTIONS = [
        {
          num: 'I',
          title: 'Giai Đoạn 1: Nền Tảng & Phương Pháp Khảo Sát',
          desc: 'Khởi tâm học thuật, tôn trọng cổ thư, xác lập tiêu chuẩn an toàn và đo đạc thực địa.',
          batches: ['01', '02', '03']
        },
        {
          num: 'II',
          title: 'Giai Đoạn 2: Tầm Đất & Khảo Sát Ngoại Cục',
          desc: 'Khảo sát long mạch, thế đất ôm tụ, thủy lưu bao bọc, hóa giải đất méo khuyết và đặt nhà.',
          batches: ['04', '05', '06', '07']
        },
        {
          num: 'III',
          title: 'Giai Đoạn 3: Cổng Ngõ, Minh Đường & Lối Vào',
          desc: 'Quy hoạch cổng chính nạp khí, minh đường tụ thủy, giếng trời và trục giao thông thông suốt.',
          batches: ['08', '09', '10']
        },
        {
          num: 'IV',
          title: 'Giai Đoạn 4: Bố Trí Công Năng & Vi Khí Hậu Chi Tiết',
          desc: 'Định vị bếp nấu, giường ngủ, cầu thang, khu vệ sinh, đón gió, lấy sáng, giếng nước và kết cấu.',
          batches: ['11', '12', '13', '14', '15', '16', '17', '18']
        },
        {
          num: 'V',
          title: 'Giai Đoạn 5: Thi Công, Nghiệm Thu & An Cư',
          desc: 'Trình tự khởi công, nghiệm thu công trình, chọn ngày lành và nghi thức nhập trạch an cư.',
          batches: ['19', '20']
        }
      ];

      const stagesHtml = STAGE_SECTIONS.map(stage => {
        const stageTopics = manifest.topics.filter(t => stage.batches.includes(t.batch));
        const topicCards = stageTopics.map(topic => `
          <a class="dt-topic-link" href="${ROUTE_ROOT}/bai/${escapeHtml(topic.id)}">
            <span class="dt-topic-number">BƯỚC ${escapeHtml(topic.batch)}</span>
            <span>
              <h3>${escapeHtml(topic.title)}</h3>
              <p>${escapeHtml(topic.description)}</p>
            </span>
            <span class="dt-topic-meta">${topic.entryCount ? `${topic.entryCount} chỉ điểm thực chiến` : 'Hồ sơ tiêu chuẩn an toàn'} →</span>
          </a>`).join('');

        return `
          <div class="dt-stage-block" style="margin-bottom:2.2rem;">
            <div class="dt-stage-header" style="margin-bottom:0.9rem; border-left:4px solid var(--dt-teal); padding-left:0.85rem;">
              <h3 style="color:#FEF3C7; font-size:1.15rem; margin:0 0 0.25rem 0; font-weight:800;">${escapeHtml(stage.title)}</h3>
              <p style="color:var(--dt-muted); font-size:0.85rem; margin:0;">${escapeHtml(stage.desc)}</p>
            </div>
            <div class="dt-topic-grid">${topicCards}</div>
          </div>
        `;
      }).join('');

      const content = `
        <header class="dt-hero">
          <div>
            <div class="dt-eyebrow">CẨM NANG THỰC CHIẾN DƯƠNG TRẠCH · 5 GIAI ĐOẠN ĐẠI THÀNH</div>
            <h1>Cẩm Nang Thực Chiến Dương Trạch</h1>
            <div class="dt-hero-actions" style="margin-top:1.2rem">
              <a class="dt-primary-link" href="${ROUTE_ROOT}/bai/batch-01">Bắt đầu từ Giai đoạn 1</a>
            </div>
          </div>
          <div class="dt-stats" aria-label="Thống kê cẩm nang">
            <div class="dt-stat"><strong>20</strong><span>bước quy trình</span></div>
            <div class="dt-stat"><strong>${manifest.counts.articleEntries}</strong><span>bài học thực chiến</span></div>
            <div class="dt-stat"><strong>5</strong><span>giai đoạn đại thành</span></div>
            <div class="dt-stat"><strong>100%</strong><span>chánh tông cổ thư</span></div>
          </div>
        </header>
        <section class="dt-section" aria-labelledby="dt-topics-title">
          <div class="dt-section-header">
            <div>
              <h2 id="dt-topics-title">Hành Trình 5 Giai Đoạn Khảo Sát & Khởi Tạo Dương Cơ</h2>
              <p>Trình tự bài bản từ quan sát đại thể môi trường đến chi tiết từng không gian nội trạch.</p>
            </div>
          </div>
          ${stagesHtml}
        </section>
        <aside class="dt-trust-note">
          <strong>Tâm pháp hành nghề:</strong> “Hình thế làm gốc, lý khí làm dụng, an toàn làm trọng”. Luôn kết hợp phép tắc cổ nhân với khảo sát thực địa kỹ lưỡng, không suy diễn mê tín hoang đường.
        </aside>`;
      this.root.innerHTML = this.shell(content);
    }

    topicNav(topics, activeId) {
      const activeTopicIndex = topics.findIndex(t => t.id === activeId);
      const activeTopic = topics[activeTopicIndex] || topics[0];
      const prevTopic = activeTopicIndex > 0 ? topics[activeTopicIndex - 1] : null;
      const nextTopic = activeTopicIndex < topics.length - 1 ? topics[activeTopicIndex + 1] : null;

      const STAGE_SECTIONS = [
        { num: 'I', title: 'NỀN TẢNG & PHƯƠNG PHÁP', batches: ['01', '02', '03'] },
        { num: 'II', title: 'TẦM ĐẤT & NGOẠI CỤC', batches: ['04', '05', '06', '07'] },
        { num: 'III', title: 'CỔNG NGÕ & MINH ĐƯỜNG', batches: ['08', '09', '10'] },
        { num: 'IV', title: 'BỐ TRÍ CÔNG NĂNG & KHÍ HẬU', batches: ['11', '12', '13', '14', '15', '16', '17', '18'] },
        { num: 'V', title: 'THI CÔNG & NHẬP TRẠCH', batches: ['19', '20'] }
      ];

      // Desktop Sidebar Nav
      const desktopNavHtml = STAGE_SECTIONS.map(stage => {
        const stageTopics = topics.filter(t => stage.batches.includes(t.batch));
        const links = stageTopics.map(topic => `
          <a href="${ROUTE_ROOT}/bai/${escapeHtml(topic.id)}" ${topic.id === activeId ? 'aria-current="page"' : ''}>
            <span style="opacity:0.75; font-size:0.8rem; margin-right:0.35rem;">${escapeHtml(topic.batch)}.</span>${escapeHtml(topic.title)}
          </a>
        `).join('');

        return `
          <div class="dt-nav-stage-group" style="margin-bottom:1.1rem;">
            <div class="dt-nav-stage-title" style="font-size:0.72rem; font-weight:600; color:#D4CEBD; text-transform:uppercase; letter-spacing:0.05em; padding:0.35rem 0.6rem 0.25rem 0.6rem; border-bottom:1px solid rgba(255,255,255,0.08); margin-bottom:0.35rem;">
              ${escapeHtml(stage.num)}. ${escapeHtml(stage.title)}
            </div>
            ${links}
          </div>
        `;
      }).join('');

      // Mobile Dropdown Selector & Quick Bar
      const selectOptions = topics.map(t => `
        <option value="${escapeHtml(t.id)}" ${t.id === activeId ? 'selected' : ''}>
          Bước ${escapeHtml(t.batch)}: ${escapeHtml(t.title)}
        </option>
      `).join('');

      const mobileNavHtml = `
        <div class="dt-topic-nav-mobile">
          <div class="dt-mobile-nav-bar" style="display:flex; align-items:center; gap:0.5rem; width:100%; margin-bottom:0.6rem;">
            <select class="dt-mobile-step-select" onchange="if(this.value) window.location.hash = '${ROUTE_ROOT}/bai/' + this.value;" style="flex:1; background:#181B22; color:#F5EFEB; border:1px solid rgba(230,220,200,0.14); border-radius:8px; padding:0.65rem 0.8rem; font-size:0.88rem; outline:none; font-family:inherit;">
              ${selectOptions}
            </select>
          </div>
          <div class="dt-mobile-step-controls" style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; font-size:0.82rem;">
            ${prevTopic ? `<a href="${ROUTE_ROOT}/bai/${prevTopic.id}" class="dt-step-btn" style="color:#D4CEBD; text-decoration:none; padding:0.35rem 0.65rem; background:#181B22; border-radius:6px; border:1px solid rgba(230,220,200,0.1);">← Bước ${prevTopic.batch}</a>` : '<span style="opacity:0.3; padding:0.35rem 0.65rem;">Đầu trang</span>'}
            <span style="color:#9E998E; font-size:0.78rem;">Bước ${escapeHtml(activeTopic.batch)} / ${topics.length}</span>
            ${nextTopic ? `<a href="${ROUTE_ROOT}/bai/${nextTopic.id}" class="dt-step-btn" style="color:#D4CEBD; text-decoration:none; padding:0.35rem 0.65rem; background:#181B22; border-radius:6px; border:1px solid rgba(230,220,200,0.1);">Bước ${nextTopic.batch} →</a>` : '<span style="opacity:0.3; padding:0.35rem 0.65rem;">Hết bài</span>'}
          </div>
        </div>
      `;

      return `<nav class="dt-topic-nav" aria-label="Quy trình 20 bước Dương Trạch">
        <div class="dt-topic-nav-desktop">${desktopNavHtml}</div>
        ${mobileNavHtml}
      </nav>`;
    }

    renderEntry(entry, article) {
      const original = entry.original ? `<div class="dt-layer dt-layer-original" data-dt-layer="original"><span class="dt-layer-label" style="color:#CFC8B8; font-weight:500; font-size:0.75rem;">Nguyên văn chữ Hán</span><p lang="zh-Hant" style="font-size:1.02rem; line-height:1.75; color:#F3DF9A; font-weight:400; margin:0.3rem 0 0 0;">${escapeHtml(entry.original)}</p></div>` : '';
      const hanViet = entry.hanViet ? `<div class="dt-layer dt-layer-hanviet" data-dt-layer="hanViet"><span class="dt-layer-label" style="color:#CFC8B8; font-weight:500; font-size:0.75rem;">Phiên âm Hán‑Việt</span><p style="font-size:0.92rem; line-height:1.65; color:#C8D7E6; font-style:italic; font-weight:400; margin:0.3rem 0 0 0;">${escapeHtml(entry.hanViet)}</p></div>` : '';
      const literal = entry.literal ? `<div class="dt-layer dt-layer-literal" style="border-top:1px solid rgba(230,220,200,0.06); padding-top:0.75rem; margin-top:0.75rem;"><span class="dt-layer-label" style="color:#CFC8B8; font-weight:500; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em;">Dịch nghĩa kinh văn</span><p style="font-size:0.92rem; line-height:1.75; color:#F1EDE4; font-weight:400; margin:0.3rem 0 0 0;">${escapeHtml(entry.literal)}</p></div>` : '';
      
      let commentaryText = entry.commentary || 'Cổ thư ghi nhận nguyên tắc này làm chuẩn mực định hướng; trong thực tế cần đo đạc và đối chiếu cẩn trọng với điều kiện công trình.';
      commentaryText = commentaryText.replace(/^(Thầy dạy|Lời thầy|Thầy bảo|Thầy dặn)\s*[:—–,-]\s*/i, '').trim();

      const paras = commentaryText.split(/\n\n+|\r\n\r\n+/).map(para => {
        para = para.trim();
        if (!para) return '';
        if (para.startsWith('【') || para.startsWith('###') || /^[I|V|X|L|C|D|M]+\.\s+/.test(para)) {
          return `<div class="dt-subheading" style="margin:0.9rem 0 0.35rem 0; font-weight:600; color:#F5EFEB; font-size:0.93rem; letter-spacing:0.02em; border-left:2px solid #D4CEBD; padding-left:0.55rem;">${escapeHtml(para.replace(/^###\s*/, ''))}</div>`;
        }
        if (/^\d+\.\s+/.test(para)) {
          return `<div class="dt-num-point" style="margin:0.55rem 0 0.25rem 0; font-weight:500; color:#EAE5D9; font-size:0.92rem;">${escapeHtml(para)}</div>`;
        }
        if (para.startsWith('•') || para.startsWith('-') || para.startsWith('*')) {
          const lines = para.split(/\n/);
          const listItems = lines.map(line => `<li style="margin-bottom:0.35rem; color:#E2DDD4; font-weight:400;">${escapeHtml(line.replace(/^[•\-\*]\s*/, ''))}</li>`).join('');
          return `<ul style="margin:0.35rem 0 0.55rem 1.15rem; padding:0; font-size:0.91rem; line-height:1.75;">${listItems}</ul>`;
        }
        return `<p style="margin:0.4rem 0 0.55rem 0; line-height:1.8; color:#EDE8DE; font-size:0.92rem; font-weight:400; text-align:justify;">${escapeHtml(para)}</p>`;
      }).filter(Boolean).join('');

      const sourceName = entry.source_title || 'Cổ Thư Chánh Tông';

      return `<article class="dt-entry" id="${escapeHtml(entry.id)}" style="margin-bottom:1.5rem; border:1px solid rgba(230,220,200,0.08); background:#181B22; border-radius:10px; overflow:hidden;">
        <header class="dt-entry-header" style="background:#1F232D; padding:0.85rem 1.15rem; border-bottom:1px solid rgba(230,220,200,0.08);">
          <h2 style="font-size:1.02rem; font-weight:600; color:#FDFBF7; margin:0;">${escapeHtml(entry.title || entry.id)}</h2>
        </header>
        <div class="dt-entry-body" style="padding:1.15rem;">
          ${literal}
          <div class="dt-layer dt-layer-commentary" style="background:rgba(255,255,255,0.02); border-left:2px solid rgba(212,206,189,0.4); padding:0.95rem 1.15rem; border-radius:0 8px 8px 0; margin-top:0.75rem;">
            <span class="dt-layer-label" style="color:#CFC8B8; font-weight:600; font-size:0.76rem; letter-spacing:0.05em; text-transform:uppercase;">Giải nghĩa chuyên sâu</span>
            <div class="dt-commentary-content" style="margin-top:0.35rem;">${paras}</div>
          </div>
          ${original}${hanViet}
        </div>
        <footer class="dt-entry-meta" style="background:#13151B; padding:0.7rem 1.15rem; border-top:1px solid rgba(230,220,200,0.06);">
          <span class="dt-badge" style="background:rgba(255,255,255,0.04); color:#D4CEBD; border:1px solid rgba(230,220,200,0.09); font-weight:400;">Nguồn: ${escapeHtml(sourceName)}</span>
          <span class="dt-badge dt-badge-evidence" style="background:rgba(212,206,189,0.08); color:#EAE5D9; border:1px solid rgba(212,206,189,0.2); font-weight:400;">Chánh Tông Cổ Pháp</span>
        </footer>
      </article>`;
    }

    renderArticle({ manifest, articles }, slug, query) {
      const article = articles.find(item => item.id === slug) || articles[0];
      document.title = `${article.title} — Cẩm Nang Thực Chiến Dương Trạch`;
      const entries = article.entries.length
        ? article.entries.map(entry => this.renderEntry(entry, article)).join('')
        : `<div class="dt-empty"><strong>Hồ sơ tiêu chuẩn an toàn & kiểm soát thực địa.</strong><br>Chủ đề này tập trung vào các tiêu chuẩn an toàn bắt buộc: kết cấu, chống ngập lụt, an toàn cháy nổ và pháp lý xây dựng hiện đại cần kiểm tra trước khi bố trí phong thủy.</div>`;
      const content = `<div class="dt-reader-layout">
        ${this.topicNav(manifest.topics, article.id)}
        <main>
          <header class="dt-page-header">
            <div class="dt-eyebrow">Bước ${escapeHtml(article.batch)} / 20 · ${article.entries.length ? `${article.entries.length} bài học thực chiến` : 'Tiêu chuẩn an toàn'}</div>
            <h1 class="dt-page-title">${escapeHtml(article.title)}</h1>
            <p class="dt-page-lead">${escapeHtml(article.description)}</p>
          </header>
          ${article.overview ? `<aside class="dt-state-note">${escapeHtml(article.overview)}</aside>` : ''}
          <div class="dt-toolbar" aria-label="Tùy chọn văn bản">
            <span>Hiển thị thêm văn bản gốc:</span>
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
        <section class="dt-section"><div class="dt-section-header"><div><h2>Bản ghi tiêu biểu</h2><p>Danh sách các bản ghi đối chiếu tiêu chuẩn.</p></div></div>${recordLinks}</section>
        <section class="dt-section"><div class="dt-section-header"><div><h2>Tài liệu nghiên cứu</h2><p>Toàn bộ tài liệu văn bản đối chiếu.</p></div></div>${documentLinks}</section>
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
