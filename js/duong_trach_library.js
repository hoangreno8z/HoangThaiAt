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
            <div class="dt-hero-actions" style="margin-top:1rem">
              <a class="dt-primary-link" href="${ROUTE_ROOT}/bai/batch-01">Bắt đầu từ Giai đoạn 1</a>
            </div>
          </div>
        </header>
        <section class="dt-section" style="margin-top:1.5rem;">
          ${stagesHtml}
        </section>
        <aside class="dt-trust-note" style="margin-top:1.5rem; background:#181B22; border-left:3px solid #C5B382; padding:0.9rem 1.15rem; color:#EDE8DE;">
          <strong>Tâm pháp hành nghề:</strong> “Hình thế làm gốc, lý khí làm dụng, an toàn làm trọng”. Luôn kết hợp phép tắc cổ nhân với khảo sát thực địa kỹ lưỡng, không suy diễn mê tín hoang đường.
        </aside>`;
      this.root.innerHTML = this.shell(content);
    }

    topicNav(topics, activeId) {
      const activeTopicIndex = topics.findIndex(t => t.id === activeId);
      const activeTopic = topics[activeTopicIndex] || topics[0];

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
            <div class="dt-nav-stage-title" style="font-size:0.72rem; font-weight:600; color:#D4CEBD; text-transform:uppercase; letter-spacing:0.05em; padding:0.35rem 0.6rem 0.25rem 0.6rem; border-bottom:1px solid rgba(230,220,200,0.08); margin-bottom:0.35rem;">
              ${escapeHtml(stage.num)}. ${escapeHtml(stage.title)}
            </div>
            ${links}
          </div>
        `;
      }).join('');

      // Mobile Dropdown Selector
      const selectOptions = topics.map(t => `
        <option value="${escapeHtml(t.id)}" ${t.id === activeId ? 'selected' : ''}>
          Bước ${escapeHtml(t.batch)}: ${escapeHtml(t.title)}
        </option>
      `).join('');

      const mobileNavHtml = `
        <div class="dt-topic-nav-mobile" style="margin-bottom:0.8rem;">
          <select class="dt-mobile-step-select" onchange="if(this.value) window.location.hash = '${ROUTE_ROOT}/bai/' + this.value;" style="width:100%; background:#181B22; color:#F5EFEB; border:1px solid rgba(230,220,200,0.14); border-radius:8px; padding:0.55rem 0.75rem; font-size:0.85rem; outline:none; font-family:inherit;">
            ${selectOptions}
          </select>
        </div>
      `;

      return `<nav class="dt-topic-nav" aria-label="Quy trình 20 bước Dương Trạch">
        <div class="dt-topic-nav-desktop">${desktopNavHtml}</div>
        ${mobileNavHtml}
      </nav>`;
    }

    renderEntry(entry, article) {
      // ── SANITIZER: Chặn triệt để metadata nội bộ không cho hiển thị ra UI độc giả ──
      const sanitizeText = (txt) => {
        if (!txt) return '';
        return txt
          .replace(/SỔ KHÓA[^\n]*/gi, '')
          .replace(/Chưa khóa\s*—\s*cố ý để trống[^\n]*/gi, '')
          .replace(/Đã khóa[^\n]*/gi, '')
          .replace(/Bảy\.\s*Câu bị cấm[^\n]*/gi, '')
          .replace(/đối chiếu sổ\s*Q[0-9]\-[0-9]+[^\n]*/gi, '')
          .replace(/Kinh văn cổ thư xác lập chuẩn tắc khảo xét về SỔ KHÓA[^\n]*/gi, '')
          .replace(/Kinh văn cổ thư xác lập chuẩn tắc khảo xét về CỔNG ĐỌC CỬU TINH[^\n]*/gi, '')
          .replace(/Nguồn và giới hạn:\s*《[^》]+》[^\n]*/gi, '')
          .replace(/\n{3,}/g, '\n\n')
          .trim();
      };

      const sourceName = entry.source_title || 'Cổ Thư Chánh Tông';

      // ── TRƯỜNG HỢP 1: BÀI GIẢNG ĐẠI DANH SƯ (3 LỚP NỘI DUNG CHUẨN) ──
      if (entry.is_master_lesson || entry.layer_quick) {
        const quickHtml = entry.layer_quick ? `
          <div class="dt-layer-quick-card">
            <div class="dt-layer-quick-badge">✦ LỚP 1: HIỂU NHANH CỐT LÕI (DÀNH CHO NGƯỜI MỚI)</div>
            <p class="dt-quick-text">${escapeHtml(entry.layer_quick)}</p>
          </div>` : '';

        // Xử lý Lớp B: Cầm tay chỉ việc
        const handbookText = sanitizeText(entry.layer_handbook || entry.commentary || '');
        const rawParas = handbookText.split(/\n\n+|\r\n\r\n+/);
        const parsedHandbookParts = [];

        const formatContentBlock = (content) => {
          if (!content) return '';
          
          // Kiểm tra danh sách đánh số: 1. ... 2. ... hoặc \n1. ... \n2. ...
          const hasNumberedList = /(?:^|\n)\s*\d+[\.\)]\s+/.test(content) || /\s+\d+[\.\)]\s+/.test(content);
          if (hasNumberedList) {
            // Tách theo mẫu số thứ tự: 1. 2. 3...
            const parts = content.split(/(?=(?:^|\n|\s)\d+[\.\)]\s+)/).map(p => p.trim()).filter(Boolean);
            let leadHtml = '';
            let listItems = [];
            
            parts.forEach(part => {
              const numMatch = part.match(/^(\d+)[\.\)]\s+(.*)/s);
              if (numMatch) {
                listItems.push(`<li><strong>${numMatch[1]}.</strong> <span class="dt-bullet-text">${escapeHtml(numMatch[2].trim())}</span></li>`);
              } else if (listItems.length === 0) {
                leadHtml += `<p class="dt-lead-p">${escapeHtml(part)}</p>`;
              } else {
                leadHtml += `<p class="dt-body-p">${escapeHtml(part)}</p>`;
              }
            });
            
            let result = leadHtml;
            if (listItems.length) {
              result += `<ul class="dt-bullet-list dt-num-list" style="list-style:none; padding-left:0.2rem;">${listItems.join('')}</ul>`;
            }
            return result;
          }

          // Kiểm tra gạch đầu dòng bullet: • hoặc \n-
          if (content.includes('•') || /(?:^|\n)\s*-\s+/.test(content)) {
            const rawItems = content.includes('•') ? content.split(/\s*•\s*/) : content.split(/(?:^|\n)\s*-\s+/);
            const leadText = rawItems[0].trim();
            const bulletItems = rawItems.slice(1);
            let result = '';

            if (leadText) result += `<p class="dt-lead-p">${escapeHtml(leadText)}</p>`;
            if (bulletItems.length) {
              const itemsHtml = bulletItems
                .map(b => b.trim())
                .filter(Boolean)
                .map(b => `<li><span class="dt-bullet-text">${escapeHtml(b)}</span></li>`)
                .join('');
              result += `<ul class="dt-bullet-list">${itemsHtml}</ul>`;
            }
            return result;
          }

          // Đoạn văn thông thường
          return `<p class="dt-body-p">${escapeHtml(content)}</p>`;
        };

        rawParas.forEach(para => {
          para = para.trim();
          if (!para) return;

          const headerMatch = para.match(/^(【[^】]+】|###\s*[^\n]+|\d+\.\s+[^\n:]+:?)\s*(.*)/s);
          if (headerMatch) {
            const headingTitle = headerMatch[1].replace(/^###\s*/, '').trim();
            const restContent = headerMatch[2].trim();

            parsedHandbookParts.push(`<div class="dt-section-heading dt-master-heading">${escapeHtml(headingTitle)}</div>`);
            if (restContent) {
              parsedHandbookParts.push(formatContentBlock(restContent));
            }
          } else {
            parsedHandbookParts.push(formatContentBlock(para));
          }
        });

        // Xử lý Lớp C: Cổ thư và đối chiếu (dạng drawer mở rộng)
        const originalText = sanitizeText(entry.original || '');
        const hanVietText = sanitizeText(entry.hanViet || '');
        const literalText = sanitizeText(entry.literal || '');
        const dibanText = sanitizeText(entry.diban || '');

        const hasClassics = originalText || hanVietText || literalText;
        const classicsDrawer = hasClassics ? `
          <details class="dt-classics-drawer">
            <summary class="dt-classics-drawer-toggle">
              <span style="display:inline-flex; align-items:center; gap:0.5rem;">
                <span style="color:#FBBF24;">📜</span>
                <strong>LỚP 3: CỔ THƯ & ĐỐI CHIẾU CHỨNG CỨ GỐC</strong>
              </span>
              <span class="dt-drawer-hint">(Nhấp để mở kinh văn chữ Hán, phiên âm & xuất xứ)</span>
            </summary>
            <div class="dt-classics-drawer-body">
              ${literalText ? `
                <div class="dt-layer dt-layer-literal" style="border-top:none; padding-top:0;">
                  <span class="dt-layer-label" style="color:#94A3B8; font-weight:700; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.06em;">Dịch nghĩa sát văn bản cổ</span>
                  <p style="font-size:0.95rem; line-height:1.8; color:#F8FAFC; margin:0.35rem 0 0 0;">${escapeHtml(literalText)}</p>
                </div>` : ''}
              ${originalText ? `
                <div class="dt-layer dt-layer-original" style="border-top:1px solid rgba(255,255,255,0.08); padding-top:0.75rem;">
                  <span class="dt-layer-label" style="color:#94A3B8; font-weight:700; font-size:0.75rem; letter-spacing:0.06em;">Nguyên văn chữ Hán</span>
                  <p lang="zh-Hant" style="font-size:1.05rem; line-height:1.75; color:#FDE047; font-family:'Noto Serif SC',serif; margin:0.35rem 0 0 0; white-space:pre-line;">${escapeHtml(originalText)}</p>
                </div>` : ''}
              ${hanVietText ? `
                <div class="dt-layer dt-layer-hanviet" style="border-top:1px solid rgba(255,255,255,0.08); padding-top:0.75rem;">
                  <span class="dt-layer-label" style="color:#94A3B8; font-weight:700; font-size:0.75rem; letter-spacing:0.06em;">Phiên âm Hán‑Việt</span>
                  <p style="font-size:0.95rem; line-height:1.65; color:#7DD3FC; font-style:italic; margin:0.35rem 0 0 0; white-space:pre-line;">${escapeHtml(hanVietText)}</p>
                </div>` : ''}
              ${dibanText ? `
                <div class="dt-layer dt-layer-diban" style="border-top:1px solid rgba(255,255,255,0.08); padding-top:0.75rem;">
                  <span class="dt-layer-label" style="color:#F87171; font-weight:700; font-size:0.75rem; letter-spacing:0.06em;">Khảo chứng dị bản & Giới hạn cổ thư</span>
                  <p style="font-size:0.9rem; line-height:1.7; color:#CBD5E1; margin:0.35rem 0 0 0;">${escapeHtml(dibanText)}</p>
                </div>` : ''}
            </div>
          </details>` : '';

        return `<article class="dt-entry dt-master-lesson-entry" id="${escapeHtml(entry.id)}" style="margin-bottom:2.2rem; border:1px solid rgba(56,189,248,0.3); background:#111827; border-radius:12px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.35);">
          <header class="dt-entry-header" style="background:linear-gradient(90deg, #1E293B 0%, #0F172A 100%); border-bottom:1px solid rgba(56,189,248,0.25); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
            <h2 style="font-size:1.15rem; font-weight:800; color:#F8FAFC; margin:0;">${escapeHtml(entry.title || entry.id)}</h2>
            <span class="dt-badge" style="background:rgba(16,185,129,0.15); color:#34D399; border:1px solid rgba(52,211,153,0.3); font-size:0.75rem; font-weight:700; padding:0.25rem 0.65rem; border-radius:999px;">Giáo Trình Cầm Tay Chỉ Việc</span>
          </header>
          <div class="dt-entry-body">
            ${quickHtml}
            <div class="dt-layer-handbook-card">
              <div class="dt-layer-handbook-badge">🛠 LỚP 2: CẦM TAY CHỈ VIỆC NGOÀI THỰC ĐỊA (ĐẠI DANH SƯ CHỈ DẪN)</div>
              <div class="dt-commentary-content">${parsedHandbookParts.join('\n')}</div>
            </div>
            ${classicsDrawer}
          </div>
          <footer class="dt-entry-meta" style="background:#0B0F17; border-top:1px solid rgba(255,255,255,0.08); display:flex; gap:0.5rem; flex-wrap:wrap; align-items:center;">
            <span class="dt-badge" style="background:rgba(255,255,255,0.06); color:#E2E8F0; border:1px solid rgba(255,255,255,0.12); font-size:0.75rem; padding:0.25rem 0.6rem; border-radius:6px;">Nguồn: ${escapeHtml(sourceName)}</span>
            <span class="dt-badge dt-badge-evidence" style="background:rgba(56,189,248,0.12); color:#38BDF8; border:1px solid rgba(56,189,248,0.25); font-size:0.75rem; padding:0.25rem 0.6rem; border-radius:6px; font-weight:600;">Chánh Tông Cổ Pháp</span>
          </footer>
        </article>`;
      }

      // ── TRƯỜNG HỢP 2: DÀNH CHO CÁC BÀI THAM KHẢO TIÊU CHUẨN ──
      const original = entry.original ? `<div class="dt-layer dt-layer-original" data-dt-layer="original"><span class="dt-layer-label" style="color:#94A3B8; font-weight:600; font-size:0.75rem; letter-spacing:0.06em;">Nguyên văn chữ Hán</span><p lang="zh-Hant" style="font-size:1.05rem; line-height:1.75; color:#FDE047; font-family:'Noto Serif SC',serif; margin:0.35rem 0 0 0;">${escapeHtml(sanitizeText(entry.original))}</p></div>` : '';
      const hanViet = entry.hanViet ? `<div class="dt-layer dt-layer-hanviet" data-dt-layer="hanViet"><span class="dt-layer-label" style="color:#94A3B8; font-weight:600; font-size:0.75rem; letter-spacing:0.06em;">Phiên âm Hán‑Việt</span><p style="font-size:0.95rem; line-height:1.65; color:#7DD3FC; font-style:italic; margin:0.35rem 0 0 0;">${escapeHtml(sanitizeText(entry.hanViet))}</p></div>` : '';
      const literal = entry.literal ? `<div class="dt-layer dt-layer-literal" style="border-top:1px solid rgba(255,255,255,0.08); padding-top:0.85rem; margin-top:0.85rem;"><span class="dt-layer-label" style="color:#94A3B8; font-weight:600; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.06em;">Dịch nghĩa kinh văn</span><p style="font-size:0.95rem; line-height:1.8; color:#F8FAFC; margin:0.35rem 0 0 0;">${escapeHtml(sanitizeText(entry.literal))}</p></div>` : '';
      
      let commentaryText = sanitizeText(entry.commentary || 'Cổ thư ghi nhận nguyên tắc này làm chuẩn mực định hướng; trong thực tế cần đo đạc và đối chiếu cẩn trọng với điều kiện công trình.');
      commentaryText = commentaryText.replace(/^(Thầy dạy|Lời thầy|Thầy bảo|Thầy dặn)\s*[:—–,-]\s*/i, '').trim();

      const rawParas = commentaryText.split(/\n\n+|\r\n\r\n+/);
      const parsedHtmlParts = [];

      rawParas.forEach(para => {
        para = para.trim();
        if (!para) return;

        const headerMatch = para.match(/^(【[^】]+】|###\s*[^\n]+|\d+\.\s+[^\n:]+:?)\s*(.*)/s);
        if (headerMatch) {
          const headingTitle = headerMatch[1].replace(/^###\s*/, '').trim();
          const restContent = headerMatch[2].trim();

          parsedHtmlParts.push(`<div class="dt-section-heading">${escapeHtml(headingTitle)}</div>`);

          if (restContent) {
            if (restContent.includes('•') || restContent.includes('\n-')) {
              const leadAndBullets = restContent.split(/\s*•\s*/);
              const leadText = leadAndBullets[0].trim();
              const bulletItems = leadAndBullets.slice(1);

              if (leadText) parsedHtmlParts.push(`<p class="dt-lead-p">${escapeHtml(leadText)}</p>`);
              if (bulletItems.length) {
                const itemsHtml = bulletItems
                  .map(b => b.trim())
                  .filter(Boolean)
                  .map(b => `<li><span class="dt-bullet-text">${escapeHtml(b)}</span></li>`)
                  .join('');
                parsedHtmlParts.push(`<ul class="dt-bullet-list">${itemsHtml}</ul>`);
              }
            } else {
              parsedHtmlParts.push(`<p class="dt-body-p">${escapeHtml(restContent)}</p>`);
            }
          }
        } else if (para.includes('•')) {
          const leadAndBullets = para.split(/\s*•\s*/);
          const leadText = leadAndBullets[0].trim();
          const bulletItems = leadAndBullets.slice(1);

          if (leadText) parsedHtmlParts.push(`<p class="dt-body-p">${escapeHtml(leadText)}</p>`);
          if (bulletItems.length) {
            const itemsHtml = bulletItems
              .map(b => b.trim())
              .filter(Boolean)
              .map(b => `<li><span class="dt-bullet-text">${escapeHtml(b)}</span></li>`)
              .join('');
            parsedHtmlParts.push(`<ul class="dt-bullet-list">${itemsHtml}</ul>`);
          }
        } else {
          parsedHtmlParts.push(`<p class="dt-body-p">${escapeHtml(para)}</p>`);
        }
      });

      const parsedCommentary = parsedHtmlParts.join('\n');

      return `<article class="dt-entry" id="${escapeHtml(entry.id)}" style="margin-bottom:1.8rem; border:1px solid rgba(255,255,255,0.12); background:#111827; border-radius:12px; overflow:hidden;">
        <header class="dt-entry-header" style="background:#1E293B; border-bottom:1px solid rgba(255,255,255,0.1);">
          <h2 style="font-size:1.05rem; font-weight:700; color:#F8FAFC; margin:0;">${escapeHtml(entry.title || entry.id)}</h2>
        </header>
        <div class="dt-entry-body">
          ${literal}
          <div class="dt-layer dt-layer-commentary" style="background:rgba(56,189,248,0.03); border-left:3px solid #38BDF8; border-radius:0 8px 8px 0; margin-top:0.9rem;">
            <span class="dt-layer-label" style="color:#38BDF8; font-weight:700; font-size:0.76rem; letter-spacing:0.06em; text-transform:uppercase;">Giải nghĩa chuyên sâu</span>
            <div class="dt-commentary-content" style="margin-top:0.4rem;">${parsedCommentary}</div>
          </div>
          ${original}${hanViet}
        </div>
        <footer class="dt-entry-meta" style="background:#0B0F17; border-top:1px solid rgba(255,255,255,0.08); display:flex; gap:0.5rem; flex-wrap:wrap; align-items:center;">
          <span class="dt-badge" style="background:rgba(255,255,255,0.06); color:#E2E8F0; border:1px solid rgba(255,255,255,0.12); font-size:0.75rem; padding:0.25rem 0.6rem; border-radius:6px;">Nguồn: ${escapeHtml(sourceName)}</span>
          <span class="dt-badge dt-badge-evidence" style="background:rgba(56,189,248,0.12); color:#38BDF8; border:1px solid rgba(56,189,248,0.25); font-size:0.75rem; padding:0.25rem 0.6rem; border-radius:6px; font-weight:600;">Chánh Tông Cổ Pháp</span>
        </footer>
      </article>`;
    }

    renderArticle({ manifest, articles }, slug, query) {
      const articleIndex = articles.findIndex(item => item.id === slug);
      const article = articleIndex !== -1 ? articles[articleIndex] : articles[0];
      const prevArticle = articleIndex > 0 ? articles[articleIndex - 1] : null;
      const nextArticle = articleIndex < articles.length - 1 ? articles[articleIndex + 1] : null;

      document.title = `${article.title} — Cẩm Nang Thực Chiến Dương Trạch`;
      const entries = article.entries.length
        ? article.entries.map(entry => this.renderEntry(entry, article)).join('')
        : `<div class="dt-empty" style="background:#181B22; border-left:3px solid #C5B382; color:#EDE8DE; padding:1rem;"><strong>Hồ sơ tiêu chuẩn an toàn & kiểm soát thực địa.</strong><br>Chủ đề này tập trung vào các tiêu chuẩn an toàn bắt buộc: kết cấu, chống ngập lụt, an toàn cháy nổ và pháp lý xây dựng hiện đại cần kiểm tra trước khi bố trí phong thủy.</div>`;
      
      const bottomPagination = `
        <nav class="dt-bottom-pagination" aria-label="Điều hướng chuyển bước" style="display:flex; justify-content:space-between; align-items:center; gap:0.6rem; margin-top:2.5rem; padding-top:1.5rem; border-top:1px solid rgba(230,220,200,0.12); flex-wrap:wrap;">
          ${prevArticle ? `
            <a href="${ROUTE_ROOT}/bai/${prevArticle.id}" class="dt-bottom-nav-btn" style="display:inline-flex; align-items:center; gap:0.4rem; padding:0.55rem 0.9rem; background:#181B22; color:#D4CEBD; text-decoration:none; border:1px solid rgba(230,220,200,0.12); border-radius:7px; font-size:0.86rem;">
              ← Bước ${prevArticle.batch}: ${escapeHtml(prevArticle.title)}
            </a>` : '<div style="flex:1"></div>'}
          ${nextArticle ? `
            <a href="${ROUTE_ROOT}/bai/${nextArticle.id}" class="dt-bottom-nav-btn" style="display:inline-flex; align-items:center; gap:0.4rem; padding:0.55rem 0.9rem; background:#1F232D; color:#F5EFEB; text-decoration:none; border:1px solid rgba(230,220,200,0.22); border-radius:7px; font-size:0.86rem; font-weight:500;">
              Bước ${nextArticle.batch}: ${escapeHtml(nextArticle.title)} →
            </a>` : '<div style="flex:1"></div>'}
        </nav>
      `;

      const content = `<div class="dt-reader-layout">
        ${this.topicNav(manifest.topics, article.id)}
        <main>
          <header class="dt-page-header">
            <div class="dt-eyebrow">Bước ${escapeHtml(article.batch)} / 20 · ${article.entries.length ? `${article.entries.length} bài học thực chiến` : 'Tiêu chuẩn an toàn'}</div>
            <h1 class="dt-page-title">${escapeHtml(article.title)}</h1>
            <p class="dt-page-lead">${escapeHtml(article.description)}</p>
          </header>
          ${article.overview ? `<aside class="dt-state-note">${escapeHtml(article.overview)}</aside>` : ''}
          <div class="dt-toolbar" aria-label="Tùy chọn văn bản" style="display:flex; align-items:center; justify-content:space-between; margin:0.6rem 0 1.1rem; padding:0.3rem 0.6rem; background:#181B22; border:1px solid rgba(230,220,200,0.08); border-radius:6px;">
            <span style="font-size:0.74rem; color:#9E998E;">Hiển thị nguyên tác:</span>
            <div class="dt-toggle-group" style="display:flex; gap:0.3rem;">
              <button class="dt-toggle" type="button" data-dt-toggle="original" aria-pressed="${this.preferences.original}" style="min-height:24px; padding:0.15rem 0.5rem; font-size:0.7rem; border-radius:4px; border:1px solid rgba(230,220,200,0.12); background:#13151B; color:#EDE8DE; cursor:pointer;">Chữ Hán</button>
              <button class="dt-toggle" type="button" data-dt-toggle="hanViet" aria-pressed="${this.preferences.hanViet}" style="min-height:24px; padding:0.15rem 0.5rem; font-size:0.7rem; border-radius:4px; border:1px solid rgba(230,220,200,0.12); background:#13151B; color:#EDE8DE; cursor:pointer;">Phiên âm Hán‑Việt</button>
            </div>
          </div>
          <div class="dt-entry-list">${entries}</div>
          ${bottomPagination}
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
