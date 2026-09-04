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
        ]).then(([manifest, articles, sources]) => {
          this.base = { manifest, articles, sources };
          return this.base;
        });
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
        const nav144Btn = event.target.closest('[data-144-hs-target]');
        if (nav144Btn) {
          const targetNum = parseInt(nav144Btn.dataset['144HsTarget'], 10);
          if (!isNaN(targetNum)) {
            this.update144Explorer(targetNum);
          }
          return;
        }
        const tab144Btn = event.target.closest('[data-144-lesson-tab]');
        if (tab144Btn) {
          const targetIdx = parseInt(tab144Btn.dataset['144LessonTab'], 10);
          if (!isNaN(targetIdx)) {
            this.switch144Lesson(targetIdx);
          }
          return;
        }
        const subNav144Btn = event.target.closest('[data-144-sub-nav]');
        if (subNav144Btn) {
          const targetIdx = parseInt(subNav144Btn.dataset['144SubNav'], 10);
          if (!isNaN(targetIdx)) {
            this.switch144Lesson(targetIdx);
          }
          return;
        }
        const jumpGroupBtn = event.target.closest('[data-144-jump-group]');
        if (jumpGroupBtn) {
          event.preventDefault();
          const targetGroup = parseInt(jumpGroupBtn.dataset['144JumpGroup'], 10);
          if (!isNaN(targetGroup)) {
            this.switch144Lesson(targetGroup);
            const container = document.getElementById('dt-144-lesson-container');
            if (container) container.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          return;
        }
        const toggle = event.target.closest('[data-dt-toggle]');
        if (!toggle) return;
        const key = toggle.dataset.dtToggle;
        if (!(key in this.preferences)) return;
        this.preferences[key] = !this.preferences[key];
        savePreference(STORE_KEYS[key], this.preferences[key]);
        this.applyLayerVisibility();
      });
      this.root.addEventListener('change', event => {
        const lessonJumpSelect = event.target.closest('#dt-144-lesson-jump-select');
        if (lessonJumpSelect) {
          const targetIdx = parseInt(lessonJumpSelect.value, 10);
          if (!isNaN(targetIdx)) {
            this.switch144Lesson(targetIdx);
          }
          return;
        }
        const groupSelect = event.target.closest('#dt-144-group-select');
        if (groupSelect) {
          const groupVal = parseInt(groupSelect.value, 10);
          const firstHsInGroup = groupVal * 12 + 1;
          this.update144Explorer(firstHsInGroup);
          if (this.currentArticle && this.currentArticle.id === 'batch-21') {
            this.switch144Lesson(groupVal + 1, false);
          }
          return;
        }
        const hsSelect = event.target.closest('#dt-144-hs-select');
        if (hsSelect) {
          const hsNum = parseInt(hsSelect.value, 10);
          this.update144Explorer(hsNum);
          return;
        }
        const searchInput = event.target.closest('#dt-144-quick-search');
        if (searchInput) {
          const val = searchInput.value.trim().toLowerCase();
          const match = val.match(/hồ sơ #?(\d+)/i) || val.match(/^(\d+)$/);
          if (match) {
            const hs = parseInt(match[1], 10);
            if (hs >= 1 && hs <= 144) {
              this.update144Explorer(hs);
              return;
            }
          }
          const matrix = window.THUY_KHAU_144_MATRIX || [];
          const found = matrix.find(m => 
            (m.son_huong && m.son_huong.toLowerCase().includes(val)) ||
            (m.thuy_xuat && m.thuy_xuat.toLowerCase().includes(val)) ||
            (m.ten_cach && m.ten_cach.toLowerCase().includes(val)) ||
            (m.muc_phan && m.muc_phan.toLowerCase().includes(val))
          );
          if (found) {
            this.update144Explorer(found.hs_num);
            if (this.currentArticle && this.currentArticle.id === 'batch-21') {
              const grp = Math.floor((found.hs_num - 1) / 12) + 1;
              this.switch144Lesson(grp, false);
            }
          }
          return;
        }
      });

      this.root.addEventListener('input', event => {
        const searchInput = event.target.closest('#dt-144-quick-search');
        if (searchInput) {
          const val = searchInput.value.trim();
          const match = val.match(/hồ sơ #?(\d+)/i) || val.match(/^(\d+)$/i);
          if (match) {
            const hs = parseInt(match[1], 10);
            if (hs >= 1 && hs <= 144) {
              this.update144Explorer(hs);
            }
          }
        }
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
        },
        {
          num: 'VI',
          title: 'Đại Chuyên Khảo: Toàn Thư 144 Thủy Khẩu Chánh Tông',
          desc: 'Khảo chứng 144 cửa nước theo 《Địa Lý Ngũ Quyết》 Quyển 7 (1880) đối chiếu 《Bình Sa Ngọc Xích Kinh》.',
          batches: ['21']
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
        { num: 'V', title: 'THI CÔNG & NHẬP TRẠCH', batches: ['19', '20'] },
        { num: 'VI', title: 'TOÀN THƯ 144 THỦY KHẨU', batches: ['21'] }
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

      return `<nav class="dt-topic-nav" aria-label="Quy trình thực chiến Dương Trạch">
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

      // ── HELPER: Render a bullet item, parsing any nested sub-bullets (\n - ... or \n • ...) ──
      const renderBulletItem = (raw) => {
        raw = (raw || '').trim();
        if (!raw) return '';

        // Check if raw contains sub-bullets starting with - or •
        if (/\n\s*[-–•]\s+/.test(raw)) {
          const lines = raw.split(/\n\s*[-–•]\s+/);
          const head = lines[0].trim();
          const subItems = lines.slice(1);

          let html = `<span class="dt-bullet-title"><strong>${escapeHtml(head)}</strong></span>`;
          if (subItems.length) {
            const subLis = subItems.map(si => {
              const colonIdx = si.indexOf(':');
              if (colonIdx !== -1 && colonIdx < 50) {
                const k = si.slice(0, colonIdx).trim();
                const v = si.slice(colonIdx + 1).trim();
                return `<li class="dt-sub-bullet-li"><span class="dt-sub-bullet-key">${escapeHtml(k)}:</span> <span class="dt-sub-bullet-val">${escapeHtml(v)}</span></li>`;
              }
              return `<li class="dt-sub-bullet-li"><span class="dt-sub-bullet-val">${escapeHtml(si.trim())}</span></li>`;
            }).join('');
            html += `<ul class="dt-sub-bullet-list">${subLis}</ul>`;
          }
          return `<li>${html}</li>`;
        }

        // Check if single bullet item has Key: Value
        const colonIdx = raw.indexOf(':');
        if (colonIdx !== -1 && colonIdx < 50 && !raw.slice(0, colonIdx).includes('\n')) {
          const k = raw.slice(0, colonIdx).trim();
          const v = raw.slice(colonIdx + 1).trim();
          return `<li><span class="dt-sub-bullet-key" style="color:#38BDF8; font-weight:700;">${escapeHtml(k)}:</span> <span class="dt-bullet-text">${escapeHtml(v)}</span></li>`;
        }

        // Standard bullet item
        return `<li><span class="dt-bullet-text">${escapeHtml(raw)}</span></li>`;
      };

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
          
          // Kiểm tra danh sách đánh số: 1. ... 2. ... hoặc \n1. ... \n2. ... ở đầu dòng
          const hasNumberedList = /(?:^|\n)\s*\d+[\.\)]\s+/.test(content);
          if (hasNumberedList) {
            // Tách theo mẫu số thứ tự: 1. 2. 3... ở đầu dòng
            const parts = content.split(/(?=(?:^|\n)\s*\d+[\.\)]\s+)/).map(p => p.trim()).filter(Boolean);
            let leadHtml = '';
            let listItems = [];
            
            parts.forEach(part => {
              const numMatch = part.match(/^(\d+)[\.\)]\s+(.*)/s);
              if (numMatch) {
                const num = numMatch[1];
                const rawItem = numMatch[2].trim();
                
                // Check if this numbered item has nested bullets (• or \n- or \n–)
                if (rawItem.includes('•') || /(?:^|\n)\s*[-–•]\s+/.test(rawItem)) {
                  const subParts = rawItem.includes('•') 
                    ? rawItem.split(/\s*•\s*/) 
                    : rawItem.split(/(?:^|\n)\s*[-–•]\s+/);
                  const subHead = subParts[0].trim();
                  const subItems = subParts.slice(1);
                  
                  let itemHtml = `<span class="dt-num-badge">${num}.</span> <span class="dt-bullet-text">${escapeHtml(subHead)}</span>`;
                  if (subItems.length) {
                    const subLis = subItems.map(si => {
                      si = si.trim();
                      if (!si) return '';
                      const colonIdx = si.indexOf(':');
                      if (colonIdx !== -1 && colonIdx < 50) {
                        const k = si.slice(0, colonIdx).trim();
                        const v = si.slice(colonIdx + 1).trim();
                        return `<li class="dt-sub-bullet-li"><span class="dt-sub-bullet-key">${escapeHtml(k)}:</span> <span class="dt-sub-bullet-val">${escapeHtml(v)}</span></li>`;
                      }
                      return `<li class="dt-sub-bullet-li"><span class="dt-sub-bullet-val">${escapeHtml(si)}</span></li>`;
                    }).filter(Boolean).join('');
                    itemHtml += `<ul class="dt-sub-bullet-list">${subLis}</ul>`;
                  }
                  listItems.push(`<li>${itemHtml}</li>`);
                } else {
                  // If contains multiple lines, preserve them
                  const formattedItem = escapeHtml(rawItem).replace(/\n/g, '<br>');
                  listItems.push(`<li><span class="dt-num-badge">${num}.</span> <span class="dt-bullet-text">${formattedItem}</span></li>`);
                }
              } else if (listItems.length === 0) {
                leadHtml += `<p class="dt-lead-p">${escapeHtml(part)}</p>`;
              } else {
                leadHtml += `<p class="dt-body-p">${escapeHtml(part)}</p>`;
              }
            });
            
            let result = leadHtml;
            if (listItems.length) {
              result += `<ul class="dt-num-list">${listItems.join('')}</ul>`;
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
                .map(b => renderBulletItem(b))
                .filter(Boolean)
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
                  .map(b => renderBulletItem(b))
                  .filter(Boolean)
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
              .map(b => renderBulletItem(b))
              .filter(Boolean)
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

    render144MatrixWidget(activeHsNum) {
      const matrix = window.THUY_KHAU_144_MATRIX || [];
      if (!matrix.length) {
        return `<div class="dt-state-note" style="padding:1rem; border-left:3px solid #C5B382;">Đang nạp dữ liệu Ma Trận 144 Thủy Khẩu Chánh Tông...</div>`;
      }

      const hsTarget = Number(activeHsNum) || 1;
      const selected = matrix.find(item => item.hs_num === hsTarget) || matrix[0];
      const selectedGroupIdx = Math.floor((selected.hs_num - 1) / 12);

      const SONG_SON_GROUPS_INFO = [
        { idx: 0, label: "Nhóm 01: Nhâm Bính / Tý Ngọ (Hỏa Cục)", cuc: "Hỏa", lesson: "LESSON-21-01" },
        { idx: 1, label: "Nhóm 02: Quý Đinh / Sửu Mùi (Kim Cục)", cuc: "Kim", lesson: "LESSON-21-02" },
        { idx: 2, label: "Nhóm 03: Cấn Khôn / Dần Thân (Thủy Cục)", cuc: "Thủy", lesson: "LESSON-21-03" },
        { idx: 3, label: "Nhóm 04: Giáp Canh / Mão Dậu (Kim Cục)", cuc: "Kim", lesson: "LESSON-21-04" },
        { idx: 4, label: "Nhóm 05: Ất Tân / Thìn Tuất (Thủy Cục)", cuc: "Thủy", lesson: "LESSON-21-05" },
        { idx: 5, label: "Nhóm 06: Tốn Càn / Tị Hợi (Mộc Cục)", cuc: "Mộc", lesson: "LESSON-21-06" },
        { idx: 6, label: "Nhóm 07: Bính Nhâm / Ngọ Tý (Thủy Cục)", cuc: "Thủy", lesson: "LESSON-21-07" },
        { idx: 7, label: "Nhóm 08: Đinh Quý / Mùi Sửu (Mộc Cục)", cuc: "Mộc", lesson: "LESSON-21-08" },
        { idx: 8, label: "Nhóm 09: Khôn Cấn / Thân Dần (Hỏa Cục)", cuc: "Hỏa", lesson: "LESSON-21-09" },
        { idx: 9, label: "Nhóm 10: Canh Giáp / Dậu Ất (Mộc Cục)", cuc: "Mộc", lesson: "LESSON-21-10" },
        { idx: 10, label: "Nhóm 11: Tân Ất / Tuất Thìn (Hỏa Cục)", cuc: "Hỏa", lesson: "LESSON-21-11" },
        { idx: 11, label: "Nhóm 12: Càn Tốn / Hợi Tị (Kim Cục)", cuc: "Kim", lesson: "LESSON-21-12" }
      ];

      const currentGroupInfo = SONG_SON_GROUPS_INFO[selectedGroupIdx] || SONG_SON_GROUPS_INFO[0];
      const groupItems = matrix.filter(item => Math.floor((item.hs_num - 1) / 12) === selectedGroupIdx);

      const groupOptions = SONG_SON_GROUPS_INFO.map(g => 
        `<option value="${g.idx}" ${g.idx === selectedGroupIdx ? 'selected' : ''}>${escapeHtml(g.label)}</option>`
      ).join('');

      const doorOptions = groupItems.map(item => {
        const isSel = item.hs_num === selected.hs_num;
        return `<option value="${item.hs_num}" ${isSel ? 'selected' : ''}>Cửa ${((item.hs_num - 1) % 12) + 1}: Thoát ${escapeHtml(item.thuy_xuat)} — ${escapeHtml(item.ten_cach)} [${escapeHtml(item.muc_phan)}]</option>`;
      }).join('');

      const datalistOptions = matrix.map(item => 
        `<option value="Hồ sơ #${item.hs_num}: ${escapeHtml(item.son_huong)} thoát ${escapeHtml(item.thuy_xuat)} — ${escapeHtml(item.ten_cach)} [${escapeHtml(item.muc_phan)}]"></option>`
      ).join('');

      let cucColor = '#38BDF8';
      let cucBg = 'rgba(56,189,248,0.12)';
      let cucBorder = 'rgba(56,189,248,0.3)';
      if (selected.cuc === 'Hỏa') {
        cucColor = '#F87171'; cucBg = 'rgba(239,68,68,0.12)'; cucBorder = 'rgba(239,68,68,0.3)';
      } else if (selected.cuc === 'Thủy') {
        cucColor = '#38BDF8'; cucBg = 'rgba(56,189,248,0.12)'; cucBorder = 'rgba(56,189,248,0.3)';
      } else if (selected.cuc === 'Mộc') {
        cucColor = '#4ADE80'; cucBg = 'rgba(74,222,128,0.12)'; cucBorder = 'rgba(74,222,128,0.3)';
      } else if (selected.cuc === 'Kim') {
        cucColor = '#FBBF24'; cucBg = 'rgba(251,191,36,0.12)'; cucBorder = 'rgba(251,191,36,0.3)';
      }

      const phanLower = (selected.muc_phan || '').toLowerCase();
      let phanBg = 'rgba(16,185,129,0.15)';
      let phanColor = '#34D399';
      let phanBorder = 'rgba(52,211,153,0.3)';
      if (phanLower.includes('hung') || phanLower.includes('tuyệt') || phanLower.includes('tiêu') || phanLower.includes('bần') || phanLower.includes('đoản') || phanLower.includes('bại')) {
        phanBg = 'rgba(239,68,68,0.15)';
        phanColor = '#F87171';
        phanBorder = 'rgba(239,68,68,0.3)';
      } else if (!phanLower.includes('cát')) {
        phanBg = 'rgba(245,158,11,0.15)';
        phanColor = '#FBBF24';
        phanBorder = 'rgba(245,158,11,0.3)';
      }

      const prevHs = selected.hs_num > 1 ? selected.hs_num - 1 : 144;
      const nextHs = selected.hs_num < 144 ? selected.hs_num + 1 : 1;

      const formatSecContent = (text) => {
        if (!text) return '<span style="color:#64748B;">(Chưa có nội dung riêng cho mục này)</span>';
        let s = text.trim();
        s = s.replace(/^[A-F]\.\s*[^:]*:\s*/i, '');
        return escapeHtml(s).replace(/\n/g, '<br>');
      };

      return `
        <section class="dt-144-explorer" style="background:#0E131F; border:1px solid #C5B382; border-radius:14px; padding:1.4rem; box-shadow:0 12px 36px rgba(0,0,0,0.55); margin-bottom:2rem;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.8rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:1rem; margin-bottom:1.2rem;">
            <div>
              <div style="display:inline-flex; align-items:center; gap:0.4rem; padding:0.2rem 0.6rem; background:rgba(197,179,130,0.15); border:1px solid rgba(197,179,130,0.3); border-radius:6px; font-size:0.75rem; font-weight:700; color:#F5D485; margin-bottom:0.4rem;">
                <span>🧭</span> BỘ TRA CỨU ĐIỆN TỬ TƯƠNG TÁC
              </div>
              <h2 style="margin:0 0 0.3rem 0; font-size:1.3rem; color:#FEF3C7; font-weight:800; letter-spacing:0.02em;">
                Ma Trận 144 Thủy Khẩu Chánh Tông (1880)
              </h2>
              <div style="font-size:0.82rem; color:#94A3B8;">
                Khảo chứng 12 Song Sơn × 12 Cửa Nước theo 《Địa Lý Ngũ Quyết》 Quyển 7 (1880) đối chiếu 《Bình Sa Ngọc Xích Kinh》
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <button type="button" data-144-hs-target="${prevHs}" style="background:#1E293B; color:#E2E8F0; border:1px solid rgba(255,255,255,0.15); padding:0.45rem 0.8rem; border-radius:6px; font-size:0.8rem; cursor:pointer; font-weight:600;" title="Hồ sơ #${prevHs}">
                ← Cửa trước
              </button>
              <span style="font-size:0.85rem; font-weight:700; color:#F5D485; padding:0 0.3rem;">
                #${selected.hs_num} / 144
              </span>
              <button type="button" data-144-hs-target="${nextHs}" style="background:#1E293B; color:#E2E8F0; border:1px solid rgba(255,255,255,0.15); padding:0.45rem 0.8rem; border-radius:6px; font-size:0.8rem; cursor:pointer; font-weight:600;" title="Hồ sơ #${nextHs}">
                Cửa sau →
              </button>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem; margin-bottom:1.4rem; background:#141B2B; padding:1rem; border-radius:10px; border:1px solid rgba(255,255,255,0.06);">
            <div>
              <label for="dt-144-group-select" style="display:block; font-size:0.78rem; font-weight:700; color:#E2E8F0; margin-bottom:0.35rem; text-transform:uppercase; letter-spacing:0.04em;">
                1. Chọn Cụm Song Sơn (12 Cụm)
              </label>
              <select id="dt-144-group-select" style="width:100%; background:#0B0F17; color:#FEF3C7; border:1px solid rgba(197,179,130,0.3); border-radius:6px; padding:0.5rem 0.7rem; font-size:0.86rem; font-weight:600; outline:none; font-family:inherit;">
                ${groupOptions}
              </select>
            </div>

            <div>
              <label for="dt-144-hs-select" style="display:block; font-size:0.78rem; font-weight:700; color:#E2E8F0; margin-bottom:0.35rem; text-transform:uppercase; letter-spacing:0.04em;">
                2. Chọn Cửa Nước Thoát (12 Cửa)
              </label>
              <select id="dt-144-hs-select" style="width:100%; background:#0B0F17; color:#38BDF8; border:1px solid rgba(56,189,248,0.3); border-radius:6px; padding:0.5rem 0.7rem; font-size:0.86rem; font-weight:600; outline:none; font-family:inherit;">
                ${doorOptions}
              </select>
            </div>

            <div style="grid-column: 1 / -1;">
              <label for="dt-144-quick-search" style="display:block; font-size:0.78rem; font-weight:700; color:#E2E8F0; margin-bottom:0.35rem; text-transform:uppercase; letter-spacing:0.04em;">
                🔍 Gõ Nhanh Từ Khóa Tìm Kiếm (Gợi Ý Tự Động 144 Hồ Sơ)
              </label>
              <input id="dt-144-quick-search" list="dt-144-search-datalist" type="text" placeholder="Ví dụ: gõ 'Bính hướng', 'Ất Thìn', 'Tân Tuất', 'Chính Vượng', 'Hồ sơ #45'..." style="width:100%; background:#0B0F17; color:#F5EFEB; border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:0.5rem 0.8rem; font-size:0.85rem; outline:none; font-family:inherit; box-sizing:border-box;">
              <datalist id="dt-144-search-datalist">
                ${datalistOptions}
              </datalist>
            </div>
          </div>

          <div style="background:#111827; border:1px solid rgba(255,255,255,0.12); border-radius:12px; overflow:hidden;">
            <div style="background:#1A2234; padding:1rem 1.4rem; border-bottom:1px solid rgba(255,255,255,0.08); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem;">
              <div>
                <span style="font-size:0.75rem; font-weight:700; color:#94A3B8; text-transform:uppercase; letter-spacing:0.05em;">Hồ sơ khảo chứng số #${selected.hs_num}</span>
                <h3 style="margin:0.2rem 0 0 0; font-size:1.2rem; color:#F8FAFC; font-weight:800;">
                  ${escapeHtml(selected.header)}
                </h3>
              </div>
              <div style="display:flex; gap:0.5rem; flex-wrap:wrap; align-items:center;">
                <span class="dt-badge" style="background:${cucBg}; color:${cucColor}; border:1px solid ${cucBorder}; font-weight:700; padding:0.25rem 0.65rem; border-radius:6px; font-size:0.8rem;">
                  ${escapeHtml(selected.cuc)} Cục
                </span>
                <span class="dt-badge" style="background:${phanBg}; color:${phanColor}; border:1px solid ${phanBorder}; font-weight:800; padding:0.25rem 0.65rem; border-radius:6px; font-size:0.8rem;">
                  ${escapeHtml(selected.muc_phan).toUpperCase()}
                </span>
                <span class="dt-badge" style="background:rgba(255,255,255,0.06); color:#CBD5E1; border:1px solid rgba(255,255,255,0.12); padding:0.25rem 0.55rem; border-radius:6px; font-size:0.75rem;">
                  Chánh Tông Cổ Thư (1880)
                </span>
              </div>
            </div>

            <div style="background:#0F141E; padding:0.75rem 1.4rem; border-bottom:1px solid rgba(255,255,255,0.06); display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:0.8rem; font-size:0.82rem;">
              <div>
                <span style="color:#64748B; display:block; font-size:0.72rem; text-transform:uppercase;">Tọa Sơn / Hướng</span>
                <strong style="color:#F1F5F9;">${escapeHtml(selected.son_huong)}</strong>
              </div>
              <div>
                <span style="color:#64748B; display:block; font-size:0.72rem; text-transform:uppercase;">Cửa Nước Thoát</span>
                <strong style="color:#38BDF8;">${escapeHtml(selected.thuy_xuat)}</strong>
              </div>
              <div>
                <span style="color:#64748B; display:block; font-size:0.72rem; text-transform:uppercase;">Cung / Pha Trường Sinh</span>
                <strong style="color:#CBD5E1;">${escapeHtml(selected.song_son_cung)}</strong>
              </div>
              <div>
                <span style="color:#64748B; display:block; font-size:0.72rem; text-transform:uppercase;">Dòng Chảy</span>
                <strong style="color:#CBD5E1;">${escapeHtml(selected.chieu_nuoc)}</strong>
              </div>
              <div>
                <span style="color:#64748B; display:block; font-size:0.72rem; text-transform:uppercase;">Tên Thế Cách</span>
                <strong style="color:#F5D485;">${escapeHtml(selected.ten_cach)}</strong>
              </div>
            </div>

            <div style="padding:1.4rem; display:flex; flex-direction:column; gap:1.2rem;">
              <div style="background:#161D2C; border-left:3px solid #C5B382; border-radius:0 8px 8px 0; padding:0.9rem 1.1rem;">
                <div style="display:flex; align-items:center; gap:0.4rem; color:#F5D485; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:0.4rem;">
                  <span>📜</span> A. Cổ Kinh Đồ Phổ
                </div>
                <div style="color:#F1F5F9; font-size:0.88rem; line-height:1.6;">
                  ${formatSecContent(selected.muc_A)}
                </div>
              </div>

              <div style="background:#131B2A; border-left:3px solid #38BDF8; border-radius:0 8px 8px 0; padding:0.9rem 1.1rem;">
                <div style="display:flex; align-items:center; gap:0.4rem; color:#38BDF8; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:0.4rem;">
                  <span>🗣️</span> B. Khẩu Quyết Bí Chỉ
                </div>
                <div style="color:#E2E8F0; font-size:0.88rem; line-height:1.6;">
                  ${formatSecContent(selected.muc_B)}
                </div>
              </div>

              <div style="background:#131D24; border-left:3px solid #34D399; border-radius:0 8px 8px 0; padding:0.9rem 1.1rem;">
                <div style="display:flex; align-items:center; gap:0.4rem; color:#34D399; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:0.4rem;">
                  <span>🛠️</span> C. Thực Địa Định Vị
                </div>
                <div style="color:#E2E8F0; font-size:0.88rem; line-height:1.6;">
                  ${formatSecContent(selected.muc_C)}
                </div>
              </div>

              <div style="background:#1B1A28; border-left:3px solid #A78BFA; border-radius:0 8px 8px 0; padding:0.9rem 1.1rem;">
                <div style="display:flex; align-items:center; gap:0.4rem; color:#A78BFA; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:0.4rem;">
                  <span>🌊</span> D. Biện Chứng Cát Hung
                </div>
                <div style="color:#E2E8F0; font-size:0.88rem; line-height:1.6;">
                  ${formatSecContent(selected.muc_D)}
                </div>
              </div>

              <div style="background:#1C1E24; border-left:3px solid ${phanColor}; border-radius:0 8px 8px 0; padding:0.9rem 1.1rem;">
                <div style="display:flex; align-items:center; gap:0.4rem; color:${phanColor}; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:0.4rem;">
                  <span>⚡</span> E. Họa Phúc Ứng Nghiệm
                </div>
                <div style="color:#E2E8F0; font-size:0.88rem; line-height:1.6;">
                  ${formatSecContent(selected.muc_E)}
                </div>
              </div>

              <div style="background:#22181C; border-left:3px solid #FB7185; border-radius:0 8px 8px 0; padding:0.9rem 1.1rem;">
                <div style="display:flex; align-items:center; gap:0.4rem; color:#FB7185; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:0.4rem;">
                  <span>⚠️</span> F. Cạm Bẫy Kiêng Kỵ
                </div>
                <div style="color:#E2E8F0; font-size:0.88rem; line-height:1.6;">
                  ${formatSecContent(selected.muc_F)}
                </div>
              </div>
            </div>

            <div style="background:#0E131F; border-top:1px solid rgba(255,255,255,0.08); padding:0.9rem 1.4rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.8rem;">
              <a href="#/thu-vien/duong-trach/bai/batch-21?nhom=${currentGroupInfo.idx + 1}" data-144-jump-group="${currentGroupInfo.idx + 1}" style="display:inline-flex; align-items:center; gap:0.4rem; color:#F5D485; text-decoration:none; font-size:0.86rem; font-weight:600;">
                📖 Xem toàn văn bài giảng ${escapeHtml(currentGroupInfo.label)} trong giáo trình chi tiết ↓
              </a>
              <div style="display:flex; gap:0.5rem;">
                <button type="button" data-144-hs-target="${prevHs}" style="background:#1E293B; color:#CBD5E1; border:1px solid rgba(255,255,255,0.12); padding:0.35rem 0.7rem; border-radius:6px; font-size:0.78rem; cursor:pointer;">
                  ← #${prevHs}
                </button>
                <button type="button" data-144-hs-target="${nextHs}" style="background:#1E293B; color:#CBD5E1; border:1px solid rgba(255,255,255,0.12); padding:0.35rem 0.7rem; border-radius:6px; font-size:0.78rem; cursor:pointer;">
                  #${nextHs} →
                </button>
              </div>
            </div>
          </div>
        </section>
      `;
    }

    update144Explorer(activeHsNum) {
      const mount = document.getElementById('dt-144-explorer-mount');
      if (mount) {
        mount.innerHTML = this.render144MatrixWidget(activeHsNum);
      }
    }

    render144LessonSection(article, activeIdx) {
      const BATCH_21_TABS = [
        { idx: 0, shortLabel: "Cương Lĩnh", title: "Cương Lĩnh & Quy Trình Khảo Sát 144 Thủy Khẩu", cuc: "Cốt Lõi", badgeBg: "rgba(197,179,130,0.18)", badgeColor: "#F5D485", border: "rgba(197,179,130,0.4)" },
        { idx: 1, shortLabel: "01. Nhâm Bính / Tý Ngọ", title: "Nhóm 1: Nhâm Bính / Tý Ngọ", cuc: "Hỏa", badgeBg: "rgba(239,68,68,0.18)", badgeColor: "#F87171", border: "rgba(239,68,68,0.4)" },
        { idx: 2, shortLabel: "02. Quý Đinh / Sửu Mùi", title: "Nhóm 2: Quý Đinh / Sửu Mùi", cuc: "Kim", badgeBg: "rgba(251,191,36,0.18)", badgeColor: "#FBBF24", border: "rgba(251,191,36,0.4)" },
        { idx: 3, shortLabel: "03. Cấn Khôn / Dần Thân", title: "Nhóm 3: Cấn Khôn / Dần Thân", cuc: "Thủy", badgeBg: "rgba(56,189,248,0.18)", badgeColor: "#38BDF8", border: "rgba(56,189,248,0.4)" },
        { idx: 4, shortLabel: "04. Giáp Canh / Mão Dậu", title: "Nhóm 4: Giáp Canh / Mão Dậu", cuc: "Kim", badgeBg: "rgba(251,191,36,0.18)", badgeColor: "#FBBF24", border: "rgba(251,191,36,0.4)" },
        { idx: 5, shortLabel: "05. Ất Tân / Thìn Tuất", title: "Nhóm 5: Ất Tân / Thìn Tuất", cuc: "Thủy", badgeBg: "rgba(56,189,248,0.18)", badgeColor: "#38BDF8", border: "rgba(56,189,248,0.4)" },
        { idx: 6, shortLabel: "06. Tốn Càn / Tị Hợi", title: "Nhóm 6: Tốn Càn / Tị Hợi", cuc: "Mộc", badgeBg: "rgba(74,222,128,0.18)", badgeColor: "#4ADE80", border: "rgba(74,222,128,0.4)" },
        { idx: 7, shortLabel: "07. Bính Nhâm / Ngọ Tý", title: "Nhóm 7: Bính Nhâm / Ngọ Tý", cuc: "Thủy", badgeBg: "rgba(56,189,248,0.18)", badgeColor: "#38BDF8", border: "rgba(56,189,248,0.4)" },
        { idx: 8, shortLabel: "08. Đinh Quý / Mùi Sửu", title: "Nhóm 8: Đinh Quý / Mùi Sửu", cuc: "Mộc", badgeBg: "rgba(74,222,128,0.18)", badgeColor: "#4ADE80", border: "rgba(74,222,128,0.4)" },
        { idx: 9, shortLabel: "09. Khôn Cấn / Thân Dần", title: "Nhóm 9: Khôn Cấn / Thân Dần", cuc: "Hỏa", badgeBg: "rgba(239,68,68,0.18)", badgeColor: "#F87171", border: "rgba(239,68,68,0.4)" },
        { idx: 10, shortLabel: "10. Canh Giáp / Dậu Ất", title: "Nhóm 10: Canh Giáp / Dậu Ất", cuc: "Mộc", badgeBg: "rgba(74,222,128,0.18)", badgeColor: "#4ADE80", border: "rgba(74,222,128,0.4)" },
        { idx: 11, shortLabel: "11. Tân Ất / Tuất Thìn", title: "Nhóm 11: Tân Ất / Tuất Thìn", cuc: "Hỏa", badgeBg: "rgba(239,68,68,0.18)", badgeColor: "#F87171", border: "rgba(239,68,68,0.4)" },
        { idx: 12, shortLabel: "12. Càn Tốn / Hợi Tị", title: "Nhóm 12: Càn Tốn / Hợi Tị", cuc: "Kim", badgeBg: "rgba(251,191,36,0.18)", badgeColor: "#FBBF24", border: "rgba(251,191,36,0.4)" }
      ];

      const currentTab = BATCH_21_TABS[activeIdx] || BATCH_21_TABS[0];
      const activeEntry = article.entries[activeIdx] || article.entries[0];

      const selectOptions = BATCH_21_TABS.map(tab => 
        `<option value="${tab.idx}" ${tab.idx === activeIdx ? 'selected' : ''}>${tab.idx === 0 ? '📜 Cương Lĩnh 144 Thủy Khẩu & Quy Trình' : `${tab.shortLabel} (${tab.cuc} Cục)`}</option>`
      ).join('');

      const tabButtons = BATCH_21_TABS.map(tab => {
        const isSel = tab.idx === activeIdx;
        const bg = isSel ? 'linear-gradient(135deg, rgba(197,179,130,0.25) 0%, #1E293B 100%)' : '#111827';
        const borderCol = isSel ? '#C5B382' : 'rgba(255,255,255,0.1)';
        const textCol = isSel ? '#FEF3C7' : '#94A3B8';
        const shadow = isSel ? 'box-shadow:0 0 12px rgba(197,179,130,0.25);' : '';
        const icon = tab.idx === 0 ? '📜 ' : '';
        return `
          <button type="button" class="dt-144-lesson-tab-btn ${isSel ? 'active' : ''}" data-144-lesson-tab="${tab.idx}" style="background:${bg}; border:1px solid ${borderCol}; color:${textCol}; ${shadow} padding:0.45rem 0.8rem; border-radius:8px; font-size:0.8rem; font-weight:${isSel ? '700' : '600'}; cursor:pointer; display:inline-flex; align-items:center; gap:0.45rem; transition:all 0.15s ease; font-family:inherit;">
            <span>${icon}${escapeHtml(tab.shortLabel)}</span>
            <span style="background:${tab.badgeBg}; color:${tab.badgeColor}; border:1px solid ${tab.border}; font-size:0.68rem; padding:0.1rem 0.35rem; border-radius:4px; font-weight:700;">${escapeHtml(tab.cuc)}</span>
          </button>
        `;
      }).join('');

      const prevLessonIdx = activeIdx > 0 ? activeIdx - 1 : null;
      const nextLessonIdx = activeIdx < BATCH_21_TABS.length - 1 ? activeIdx + 1 : null;

      const prevLessonBtn = prevLessonIdx !== null ? `
        <button type="button" data-144-sub-nav="${prevLessonIdx}" style="display:inline-flex; align-items:center; gap:0.4rem; padding:0.5rem 0.9rem; background:#181B22; color:#D4CEBD; border:1px solid rgba(230,220,200,0.15); border-radius:7px; font-size:0.84rem; cursor:pointer; font-weight:600; font-family:inherit;">
          ← ${escapeHtml(BATCH_21_TABS[prevLessonIdx].shortLabel)}
        </button>
      ` : '<div style="flex:1"></div>';

      const nextLessonBtn = nextLessonIdx !== null ? `
        <button type="button" data-144-sub-nav="${nextLessonIdx}" style="display:inline-flex; align-items:center; gap:0.4rem; padding:0.5rem 0.9rem; background:#1F232D; color:#F5EFEB; border:1px solid rgba(197,179,130,0.3); border-radius:7px; font-size:0.84rem; cursor:pointer; font-weight:600; font-family:inherit;">
          ${escapeHtml(BATCH_21_TABS[nextLessonIdx].shortLabel)} →
        </button>
      ` : '<div style="flex:1"></div>';

      return `
        <section id="dt-144-lesson-container" style="margin-top:1.5rem; margin-bottom:2rem;">
          <div style="background:#0D111A; border:1px solid #C5B382; border-radius:14px; padding:1.2rem; margin-bottom:1.4rem; box-shadow:0 8px 24px rgba(0,0,0,0.45);">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.8rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.9rem; margin-bottom:1rem;">
              <div>
                <div style="display:inline-flex; align-items:center; gap:0.4rem; font-size:0.75rem; font-weight:700; color:#F5D485; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:0.25rem;">
                  <span>📚</span> GIÁO TRÌNH CHUYÊN SÂU 144 THỦY KHẨU (13 BÀI THỰC CHIẾN)
                </div>
                <h3 style="margin:0; font-size:1.15rem; color:#FEF3C7; font-weight:700;">
                  ${activeIdx === 0 ? 'Cương Lĩnh & Quy Trình Khảo Sát Thực Địa' : `Chuyên Khảo: ${escapeHtml(currentTab.title)} (${escapeHtml(currentTab.cuc)} Cục)`}
                </h3>
              </div>
              <div style="display:flex; align-items:center; gap:0.5rem;">
                <label for="dt-144-lesson-jump-select" style="font-size:0.78rem; color:#94A3B8; font-weight:600;">Chọn nhanh bài:</label>
                <select id="dt-144-lesson-jump-select" style="background:#1E293B; color:#FEF3C7; border:1px solid rgba(197,179,130,0.3); border-radius:6px; padding:0.4rem 0.65rem; font-size:0.82rem; font-weight:600; outline:none; font-family:inherit;">
                  ${selectOptions}
                </select>
              </div>
            </div>

            <div>
              <div style="font-size:0.75rem; color:#94A3B8; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:0.6rem;">
                Danh Sách 13 Bài Giảng Phân Nhóm (Chọn để đọc riêng từng bài — Tránh cuộn trang vô tận):
              </div>
              <div class="dt-144-tab-bar" style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                ${tabButtons}
              </div>
            </div>
          </div>

          <div id="dt-144-active-entry-container">
            ${this.renderEntry(activeEntry, article)}
          </div>

          <nav class="dt-144-sub-pagination" aria-label="Điều hướng bài giảng 144" style="display:flex; justify-content:space-between; align-items:center; gap:0.6rem; margin-top:1.5rem; padding-top:1.2rem; border-top:1px solid rgba(255,255,255,0.08); flex-wrap:wrap;">
            ${prevLessonBtn}
            <div style="font-size:0.85rem; font-weight:700; color:#F5D485; text-align:center;">
              Bài ${activeIdx === 0 ? 'Cương Lĩnh' : `Nhóm ${activeIdx}`}/12 · ${escapeHtml(currentTab.shortLabel)}
            </div>
            ${nextLessonBtn}
          </nav>
        </section>
      `;
    }

    switch144Lesson(newIdx, syncExplorer = true) {
      const idx = Number(newIdx);
      if (isNaN(idx) || idx < 0 || idx > 12) return;
      this.active144LessonIdx = idx;

      const container = document.getElementById('dt-144-lesson-container');
      if (container && this.currentArticle && this.currentArticle.id === 'batch-21') {
        container.outerHTML = this.render144LessonSection(this.currentArticle, idx);
        this.applyLayerVisibility();
        const newContainer = document.getElementById('dt-144-lesson-container');
        if (newContainer) {
          newContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      try {
        const [baseHash] = (window.location.hash || '').split('?');
        history.replaceState(null, '', `${baseHash}?nhom=${idx}`);
      } catch (_) {}

      if (syncExplorer && idx >= 1 && idx <= 12) {
        const firstHs = (idx - 1) * 12 + 1;
        this.update144Explorer(firstHs);
      }
    }


    renderArticle({ manifest, articles }, slug, query) {
      const articleIndex = articles.findIndex(item => item.id === slug);
      const article = articleIndex !== -1 ? articles[articleIndex] : articles[0];
      const prevArticle = articleIndex > 0 ? articles[articleIndex - 1] : null;
      const nextArticle = articleIndex < articles.length - 1 ? articles[articleIndex + 1] : null;
      this.currentArticle = article;

      document.title = `${article.title} — Cẩm Nang Thực Chiến Dương Trạch`;

      const isThuyKhauBatch = article.id === 'batch-21';
      const isBatch04 = article.id === 'batch-04';

      let active144Idx = 0;
      if (isThuyKhauBatch) {
        const qNhom = query.get('nhom');
        const qMuc = query.get('muc');
        const qHs = query.get('hs');
        if (qNhom !== null && !isNaN(parseInt(qNhom, 10))) {
          active144Idx = parseInt(qNhom, 10);
        } else if (qMuc) {
          const foundIdx = article.entries.findIndex(e => e.id === qMuc);
          if (foundIdx !== -1) active144Idx = foundIdx;
        } else if (qHs && !isNaN(parseInt(qHs, 10))) {
          const hsNum = parseInt(qHs, 10);
          active144Idx = Math.floor((hsNum - 1) / 12) + 1;
        }
        if (active144Idx < 0 || active144Idx >= article.entries.length) {
          active144Idx = 0;
        }
        this.active144LessonIdx = active144Idx;
      }

      const entries = isThuyKhauBatch
        ? this.render144LessonSection(article, active144Idx)
        : (article.entries.length
            ? article.entries.map(entry => this.renderEntry(entry, article)).join('')
            : `<div class="dt-empty" style="background:#181B22; border-left:3px solid #C5B382; color:#EDE8DE; padding:1rem;"><strong>Hồ sơ tiêu chuẩn an toàn & kiểm soát thực địa.</strong><br>Chủ đề này tập trung vào các tiêu chuẩn an toàn bắt buộc: kết cấu, chống ngập lụt, an toàn cháy nổ và pháp lý xây dựng hiện đại cần kiểm tra trước khi bố trí phong thủy.</div>`);
      
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



      let specialHeaderBanner = '';
      if (isBatch04) {
        specialHeaderBanner = `
          <div style="background:linear-gradient(135deg, #1E1B18 0%, #121722 100%); border:1px solid #C5B382; border-radius:12px; padding:1.2rem 1.4rem; margin-bottom:1.8rem; box-shadow:0 8px 24px rgba(0,0,0,0.35);">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
              <div>
                <div style="display:inline-block; padding:0.2rem 0.5rem; background:rgba(197,179,130,0.18); border:1px solid rgba(197,179,130,0.35); border-radius:6px; font-size:0.75rem; font-weight:700; color:#F5D485; margin-bottom:0.4rem;">
                  ĐẠI CHUYÊN KHẢO CHÁNH TÔNG
                </div>
                <h3 style="margin:0 0 0.3rem 0; font-size:1.15rem; color:#FEF3C7; font-weight:700;">
                  Toàn Thư 144 Thủy Khẩu Đã Được Tách Thành Chương 21 Riêng Biệt
                </h3>
                <p style="margin:0; font-size:0.85rem; color:#CBD5E1; line-height:1.5; max-width:760px;">
                  Khảo chứng 144 cửa nước theo 《Địa Lý Ngũ Quyết》 Quyển 7 (1880) đối chiếu 《Bình Sa Ngọc Xích Kinh》. Đầy đủ 144 hồ sơ A–G và Bộ Tra Cứu Điện Tử Tương Tác tại Chương 21.
                </p>
              </div>
              <a href="${ROUTE_ROOT}/bai/batch-21" style="display:inline-flex; align-items:center; gap:0.5rem; padding:0.6rem 1.1rem; background:#C5B382; color:#0B0F17; text-decoration:none; font-weight:700; font-size:0.86rem; border-radius:8px; box-shadow:0 4px 12px rgba(197,179,130,0.25); white-space:nowrap;">
                👉 Mở Toàn Thư Chương 21
              </a>
            </div>
          </div>
        `;
      }

      const hsQuery = query.get('hs');
      const initialHs = hsQuery ? (parseInt(hsQuery, 10) || 1) : (isThuyKhauBatch && active144Idx >= 1 ? (active144Idx - 1) * 12 + 1 : 1);
      const explorerMount = isThuyKhauBatch ? `<div id="dt-144-explorer-mount">${this.render144MatrixWidget(initialHs)}</div>` : '';

      const content = `<div class="dt-reader-layout">
        ${this.topicNav(manifest.topics, article.id)}
        <main>
          <header class="dt-page-header">
            <div class="dt-eyebrow">Chương ${escapeHtml(article.batch)} / ${manifest.topics.length} · ${article.entries.length ? `${article.entries.length} bài học thực chiến` : 'Tiêu chuẩn an toàn'}</div>
            <h1 class="dt-page-title">${escapeHtml(article.title)}</h1>
            <p class="dt-page-lead">${escapeHtml(article.description)}</p>
          </header>
          ${specialHeaderBanner}
          ${explorerMount}
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
