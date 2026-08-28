/**
 * HUYỀN HỌC MỤ — SCHOLARLY READER ENGINE (FULL CONTENT & ZERO EMOJI)
 * Hiển thị đầy đủ 100% nội dung văn bản cho toàn bộ 6 đại giáo trình
 * Thiết kế tinh chuẩn: Giảm độ dày tiêu đề 50%, phân trang Tiết 1-10 tinh tế, 0% emoji.
 */

class ScholarlyReader {
  constructor() {
    this.currentTrack = 'nen-tang';
    this.currentLessonIndex = 1;

    this.tracks = {
      'nen-tang': {
        id: 'nen-tang',
        vol: 'TẬP I',
        title: 'Bản Thể Luận & Ngũ Hành',
        badge: '6 Tiết Bản Thể',
        school: 'CỔ ĐIỂN DỊCH HỌC',
        theme: '#FBBF24',
        desc: 'Vô Cực, Thái Cực, Lưỡng Nghi, Tứ Tượng, Bát Quái, Ngũ Hành tương sinh tương khắc và Hà Đồ Lạc Thư.',
        prereq: 'Khởi đầu môn học',
        prereqLink: '#/learn/nen-tang/1',
        conceptTags: ['CPT-001', 'Thái Cực', 'Âm Dương', 'Ngũ Hành', 'Hà Đồ', 'Lạc Thư'],
        parts: [
          typeof AMDUONG_NGUHANH_PART_1 !== 'undefined' ? AMDUONG_NGUHANH_PART_1 : null,
          typeof AMDUONG_NGUHANH_PART_2 !== 'undefined' ? AMDUONG_NGUHANH_PART_2 : null,
          typeof AMDUONG_NGUHANH_PART_3 !== 'undefined' ? AMDUONG_NGUHANH_PART_3 : null,
          typeof AMDUONG_NGUHANH_PART_4 !== 'undefined' ? AMDUONG_NGUHANH_PART_4 : null,
          typeof AMDUONG_NGUHANH_PART_5 !== 'undefined' ? AMDUONG_NGUHANH_PART_5 : null,
          typeof AMDUONG_NGUHANH_PART_6 !== 'undefined' ? AMDUONG_NGUHANH_PART_6 : null
        ]
      },
      'loan-dau': {
        id: 'loan-dau',
        vol: 'TẬP II',
        title: 'Địa Lý Loan Đầu Hình Thế',
        badge: '10 Tiết Loan Đầu',
        school: 'HÌNH THẾ PHÁI',
        theme: '#D97706',
        desc: 'Táng Thư Quách Phác: Khí thừa phong tắc tán, giới thủy tắc chỉ. Thấu triệt Long, Huyệt, Sa, Thủy.',
        prereq: 'Bản Thể Luận (Tiết 1-4)',
        prereqLink: '#/learn/nen-tang/1',
        conceptTags: ['CPT-013', 'Long Mạch', 'Tàng Phong Tụ Khí', 'Tả Long Hữu Hổ'],
        parts: [
          typeof LOANDAU_FENGSHUI_PART_1 !== 'undefined' ? LOANDAU_FENGSHUI_PART_1 : null,
          typeof LOANDAU_FENGSHUI_PART_2 !== 'undefined' ? LOANDAU_FENGSHUI_PART_2 : null,
          typeof LOANDAU_FENGSHUI_PART_3 !== 'undefined' ? LOANDAU_FENGSHUI_PART_3 : null,
          typeof LOANDAU_FENGSHUI_PART_4 !== 'undefined' ? LOANDAU_FENGSHUI_PART_4 : null,
          typeof LOANDAU_FENGSHUI_PART_5 !== 'undefined' ? LOANDAU_FENGSHUI_PART_5 : null,
          typeof LOANDAU_FENGSHUI_PART_6 !== 'undefined' ? LOANDAU_FENGSHUI_PART_6 : null,
          typeof LOANDAU_FENGSHUI_PART_7 !== 'undefined' ? LOANDAU_FENGSHUI_PART_7 : null,
          typeof LOANDAU_FENGSHUI_PART_8 !== 'undefined' ? LOANDAU_FENGSHUI_PART_8 : null,
          typeof LOANDAU_FENGSHUI_PART_9 !== 'undefined' ? LOANDAU_FENGSHUI_PART_9 : null,
          typeof LOANDAU_FENGSHUI_PART_10 !== 'undefined' ? LOANDAU_FENGSHUI_PART_10 : null
        ]
      },
      'bat-trach': {
        id: 'bat-trach',
        vol: 'TẬP III',
        title: 'Bát Trạch Minh Kính Lý Khí',
        badge: '10 Tiết Bát Trạch',
        school: 'BÁT TRẠCH PHÁI',
        theme: '#60A5FA',
        desc: 'Cung Phi Mệnh Quái, Đông Tây Tứ Trạch, 8 Du Niên Cát Hung và Quái Biến Hào.',
        prereq: 'Bản Thể Luận (Tiết 5 & 6)',
        prereqLink: '#/learn/nen-tang/5',
        conceptTags: ['CPT-014', 'Cung Phi Mệnh Quái', '8 Du Niên', 'Đông Tây Tứ Mệnh'],
        parts: [
          typeof BATTRACH_FENGSHUI_PART_1 !== 'undefined' ? BATTRACH_FENGSHUI_PART_1 : null,
          typeof BATTRACH_FENGSHUI_PART_2 !== 'undefined' ? BATTRACH_FENGSHUI_PART_2 : null,
          typeof BATTRACH_FENGSHUI_PART_3 !== 'undefined' ? BATTRACH_FENGSHUI_PART_3 : null,
          typeof BATTRACH_FENGSHUI_PART_4 !== 'undefined' ? BATTRACH_FENGSHUI_PART_4 : null,
          typeof BATTRACH_FENGSHUI_PART_5 !== 'undefined' ? BATTRACH_FENGSHUI_PART_5 : null,
          typeof BATTRACH_FENGSHUI_PART_6 !== 'undefined' ? BATTRACH_FENGSHUI_PART_6 : null,
          typeof BATTRACH_FENGSHUI_PART_7 !== 'undefined' ? BATTRACH_FENGSHUI_PART_7 : null,
          typeof BATTRACH_FENGSHUI_PART_8 !== 'undefined' ? BATTRACH_FENGSHUI_PART_8 : null,
          typeof BATTRACH_FENGSHUI_PART_9 !== 'undefined' ? BATTRACH_FENGSHUI_PART_9 : null,
          typeof BATTRACH_FENGSHUI_PART_10 !== 'undefined' ? BATTRACH_FENGSHUI_PART_10 : null
        ]
      },
      'tam-hop': {
        id: 'tam-hop',
        vol: 'TẬP IV',
        title: 'Tam Hợp Phái Thủy Pháp',
        badge: '10 Tiết Tam Hợp',
        school: 'TAM HỢP PHÁI',
        theme: '#34D399',
        desc: 'La Kinh Thấu Giải: 12 Cung Trường Sinh, Tứ Đại Cục Thủy Pháp và Hoàng Tuyền Sát Quyết.',
        prereq: 'Bản Thể Luận (Tiết 4 & 6)',
        prereqLink: '#/learn/nen-tang/4',
        conceptTags: ['CPT-015', '12 Cung Trường Sinh', 'Tứ Đại Cục', 'Hoàng Tuyền Sát'],
        parts: [
          typeof TAMHOP_FENGSHUI_PART_1 !== 'undefined' ? TAMHOP_FENGSHUI_PART_1 : null,
          typeof TAMHOP_FENGSHUI_PART_2 !== 'undefined' ? TAMHOP_FENGSHUI_PART_2 : null,
          typeof TAMHOP_FENGSHUI_PART_3 !== 'undefined' ? TAMHOP_FENGSHUI_PART_3 : null,
          typeof TAMHOP_FENGSHUI_PART_4 !== 'undefined' ? TAMHOP_FENGSHUI_PART_4 : null,
          typeof TAMHOP_FENGSHUI_PART_5 !== 'undefined' ? TAMHOP_FENGSHUI_PART_5 : null,
          typeof TAMHOP_FENGSHUI_PART_6 !== 'undefined' ? TAMHOP_FENGSHUI_PART_6 : null,
          typeof TAMHOP_FENGSHUI_PART_7 !== 'undefined' ? TAMHOP_FENGSHUI_PART_7 : null,
          typeof TAMHOP_FENGSHUI_PART_8 !== 'undefined' ? TAMHOP_FENGSHUI_PART_8 : null,
          typeof TAMHOP_FENGSHUI_PART_9 !== 'undefined' ? TAMHOP_FENGSHUI_PART_9 : null,
          typeof TAMHOP_FENGSHUI_PART_10 !== 'undefined' ? TAMHOP_FENGSHUI_PART_10 : null
        ]
      },
      'huyen-khong': {
        id: 'huyen-khong',
        vol: 'TẬP V',
        title: 'Huyền Không Phi Tinh Cửu Cung',
        badge: '10 Tiết Huyền Không',
        school: 'HUYỀN KHÔNG PHÁI',
        theme: '#C084FC',
        desc: 'Tam Nguyên Cửu Vận, Tinh Bàn 24 Sơn Hướng, phi tinh Cửu Cung và Tử Bạch Quyết Vận 9.',
        prereq: 'Bản Thể Luận (Tiết 6)',
        prereqLink: '#/learn/nen-tang/6',
        conceptTags: ['CPT-016', 'Tam Nguyên Cửu Vận', 'Tinh Bàn 24 Sơn', 'Cửu Tinh Đắc Thời'],
        parts: [
          typeof HUYENKHONG_FENGSHUI_PART_1 !== 'undefined' ? HUYENKHONG_FENGSHUI_PART_1 : null,
          typeof HUYENKHONG_FENGSHUI_PART_2 !== 'undefined' ? HUYENKHONG_FENGSHUI_PART_2 : null,
          typeof HUYENKHONG_FENGSHUI_PART_3 !== 'undefined' ? HUYENKHONG_FENGSHUI_PART_3 : null,
          typeof HUYENKHONG_FENGSHUI_PART_4 !== 'undefined' ? HUYENKHONG_FENGSHUI_PART_4 : null,
          typeof HUYENKHONG_FENGSHUI_PART_5 !== 'undefined' ? HUYENKHONG_FENGSHUI_PART_5 : null,
          typeof HUYENKHONG_FENGSHUI_PART_6 !== 'undefined' ? HUYENKHONG_FENGSHUI_PART_6 : null,
          typeof HUYENKHONG_FENGSHUI_PART_7 !== 'undefined' ? HUYENKHONG_FENGSHUI_PART_7 : null,
          typeof HUYENKHONG_FENGSHUI_PART_8 !== 'undefined' ? HUYENKHONG_FENGSHUI_PART_8 : null,
          typeof HUYENKHONG_FENGSHUI_PART_9 !== 'undefined' ? HUYENKHONG_FENGSHUI_PART_9 : null,
          typeof HUYENKHONG_FENGSHUI_PART_10 !== 'undefined' ? HUYENKHONG_FENGSHUI_PART_10 : null
        ]
      },
      'tho-cung': {
        id: 'tho-cung',
        vol: 'TẬP VI',
        title: 'Phong Thủy Thờ Cúng Chánh Tông',
        badge: '10 Tiết Thờ Cúng',
        school: 'KHOA NGHI TẾ TỰ',
        theme: '#F59E0B',
        desc: 'Định vị Thần Vị gia trạch, Tọa Cát Hướng Cát, thước Lỗ Ban 38.8cm âm phần, bài trí ngũ hành.',
        prereq: 'Bản Thể Luận (Tiết 4 & 5)',
        prereqLink: '#/learn/nen-tang/4',
        conceptTags: ['Khoa Nghi Ban Thờ', 'Tọa Cát Hướng Cát', 'Thước Lỗ Ban 38.8cm', 'An Vị Bát Hương'],
        parts: [
          typeof WORSHIP_FENGSHUI_PART_1 !== 'undefined' ? WORSHIP_FENGSHUI_PART_1 : null,
          typeof WORSHIP_FENGSHUI_PART_2 !== 'undefined' ? WORSHIP_FENGSHUI_PART_2 : null,
          typeof WORSHIP_FENGSHUI_PART_3 !== 'undefined' ? WORSHIP_FENGSHUI_PART_3 : null,
          typeof WORSHIP_FENGSHUI_PART_4 !== 'undefined' ? WORSHIP_FENGSHUI_PART_4 : null,
          typeof WORSHIP_FENGSHUI_PART_5 !== 'undefined' ? WORSHIP_FENGSHUI_PART_5 : null,
          typeof WORSHIP_FENGSHUI_PART_6 !== 'undefined' ? WORSHIP_FENGSHUI_PART_6 : null,
          typeof WORSHIP_FENGSHUI_PART_7 !== 'undefined' ? WORSHIP_FENGSHUI_PART_7 : null,
          typeof WORSHIP_FENGSHUI_PART_8 !== 'undefined' ? WORSHIP_FENGSHUI_PART_8 : null,
          typeof WORSHIP_FENGSHUI_PART_9 !== 'undefined' ? WORSHIP_FENGSHUI_PART_9 : null,
          typeof WORSHIP_FENGSHUI_PART_10 !== 'undefined' ? WORSHIP_FENGSHUI_PART_10 : null
        ]
      }
    };

    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    const btnToc = document.getElementById('mobile-btn-toc');
    const btnGlossary = document.getElementById('mobile-btn-glossary');
    const sheetOverlay = document.getElementById('reader-sheet-overlay');
    const sheetClose = document.getElementById('reader-sheet-close');

    if (btnToc) {
      btnToc.addEventListener('click', () => this.openMobileToc());
    }
    if (btnGlossary) {
      btnGlossary.addEventListener('click', () => this.openMobileGlossary());
    }
    if (sheetOverlay) {
      sheetOverlay.addEventListener('click', (e) => {
        if (e.target === sheetOverlay) this.closeBottomSheet();
      });
    }
    if (sheetClose) {
      sheetClose.addEventListener('click', () => this.closeBottomSheet());
    }
  }

  // Dashboard Tổng quan Kệ Sách khi vào #/learn
  renderLearningDashboard() {
    const readerContainer = document.getElementById('shell-main-content');
    if (!readerContainer) return;

    this.renderLeftTree('', 0);

    const tracksHtml = Object.entries(this.tracks).map(([tKey, track]) => {
      const validParts = track.parts.filter(p => p !== null);
      const completedCount = validParts.filter((p, i) => this.isCompleted(tKey, i + 1)).length;
      const pct = Math.round((completedCount / validParts.length) * 100) || 0;

      return `
        <div class="learning-track-card" style="background:#121722; border:1px solid rgba(255,255,255,0.08); border-left:4px solid ${track.theme}; border-radius:10px; padding:1.2rem; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <span style="font-size:0.72rem; font-weight:700; color:${track.theme}; background:${track.theme}18; padding:0.2rem 0.5rem; border-radius:8px;">
                ${track.vol} • ${track.badge}
              </span>
              <span style="font-size:0.75rem; color:var(--text-muted);">
                ${completedCount}/${validParts.length} Tiết
              </span>
            </div>

            <h3 style="font-family:var(--font-title); font-size:1.15rem; font-weight:600; color:#FEF3C7; margin:0 0 0.4rem 0;">
              ${track.title}
            </h3>
            <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5; margin-bottom:0.8rem;">
              ${track.desc}
            </p>
          </div>

          <a href="#/learn/${tKey}/1" style="background:rgba(255,255,255,0.05); color:#FEF3C7; border:1px solid ${track.theme}44; text-decoration:none; padding:0.5rem 1rem; border-radius:6px; font-weight:600; font-size:0.85rem; text-align:center; display:block;">
            Mở Sách Đọc (Tiết 1)
          </a>
        </div>
      `;
    }).join('');

    readerContainer.innerHTML = `
      <div style="max-width:900px; margin:0 auto; padding:1rem 0;">
        <header style="border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:1rem; margin-bottom:1.5rem;">
          <span style="font-size:0.75rem; font-weight:700; color:#FBBF24; text-transform:uppercase; letter-spacing:0.08em;">
            TỦ SÁCH GIÁO TRÌNH SƯ PHẠM
          </span>
          <h1 style="font-family:var(--font-title); font-size:1.4rem; font-weight:600; color:#FEF3C7; margin:0.2rem 0 0.4rem 0;">
            Hệ Thống 6 Bộ Sách Chuyên Khảo
          </h1>
          <p style="color:var(--text-muted); font-size:0.88rem; line-height:1.5; margin:0;">
            Chọn một bộ sách dưới đây để mở mục lục và đọc từng tiết độc lập.
          </p>
        </header>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1.2rem;">
          ${tracksHtml}
        </div>
      </div>
    `;
  }

  // Nạp Tiết Học Cụ Thể
  loadLesson(trackId, lessonIndex) {
    if (!this.tracks[trackId]) {
      trackId = 'nen-tang';
    }

    this.currentTrack = trackId;
    this.currentLessonIndex = parseInt(lessonIndex, 10) || 1;

    const track = this.tracks[trackId];
    const lesson = track.parts[this.currentLessonIndex - 1];

    if (!lesson) {
      this.renderLearningDashboard();
      return;
    }

    this.renderLeftTree(trackId, this.currentLessonIndex);
    this.renderMainReader(track, lesson, this.currentLessonIndex);
    this.renderRightContext(track, lesson);
    this.saveProgress(trackId, this.currentLessonIndex);

    const readerPane = document.getElementById('shell-center-reader');
    if (readerPane) {
      readerPane.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  renderLeftTree(activeTrackId, activeLessonIndex) {
    const treeContainer = document.getElementById('reader-nav-tree');
    if (!treeContainer) return;

    treeContainer.innerHTML = Object.entries(this.tracks).map(([tKey, track]) => {
      const isTrackActive = tKey === activeTrackId;
      const validParts = track.parts.filter(p => p !== null);

      const itemsHtml = validParts.map((p, idx) => {
        const lNum = idx + 1;
        const isActive = isTrackActive && lNum === activeLessonIndex;
        let title = p.chapter_title ? p.chapter_title.replace(/^Tiết\s+[IVXLCDM]+:\s*/i, '') : `Tiết ${lNum}`;
        const isCompleted = this.isCompleted(tKey, lNum);

        return `
          <a href="#/learn/${tKey}/${lNum}" class="tree-item-link ${isActive ? 'active' : ''}" style="${isActive ? `color:${track.theme}; border-left-color:${track.theme}; font-weight:600;` : ''}">
            <span class="tree-item-status ${isCompleted ? 'completed' : ''}">${lNum}</span>
            <span class="tree-item-text">${title}</span>
          </a>
        `;
      }).join('');

      return `
        <div class="tree-track-group ${isTrackActive ? 'open' : ''}">
          <div class="tree-track-header" onclick="this.parentElement.classList.toggle('open')">
            <span class="tree-track-title" style="${isTrackActive ? `color:${track.theme}; font-weight:600;` : ''}">${track.vol}: ${track.title}</span>
            <span class="tree-track-count">${validParts.length} Tiết</span>
          </div>
          <div class="tree-track-list">
            ${itemsHtml}
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Toàn Bộ Nội Dung Đọc Chi Tiết & Tinh Tế
  renderMainReader(track, lesson, lessonIndex) {
    const readerContainer = document.getElementById('shell-main-content');
    if (!readerContainer) return;

    const totalLessons = track.parts.filter(p => p !== null).length;
    const prevIndex = lessonIndex > 1 ? lessonIndex - 1 : null;
    const nextIndex = lessonIndex < totalLessons ? lessonIndex + 1 : null;

    // 1. Render Kinh Điển Cổ Huấn (Canonical Texts hoặc Ontology Quote)
    let canonicalBlocksHtml = '';
    if (lesson.canonical_texts && lesson.canonical_texts.length > 0) {
      canonicalBlocksHtml = lesson.canonical_texts.map(ct => `
        <div class="reader-quote-card" style="border-left:3px solid ${track.theme}; background:rgba(255,255,255,0.02); padding:1rem 1.2rem; border-radius:0 8px 8px 0; margin-bottom:1.2rem;">
          <div class="reader-hanzi-text" style="font-family:'Ma Shan Zheng', var(--font-title); font-size:1.15rem; color:${track.theme}; letter-spacing:0.04em; margin-bottom:0.4rem; line-height:1.6;">
            ${ct.hanzi}
          </div>
          <div class="reader-pinyin-text" style="font-style:italic; color:#FEF3C7; font-size:0.88rem; margin-bottom:0.4rem;">
            "${ct.pinyin}"
          </div>
          <div class="reader-vietnamese-text" style="color:var(--text-pure); font-size:0.92rem; line-height:1.65; margin-bottom:0.4rem;">
            <strong>Dịch nghĩa:</strong> ${ct.meaning}
          </div>
          <div class="reader-source-text" style="text-align:right; font-size:0.8rem; color:${track.theme};">
            — ${ct.source}
          </div>
        </div>
      `).join('');
    } else if (lesson.ontology && lesson.ontology.quote) {
      canonicalBlocksHtml = `
        <div class="reader-quote-card" style="border-left:3px solid ${track.theme}; background:rgba(255,255,255,0.02); padding:1rem 1.2rem; border-radius:0 8px 8px 0; margin-bottom:1.2rem;">
          <div class="reader-vietnamese-text" style="font-style:italic; color:#FEF3C7; font-size:0.95rem; line-height:1.65; margin-bottom:0.4rem;">
            "${lesson.ontology.quote}"
          </div>
          <div class="reader-source-text" style="text-align:right; font-size:0.8rem; color:${track.theme};">
            — Xuất xứ: ${lesson.ontology.quote_source || 'Thư Tịch Cổ Điển'}
          </div>
        </div>
      `;
    }

    // 2. Render Bản Thể Luận & Nguyên Lý (Ontology Principles)
    let ontologyHtml = '';
    if (lesson.ontology && Array.isArray(lesson.ontology.principles)) {
      ontologyHtml = `
        <div style="margin-bottom:1.8rem;">
          <h3 style="font-size:1rem; font-weight:600; color:#FEF3C7; margin-bottom:0.6rem;">${lesson.ontology.title || 'Nguyên Lý Bản Thể Luận'}</h3>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.8rem;">
            ${lesson.ontology.principles.map(p => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:0.9rem; border-radius:8px;">
                <strong style="color:${track.theme}; font-size:0.88rem; display:block; margin-bottom:0.25rem;">• ${p.name}:</strong>
                <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.55; margin:0;">${p.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 3. Render Quy Tắc Phương Vị / Tọa Hướng (Orientation Rules)
    let orientationHtml = '';
    if (lesson.orientation_rules) {
      const or = lesson.orientation_rules;
      orientationHtml = `
        <div style="margin-bottom:1.8rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1.2rem;">
          <h3 style="font-size:1rem; font-weight:600; color:#FEF3C7; margin-bottom:0.5rem;">${or.title || 'Quy Tắc Định Hướng'}</h3>
          ${or.comparison_with_kitchen ? `
            <div style="background:rgba(245,158,11,0.06); border-left:3px solid ${track.theme}; padding:0.7rem 1rem; border-radius:0 6px 6px 0; font-size:0.86rem; color:#FEF3C7; line-height:1.55; margin-bottom:0.8rem;">
              <strong>Phân biệt cốt tử:</strong> ${or.comparison_with_kitchen}
            </div>
          ` : ''}
          ${Array.isArray(or.palace_requirements) ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.8rem;">
              ${or.palace_requirements.map(req => `
                <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:0.8rem; border-radius:6px;">
                  <strong style="color:${track.theme}; font-size:0.86rem; display:block; margin-bottom:0.2rem;">${req.palace}:</strong>
                  <p style="font-size:0.84rem; color:var(--text-muted); line-height:1.5; margin:0;">${req.requirement}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      `;
    }

    // 4. Render Loan Đầu & Hình Thế Cấm Kỵ (Loan Dau Rules)
    let loanDauRulesHtml = '';
    if (lesson.loan_dau_rules && Array.isArray(lesson.loan_dau_rules.rules)) {
      loanDauRulesHtml = `
        <div style="margin-bottom:1.8rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1.2rem;">
          <h3 style="font-size:1rem; font-weight:600; color:#FEF3C7; margin-bottom:0.6rem;">${lesson.loan_dau_rules.title || 'Quy Tắc Hình Thế Loan Đầu'}</h3>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.8rem;">
            ${lesson.loan_dau_rules.rules.map(r => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:0.9rem; border-radius:8px;">
                <h4 style="font-size:0.88rem; color:${track.theme}; margin:0 0 0.3rem 0;">${r.aspect}</h4>
                <div style="font-size:0.84rem; color:var(--text-pure); margin-bottom:0.4rem;"><strong>Tiêu chuẩn:</strong> ${r.standard}</div>
                <div style="background:rgba(239,68,68,0.08); border-left:2px solid #EF4444; padding:0.5rem 0.7rem; border-radius:0 4px 4px 0; font-size:0.8rem; color:#FCA5A5; line-height:1.45;">
                  ${r.prohibitions}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 5. Render Ma Trận 8 Quái (Bát Trạch Matrix)
    let matrixHtml = '';
    if (Array.isArray(lesson.battrach_worship_matrix)) {
      matrixHtml = `
        <div style="margin-bottom:1.8rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1.2rem;">
          <h3 style="font-size:1rem; font-weight:600; color:#FEF3C7; margin-bottom:0.6rem;">Bảng Tra Phương Vị Tọa Cát Hướng Cát Theo 8 Mệnh Quái</h3>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:0.6rem;">
            ${lesson.battrach_worship_matrix.map(m => `
              <div style="background:rgba(18,24,38,0.7); border:1px solid rgba(255,255,255,0.06); padding:0.7rem 0.9rem; border-radius:6px;">
                <div style="color:${track.theme}; font-weight:600; font-size:0.86rem; margin-bottom:0.2rem;">Quẻ ${m.gua}</div>
                <div style="font-size:0.82rem; color:var(--text-pure); margin-bottom:0.2rem;"><strong>Tọa vị:</strong> ${m.best_pos}</div>
                <div style="font-size:0.76rem; color:var(--text-muted);">${m.note}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 6. Render Thước Lỗ Ban & Kích Thước Bàn Thờ (Part 2 Worship)
    let luBanHtml = '';
    if (lesson.ruler_classification) {
      luBanHtml = `
        <div style="margin-bottom:1.8rem;">
          <h3 style="font-size:1rem; font-weight:600; color:#FEF3C7; margin-bottom:0.5rem;">${lesson.ruler_classification.title}</h3>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
            ${lesson.ruler_classification.rulers.map(r => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:0.8rem; border-radius:6px;">
                <strong style="color:${track.theme}; font-size:0.88rem; display:block; margin-bottom:0.2rem;">${r.name}</strong>
                <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.5; margin:0;">${r.use_case}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 7. Render Cẩm Nang Ứng Dụng Vật Lý (Real Estate Applications)
    let applicationsHtml = '';
    if (lesson.real_estate_applications && lesson.real_estate_applications.length > 0) {
      applicationsHtml = `
        <section class="reader-section-block" style="margin-bottom:2rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1.5rem;">
          <h2 style="font-size:1.05rem; font-weight:600; color:${track.theme}; margin-bottom:0.8rem;">
            Ứng Dụng Vật Lý Địa Hình Thực Chiến
          </h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.8rem;">
            ${lesson.real_estate_applications.map(app => `
              <div style="background:rgba(18,24,38,0.7); border:1px solid rgba(255,255,255,0.06); border-radius:8px; padding:0.9rem;">
                <div style="font-weight:600; color:${track.theme}; font-size:0.88rem; margin-bottom:0.3rem;">
                  ${app.tier || app.category || 'Hạng mục'}
                </div>
                <div style="font-size:0.84rem; color:var(--text-pure); line-height:1.55;">
                  ${app.action_guide}
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      `;
    }

    // 8. Render Quy Trình Khảo Sát & Án Nghiệm Hiện Trường
    let checklistAndCasesHtml = '';
    if ((lesson.actionable_checklist && lesson.actionable_checklist.length > 0) || (lesson.vietnam_case_studies && lesson.vietnam_case_studies.length > 0)) {
      checklistAndCasesHtml = `
        <section class="reader-section-block" style="margin-bottom:2rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1.5rem;">
          <h2 style="font-size:1.05rem; font-weight:600; color:${track.theme}; margin-bottom:0.8rem;">
            Quy Trình Đo Đạc & Án Nghiệm Thực Tế
          </h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
            ${lesson.actionable_checklist ? `
              <div style="background:rgba(18,24,38,0.5); padding:1rem; border-radius:8px; border:1px solid rgba(255,255,255,0.06);">
                <h3 style="font-size:0.9rem; color:#FEF3C7; font-weight:600; margin-bottom:0.6rem;">Quy Trình Hiện Trường</h3>
                <ul style="list-style:none; padding:0; margin:0;">
                  ${lesson.actionable_checklist.map(step => `
                    <li style="margin-bottom:0.5rem; font-size:0.85rem; color:var(--text-pure); line-height:1.5; display:flex; gap:0.4rem;">
                      <span style="color:${track.theme}; font-weight:700;">•</span>
                      <span>${step}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            ` : ''}
            ${lesson.vietnam_case_studies ? `
              <div style="background:rgba(18,24,38,0.5); padding:1rem; border-radius:8px; border:1px solid rgba(255,255,255,0.06);">
                <h3 style="font-size:0.9rem; color:#FEF3C7; font-weight:600; margin-bottom:0.6rem;">Án Nghiệm Thực Tế</h3>
                ${lesson.vietnam_case_studies.map(cs => `
                  <div style="border-left:2px solid ${track.theme}; padding-left:0.6rem; margin-bottom:0.6rem;">
                    <div style="font-weight:600; color:#FEF3C7; font-size:0.85rem;">${cs.case_title || cs.location || 'Hiện trường'}</div>
                    <div style="font-size:0.8rem; color:var(--text-muted); line-height:1.4;">${cs.diagnosis || cs.analysis || ''}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </section>
      `;
    }

    // 9. Generate Compact Pagination Pills (Tiết 1, Tiết 2... Tiết N)
    const pillsHtml = Array.from({ length: totalLessons }, (_, i) => {
      const pNum = i + 1;
      const isActive = pNum === lessonIndex;
      return `
        <a href="#/learn/${this.currentTrack}/${pNum}" class="pag-pill ${isActive ? 'active' : ''}" style="${isActive ? `background:${track.theme}; color:#0B0E14; font-weight:700; border-color:${track.theme};` : ''}">
          Tiết ${pNum}
        </a>
      `;
    }).join('');

    readerContainer.innerHTML = `
      <article class="reader-article-body" style="max-width:860px; margin:0 auto;">
        <!-- Breadcrumb Navigation -->
        <nav class="reader-breadcrumb" style="margin-bottom:1rem; font-size:0.82rem; color:var(--text-muted); display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap;">
          <a href="#/" style="color:var(--text-muted); text-decoration:none;">Sảnh Thư Viện</a>
          <span>/</span>
          <a href="#/learn" style="color:var(--text-muted); text-decoration:none;">Giáo Trình</a>
          <span>/</span>
          <a href="#/learn/${this.currentTrack}/1" style="color:${track.theme}; text-decoration:none;">${track.vol}: ${track.title}</a>
          <span>/</span>
          <span style="color:var(--text-pure); font-weight:600;">Tiết ${lessonIndex}</span>
        </nav>

        <!-- Article Title & Meta Header -->
        <header class="reader-article-header" style="border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:1.2rem; margin-bottom:1.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:0.8rem; flex-wrap:wrap; margin-bottom:0.5rem;">
            <span class="reader-tag-badge" style="background:rgba(255,255,255,0.05); color:${track.theme}; border:1px solid ${track.theme}44; font-size:0.72rem; font-weight:700; padding:0.2rem 0.6rem; border-radius:6px; text-transform:uppercase; letter-spacing:0.04em;">
              ${track.vol} • TIẾT ${lessonIndex} / ${totalLessons}
            </span>
            <div style="font-size:0.78rem; color:var(--text-muted);">
              Chuyên Khảo Học Thuật
            </div>
          </div>

          <h1 class="reader-main-title" style="font-family:var(--font-title); font-size:1.35rem; font-weight:600; color:#FEF3C7; line-height:1.4; margin:0.3rem 0 0.5rem 0;">
            ${lesson.chapter_title}
          </h1>
          <p class="reader-subtitle" style="font-size:0.92rem; color:var(--text-muted); line-height:1.55; margin:0;">
            ${lesson.sub_title}
          </p>
        </header>

        <!-- Content Blocks -->
        ${canonicalBlocksHtml ? `
          <section class="reader-section-block" style="margin-bottom:1.8rem;">
            <h2 style="font-size:1.05rem; font-weight:600; color:${track.theme}; margin-bottom:0.8rem;">
              Kinh Điển Cổ Huấn & Nguyên Tác
            </h2>
            ${canonicalBlocksHtml}
          </section>
        ` : ''}

        ${ontologyHtml}
        ${orientationHtml}
        ${loanDauRulesHtml}
        ${matrixHtml}
        ${luBanHtml}
        ${applicationsHtml}
        ${checklistAndCasesHtml}

        <!-- SLEEK COMPACT PAGINATION (KHÔNG CÒN VĂN BẢN DÀI DÒNG) -->
        <footer class="reader-article-footer" style="border-top:1px solid rgba(255,255,255,0.08); padding-top:1.5rem; margin-top:2rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem;">
            ${prevIndex ? `
              <a href="#/learn/${this.currentTrack}/${prevIndex}" class="reader-nav-btn" style="background:rgba(255,255,255,0.04); color:var(--text-pure); border:1px solid rgba(255,255,255,0.1); padding:0.45rem 0.9rem; border-radius:6px; text-decoration:none; font-size:0.84rem; font-weight:600;">
                ← Tiết Trước
              </a>
            ` : `<div style="width:80px;"></div>`}

            <div class="pag-pills-container" style="display:flex; gap:0.3rem; flex-wrap:wrap; justify-content:center;">
              ${pillsHtml}
            </div>

            ${nextIndex ? `
              <a href="#/learn/${this.currentTrack}/${nextIndex}" class="reader-nav-btn" style="background:${track.theme}; color:#0B0E14; padding:0.45rem 0.9rem; border-radius:6px; text-decoration:none; font-size:0.84rem; font-weight:700;">
                Tiết Tiếp →
              </a>
            ` : `
              <a href="#/learn" class="reader-nav-btn" style="background:rgba(255,255,255,0.08); color:#FEF3C7; padding:0.45rem 0.9rem; border-radius:6px; text-decoration:none; font-size:0.84rem; font-weight:600;">
                Hết Tập →
              </a>
            `}
          </div>
        </footer>
      </article>
    `;
  }

  renderRightContext(track, lesson) {
    const contextContainer = document.getElementById('shell-right-context');
    if (!contextContainer) return;

    let terms = lesson.scholarly_analysis?.term_glossary || [];
    let masters = lesson.scholarly_analysis?.masters_views || [];

    // Fallback nếu bài học không có scholarly_analysis riêng
    if (terms.length === 0 && lesson.ontology?.principles) {
      terms = lesson.ontology.principles.map(p => ({ term: p.name, definition: p.desc }));
    }
    if (masters.length === 0 && lesson.ontology?.quote_source) {
      masters = [{ master: 'Kinh Thư Cổ Điển', work: lesson.ontology.quote_source, perspective: lesson.ontology.quote || 'Căn bản thờ tự' }];
    }

    const glossaryHtml = terms.map(g => `
      <div class="context-term-item" style="margin-bottom:0.8rem; border-bottom:1px solid rgba(255,255,255,0.04); padding-bottom:0.6rem;">
        <strong style="color:${track.theme}; font-size:0.86rem; display:block; margin-bottom:0.15rem;">${g.term}</strong>
        <p style="font-size:0.8rem; color:var(--text-muted); line-height:1.45; margin:0;">${g.definition || g.plain_vn || ''}</p>
      </div>
    `).join('');

    const mastersHtml = masters.map(mv => `
      <div class="context-master-item" style="background:rgba(255,255,255,0.02); border-left:2px solid ${track.theme}; padding:0.5rem 0.7rem; border-radius:0 4px 4px 0; margin-bottom:0.5rem; font-size:0.8rem;">
        <strong style="color:#FEF3C7;">${mv.master}</strong> (${mv.work}): <span style="color:var(--text-muted);">${mv.perspective}</span>
      </div>
    `).join('');

    contextContainer.innerHTML = `
      <div class="context-panel-content" style="padding:1rem 0.9rem;">
        <h3 style="font-size:0.85rem; color:${track.theme}; font-weight:700; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:0.8rem;">
          Thuật Ngữ Trong Tiết
        </h3>
        <div class="context-terms-list" style="margin-bottom:1.5rem;">
          ${glossaryHtml || '<div style="font-size:0.8rem; color:var(--text-muted);">Không có thuật ngữ riêng.</div>'}
        </div>

        <h3 style="font-size:0.85rem; color:${track.theme}; font-weight:700; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:0.8rem;">
          Dẫn Chiếu Cổ Điển
        </h3>
        <div class="context-masters-list">
          ${mastersHtml || '<div style="font-size:0.8rem; color:var(--text-muted);">Không có dẫn chiếu bổ sung.</div>'}
        </div>
      </div>
    `;
  }

  openMobileToc() {
    const track = this.tracks[this.currentTrack];
    if (!track) return;

    const listHtml = track.parts.filter(p => p !== null).map((p, idx) => {
      const lNum = idx + 1;
      const isActive = lNum === this.currentLessonIndex;
      const title = p.chapter_title ? p.chapter_title.replace(/^Tiết\s+[IVXLCDM]+:\s*/i, '') : `Tiết ${lNum}`;

      return `
        <a href="#/learn/${this.currentTrack}/${lNum}" onclick="window.scholarlyReader.closeBottomSheet()" class="sheet-toc-link ${isActive ? 'active' : ''}" style="display:block; padding:0.7rem 0.9rem; border-bottom:1px solid rgba(255,255,255,0.06); text-decoration:none; color:${isActive ? track.theme : 'var(--text-pure)'}; font-weight:${isActive ? '700' : '400'}; font-size:0.88rem;">
          <span style="display:inline-block; width:22px; height:22px; border-radius:50%; background:rgba(255,255,255,0.08); text-align:center; line-height:22px; font-size:0.75rem; margin-right:0.4rem;">${lNum}</span>
          ${title}
        </a>
      `;
    }).join('');

    this.showBottomSheet(`Mục Lục: ${track.vol} — ${track.title}`, listHtml);
  }

  openMobileGlossary() {
    const track = this.tracks[this.currentTrack];
    const lesson = track?.parts[this.currentLessonIndex - 1];
    if (!lesson) return;

    let terms = lesson.scholarly_analysis?.term_glossary || [];
    if (terms.length === 0 && lesson.ontology?.principles) {
      terms = lesson.ontology.principles.map(p => ({ term: p.name, definition: p.desc }));
    }

    const listHtml = terms.map(g => `
      <div style="border-bottom:1px solid rgba(255,255,255,0.06); padding:0.6rem 0;">
        <div style="font-weight:600; color:${track.theme}; margin-bottom:0.15rem; font-size:0.88rem;">${g.term}</div>
        <div style="font-size:0.82rem; color:var(--text-muted); line-height:1.45;">${g.definition || g.plain_vn || ''}</div>
      </div>
    `).join('') || '<div style="color:var(--text-muted); font-size:0.85rem;">Không có chú giải riêng trong bài này.</div>';

    this.showBottomSheet(`Chú Giải Thuật Ngữ`, listHtml);
  }

  showBottomSheet(title, bodyHtml) {
    const overlay = document.getElementById('reader-sheet-overlay');
    const titleEl = document.getElementById('reader-sheet-title');
    const bodyEl = document.getElementById('reader-sheet-body');

    if (overlay && titleEl && bodyEl) {
      titleEl.innerText = title;
      bodyEl.innerHTML = bodyHtml;
      overlay.classList.add('active');
    }
  }

  closeBottomSheet() {
    const overlay = document.getElementById('reader-sheet-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  }

  saveProgress(trackId, lessonIndex) {
    try {
      localStorage.setItem(`progress_${trackId}_${lessonIndex}`, 'completed');
    } catch (e) {}
  }

  isCompleted(trackId, lessonIndex) {
    try {
      return localStorage.getItem(`progress_${trackId}_${lessonIndex}`) === 'completed';
    } catch (e) {
      return false;
    }
  }
}

// Khởi tạo Reader toàn cục
window.scholarlyReader = new ScholarlyReader();

// Cầu nối cho Router
window.loadLearningTrack = function(trackId, lessonIndex) {
  if (!trackId || trackId === 'learn') {
    window.scholarlyReader.renderLearningDashboard();
  } else {
    window.scholarlyReader.loadLesson(trackId, lessonIndex);
  }
};
