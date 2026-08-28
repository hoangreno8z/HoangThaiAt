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
        badge: '10 Tiết Bản Thể',
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
          typeof AMDUONG_NGUHANH_PART_6 !== 'undefined' ? AMDUONG_NGUHANH_PART_6 : null,
          typeof AMDUONG_NGUHANH_PART_7 !== 'undefined' ? AMDUONG_NGUHANH_PART_7 : null,
          typeof AMDUONG_NGUHANH_PART_8 !== 'undefined' ? AMDUONG_NGUHANH_PART_8 : null,
          typeof AMDUONG_NGUHANH_PART_9 !== 'undefined' ? AMDUONG_NGUHANH_PART_9 : null,
          typeof AMDUONG_NGUHANH_PART_10 !== 'undefined' ? AMDUONG_NGUHANH_PART_10 : null
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
          typeof LOANDAU_PART_1 !== 'undefined' ? LOANDAU_PART_1 : (typeof LOANDAU_FENGSHUI_PART_1 !== 'undefined' ? LOANDAU_FENGSHUI_PART_1 : null),
          typeof LOANDAU_PART_2 !== 'undefined' ? LOANDAU_PART_2 : (typeof LOANDAU_FENGSHUI_PART_2 !== 'undefined' ? LOANDAU_FENGSHUI_PART_2 : null),
          typeof LOANDAU_PART_3 !== 'undefined' ? LOANDAU_PART_3 : (typeof LOANDAU_FENGSHUI_PART_3 !== 'undefined' ? LOANDAU_FENGSHUI_PART_3 : null),
          typeof LOANDAU_PART_4 !== 'undefined' ? LOANDAU_PART_4 : (typeof LOANDAU_FENGSHUI_PART_4 !== 'undefined' ? LOANDAU_FENGSHUI_PART_4 : null),
          typeof LOANDAU_PART_5 !== 'undefined' ? LOANDAU_PART_5 : (typeof LOANDAU_FENGSHUI_PART_5 !== 'undefined' ? LOANDAU_FENGSHUI_PART_5 : null),
          typeof LOANDAU_PART_6 !== 'undefined' ? LOANDAU_PART_6 : (typeof LOANDAU_FENGSHUI_PART_6 !== 'undefined' ? LOANDAU_FENGSHUI_PART_6 : null),
          typeof LOANDAU_PART_7 !== 'undefined' ? LOANDAU_PART_7 : (typeof LOANDAU_FENGSHUI_PART_7 !== 'undefined' ? LOANDAU_FENGSHUI_PART_7 : null),
          typeof LOANDAU_PART_8 !== 'undefined' ? LOANDAU_PART_8 : (typeof LOANDAU_FENGSHUI_PART_8 !== 'undefined' ? LOANDAU_FENGSHUI_PART_8 : null),
          typeof LOANDAU_PART_9 !== 'undefined' ? LOANDAU_PART_9 : (typeof LOANDAU_FENGSHUI_PART_9 !== 'undefined' ? LOANDAU_FENGSHUI_PART_9 : null),
          typeof LOANDAU_PART_10 !== 'undefined' ? LOANDAU_PART_10 : (typeof LOANDAU_FENGSHUI_PART_10 !== 'undefined' ? LOANDAU_FENGSHUI_PART_10 : null)
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

  // =========================================================================
  // UNIVERSAL CONTENT RENDER ENGINE: NẠP ĐẦY ĐỦ 100% NỘI DUNG MỌI BÀI HỌC
  // =========================================================================
  renderMainReader(track, lesson, lessonIndex) {
    const readerContainer = document.getElementById('shell-main-content');
    if (!readerContainer) return;

    const totalLessons = track.parts.filter(p => p !== null).length;
    const prevIndex = lessonIndex > 1 ? lessonIndex - 1 : null;
    const nextIndex = lessonIndex < totalLessons ? lessonIndex + 1 : null;

    let contentHtml = '';

    // 1. CỔ HUẤN NGUYÊN VĂN (Canonical Texts)
    if (lesson.canonical_texts && lesson.canonical_texts.length > 0) {
      contentHtml += `
        <section class="reader-section-block" style="margin-bottom:1.5rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.6rem;">
            Kinh Điển Cổ Huấn & Nguyên Tác
          </h2>
          ${lesson.canonical_texts.map(ct => `
            <div class="reader-quote-card" style="border-left:3px solid ${track.theme}; background:rgba(255,255,255,0.02); padding:0.9rem 1.1rem; border-radius:0 6px 6px 0; margin-bottom:0.8rem;">
              <div class="reader-hanzi-text" style="font-family:'Ma Shan Zheng', var(--font-title); font-size:1.1rem; color:${track.theme}; letter-spacing:0.03em; margin-bottom:0.3rem; line-height:1.55;">
                ${ct.hanzi}
              </div>
              <div class="reader-pinyin-text" style="font-style:italic; color:#FEF3C7; font-size:0.85rem; margin-bottom:0.3rem;">
                "${ct.pinyin}"
              </div>
              <div class="reader-vietnamese-text" style="color:var(--text-pure); font-size:0.88rem; line-height:1.6; margin-bottom:0.3rem;">
                <strong>Dịch nghĩa:</strong> ${ct.meaning}
              </div>
              <div class="reader-source-text" style="text-align:right; font-size:0.78rem; color:${track.theme}; font-weight:600;">
                — ${ct.source}
              </div>
            </div>
          `).join('')}
        </section>
      `;
    }

    // 1.5 GIẢI MÃ CHUYÊN KHẢO CHI TIẾT TỪNG CHƯƠNG MỤC CỔ THƯ
    if (Array.isArray(lesson.cosmological_stages) && lesson.cosmological_stages.length > 0) {
      const sectionTitle = lesson.stages_title || 'Giải Mã Chi Tiết Từng Chương Mục Cổ Thư (Chuyên Khảo Sư Phạm)';
      contentHtml += `
        <section class="reader-section-block" style="margin-bottom:1.8rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.8rem; display:flex; align-items:center; gap:0.4rem;">
            <span>${sectionTitle}</span>
          </h2>
          <div style="display:flex; flex-direction:column; gap:0.9rem;">
            ${lesson.cosmological_stages.map((cs, idx) => `
              <div style="background:rgba(18,24,38,0.7); border:1px solid rgba(255,255,255,0.08); border-left:3px solid ${track.theme}; padding:1rem 1.2rem; border-radius:0 8px 8px 0;">
                <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:0.4rem; flex-wrap:wrap; gap:0.3rem;">
                  <strong style="color:#FEF3C7; font-size:0.92rem; font-weight:600;">${cs.stage || cs.title}</strong>
                  ${cs.state ? `<span style="font-size:0.76rem; color:${track.theme}; background:rgba(255,255,255,0.04); border:1px solid ${track.theme}33; padding:0.15rem 0.5rem; border-radius:4px; font-weight:600;">${cs.state}</span>` : ''}
                </div>
                
                ${cs.detailed_explanation ? `
                  <div style="font-size:0.84rem; color:var(--text-pure); line-height:1.65; margin-bottom:0.5rem;">
                    ${cs.detailed_explanation}
                  </div>
                ` : (cs.philosophical_meaning ? `
                  <div style="font-size:0.84rem; color:var(--text-pure); line-height:1.65; margin-bottom:0.5rem;">
                    ${cs.philosophical_meaning}
                  </div>
                ` : '')}

                ${cs.practical_manifestation ? `
                  <div style="background:rgba(255,255,255,0.02); border-radius:4px; padding:0.5rem 0.8rem; margin-top:0.4rem; font-size:0.8rem; color:#A7F3D0; line-height:1.5;">
                    <strong style="color:#34D399;">• Biểu hiện thực tế & Nhận biết:</strong> ${cs.practical_manifestation}
                  </div>
                ` : ''}

                ${cs.key_takeaway ? `
                  <div style="font-size:0.78rem; color:var(--text-muted); margin-top:0.35rem; line-height:1.45;">
                    <strong style="color:#FDE68A;">• Bí quyết cốt lõi:</strong> ${cs.key_takeaway}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </section>
      `;
    }

    // 2. BẢN THỂ LUẬN & TRÍCH DẪN (Ontology & Quotes from Thờ Cúng Parts)
    const quoteBlocks = [
      lesson.ontology,
      lesson.ruler_classification,
      lesson.incense_burners_layout,
      lesson.preparation_and_timing,
      lesson.deity_nature,
      lesson.spiritual_hierarchy,
      lesson.ancestral_hall_ontology,
      lesson.hanging_altar_heights,
      lesson.talisman_anatomy
    ].filter(b => b && b.quote);

    quoteBlocks.forEach(b => {
      contentHtml += `
        <section class="reader-section-block" style="margin-bottom:1.5rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.6rem;">
            ${b.title || 'Bản Thể Luận & Cổ Huấn'}
          </h2>
          <div class="reader-quote-card" style="border-left:3px solid ${track.theme}; background:rgba(255,255,255,0.02); padding:0.9rem 1.1rem; border-radius:0 6px 6px 0; margin-bottom:0.8rem;">
            <div style="font-style:italic; color:#FEF3C7; font-size:0.88rem; line-height:1.6; margin-bottom:0.3rem;">
              "${b.quote}"
            </div>
            <div style="text-align:right; font-size:0.78rem; color:${track.theme}; font-weight:600;">
              — Xuất xứ: ${b.quote_source || 'Thư Tịch Cổ Điển'}
            </div>
          </div>
        </section>
      `;
    });

    // 3. NGUYÊN LÝ BẢN THỂ (Ontology Principles)
    if (lesson.ontology && Array.isArray(lesson.ontology.principles)) {
      contentHtml += `
        <div style="margin-bottom:1.5rem;">
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.6rem;">
            ${lesson.ontology.principles.map(p => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:0.8rem; border-radius:6px;">
                <strong style="color:${track.theme}; font-size:0.86rem; display:block; margin-bottom:0.2rem;">• ${p.name}:</strong>
                <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.5; margin:0;">${p.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 4. QUY TẮC ĐỊNH HƯỚNG BÀN THỜ (Orientation Rules - Part 1)
    if (lesson.orientation_rules) {
      const or = lesson.orientation_rules;
      contentHtml += `
        <div style="margin-bottom:1.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.5rem;">${or.title || 'Quy Tắc Định Hướng Tọa Cát Hướng Cát'}</h2>
          ${or.comparison_with_kitchen ? `
            <div style="background:rgba(245,158,11,0.06); border-left:3px solid ${track.theme}; padding:0.6rem 0.9rem; border-radius:0 6px 6px 0; font-size:0.84rem; color:#FEF3C7; line-height:1.5; margin-bottom:0.6rem;">
              <strong>Phân biệt cốt tử:</strong> ${or.comparison_with_kitchen}
            </div>
          ` : ''}
          ${Array.isArray(or.palace_requirements) ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.6rem;">
              ${or.palace_requirements.map(req => `
                <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:0.7rem; border-radius:6px;">
                  <strong style="color:${track.theme}; font-size:0.84rem; display:block; margin-bottom:0.15rem;">${req.palace}:</strong>
                  <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.45; margin:0;">${req.requirement}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      `;
    }

    // 5. LOAN ĐẦU GIAN THỜ (Loan Dau Rules - Part 1)
    if (lesson.loan_dau_rules && Array.isArray(lesson.loan_dau_rules.rules)) {
      contentHtml += `
        <div style="margin-bottom:1.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.5rem;">${lesson.loan_dau_rules.title || 'Quy Tắc Hình Thế Loan Đầu'}</h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.6rem;">
            ${lesson.loan_dau_rules.rules.map(r => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:0.8rem; border-radius:6px;">
                <h3 style="font-size:0.86rem; color:${track.theme}; margin:0 0 0.25rem 0;">${r.aspect}</h3>
                <div style="font-size:0.82rem; color:var(--text-pure); margin-bottom:0.3rem;"><strong>Tiêu chuẩn:</strong> ${r.standard}</div>
                <div style="background:rgba(239,68,68,0.08); border-left:2px solid #EF4444; padding:0.4rem 0.6rem; border-radius:0 4px 4px 0; font-size:0.78rem; color:#FCA5A5; line-height:1.4;">
                  ${r.prohibitions}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 6. BẢNG TRA MA TRẬN 8 QUÁI (Bát Trạch Matrix - Part 1)
    if (Array.isArray(lesson.battrach_worship_matrix)) {
      contentHtml += `
        <div style="margin-bottom:1.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.5rem;">Bảng Tra Phương Vị Tọa Cát Hướng Cát Theo 8 Mệnh Quái</h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:0.5rem;">
            ${lesson.battrach_worship_matrix.map(m => `
              <div style="background:rgba(18,24,38,0.7); border:1px solid rgba(255,255,255,0.06); padding:0.6rem 0.8rem; border-radius:6px;">
                <div style="color:${track.theme}; font-weight:600; font-size:0.84rem; margin-bottom:0.15rem;">Quẻ ${m.gua}</div>
                <div style="font-size:0.8rem; color:var(--text-pure); margin-bottom:0.15rem;"><strong>Tọa vị:</strong> ${m.best_pos}</div>
                <div style="font-size:0.76rem; color:var(--text-muted);">${m.note}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 7. THƯỚC LỖ BAN & 10 CUNG 38.8CM (Part 2 Worship)
    if (lesson.ruler_classification && Array.isArray(lesson.ruler_classification.rulers)) {
      contentHtml += `
        <div style="margin-bottom:1.5rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.5rem;">${lesson.ruler_classification.title}</h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.6rem;">
            ${lesson.ruler_classification.rulers.map(r => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:0.7rem; border-radius:6px;">
                <strong style="color:${track.theme}; font-size:0.84rem; display:block; margin-bottom:0.15rem;">${r.name}</strong>
                <p style="font-size:0.8rem; color:var(--text-muted); line-height:1.45; margin:0;">${r.use_case}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (lesson.ruler_388_structure && Array.isArray(lesson.ruler_388_structure.palaces)) {
      contentHtml += `
        <div style="margin-bottom:1.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.5rem;">${lesson.ruler_388_structure.title} (Chu kỳ ${lesson.ruler_388_structure.cycle_length})</h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:0.5rem;">
            ${lesson.ruler_388_structure.palaces.map(pal => {
              const isCat = pal.type === 'cat' || pal.nature === 'Cát';
              return `
                <div style="background:rgba(18,24,38,0.7); border:1px solid rgba(255,255,255,0.06); border-left:3px solid ${isCat ? '#34D399' : '#EF4444'}; padding:0.6rem 0.8rem; border-radius:4px;">
                  <div style="display:flex; justify-content:space-between; margin-bottom:0.2rem;">
                    <strong style="color:#FEF3C7; font-size:0.84rem;">${pal.name || pal.palace_name}</strong>
                    <span style="font-size:0.75rem; font-weight:700; color:${isCat ? '#34D399' : '#EF4444'};">${isCat ? 'Cát' : 'Hung'}${pal.length ? ` (${pal.length})` : ''}</span>
                  </div>
                  <div style="font-size:0.78rem; color:var(--text-muted); line-height:1.4; margin-bottom:0.2rem;">${pal.desc || pal.meaning || ''}</div>
                  ${Array.isArray(pal.sub_palaces) ? `
                    <div style="font-size:0.72rem; color:${track.theme};">
                      ${pal.sub_palaces.join(' • ')}
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    if (lesson.altar_golden_dimensions) {
      const ag = lesson.altar_golden_dimensions;
      contentHtml += `
        <div style="margin-bottom:1.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.5rem;">${ag.title || 'Kích Thước Bàn Thờ Chuẩn Lỗ Ban 38.8cm'}</h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.8rem;">
            ${ag.standing_altars ? `
              <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:0.8rem; border-radius:6px;">
                <h3 style="font-size:0.86rem; color:${track.theme}; margin:0 0 0.4rem 0;">Bàn Thờ Đứng (Án Gian / Tủ Thờ)</h3>
                ${ag.standing_altars.map(sa => `
                  <div style="margin-bottom:0.4rem; padding-bottom:0.4rem; border-bottom:1px solid rgba(255,255,255,0.04); font-size:0.8rem;">
                    <div style="color:#FEF3C7; font-weight:600;">Ngang ${sa.width} × Sâu ${sa.depth} × Cao ${sa.height}</div>
                    <div style="color:var(--text-muted); font-size:0.76rem;">Phù hợp: ${sa.suit_for}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
            ${ag.hanging_altars ? `
              <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:0.8rem; border-radius:6px;">
                <h3 style="font-size:0.86rem; color:${track.theme}; margin:0 0 0.4rem 0;">Bàn Thờ Treo Tường (Chung Cư / Nhà Nhỏ)</h3>
                ${ag.hanging_altars.map(ha => `
                  <div style="margin-bottom:0.4rem; padding-bottom:0.4rem; border-bottom:1px solid rgba(255,255,255,0.04); font-size:0.8rem;">
                    <div style="color:#FEF3C7; font-weight:600;">Ngang ${ha.width} × Sâu ${ha.depth} (${ha.height_standard || ''})</div>
                    <div style="color:var(--text-muted); font-size:0.76rem;">Phù hợp: ${ha.suit_for}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }

    // 8. BÀI TRÍ BÁT HƯƠNG & NGŨ HÀNH (Part 3 Worship)
    if (lesson.incense_burners_layout && Array.isArray(lesson.incense_burners_layout.burners)) {
      contentHtml += `
        <div style="margin-bottom:1.5rem;">
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:0.6rem;">
            ${lesson.incense_burners_layout.burners.map(b => `
              <div style="background:rgba(18,24,38,0.7); border:1px solid rgba(255,255,255,0.06); border-top:3px solid ${track.theme}; padding:0.7rem; border-radius:6px;">
                <strong style="color:${track.theme}; font-size:0.86rem; display:block; margin-bottom:0.2rem;">${b.position}</strong>
                <p style="font-size:0.8rem; color:var(--text-pure); margin-bottom:0.2rem;"><strong>Thờ phụng:</strong> ${b.worship || b.name || ''}</p>
                <p style="font-size:0.76rem; color:var(--text-muted); margin:0;"><strong>Quy thức:</strong> ${b.specification || b.rules || ''}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (lesson.five_elements_worship && Array.isArray(lesson.five_elements_worship.elements)) {
      contentHtml += `
        <div style="margin-bottom:1.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.3rem;">${lesson.five_elements_worship.title}</h2>
          <p style="font-size:0.82rem; color:var(--text-muted); margin-bottom:0.6rem;">${lesson.five_elements_worship.desc}</p>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:0.5rem;">
            ${lesson.five_elements_worship.elements.map(el => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:0.6rem; border-radius:4px;">
                <strong style="color:#FEF3C7; font-size:0.82rem;">${el.element}</strong>
                <div style="font-size:0.78rem; color:${track.theme}; margin:0.15rem 0;">${el.items}</div>
                <div style="font-size:0.74rem; color:var(--text-muted);">${el.role || el.meaning || ''}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (lesson.dong_binh_tay_qua) {
      contentHtml += `
        <div style="margin-bottom:1.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.4rem;">${lesson.dong_binh_tay_qua.title}</h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.6rem;">
            ${(lesson.dong_binh_tay_qua.principles || []).map(p => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:0.7rem; border-radius:6px;">
                <strong style="color:${track.theme}; font-size:0.84rem; display:block; margin-bottom:0.15rem;">${p.name || ''}</strong>
                <p style="font-size:0.8rem; color:var(--text-pure); margin:0; line-height:1.45;">${p.desc || p}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (lesson.that_bao_consecration) {
      const tb = lesson.that_bao_consecration;
      contentHtml += `
        <div style="margin-bottom:1.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.4rem;">${tb.title}</h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:0.5rem; margin-bottom:0.6rem;">
            ${(tb.seven_treasures || []).map(t => `
              <div style="background:rgba(18,24,38,0.7); border:1px solid rgba(255,255,255,0.06); padding:0.6rem; border-radius:4px;">
                <strong style="color:${track.theme}; font-size:0.82rem;">${t.name}</strong>
                <div style="font-size:0.76rem; color:var(--text-muted);">${t.meaning}</div>
              </div>
            `).join('')}
          </div>
          ${tb.ash_rule ? `<div style="font-size:0.8rem; color:#FEF3C7; background:rgba(245,158,11,0.08); padding:0.5rem 0.8rem; border-radius:4px;"><strong>Quy tắc tro cốt:</strong> ${tb.ash_rule}</div>` : ''}
        </div>
      `;
    }

    // 9. 18 ĐẠI KỴ PHONG THỦY BÀN THỜ (Part 4 Worship)
    if (Array.isArray(lesson.taboo_categories)) {
      contentHtml += `
        <div style="margin-bottom:1.5rem;">
          ${lesson.taboo_categories.map(cat => `
            <div style="margin-bottom:1.2rem;">
              <h2 style="font-size:0.92rem; font-weight:600; color:${track.theme}; margin-bottom:0.5rem;">${cat.category_name}</h2>
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.6rem;">
                ${(cat.items || []).map(item => `
                  <div style="background:rgba(18,24,38,0.7); border:1px solid rgba(255,255,255,0.06); border-left:3px solid #EF4444; padding:0.7rem; border-radius:4px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:0.2rem;">
                      <strong style="color:#FEF3C7; font-size:0.84rem;">${item.id ? `${item.id}. ` : ''}${item.name || item.title || 'Đại Kỵ'}</strong>
                      <span style="font-size:0.72rem; color:#EF4444; font-weight:700;">${item.danger_level || 'Đại Kỵ'}</span>
                    </div>
                    <div style="font-size:0.78rem; color:#FCA5A5; margin-bottom:0.2rem;">
                      <strong>Hậu họa:</strong> ${item.danger || item.consequence || 'Gây tổn hại trường khí linh vị'}
                    </div>
                    <div style="font-size:0.78rem; color:#34D399;">
                      <strong>Hóa giải:</strong> ${item.remedy || item.remedy_standard || item.solution || 'Cần điều chỉnh vị trí và bài trí đúng chuẩn'}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // 10. NGHI THỨC BAO SÁI & VĂN KHẤN (Part 5 Worship)
    if (lesson.five_steps_process && Array.isArray(lesson.five_steps_process.steps)) {
      contentHtml += `
        <div style="margin-bottom:1.5rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.5rem;">${lesson.five_steps_process.title}</h2>
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            ${lesson.five_steps_process.steps.map(s => `
              <div style="background:rgba(255,255,255,0.02); border-left:3px solid ${track.theme}; padding:0.6rem 0.9rem; border-radius:0 6px 6px 0; font-size:0.82rem; color:var(--text-pure); line-height:1.5;">
                <strong style="color:#FEF3C7;">${s.step}:</strong> ${s.action}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (lesson.canonical_prayer) {
      contentHtml += `
        <div style="margin-bottom:1.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.5rem;">${lesson.canonical_prayer.title}</h2>
          <div style="background:rgba(7,9,14,0.8); border:1px solid rgba(245,158,11,0.3); padding:1rem; border-radius:6px; font-family:var(--font-title); font-size:0.86rem; color:#FEF3C7; line-height:1.7; white-space:pre-line;">
            ${lesson.canonical_prayer.invocation_text}
          </div>
        </div>
      `;
    }

    // 11. BÀN THỜ THẦN TÀI THỔ ĐỊA (Part 6 Worship)
    if (lesson.deity_nature && Array.isArray(lesson.deity_nature.deities)) {
      contentHtml += `
        <div style="margin-bottom:1.5rem;">
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.6rem; margin-bottom:0.6rem;">
            ${lesson.deity_nature.deities.map(d => `
              <div style="background:rgba(18,24,38,0.7); border:1px solid rgba(255,255,255,0.06); padding:0.7rem; border-radius:6px;">
                <strong style="color:${track.theme}; font-size:0.86rem; display:block; margin-bottom:0.15rem;">${d.name}</strong>
                <div style="font-size:0.8rem; color:#FEF3C7; margin-bottom:0.15rem;">${d.position}</div>
                <p style="font-size:0.78rem; color:var(--text-muted); line-height:1.45; margin:0;">${d.role}</p>
              </div>
            `).join('')}
          </div>
          ${lesson.deity_nature.ground_principle ? `
            <div style="background:rgba(245,158,11,0.06); border-left:3px solid ${track.theme}; padding:0.6rem 0.9rem; border-radius:0 6px 6px 0; font-size:0.82rem; color:#FEF3C7; line-height:1.5;">
              ${lesson.deity_nature.ground_principle}
            </div>
          ` : ''}
        </div>
      `;
    }

    if (lesson.positioning_and_directions) {
      const pd = lesson.positioning_and_directions;
      contentHtml += `
        <div style="margin-bottom:1.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.4rem;">${pd.title}</h2>
          ${Array.isArray(pd.location_rules) ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.6rem; margin-bottom:0.6rem;">
              ${pd.location_rules.map(lr => `
                <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:0.7rem; border-radius:6px;">
                  <strong style="color:${track.theme}; font-size:0.84rem; display:block; margin-bottom:0.15rem;">${lr.name}</strong>
                  <p style="font-size:0.8rem; color:var(--text-muted); line-height:1.45; margin:0;">${lr.desc}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${Array.isArray(pd.wealth_palaces) ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.6rem;">
              ${pd.wealth_palaces.map(wp => `
                <div style="background:rgba(18,24,38,0.7); border:1px solid rgba(255,255,255,0.06); padding:0.7rem; border-radius:6px;">
                  <strong style="color:${track.theme}; font-size:0.84rem;">${wp.palace}</strong>
                  <div style="font-size:0.78rem; color:var(--text-muted); margin-top:0.15rem;">${wp.benefit}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      `;
    }

    if (lesson.altar_layout && Array.isArray(lesson.altar_layout.items_order)) {
      contentHtml += `
        <div style="margin-bottom:1.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.4rem;">${lesson.altar_layout.title}</h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:0.5rem;">
            ${lesson.altar_layout.items_order.map(it => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:0.6rem 0.8rem; border-radius:4px;">
                <strong style="color:${track.theme}; font-size:0.82rem;">${it.step || ''}</strong>
                <div style="font-size:0.78rem; color:var(--text-pure); line-height:1.4; margin-top:0.15rem;">${it.desc || ''}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (lesson.taboos_wealth_altar && Array.isArray(lesson.taboos_wealth_altar.taboos)) {
      contentHtml += `
        <div style="margin-bottom:1.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:#EF4444; margin-bottom:0.4rem;">${lesson.taboos_wealth_altar.title}</h2>
          <ul style="list-style:none; padding:0; margin:0;">
            ${lesson.taboos_wealth_altar.taboos.map(t => `
              <li style="background:rgba(239,68,68,0.06); border-left:2px solid #EF4444; padding:0.4rem 0.7rem; border-radius:0 4px 4px 0; margin-bottom:0.35rem; font-size:0.8rem; color:#FCA5A5;">
                • ${t}
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    }

    // 12. BÀN THỜ PHẬT & GIA TIÊN (Part 7 Worship)
    if (lesson.dual_altar_models && Array.isArray(lesson.dual_altar_models.models)) {
      contentHtml += `
        <div style="margin-bottom:1.5rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.5rem;">${lesson.dual_altar_models.title}</h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.6rem;">
            ${lesson.dual_altar_models.models.map(m => `
              <div style="background:rgba(18,24,38,0.7); border:1px solid rgba(255,255,255,0.06); padding:0.8rem; border-radius:6px;">
                <strong style="color:${track.theme}; font-size:0.86rem; display:block; margin-bottom:0.2rem;">${m.model_name}</strong>
                <div style="font-size:0.8rem; color:#FEF3C7; margin-bottom:0.2rem;"><strong>Phù hợp:</strong> ${m.suitable}</div>
                <div style="font-size:0.78rem; color:var(--text-muted);">${m.structure}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (lesson.offering_commandments && Array.isArray(lesson.offering_commandments.rules)) {
      contentHtml += `
        <div style="margin-bottom:1.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.4rem;">${lesson.offering_commandments.title}</h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.6rem;">
            ${lesson.offering_commandments.rules.map(r => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:0.7rem; border-radius:6px;">
                <strong style="color:${track.theme}; font-size:0.84rem; display:block; margin-bottom:0.15rem;">${r.item || ''}</strong>
                <p style="font-size:0.8rem; color:var(--text-pure); margin:0; line-height:1.45;">${r.detail || r}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 13. NHÀ THỜ HỌ & TẢ CHIÊU HỮU MỤC (Part 8 Worship)
    if (lesson.ancestral_hall_ontology && Array.isArray(lesson.ancestral_hall_ontology.principles)) {
      contentHtml += `
        <div style="margin-bottom:1.5rem;">
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.6rem;">
            ${lesson.ancestral_hall_ontology.principles.map(p => `
              <div style="background:rgba(18,24,38,0.7); border:1px solid rgba(255,255,255,0.06); padding:0.7rem; border-radius:6px;">
                <strong style="color:${track.theme}; font-size:0.84rem; display:block; margin-bottom:0.15rem;">${p.name}</strong>
                <p style="font-size:0.8rem; color:var(--text-muted); margin:0;">${p.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (lesson.chieu_muc_system) {
      contentHtml += `
        <div style="margin-bottom:1.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.4rem;">${lesson.chieu_muc_system.title}</h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.6rem;">
            ${(lesson.chieu_muc_system.generation_rules || []).map(r => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:0.7rem; border-radius:6px;">
                <strong style="color:${track.theme}; font-size:0.84rem; display:block; margin-bottom:0.15rem;">${r.rank || ''}</strong>
                <div style="font-size:0.8rem; color:#FEF3C7; margin-bottom:0.15rem;"><strong>Vị trí:</strong> ${r.placement || ''}</div>
                <div style="font-size:0.78rem; color:var(--text-muted); line-height:1.4;">${r.symbol || ''}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (lesson.architectural_loan_dau) {
      const ald = lesson.architectural_loan_dau;
      contentHtml += `
        <div style="margin-bottom:1.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.4rem;">${ald.title}</h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.6rem;">
            ${(ald.bays_layout || []).map(b => `
              <div style="background:rgba(18,24,38,0.7); border:1px solid rgba(255,255,255,0.06); padding:0.7rem; border-radius:6px;">
                <strong style="color:${track.theme}; font-size:0.84rem;">${b.bay}</strong>
                <div style="font-size:0.78rem; color:var(--text-pure); margin-top:0.15rem;">${b.role}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (lesson.sacred_tablets_and_motto) {
      const st = lesson.sacred_tablets_and_motto;
      contentHtml += `
        <div style="margin-bottom:1.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.4rem;">${st.title}</h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:0.5rem; margin-bottom:0.6rem;">
            ${(st.famous_mottos || []).map(m => `
              <div style="background:rgba(18,24,38,0.7); border:1px solid rgba(255,255,255,0.06); padding:0.6rem 0.8rem; border-radius:4px;">
                <strong style="color:${track.theme}; font-size:0.84rem;">${m.motto}</strong>
                <div style="font-size:0.78rem; color:var(--text-muted);">${m.meaning}</div>
              </div>
            `).join('')}
          </div>
          ${st.tablet_material ? `<div style="font-size:0.8rem; color:#FEF3C7; background:rgba(245,158,11,0.08); padding:0.5rem 0.8rem; border-radius:4px;">${st.tablet_material}</div>` : ''}
        </div>
      `;
    }

    // 14. BÀN THỜ CHUNG CƯ & ĐỘ CAO TREO (Part 9 Worship)
    if (lesson.hanging_altar_heights && Array.isArray(lesson.hanging_altar_heights.height_levels)) {
      contentHtml += `
        <div style="margin-bottom:1.5rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.5rem;">${lesson.hanging_altar_heights.title}</h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:0.5rem;">
            ${lesson.hanging_altar_heights.height_levels.map(hl => `
              <div style="background:rgba(18,24,38,0.7); border:1px solid rgba(255,255,255,0.06); padding:0.6rem 0.8rem; border-radius:4px;">
                <strong style="color:${track.theme}; font-size:0.84rem;">${hl.level}: ${hl.height_cm}</strong>
                <div style="font-size:0.78rem; color:var(--text-muted); margin-top:0.15rem;">${hl.suitable}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (lesson.four_layer_protection && Array.isArray(lesson.four_layer_protection.layers)) {
      contentHtml += `
        <div style="margin-bottom:1.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.4rem;">${lesson.four_layer_protection.title}</h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.6rem;">
            ${lesson.four_layer_protection.layers.map(l => `
              <div style="background:rgba(18,24,38,0.7); border:1px solid rgba(255,255,255,0.06); padding:0.7rem; border-radius:6px;">
                <strong style="color:${track.theme}; font-size:0.84rem;">${l.layer}</strong>
                <div style="font-size:0.78rem; color:var(--text-pure); margin-top:0.15rem;">${l.role}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (lesson.apartment_taboos && Array.isArray(lesson.apartment_taboos.taboos)) {
      contentHtml += `
        <div style="margin-bottom:1.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:#EF4444; margin-bottom:0.4rem;">${lesson.apartment_taboos.title}</h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.6rem;">
            ${lesson.apartment_taboos.taboos.map(t => `
              <div style="background:rgba(18,24,38,0.7); border:1px solid rgba(255,255,255,0.06); border-left:3px solid #EF4444; padding:0.7rem; border-radius:4px;">
                <strong style="color:#FEF3C7; font-size:0.84rem; display:block; margin-bottom:0.2rem;">${t.id}. ${t.title}</strong>
                <div style="font-size:0.78rem; color:#FCA5A5; margin-bottom:0.2rem;"><strong>Hậu họa:</strong> ${t.danger}</div>
                <div style="font-size:0.78rem; color:#34D399;"><strong>Hóa giải:</strong> ${t.solution}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 15. PHÙ CỐT BÁT HƯƠNG & TRẬN ĐỒ CÀN KHÔN (Part 10 Worship)
    if (lesson.talisman_anatomy) {
      contentHtml += `
        <div style="margin-bottom:1.5rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.4rem;">${lesson.talisman_anatomy.title}</h2>
          <p style="font-size:0.82rem; color:var(--text-muted); margin-bottom:0.6rem;">${lesson.talisman_anatomy.overview || ''}</p>
          ${Array.isArray(lesson.talisman_anatomy.five_columns) ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.7rem;">
              ${lesson.talisman_anatomy.five_columns.map(col => `
                <div style="background:rgba(18,24,38,0.7); border:1px solid rgba(255,255,255,0.06); border-top:3px solid ${track.theme}; padding:0.8rem; border-radius:6px;">
                  <strong style="color:${track.theme}; font-size:0.86rem; display:block; margin-bottom:0.4rem;">${col.column_name}</strong>
                  <div style="display:flex; flex-direction:column; gap:0.4rem;">
                    ${Array.isArray(col.character_details) ? col.character_details.map(cd => `
                      <div style="background:rgba(255,255,255,0.02); padding:0.4rem 0.6rem; border-radius:4px; border-left:2px solid rgba(255,255,255,0.1);">
                        <div style="color:#FEF3C7; font-weight:600; font-size:0.82rem;">${cd.han}</div>
                        ${cd.pinyin ? `<div style="font-size:0.74rem; color:${track.theme}; margin-bottom:0.15rem;">${cd.pinyin}</div>` : ''}
                        <div style="font-size:0.78rem; color:var(--text-muted); line-height:1.4;">${cd.meaning}</div>
                      </div>
                    `).join('') : `<div style="font-size:0.78rem; color:var(--text-pure);">${col.character_details}</div>`}
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      `;
    }

    if (lesson.matrix_significance && Array.isArray(lesson.matrix_significance.points)) {
      contentHtml += `
        <div style="margin-bottom:1.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.4rem;">${lesson.matrix_significance.title}</h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.6rem;">
            ${lesson.matrix_significance.points.map(p => `
              <div style="background:rgba(18,24,38,0.7); border:1px solid rgba(255,255,255,0.06); padding:0.7rem; border-radius:6px;">
                <strong style="color:${track.theme}; font-size:0.84rem; display:block; margin-bottom:0.15rem;">${p.name}</strong>
                <p style="font-size:0.8rem; color:var(--text-muted); margin:0;">${p.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (lesson.ritual_consecration_steps && Array.isArray(lesson.ritual_consecration_steps.steps)) {
      contentHtml += `
        <div style="margin-bottom:1.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.4rem;">${lesson.ritual_consecration_steps.title}</h2>
          <div style="display:flex; flex-direction:column; gap:0.4rem;">
            ${lesson.ritual_consecration_steps.steps.map(st => `
              <div style="background:rgba(255,255,255,0.02); border-left:3px solid ${track.theme}; padding:0.5rem 0.8rem; border-radius:0 4px 4px 0; font-size:0.8rem; color:var(--text-pure);">
                ${st}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 16. CÁC QUY TẮC CỐT LÕI (Core Rules)
    if (lesson.core_rules && Array.isArray(lesson.core_rules.rule_table)) {
      contentHtml += `
        <section class="reader-section-block" style="margin-bottom:1.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.6rem;">
            Quy Tắc Học Thuật Cốt Lõi (Định Luật Cát Hung)
          </h2>
          <div style="display:flex; flex-direction:column; gap:0.6rem;">
            ${lesson.core_rules.rule_table.map(rule => {
              const cond = (rule.condition || '').replace(/^IF\s*\((.*?)\)$/i, '$1').replace(/^IF\s*/i, '');
              const res = (rule.result || '').replace(/^THEN\s*\((.*?)\)$/i, '$1').replace(/^THEN\s*/i, '');
              const bec = (rule.principle || '').replace(/^BECAUSE:\s*/i, '');
              return `
                <div style="background:rgba(18,24,38,0.7); border:1px solid rgba(255,255,255,0.06); padding:0.7rem 0.9rem; border-radius:6px;">
                  <div style="font-size:0.82rem; color:${track.theme}; font-weight:600; margin-bottom:0.2rem;">${cond}</div>
                  <div style="font-size:0.82rem; color:#FEF3C7; margin-bottom:0.2rem;"><strong>Hệ quả:</strong> ${res}</div>
                  ${bec ? `<div style="font-size:0.78rem; color:var(--text-muted);"><strong>Nguyên lý:</strong> ${bec}</div>` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    // 17. CẨM NANG ỨNG DỤNG THỰC CHIẾN (Real Estate Applications)
    let realEstateApps = [];
    if (Array.isArray(lesson.real_estate_applications)) {
      realEstateApps = lesson.real_estate_applications;
    } else if (lesson.real_estate_applications && Array.isArray(lesson.real_estate_applications.applications)) {
      realEstateApps = lesson.real_estate_applications.applications;
    }

    if (realEstateApps.length > 0) {
      contentHtml += `
        <section class="reader-section-block" style="margin-bottom:1.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.6rem;">
            Ứng Dụng Vật Lý Địa Hình Thực Chiến
          </h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.6rem;">
            ${realEstateApps.map(app => `
              <div style="background:rgba(18,24,38,0.7); border:1px solid rgba(255,255,255,0.06); border-radius:6px; padding:0.7rem 0.9rem;">
                <div style="font-weight:600; color:${track.theme}; font-size:0.84rem; margin-bottom:0.2rem;">
                  ${app.tier || app.category || 'Hạng mục'}
                </div>
                <div style="font-size:0.8rem; color:var(--text-pure); line-height:1.5;">
                  ${app.action_guide}
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      `;
    }

    // 18. PHƯƠNG PHÁP HÓA GIẢI (Remedy Framework)
    let remedies = [];
    let remedyTitle = 'Khung Phương Pháp Hóa Giải Phong Thủy';
    if (Array.isArray(lesson.remedy_framework)) {
      remedies = lesson.remedy_framework;
    } else if (lesson.remedy_framework && Array.isArray(lesson.remedy_framework.remedies)) {
      remedies = lesson.remedy_framework.remedies;
      if (lesson.remedy_framework.title) remedyTitle = lesson.remedy_framework.title;
    }

    if (remedies.length > 0) {
      contentHtml += `
        <section class="reader-section-block" style="margin-bottom:1.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.6rem;">
            ${remedyTitle}
          </h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.6rem;">
            ${remedies.map(r => `
              <div style="background:rgba(18,24,38,0.7); border:1px solid rgba(255,255,255,0.06); border-left:3px solid #34D399; border-radius:4px; padding:0.7rem 0.9rem;">
                <strong style="color:#FEF3C7; font-size:0.84rem; display:block; margin-bottom:0.2rem;">
                  ${r.issue || r.symptom || r.aspect || 'Hóa Giải Cốt Lõi'}
                </strong>
                <div style="font-size:0.8rem; color:var(--text-pure); line-height:1.45;">
                  ${r.remedy || r.method || r.action_guide || ''}
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      `;
    }

    // 19. QUY TRÌNH ĐO ĐẠC & ÁN NGHIỆM THỰC TẾ (Checklist & Case Studies)
    let checklistSteps = [];
    let checklistTitle = 'Quy Trình Hiện Trường';
    if (Array.isArray(lesson.actionable_checklist)) {
      checklistSteps = lesson.actionable_checklist;
    } else if (lesson.actionable_checklist && Array.isArray(lesson.actionable_checklist.steps)) {
      checklistSteps = lesson.actionable_checklist.steps;
      if (lesson.actionable_checklist.title) checklistTitle = lesson.actionable_checklist.title;
    }

    let caseStudies = [];
    if (Array.isArray(lesson.vietnam_case_studies)) {
      caseStudies = lesson.vietnam_case_studies;
    } else if (lesson.vietnam_case_studies && Array.isArray(lesson.vietnam_case_studies.cases)) {
      caseStudies = lesson.vietnam_case_studies.cases;
    }

    if (checklistSteps.length > 0 || caseStudies.length > 0) {
      contentHtml += `
        <section class="reader-section-block" style="margin-bottom:1.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">
          <h2 style="font-size:0.95rem; font-weight:600; color:${track.theme}; margin-bottom:0.6rem;">
            Quy Trình Đo Đạc & Án Nghiệm Hiện Trường
          </h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.8rem;">
            ${checklistSteps.length > 0 ? `
              <div style="background:rgba(18,24,38,0.5); padding:0.8rem; border-radius:6px; border:1px solid rgba(255,255,255,0.06);">
                <h3 style="font-size:0.84rem; color:#FEF3C7; font-weight:600; margin:0 0 0.4rem 0;">${checklistTitle}</h3>
                <ul style="list-style:none; padding:0; margin:0;">
                  ${checklistSteps.map(step => `
                    <li style="margin-bottom:0.35rem; font-size:0.8rem; color:var(--text-pure); line-height:1.45; display:flex; gap:0.35rem;">
                      <span style="color:${track.theme}; font-weight:700;">•</span>
                      <span>${typeof step === 'string' ? step : (step.step || step.action || JSON.stringify(step))}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            ` : ''}
            ${caseStudies.length > 0 ? `
              <div style="background:rgba(18,24,38,0.5); padding:0.8rem; border-radius:6px; border:1px solid rgba(255,255,255,0.06);">
                <h3 style="font-size:0.84rem; color:#FEF3C7; font-weight:600; margin:0 0 0.4rem 0;">Án Nghiệm Thực Tế</h3>
                ${caseStudies.map(cs => `
                  <div style="border-left:2px solid ${track.theme}; padding-left:0.5rem; margin-bottom:0.4rem;">
                    <div style="font-weight:600; color:#FEF3C7; font-size:0.8rem;">${cs.case_title || cs.location || 'Hiện trường'}</div>
                    <div style="font-size:0.76rem; color:var(--text-muted); line-height:1.35;">${cs.diagnosis || cs.analysis || cs.notes || ''}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </section>
      `;
    }

    // 19. Generate Compact Pagination Pills (Tiết 1, Tiết 2... Tiết N)
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
      <article class="reader-article-body" style="max-width:840px; margin:0 auto;">
        <!-- Breadcrumb Navigation -->
        <nav class="reader-breadcrumb" style="margin-bottom:0.8rem; font-size:0.78rem; color:var(--text-muted); display:flex; align-items:center; gap:0.35rem; flex-wrap:wrap;">
          <a href="#/" style="color:var(--text-muted); text-decoration:none;">Sảnh Thư Viện</a>
          <span>/</span>
          <a href="#/learn" style="color:var(--text-muted); text-decoration:none;">Giáo Trình</a>
          <span>/</span>
          <a href="#/learn/${this.currentTrack}/1" style="color:${track.theme}; text-decoration:none;">${track.vol}: ${track.title}</a>
          <span>/</span>
          <span style="color:var(--text-pure); font-weight:600;">Tiết ${lessonIndex}</span>
        </nav>

        <!-- Article Title & Meta Header (Kích thước thu nhỏ thanh thoát) -->
        <header class="reader-article-header" style="border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:1rem; margin-bottom:1.2rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:0.6rem; flex-wrap:wrap; margin-bottom:0.3rem;">
            <span class="reader-tag-badge" style="background:rgba(255,255,255,0.05); color:${track.theme}; border:1px solid ${track.theme}44; font-size:0.7rem; font-weight:700; padding:0.15rem 0.5rem; border-radius:4px; text-transform:uppercase; letter-spacing:0.04em;">
              ${track.vol} • TIẾT ${lessonIndex} / ${totalLessons}
            </span>
            <div style="font-size:0.75rem; color:var(--text-muted);">
              Chuyên Khảo Học Thuật
            </div>
          </div>

          <h1 class="reader-main-title" style="font-family:var(--font-title); font-size:1.15rem; font-weight:600; color:#FEF3C7; line-height:1.4; margin:0.2rem 0 0.35rem 0;">
            ${lesson.chapter_title}
          </h1>
          ${lesson.classic_source ? `
            <div style="display:inline-block; font-size:0.76rem; color:${track.theme}; background:rgba(255,255,255,0.03); border:1px solid ${track.theme}44; padding:0.2rem 0.6rem; border-radius:4px; margin-bottom:0.35rem; font-weight:600;">
              Thư Tịch Cổ Nguyên Tác: ${lesson.classic_source}
            </div>
          ` : ''}
          <p class="reader-subtitle" style="font-size:0.86rem; color:var(--text-muted); line-height:1.45; margin:0;">
            ${lesson.sub_title}
          </p>
        </header>

        <!-- Dynamic Content Body -->
        <div class="reader-rendered-content">
          ${contentHtml}
        </div>

        <!-- SLEEK COMPACT PAGINATION -->
        <footer class="reader-article-footer" style="border-top:1px solid rgba(255,255,255,0.08); padding-top:1.2rem; margin-top:1.8rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
            ${prevIndex ? `
              <a href="#/learn/${this.currentTrack}/${prevIndex}" class="reader-nav-btn" style="background:rgba(255,255,255,0.04); color:var(--text-pure); border:1px solid rgba(255,255,255,0.1); padding:0.4rem 0.8rem; border-radius:6px; text-decoration:none; font-size:0.8rem; font-weight:600;">
                ← Tiết Trước
              </a>
            ` : `<div style="width:70px;"></div>`}

            <div class="pag-pills-container" style="display:flex; gap:0.25rem; flex-wrap:wrap; justify-content:center;">
              ${pillsHtml}
            </div>

            ${nextIndex ? `
              <a href="#/learn/${this.currentTrack}/${nextIndex}" class="reader-nav-btn" style="background:${track.theme}; color:#0B0E14; padding:0.4rem 0.8rem; border-radius:6px; text-decoration:none; font-size:0.8rem; font-weight:700;">
                Tiết Tiếp →
              </a>
            ` : `
              <a href="#/learn" class="reader-nav-btn" style="background:rgba(255,255,255,0.08); color:#FEF3C7; padding:0.4rem 0.8rem; border-radius:6px; text-decoration:none; font-size:0.8rem; font-weight:600;">
                Hết Tập →
              </a>
            `}
          </div>
        </footer>
      </article>
    `;
  }

  // =========================================================================
  // UNIVERSAL RIGHT CONTEXT ENGINE: LUÔN CÓ THUẬT NGỮ & DẪN CHIẾU KINH ĐIỂN
  // =========================================================================
  renderRightContext(track, lesson) {
    const contextContainer = document.getElementById('shell-right-context');
    if (!contextContainer) return;

    let terms = [];
    let masters = [];

    // Extract terms
    if (lesson.scholarly_analysis && Array.isArray(lesson.scholarly_analysis.term_glossary)) {
      terms = lesson.scholarly_analysis.term_glossary.map(t => ({ term: t.term, definition: t.plain_vn || t.definition || t.desc || '' }));
    } else if (lesson.ontology && Array.isArray(lesson.ontology.principles)) {
      terms = lesson.ontology.principles.map(p => ({ term: p.name, definition: p.desc || p.meaning || '' }));
    } else if (lesson.ruler_388_structure && Array.isArray(lesson.ruler_388_structure.palaces)) {
      terms = lesson.ruler_388_structure.palaces.map(p => ({ term: `Cung ${p.name || p.palace_name} (${(p.type === 'cat' || p.nature === 'Cát') ? 'Cát' : 'Hung'})`, definition: p.desc || (Array.isArray(p.sub_palaces) ? p.sub_palaces.join(', ') : (p.meaning || '')) }));
    } else if (lesson.five_elements_worship && Array.isArray(lesson.five_elements_worship.elements)) {
      terms = lesson.five_elements_worship.elements.map(e => ({ term: e.element, definition: `${e.items} — ${e.role || e.meaning || ''}` }));
    } else if (lesson.taboo_categories) {
      lesson.taboo_categories.forEach(cat => {
        (cat.items || []).forEach(it => {
          terms.push({ term: it.name || it.title, definition: it.danger || it.remedy || it.consequence || 'Đại kỵ thần vị gia trạch' });
        });
      });
    } else if (lesson.apartment_taboos && Array.isArray(lesson.apartment_taboos.taboos)) {
      lesson.apartment_taboos.taboos.forEach(it => {
        terms.push({ term: it.title, definition: it.danger || it.solution || '' });
      });
    }

    // Extract masters / sources
    if (lesson.scholarly_analysis && Array.isArray(lesson.scholarly_analysis.masters_views)) {
      masters = lesson.scholarly_analysis.masters_views.map(mv => ({
        master: mv.master,
        work: mv.work || '',
        perspective: mv.perspective || mv.view || ''
      }));
    } else if (lesson.canonical_texts && lesson.canonical_texts.length > 0) {
      masters = lesson.canonical_texts.map(ct => ({ master: 'Kinh Điển', work: ct.source || '', perspective: ct.meaning || '' }));
    } else {
      const bWithQuote = [lesson.ontology, lesson.ruler_classification, lesson.incense_burners_layout, lesson.preparation_and_timing, lesson.deity_nature, lesson.spiritual_hierarchy, lesson.ancestral_hall_ontology, lesson.hanging_altar_heights, lesson.talisman_anatomy].find(b => b && b.quote);
      if (bWithQuote) {
        masters = [{ master: 'Cổ Thư', work: bWithQuote.quote_source || 'Chu Tử Gia Lễ', perspective: bWithQuote.quote }];
      }
    }

    const glossaryHtml = terms.slice(0, 8).map(g => `
      <div class="context-term-item" style="margin-bottom:0.6rem; border-bottom:1px solid rgba(255,255,255,0.04); padding-bottom:0.4rem;">
        <strong style="color:${track.theme}; font-size:0.82rem; display:block; margin-bottom:0.1rem;">${g.term}</strong>
        <p style="font-size:0.78rem; color:var(--text-muted); line-height:1.4; margin:0;">${g.definition}</p>
      </div>
    `).join('');

    const mastersHtml = masters.slice(0, 4).map(mv => `
      <div class="context-master-item" style="background:rgba(255,255,255,0.02); border-left:2px solid ${track.theme}; padding:0.4rem 0.6rem; border-radius:0 4px 4px 0; margin-bottom:0.4rem; font-size:0.78rem;">
        <strong style="color:#FEF3C7;">${mv.master}</strong>${mv.work ? ` (${mv.work})` : ''}: <span style="color:var(--text-muted);">${mv.perspective}</span>
      </div>
    `).join('');

    contextContainer.innerHTML = `
      <div class="context-panel-content" style="padding:0.8rem 0.7rem;">
        <h3 style="font-size:0.8rem; color:${track.theme}; font-weight:700; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:0.6rem;">
          Thuật Ngữ Trong Tiết
        </h3>
        <div class="context-terms-list" style="margin-bottom:1.2rem;">
          ${glossaryHtml || '<div style="font-size:0.78rem; color:var(--text-muted);">Không có thuật ngữ riêng.</div>'}
        </div>

        <h3 style="font-size:0.8rem; color:${track.theme}; font-weight:700; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:0.6rem;">
          Dẫn Chiếu Cổ Điển
        </h3>
        <div class="context-masters-list">
          ${mastersHtml || '<div style="font-size:0.78rem; color:var(--text-muted);">Không có dẫn chiếu bổ sung.</div>'}
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

    let terms = [];
    if (lesson.scholarly_analysis && Array.isArray(lesson.scholarly_analysis.term_glossary)) {
      terms = lesson.scholarly_analysis.term_glossary.map(t => ({ term: t.term, definition: t.plain_vn || t.definition || t.desc || '' }));
    } else if (lesson.ontology && Array.isArray(lesson.ontology.principles)) {
      terms = lesson.ontology.principles.map(p => ({ term: p.name, definition: p.desc || p.meaning || '' }));
    } else if (lesson.ruler_388_structure && Array.isArray(lesson.ruler_388_structure.palaces)) {
      terms = lesson.ruler_388_structure.palaces.map(p => ({ term: `Cung ${p.name || p.palace_name} (${(p.type === 'cat' || p.nature === 'Cát') ? 'Cát' : 'Hung'})`, definition: p.desc || (Array.isArray(p.sub_palaces) ? p.sub_palaces.join(', ') : (p.meaning || '')) }));
    } else if (lesson.five_elements_worship && Array.isArray(lesson.five_elements_worship.elements)) {
      terms = lesson.five_elements_worship.elements.map(e => ({ term: e.element, definition: `${e.items} — ${e.role || e.meaning || ''}` }));
    } else if (lesson.taboo_categories) {
      lesson.taboo_categories.forEach(cat => {
        (cat.items || []).forEach(it => {
          terms.push({ term: it.name || it.title, definition: it.danger || it.remedy || it.consequence || 'Đại kỵ thần vị gia trạch' });
        });
      });
    } else if (lesson.apartment_taboos && Array.isArray(lesson.apartment_taboos.taboos)) {
      lesson.apartment_taboos.taboos.forEach(it => {
        terms.push({ term: it.title, definition: it.danger || it.solution || '' });
      });
    }

    const listHtml = terms.slice(0, 15).map(g => `
      <div style="border-bottom:1px solid rgba(255,255,255,0.06); padding:0.6rem 0;">
        <div style="font-weight:600; color:${track.theme}; margin-bottom:0.15rem; font-size:0.88rem;">${g.term}</div>
        <div style="font-size:0.82rem; color:var(--text-muted); line-height:1.45;">${g.definition}</div>
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
