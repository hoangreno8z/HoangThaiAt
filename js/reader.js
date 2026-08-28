// =========================================================================
// HUYỀN HỌC MỤ — SCHOLARLY READER & LEARNING SHELL CONTROLLER (PHASE 4)
// =========================================================================

class ScholarlyReader {
  constructor() {
    this.currentTrack = 'nen-tang';
    this.currentLessonIndex = 1;
    this.currentViewMode = 'reading'; // 'reading' | 'research'
    this.tracks = {
      'nen-tang': {
        title: 'Bản Thể Luận Âm Dương & Ngũ Hành',
        badge: '10 Tiết Nền Tảng',
        school: 'BẢN THỂ LUẬN',
        theme: '#FBBF24',
        desc: 'Khởi nguyên vũ trụ từ Vô Cực, Thái Cực, Âm Dương, Tứ Tượng, Bát Quái, Ngũ Hành sinh khắc đến Hà Đồ Lạc Thư.',
        prereq: 'Không có (Dành cho mọi người)',
        prereqLink: null,
        conceptTags: ['CPT-000', 'CPT-001', 'CPT-002', 'CPT-003', 'CPT-004', 'CPT-005', 'CPT-006', 'CPT-007', 'CPT-008', 'CPT-009', 'CPT-010'],
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
        title: 'Địa Lý Loan Đầu Hình Thế Phái',
        badge: '10 Tiết Loan Đầu',
        school: 'LOAN ĐẦU PHÁI',
        theme: '#D97706',
        desc: 'Chuyên khảo hình thế địa lý: Tầm Long, Tróc Mạch, Điểm Huyệt, Sa Pháp, Thủy Pháp, Minh Đường và Án Sơn.',
        prereq: 'Bản Thể Luận (Tiết 1 - 4)',
        prereqLink: '#/learn/nen-tang/1',
        conceptTags: ['CPT-013', 'Long Mạch', 'Tứ Tượng Loan Đầu', 'Minh Đường'],
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
        title: 'Bát Trạch Minh Kính Lý Khí Phái',
        badge: '10 Tiết Bát Trạch',
        school: 'BÁT TRẠCH PHÁI',
        theme: '#60A5FA',
        desc: 'Phương pháp Cung Phi Mệnh Quái, phối hợp Đông Tây Tứ Trạch, 8 Du Niên Cát Hung và Quái Biến Hào.',
        prereq: 'Bản Thể Luận (Tiết 5 & 6: Bát Quái)',
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
        title: 'Tam Hợp Phái Thủy Pháp Huyết Mạch',
        badge: '10 Tiết Tam Hợp',
        school: 'TAM HỢP PHÁI',
        theme: '#34D399',
        desc: 'Cổ thư La Kinh Thấu Giải: 12 Cung Trường Sinh, Tứ Đại Cục Thủy Pháp và Hoàng Tuyền Sát Quyết.',
        prereq: 'Bản Thể Luận (Tiết 7-10: Ngũ Hành & Lạc Thư)',
        prereqLink: '#/learn/nen-tang/7',
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
        title: 'Huyền Không Phi Tinh Cửu Cung',
        badge: '10 Tiết Huyền Không',
        school: 'HUYỀN KHÔNG PHÁI',
        theme: '#C084FC',
        desc: 'Tam Nguyên Cửu Vận, Tinh Bàn 24 Sơn Hướng, phi tinh Cửu Cung Lạc Thư và Tử Bạch Quyết Vận 9 (2024-2043).',
        prereq: 'Bản Thể Luận (Tiết 6 & 10: Hậu Thiên Bát Quái & Lạc Thư)',
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
        title: 'Khoa Nghi Phong Thủy Thờ Cúng Chánh Tông',
        badge: '10 Tiết Thờ Cúng',
        school: 'KHOA NGHI TẾ TỰ',
        theme: '#F59E0B',
        desc: 'Định vị thần vị gia trạch, nguyên tắc Tọa Cát Hướng Cát, thước Lỗ Ban 38.8cm âm phần, bài trí ngũ hành và khoa nghi an vị.',
        prereq: 'Bản Thể Luận (Tiết 4 & 5: Ngũ Hành & Bát Quái)',
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

  // Render Dashboard Lộ Trình Học Tập khi vào #/learn
  renderLearningDashboard() {
    const readerContainer = document.getElementById('shell-main-content');
    if (!readerContainer) return;

    this.renderLeftTree('', 0);

    const tracksHtml = Object.entries(this.tracks).map(([tKey, track]) => {
      const validParts = track.parts.filter(p => p !== null);
      const completedCount = validParts.filter((p, i) => this.isCompleted(tKey, i + 1)).length;
      const pct = Math.round((completedCount / validParts.length) * 100) || 0;

      const tagsHtml = (track.conceptTags || []).map(tag => `
        <span style="font-size:0.72rem; background:rgba(255,255,255,0.06); color:${track.theme}; padding:0.2rem 0.5rem; border-radius:12px; border:1px solid ${track.theme}33;">
          #${tag}
        </span>
      `).join('');

      return `
        <div class="learning-track-card" style="background:#121722; border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:1.5rem; display:flex; flex-direction:column; justify-content:space-between; transition:all 0.25s ease;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
              <span style="font-size:0.75rem; font-weight:800; color:${track.theme}; background:${track.theme}18; padding:0.25rem 0.6rem; border-radius:12px; text-transform:uppercase;">
                ${track.badge}
              </span>
              <span style="font-size:0.8rem; color:var(--text-muted); font-weight:700;">
                ${completedCount}/${validParts.length} Tiết (${pct}%)
              </span>
            </div>

            <!-- Progress Bar -->
            <div style="width:100%; height:6px; background:rgba(255,255,255,0.08); border-radius:3px; overflow:hidden; margin-bottom:1rem;">
              <div style="width:${pct}%; height:100%; background:${track.theme}; transition:width 0.4s ease;"></div>
            </div>

            <h3 style="font-family:var(--font-title); font-size:1.3rem; color:#FEF3C7; margin:0 0 0.5rem 0;">
              ${track.title}
            </h3>
            <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.55; margin-bottom:1rem;">
              ${track.desc}
            </p>

            <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.8rem;">
              <strong>Tiền đề:</strong> <span style="color:#FEF3C7;">${track.prereq}</span>
            </div>

            <div style="display:flex; flex-wrap:wrap; gap:0.4rem; margin-bottom:1.5rem;">
              ${tagsHtml}
            </div>
          </div>

          <a href="#/learn/${tKey}/1" style="background:${track.theme}; color:#0B0E14; text-decoration:none; padding:0.6rem 1.2rem; border-radius:8px; font-weight:800; font-size:0.9rem; text-align:center; display:block; transition:all 0.2s ease;">
            Bắt Đầu Học Giáo Trình ➡️
          </a>
        </div>
      `;
    }).join('');

    readerContainer.innerHTML = `
      <div style="max-width:900px; margin:0 auto;">
        <header style="border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:1.5rem; margin-bottom:2rem;">
          <div style="font-size:0.8rem; font-weight:800; color:#FBBF24; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:0.4rem;">
            🎓 HỆ THỐNG GIÁO TRÌNH SƯ PHẠM
          </div>
          <h1 style="font-family:var(--font-title); font-size:2.2rem; color:#FEF3C7; margin:0 0 0.6rem 0;">
            Lộ Trình Học Tập Huyền Học Chánh Tông
          </h1>
          <p style="color:var(--text-muted); font-size:1rem; line-height:1.6; margin:0;">
            Chọn 1 trong 5 đại giáo trình sư phạm dưới đây để bắt đầu học tuần tự từ căn bản đến thực chiến cao cấp.
          </p>
        </header>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(380px, 1fr)); gap:1.5rem;">
          ${tracksHtml}
        </div>
      </div>
    `;

    const rightPane = document.getElementById('shell-right-context');
    if (rightPane) {
      rightPane.innerHTML = `
        <div style="padding:1.5rem 1.2rem;">
          <h3 style="font-size:0.95rem; color:#FBBF24; font-weight:800; text-transform:uppercase; margin-bottom:1rem;">
            💡 Hướng Dẫn Học Tập
          </h3>
          <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.6; margin-bottom:1rem;">
            Người mới nên bắt đầu từ <strong>Bản Thể Luận Âm Dương & Ngũ Hành</strong> để hiểu rõ bản chất trước khi đi vào các phái ứng dụng.
          </p>
          <div style="background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.2); border-radius:8px; padding:1rem; font-size:0.82rem; color:#FEF3C7; line-height:1.5;">
            Trạng thái hoàn thành từng tiết sẽ được lưu tự động trên thiết bị của bạn.
          </div>
        </div>
      `;
    }
  }

  loadLesson(trackId, lessonIndex = 1) {
    if (!this.tracks[trackId]) {
      this.renderLearningDashboard();
      return;
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
        const title = p.chapter_title ? p.chapter_title.replace(/^Tiết\s+[IVXLCDM]+:\s*/i, '') : `Bài ${lNum}`;
        const isCompleted = this.isCompleted(tKey, lNum);

        return `
          <a href="#/learn/${tKey}/${lNum}" class="tree-item-link ${isActive ? 'active' : ''}" style="${isActive ? `color:${track.theme}; border-left-color:${track.theme}; font-weight:700;` : ''}">
            <span class="tree-item-status ${isCompleted ? 'completed' : ''}">${isCompleted ? '✓' : lNum}</span>
            <span class="tree-item-text">${title}</span>
          </a>
        `;
      }).join('');

      return `
        <div class="tree-track-group ${isTrackActive ? 'open' : ''}">
          <div class="tree-track-header" onclick="this.parentElement.classList.toggle('open')">
            <span class="tree-track-title" style="${isTrackActive ? `color:${track.theme};` : ''}">${track.title}</span>
            <span class="tree-track-count">${validParts.length} Tiết</span>
          </div>
          <div class="tree-track-list">
            ${itemsHtml}
          </div>
        </div>
      `;
    }).join('');
  }

  renderMainReader(track, lesson, lessonIndex) {
    const readerContainer = document.getElementById('shell-main-content');
    if (!readerContainer) return;

    const totalLessons = track.parts.filter(p => p !== null).length;
    const prevIndex = lessonIndex > 1 ? lessonIndex - 1 : null;
    const nextIndex = lessonIndex < totalLessons ? lessonIndex + 1 : null;

    const canonicalHtml = (lesson.canonical_texts || []).map(ct => `
      <div class="reader-quote-card" style="border-left:4px solid ${track.theme}; background:rgba(255,255,255,0.02); padding:1.2rem 1.5rem; border-radius:0 10px 10px 0; margin-bottom:1.5rem;">
        <div class="reader-hanzi-text" style="font-family:'Ma Shan Zheng', var(--font-title); font-size:1.3rem; color:${track.theme}; letter-spacing:0.06em; margin-bottom:0.5rem; line-height:1.6;">
          ${ct.hanzi}
        </div>
        <div class="reader-pinyin-text" style="font-style:italic; color:#FEF3C7; font-size:0.95rem; margin-bottom:0.6rem;">
          "${ct.pinyin}"
        </div>
        <div class="reader-vietnamese-text" style="color:var(--text-pure); font-size:1rem; line-height:1.75; margin-bottom:0.5rem;">
          <strong>Dịch nghĩa:</strong> ${ct.meaning}
        </div>
        <div class="reader-source-text" style="text-align:right; font-size:0.85rem; color:${track.theme}; font-weight:700;">
          — ${ct.source}
        </div>
      </div>
    `).join('');

    const applicationsHtml = (lesson.real_estate_applications || []).map(app => `
      <div class="reader-tier-card" style="background:rgba(18,24,38,0.7); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:1.1rem 1.3rem; margin-bottom:1rem;">
        <div style="font-weight:700; color:${track.theme}; font-size:0.98rem; margin-bottom:0.4rem; display:flex; align-items:center; gap:0.5rem;">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="${track.theme}" stroke-width="2.2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          ${app.tier}
        </div>
        <div style="font-size:0.92rem; color:var(--text-pure); line-height:1.65;">
          ${app.action_guide}
        </div>
      </div>
    `).join('');

    const checklistHtml = (lesson.actionable_checklist || []).map(step => `
      <li style="margin-bottom:0.6rem; font-size:0.95rem; color:var(--text-pure); line-height:1.6; display:flex; align-items:flex-start; gap:0.6rem;">
        <span style="color:${track.theme}; font-weight:800;">✓</span>
        <span>${step}</span>
      </li>
    `).join('');

    const casesHtml = (lesson.vietnam_case_studies || []).map(cs => `
      <div class="reader-case-card" style="background:rgba(7,9,14,0.6); border-left:3px solid ${track.theme}; padding:0.9rem 1.1rem; border-radius:4px; margin-bottom:0.8rem;">
        <div style="font-weight:700; color:#FEF3C7; font-size:0.92rem; margin-bottom:0.3rem;">
          ${cs.case_title || cs.location || 'Án Nghiệm Hiện Trường'}
        </div>
        <div style="font-size:0.88rem; color:var(--text-muted); margin-bottom:0.25rem; line-height:1.5;">
          <strong>Hiện trạng:</strong> ${cs.diagnosis || cs.analysis || ''}
        </div>
        <div style="font-size:0.88rem; color:${track.theme};">
          <strong>Hiệu nghiệm:</strong> ${cs.result || 'Thành công tốt đẹp'}
        </div>
      </div>
    `).join('');

    readerContainer.innerHTML = `
      <article class="reader-article-body">
        <!-- Breadcrumb Navigation -->
        <nav class="reader-breadcrumb" style="margin-bottom:1.5rem; font-size:0.85rem; color:var(--text-muted); display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
          <a href="#/" style="color:var(--text-muted); text-decoration:none;">Sảnh Thư Viện</a>
          <span>/</span>
          <a href="#/learn" style="color:var(--text-muted); text-decoration:none;">Giáo Trình</a>
          <span>/</span>
          <a href="#/learn/${this.currentTrack}" style="color:${track.theme}; text-decoration:none;">${track.title}</a>
          <span>/</span>
          <span style="color:var(--text-pure); font-weight:600;">Tiết ${lessonIndex}</span>
        </nav>

        <!-- Article Title & Meta Header -->
        <header class="reader-article-header" style="border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:1.8rem; margin-bottom:2rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:1rem; flex-wrap:wrap; margin-bottom:0.8rem;">
            <span class="reader-tag-badge" style="background:rgba(255,255,255,0.05); color:${track.theme}; border:1px solid ${track.theme}44; font-size:0.78rem; font-weight:800; padding:0.25rem 0.75rem; border-radius:20px; text-transform:uppercase; letter-spacing:0.06em;">
              ${track.school} • TIẾT ${lessonIndex} / ${totalLessons}
            </span>
            <div style="display:flex; gap:0.8rem; font-size:0.82rem; color:var(--text-muted);">
              <span>⏱️ ~15 phút đọc</span>
              <span>•</span>
              <span>🎓 Căn Bản Đến Chuyên Sâu</span>
            </div>
          </div>

          <h1 class="reader-main-title" style="font-family:var(--font-title); font-size:2rem; color:#FEF3C7; font-weight:800; line-height:1.35; margin:0.4rem 0 0.8rem 0;">
            ${lesson.chapter_title}
          </h1>
          <p class="reader-subtitle" style="font-size:1.05rem; color:var(--text-muted); line-height:1.6; margin:0 0 1.2rem 0;">
            ${lesson.sub_title}
          </p>

          <!-- Learning Objectives Banner -->
          <div class="learning-objectives-box" style="background:rgba(245,158,11,0.06); border:1px solid rgba(245,158,11,0.25); border-radius:10px; padding:1rem 1.3rem;">
            <div style="font-size:0.85rem; font-weight:800; color:${track.theme}; margin-bottom:0.5rem; text-transform:uppercase; letter-spacing:0.04em;">
              🎯 Mục Tiêu Bài Học:
            </div>
            <ul style="margin:0; padding-left:1.2rem; font-size:0.9rem; color:var(--text-pure); line-height:1.6;">
              <li>Nắm vững bản thể luận và nguyên tác kinh điển chữ Hán từ thư tịch cổ.</li>
              <li>Thấu triệt 5 tầng ứng dụng vật lý địa hình thực chiến từ quy hoạch đến nội thất.</li>
              <li>Tránh các sai lầm phổ biến và tự tin thực hành theo quy trình khảo sát chuẩn xác.</li>
            </ul>
          </div>
        </header>

        <!-- 1. Thư Tịch Cổ Điển -->
        <section class="reader-section-block" style="margin-bottom:2.5rem;">
          <h2 class="reader-section-title" style="font-size:1.3rem; color:${track.theme}; font-weight:700; margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            I. Cổ Huấn Nguyên Văn & Trích Dẫn Kinh Điển
          </h2>
          ${canonicalHtml}
        </section>

        <!-- 2. Cẩm Nang Ứng Dụng Thực Chiến 5 Tầng Lớp -->
        <section class="reader-section-block" style="margin-bottom:2.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:2rem;">
          <h2 class="reader-section-title" style="font-size:1.3rem; color:${track.theme}; font-weight:700; margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            II. Cẩm Nang Ứng Dụng Vật Lý Cho Mọi Tầng Lớp
          </h2>
          <div class="reader-tiers-grid">
            ${applicationsHtml}
          </div>
        </section>

        <!-- 3. Quy Trình Khảo Sát & Án Nghiệm Hiện Trường -->
        <section class="reader-section-block" style="margin-bottom:2.5rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:2rem;">
          <h2 class="reader-section-title" style="font-size:1.3rem; color:${track.theme}; font-weight:700; margin-bottom:1.2rem; display:flex; align-items:center; gap:0.5rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            III. Quy Trình Khảo Sát & Án Nghiệm Thực Tế
          </h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.5rem;">
            <div style="background:rgba(18,24,38,0.5); padding:1.2rem; border-radius:10px; border:1px solid rgba(255,255,255,0.06);">
              <h3 style="font-size:1rem; color:#FEF3C7; font-weight:700; margin-bottom:0.8rem;">Quy Trình Đo Đạc Hiện Trường</h3>
              <ul style="list-style:none; padding:0; margin:0;">
                ${checklistHtml}
              </ul>
            </div>
            <div style="background:rgba(18,24,38,0.5); padding:1.2rem; border-radius:10px; border:1px solid rgba(255,255,255,0.06);">
              <h3 style="font-size:1rem; color:#FEF3C7; font-weight:700; margin-bottom:0.8rem;">Án Nghiệm Thực Tế Tại Việt Nam</h3>
              ${casesHtml}
            </div>
          </div>
        </section>

        <!-- 4. Tự Kiểm Tra Kiến Thức Cốt Lõi (Check Your Understanding) -->
        <section class="reader-section-block" style="margin-bottom:3rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:2rem;">
          <h2 class="reader-section-title" style="font-size:1.3rem; color:${track.theme}; font-weight:700; margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            IV. Tự Kiểm Tra Kiến Thức Cốt Lõi
          </h2>
          <div style="background:rgba(18,24,38,0.7); border:1px solid rgba(245,158,11,0.3); border-radius:12px; padding:1.3rem 1.5rem;">
            <p style="font-weight:700; color:#FEF3C7; font-size:0.95rem; margin-bottom:0.8rem;">
              Câu hỏi cốt lõi: Bạn đã nắm vững cơ chế vật lý và nguyên tắc của bài học này chưa?
            </p>
            <div style="display:flex; flex-direction:column; gap:0.6rem; margin-bottom:1rem;">
              <label style="display:flex; align-items:center; gap:0.6rem; font-size:0.9rem; color:var(--text-pure); cursor:pointer;">
                <input type="checkbox" checked disabled style="accent-color:${track.theme};">
                <span>Đã hiểu nguồn gốc kinh điển và xuất xứ thư tịch cổ.</span>
              </label>
              <label style="display:flex; align-items:center; gap:0.6rem; font-size:0.9rem; color:var(--text-pure); cursor:pointer;">
                <input type="checkbox" checked disabled style="accent-color:${track.theme};">
                <span>Đã nắm rõ 5 tầng ứng dụng vật lý địa hình thực chiến.</span>
              </label>
              <label style="display:flex; align-items:center; gap:0.6rem; font-size:0.9rem; color:var(--text-pure); cursor:pointer;">
                <input type="checkbox" checked disabled style="accent-color:${track.theme};">
                <span>Đã phân biệt được thông tin chánh tông với định kiến thương mại.</span>
              </label>
            </div>
            <div style="font-size:0.85rem; color:${track.theme}; font-weight:700;">
              ✓ Hệ thống đã ghi nhận tiến độ hoàn thành bài học của bạn.
            </div>
          </div>
        </section>

        <!-- Reader Navigation Footer -->
        <footer class="reader-article-footer" style="border-top:1px solid rgba(255,255,255,0.1); padding-top:2rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
          ${prevIndex ? `
            <a href="#/learn/${this.currentTrack}/${prevIndex}" class="reader-nav-btn prev-btn" style="background:rgba(255,255,255,0.04); color:var(--text-pure); border:1px solid rgba(255,255,255,0.1); padding:0.6rem 1.2rem; border-radius:8px; text-decoration:none; display:flex; align-items:center; gap:0.5rem; font-weight:600;">
              <span>⬅️ Bài Trước (Tiết ${prevIndex})</span>
            </a>
          ` : `<div style="flex:1;"></div>`}

          <span style="font-size:0.9rem; color:var(--text-muted); font-weight:700;">
            Tiến độ: ${lessonIndex} / ${totalLessons} Tiết
          </span>

          ${nextIndex ? `
            <a href="#/learn/${this.currentTrack}/${nextIndex}" class="reader-nav-btn next-btn" style="background:linear-gradient(135deg, #D97706, #B45309); color:#fff; border:1px solid ${track.theme}; padding:0.6rem 1.4rem; border-radius:8px; text-decoration:none; display:flex; align-items:center; gap:0.5rem; font-weight:700; box-shadow:0 0 15px rgba(217,119,6,0.3);">
              <span>Bài Kế Tiếp (Tiết ${nextIndex}) ➡️</span>
            </a>
          ` : `
            <a href="#/learn" class="reader-nav-btn complete-btn" style="background:linear-gradient(135deg, #059669, #047857); color:#fff; padding:0.6rem 1.4rem; border-radius:8px; text-decoration:none; font-weight:700;">
              <span>🎉 Hoàn Thành Tuyến Này</span>
            </a>
          `}
        </footer>
      </article>
    `;
  }

  renderRightContext(track, lesson) {
    const contextContainer = document.getElementById('shell-right-context');
    if (!contextContainer) return;

    const glossaryItems = lesson.scholarly_analysis?.term_glossary || [];
    const mastersViews = lesson.scholarly_analysis?.masters_views || [];

    const glossaryHtml = glossaryItems.map(g => `
      <div class="context-term-item" style="border-bottom:1px solid rgba(255,255,255,0.06); padding:0.75rem 0;">
        <div style="font-weight:700; color:${track.theme}; font-size:0.9rem; margin-bottom:0.2rem;">
          ${g.term}
        </div>
        <div style="font-size:0.84rem; color:var(--text-muted); line-height:1.5;">
          ${g.definition || g.plain_vn || ''}
        </div>
      </div>
    `).join('');

    const mastersHtml = mastersViews.map(mv => `
      <div class="context-master-item" style="background:rgba(255,255,255,0.02); border-left:2px solid ${track.theme}; padding:0.6rem 0.8rem; border-radius:0 6px 6px 0; margin-bottom:0.6rem; font-size:0.84rem;">
        <strong style="color:#FEF3C7;">${mv.master}</strong> (${mv.work}): <span style="color:var(--text-muted);">${mv.perspective}</span>
      </div>
    `).join('');

    contextContainer.innerHTML = `
      <div class="context-panel-content" style="padding:1.5rem 1.2rem;">
        <h3 style="font-size:0.95rem; color:${track.theme}; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:1rem; display:flex; align-items:center; gap:0.4rem;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          Thuật Ngữ Trong Bài
        </h3>
        <div class="context-terms-list" style="margin-bottom:1.8rem;">
          ${glossaryHtml || '<div style="font-size:0.85rem; color:var(--text-muted);">Không có thuật ngữ riêng.</div>'}
        </div>

        <h3 style="font-size:0.95rem; color:${track.theme}; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:1rem; display:flex; align-items:center; gap:0.4rem;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          Đối Chiếu Danh Sư
        </h3>
        <div class="context-masters-list">
          ${mastersHtml || '<div style="font-size:0.85rem; color:var(--text-muted);">Không có dẫn chiếu bổ sung.</div>'}
        </div>
      </div>
    `;
  }

  // Mobile Bottom Sheet Controls
  openMobileToc() {
    const track = this.tracks[this.currentTrack];
    if (!track) return;

    const listHtml = track.parts.filter(p => p !== null).map((p, idx) => {
      const lNum = idx + 1;
      const isActive = lNum === this.currentLessonIndex;
      const title = p.chapter_title ? p.chapter_title.replace(/^Tiết\s+[IVXLCDM]+:\s*/i, '') : `Bài ${lNum}`;

      return `
        <a href="#/learn/${this.currentTrack}/${lNum}" onclick="window.scholarlyReader.closeBottomSheet()" class="sheet-toc-link ${isActive ? 'active' : ''}" style="display:block; padding:0.8rem 1rem; border-bottom:1px solid rgba(255,255,255,0.06); text-decoration:none; color:${isActive ? track.theme : 'var(--text-pure)'}; font-weight:${isActive ? '700' : '500'};">
          <span style="display:inline-block; width:26px; height:26px; border-radius:50%; background:rgba(255,255,255,0.08); text-align:center; line-height:26px; font-size:0.8rem; margin-right:0.5rem;">${lNum}</span>
          ${title}
        </a>
      `;
    }).join('');

    this.showBottomSheet(`Mục Lục: ${track.title}`, listHtml);
  }

  openMobileGlossary() {
    const track = this.tracks[this.currentTrack];
    const lesson = track?.parts[this.currentLessonIndex - 1];
    if (!lesson) return;

    const terms = lesson.scholarly_analysis?.term_glossary || [];
    const listHtml = terms.map(g => `
      <div style="border-bottom:1px solid rgba(255,255,255,0.08); padding:0.8rem 0;">
        <div style="font-weight:700; color:${track.theme}; margin-bottom:0.2rem;">${g.term}</div>
        <div style="font-size:0.88rem; color:var(--text-muted); line-height:1.5;">${g.definition || g.plain_vn || ''}</div>
      </div>
    `).join('') || '<div style="color:var(--text-muted);">Không có chú giải riêng trong bài này.</div>';

    this.showBottomSheet(`Chú Giải Thuật Ngữ (Tiết ${this.currentLessonIndex})`, listHtml);
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

  // Progress Management
  saveProgress(trackId, lessonIndex) {
    try {
      const key = `progress_${trackId}_${lessonIndex}`;
      localStorage.setItem(key, 'completed');
    } catch (e) {
      // Ignore localStorage errors
    }
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
