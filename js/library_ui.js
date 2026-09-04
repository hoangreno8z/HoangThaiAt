// =========================================================================
// HUYỀN HỌC MỤ — THƯ KHỐ CỔ ĐIỂN CHÁNH TÔNG (LIBRARY UI CONTROLLER)
// TOÀN THƯ 22 BỘ KINH ĐIỂN: KHẢO CHỨNG THƯ TỊCH • HÁN VĂN • DỊCH NGHĨA
// LUẬN GIẢI KHÍ TRƯỜNG • TÁC ĐỘNG ĐỜI SỐNG • QUY TRÌNH THỰC HÀNH CỔ TRUYỀN
// =========================================================================

class LibraryUI {
  constructor() {
    this.currentCategory = 'ALL';
  }

  getBooks() {
    if (typeof window !== 'undefined' && window.KHO_CO_THU_KINH_DIEN_CORPUS) {
      return window.KHO_CO_THU_KINH_DIEN_CORPUS;
    }
    return (typeof KHO_CO_THU_KINH_DIEN_CORPUS !== 'undefined') ? KHO_CO_THU_KINH_DIEN_CORPUS : [];
  }

  filterCategory(cat) {
    this.currentCategory = cat;
    this.renderCatalog();
  }

  renderCatalog() {
    const gate = document.getElementById('gate-library');
    if (!gate) return;

    const allBooks = this.getBooks();
    const filteredBooks = (this.currentCategory === 'ALL')
      ? allBooks
      : allBooks.filter(b => b.category === this.currentCategory);

    const filterButtonsHtml = `
      <div style="display:flex; justify-content:center; gap:0.6rem; flex-wrap:wrap; margin-bottom:2rem; width:100%;">
        <button onclick="window.libraryUI.filterCategory('ALL')" style="background:${this.currentCategory === 'ALL' ? '#FBBF24' : 'rgba(255,255,255,0.05)'}; color:${this.currentCategory === 'ALL' ? '#07090E' : 'var(--text-primary)'}; border:1px solid ${this.currentCategory === 'ALL' ? '#FBBF24' : 'rgba(255,255,255,0.1)'}; padding:0.5rem 1rem; border-radius:8px; font-weight:700; font-size:0.85rem; cursor:pointer;">
          Tất Cả Thư Khố (${allBooks.length} Bộ Kinh Điển)
        </button>
        <button onclick="window.libraryUI.filterCategory('LOAN_DAU_CHON_DAT')" style="background:${this.currentCategory === 'LOAN_DAU_CHON_DAT' ? '#34D399' : 'rgba(255,255,255,0.05)'}; color:${this.currentCategory === 'LOAN_DAU_CHON_DAT' ? '#07090E' : 'var(--text-primary)'}; border:1px solid ${this.currentCategory === 'LOAN_DAU_CHON_DAT' ? '#34D399' : 'rgba(255,255,255,0.1)'}; padding:0.5rem 1rem; border-radius:8px; font-weight:700; font-size:0.85rem; cursor:pointer;">
          1. Chọn Đất & Tầm Long (${allBooks.filter(b => b.category === 'LOAN_DAU_CHON_DAT').length} Bộ)
        </button>
        <button onclick="window.libraryUI.filterCategory('DUONG_TRACH_XEM_NHA')" style="background:${this.currentCategory === 'DUONG_TRACH_XEM_NHA' ? '#38BDF8' : 'rgba(255,255,255,0.05)'}; color:${this.currentCategory === 'DUONG_TRACH_XEM_NHA' ? '#07090E' : 'var(--text-primary)'}; border:1px solid ${this.currentCategory === 'DUONG_TRACH_XEM_NHA' ? '#38BDF8' : 'rgba(255,255,255,0.1)'}; padding:0.5rem 1rem; border-radius:8px; font-weight:700; font-size:0.85rem; cursor:pointer;">
          2. Xem Nhà & Trạch Thuật (${allBooks.filter(b => b.category === 'DUONG_TRACH_XEM_NHA').length} Bộ)
        </button>
        <button onclick="window.libraryUI.filterCategory('THIEN_VAN_CHIEM_TINH')" style="background:${this.currentCategory === 'THIEN_VAN_CHIEM_TINH' ? '#C084FC' : 'rgba(255,255,255,0.05)'}; color:${this.currentCategory === 'THIEN_VAN_CHIEM_TINH' ? '#07090E' : 'var(--text-primary)'}; border:1px solid ${this.currentCategory === 'THIEN_VAN_CHIEM_TINH' ? '#C084FC' : 'rgba(255,255,255,0.1)'}; padding:0.5rem 1rem; border-radius:8px; font-weight:700; font-size:0.85rem; cursor:pointer;">
          3. Thiên Văn & Tam Thức (${allBooks.filter(b => b.category === 'THIEN_VAN_CHIEM_TINH').length} Bộ)
        </button>
      </div>
    `;

    const gridHtml = `
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1.3rem; width:100%;">
        ${filteredBooks.map(b => `
          <div class="library-book-card" style="background:#121722; border:1px solid rgba(255,255,255,0.08); border-top:4px solid ${b.category === 'LOAN_DAU_CHON_DAT' ? '#34D399' : (b.category === 'DUONG_TRACH_XEM_NHA' ? '#38BDF8' : '#C084FC')}; border-radius:12px; padding:1.3rem; display:flex; flex-direction:column; justify-content:space-between; transition:transform 0.2s ease;">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem; flex-wrap:wrap; gap:0.4rem;">
                <span style="font-size:0.72rem; font-weight:800; color:#FEF3C7; background:rgba(255,255,255,0.06); padding:0.2rem 0.5rem; border-radius:4px;">
                  ${b.grade}
                </span>
                <span style="font-size:0.75rem; color:#94A3B8;">${b.extantDating ? b.extantDating.split('.')[0] : ''}</span>
              </div>

              <h3 style="font-family:var(--font-title); font-size:1.25rem; color:#FEF3C7; margin:0 0 0.25rem 0;">
                ${b.title}
              </h3>
              <div style="font-size:0.82rem; color:#38BDF8; font-weight:700; margin-bottom:0.6rem;">
                Tác giả truyền thống: ${b.traditionalAuthor || b.author}
              </div>

              <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.5; margin-bottom:0.8rem;">
                ${b.desc}
              </p>

              <div style="font-size:0.75rem; color:#94A3B8; margin-bottom:1.2rem; background:#0D111A; padding:0.4rem 0.6rem; border-radius:4px;">
                <strong>Lưu trữ:</strong> ${b.repository} • <strong>${b.chapters.length} Thiên/Chương Toàn Bản</strong>
              </div>
            </div>

            <a 
              href="#/library/${b.id}/1" 
              onclick="event.preventDefault(); window.location.hash='#/library/${b.id}/1'; window.libraryUI.renderBookReader('${b.id}', '1');"
              style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.15); color:#FEF3C7; text-decoration:none; padding:0.6rem 1rem; border-radius:6px; font-weight:700; font-size:0.82rem; text-align:center; display:block; transition:all 0.2s ease; cursor:pointer;"
            >
              Mở Đọc Khảo Chứng & Luận Giải Sâu Sắc →
            </a>
          </div>
        `).join('')}
      </div>
    `;

    gate.innerHTML = `
      <div style="max-width:1200px; margin:0 auto; padding:1.5rem 1rem;">
        <div style="margin-bottom:1.5rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:1rem;">
          <span style="font-size:0.75rem; font-weight:800; color:#FBBF24; text-transform:uppercase; letter-spacing:0.08em;">THƯ KHỐ CHÁNH TÔNG</span>
          <h2 style="font-family:var(--font-title); font-size:1.8rem; color:#FEF3C7; margin:0.2rem 0 0.3rem 0;">
            Đại Kho Tàng 22 Bộ Thư Tịch Cổ Điển
          </h2>
          <p style="font-size:0.86rem; color:var(--text-muted); margin:0;">
            Khảo chứng văn bản học nghiêm cẩn, nguyên văn chữ Hán, dịch nghĩa tường tận, luận giải bản chất khí trường và quy trình khảo sát thực chiến chánh tông.
          </p>
        </div>

        ${filterButtonsHtml}
        ${gridHtml}
      </div>
    `;
  }

  renderBookReader(bookId, chapterId = '1') {
    const allBooks = this.getBooks();
    const book = allBooks.find(b => b.id === bookId) || allBooks[0];
    const chapter = book.chapters.find(c => c.id === chapterId) || book.chapters[0];
    const container = document.getElementById('gate-library');
    if (!container) return;

    const formatMultiLine = (str) => {
      if (!str) return '';
      return str.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
          if (line.startsWith('- ') || line.startsWith('• ')) {
            const bText = line.replace(/^[-•]\s*/, '').trim();
            const colonIdx = bText.indexOf(':');
            let bHtml = bText;
            if (colonIdx !== -1 && colonIdx < 50) {
              const k = bText.slice(0, colonIdx).trim();
              const v = bText.slice(colonIdx + 1).trim();
              bHtml = `<strong style="color:#38BDF8;">${k}:</strong> <span>${v}</span>`;
            }
            return `<div style="margin:0 0 0.4rem 0.5rem; padding-left:1.1rem; position:relative; line-height:1.7; color:var(--text-pure); font-size:0.88rem;"><span style="color:#FBBF24; position:absolute; left:0.2rem; font-weight:700;">•</span>${bHtml}</div>`;
          }
          const numMatch = line.match(/^(\d+[\.\)])\s*(.*)$/);
          if (numMatch) {
            const rawContent = numMatch[2].trim();
            const colonIdx = rawContent.indexOf(':');
            let bodyHtml = rawContent;
            if (colonIdx !== -1 && colonIdx < 50) {
              const k = rawContent.slice(0, colonIdx).trim();
              const v = rawContent.slice(colonIdx + 1).trim();
              bodyHtml = `<strong style="color:#38BDF8;">${k}:</strong> <span>${v}</span>`;
            }
            return `<div style="margin:0 0 0.5rem 0.2rem; display:flex; gap:0.45rem; align-items:baseline; line-height:1.75; font-size:0.88rem;"><span style="color:#FBBF24; font-weight:800;">${numMatch[1]}</span><div style="color:var(--text-pure); flex:1;">${bodyHtml}</div></div>`;
          }
          return `<p style="margin:0 0 0.65rem 0; line-height:1.75; font-size:0.88rem; text-align:justify; color:var(--text-pure);">${line}</p>`;
        })
        .join('');
    };

    container.innerHTML = `
      <div style="max-width:1150px; margin:0 auto; padding:1.5rem 1rem;">
        
        <!-- Breadcrumb Header -->
        <nav style="margin-bottom:1.2rem; font-size:0.82rem; color:var(--text-muted); display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
          <a href="#/" style="color:var(--text-muted); text-decoration:none;">Sảnh Thư Viện</a>
          <span>/</span>
          <a 
            href="#/library" 
            onclick="event.preventDefault(); window.location.hash='#/library'; window.libraryUI.renderCatalog();"
            style="color:#FBBF24; text-decoration:none; font-weight:700; cursor:pointer;"
          >
            Thư Khố Cổ Điển
          </a>
          <span>/</span>
          <span style="color:#FEF3C7; font-weight:700;">${book.title}</span>
        </nav>

        <!-- Book Header -->
        <header style="background:#121722; border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1.4rem; margin-bottom:1.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.8rem; margin-bottom:0.6rem;">
            <span style="font-size:0.75rem; font-weight:800; color:#FBBF24; background:rgba(251,191,36,0.1); border:1px solid rgba(251,191,36,0.25); padding:0.2rem 0.6rem; border-radius:4px;">
              ${book.grade} • ${book.categoryName}
            </span>
            <a 
              href="#/library" 
              onclick="event.preventDefault(); window.location.hash='#/library'; window.libraryUI.renderCatalog();"
              style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); color:#FEF3C7; padding:0.45rem 1rem; border-radius:6px; font-size:0.82rem; text-decoration:none; font-weight:700; cursor:pointer; display:inline-block;"
            >
              ← Về Danh Mục Thư Khố
            </a>
          </div>

          <h1 style="font-family:var(--font-title); font-size:1.8rem; color:#FEF3C7; margin:0 0 0.3rem 0;">
            ${book.title}
          </h1>
          
          <!-- HỘP KHẢO CHỨNG THƯ TỊCH -->
          <div style="background:#0D111A; border:1px solid rgba(168,85,247,0.3); border-left:4px solid #A855F7; border-radius:8px; padding:0.9rem 1.1rem; margin-top:0.9rem;">
            <div style="font-size:0.8rem; font-weight:800; color:#C084FC; margin-bottom:0.4rem; letter-spacing:0.04em;">
              🔍 KHẢO CHỨNG VĂN BẢN HỌC (RED-TEAM TEXTUAL PROVENANCE):
            </div>
            <div style="font-size:0.78rem; color:var(--text-primary); line-height:1.55;">
              • <strong>Tác giả truyền thống:</strong> ${book.traditionalAuthor || book.author}<br/>
              • <strong>Niên đại văn bản hiện tồn:</strong> ${book.extantDating}<br/>
              • <strong>Phân định nguyên văn vs bồi đắp:</strong> ${book.textualProvenance}<br/>
              • <strong>Khung lý thuyết hệ thống:</strong> ${book.systematicFramework}
            </div>
          </div>

          <!-- Thanh Chọn Chương Mục -->
          <div style="margin-top:1rem; padding-top:0.8rem; border-top:1px solid rgba(255,255,255,0.06); display:flex; gap:0.5rem; flex-wrap:wrap; align-items:center;">
            <span style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">Danh sách thiên/chương:</span>
            ${book.chapters.map(c => `
              <a 
                href="#/library/${book.id}/${c.id}"
                onclick="event.preventDefault(); window.location.hash='#/library/${book.id}/${c.id}'; window.libraryUI.renderBookReader('${book.id}', '${c.id}');"
                style="background:${c.id === chapter.id ? '#FBBF24' : 'rgba(255,255,255,0.05)'}; color:${c.id === chapter.id ? '#07090E' : 'var(--text-primary)'}; text-decoration:none; padding:0.35rem 0.75rem; border-radius:4px; font-size:0.78rem; font-weight:700; border:1px solid ${c.id === chapter.id ? '#FBBF24' : 'rgba(255,255,255,0.1)'}; cursor:pointer;"
              >
                ${c.title}
              </a>
            `).join('')}
          </div>
        </header>

        <!-- Tiêu Đề Chương Đang Đọc -->
        <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.08); border-left:4px solid #FBBF24; border-radius:10px; padding:1.1rem 1.3rem; margin-bottom:1.3rem;">
          <h2 style="font-size:1.3rem; color:#FEF3C7; margin:0;">
            ${chapter.title}
          </h2>
        </div>

        <!-- Khung Song Song: Chữ Hán Cổ Điển & Dịch Nghĩa Học Thuật -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(360px, 1fr)); gap:1.2rem; margin-bottom:1.3rem;">
          
          <!-- Cột Trái: Chữ Hán Cổ Chuẩn Mộc Bản & Phiên Âm -->
          <div style="background:#121722; border:1px solid rgba(251,191,36,0.25); border-radius:10px; padding:1.4rem;">
            <div style="font-size:0.8rem; font-weight:800; color:#FBBF24; margin-bottom:0.8rem; letter-spacing:0.04em; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.4rem;">
              📜 NGUYÊN VĂN CHỮ HÁN CHÁNH TÔNG TOÀN BẢN:
            </div>
            <div style="font-family:'Ma Shan Zheng', var(--font-title); font-size:1.35rem; color:#FEF3C7; line-height:1.9; letter-spacing:0.06em; margin-bottom:1.2rem;">
              ${chapter.hanzi}
            </div>
            <div style="font-size:0.82rem; color:#94A3B8; line-height:1.55; border-top:1px solid rgba(255,255,255,0.06); padding-top:0.8rem;">
              <strong style="color:#FEF3C7;">Phiên âm Hán-Việt:</strong> ${chapter.pinyin}
            </div>
          </div>

          <!-- Cột Phải: Dịch Nghĩa Học Thuật Chuẩn Xác -->
          <div style="background:#121722; border:1px solid rgba(56,189,248,0.25); border-radius:10px; padding:1.4rem;">
            <div style="font-size:0.8rem; font-weight:800; color:#38BDF8; margin-bottom:0.8rem; letter-spacing:0.04em; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.4rem;">
              📖 DỊCH NGHĨA HỌC THUẬT TƯỜNG TẬN:
            </div>
            <div style="font-size:0.88rem; color:var(--text-primary); line-height:1.7;">
              ${chapter.meaning}
            </div>
          </div>

        </div>

        <!-- Khối 1: Bản Chất Khí Trường & Vì Sao Tốt / Vì Sao Xấu -->
        <div style="background:#121722; border:1px solid rgba(52,211,153,0.3); border-left:4px solid #34D399; border-radius:10px; padding:1.3rem 1.5rem; margin-bottom:1.2rem;">
          <div style="font-size:0.85rem; font-weight:800; color:#34D399; margin-bottom:0.7rem; letter-spacing:0.04em;">
            ⚖️ KHẢO CHỨNG HỌC THUẬT: BẢN CHẤT KHÍ TRƯỜNG & VÌ SAO TỐT / VÌ SAO XẤU:
          </div>
          <div style="font-size:0.86rem; color:#FEF3C7; line-height:1.65;">
            ${formatMultiLine(chapter.commentary)}
          </div>
        </div>

        <!-- Khối 2: Phân Tích Tác Động Chi Tiết Đến Đời Sống -->
        ${chapter.impactAnalysis ? `
          <div style="background:#121722; border:1px solid rgba(56,189,248,0.3); border-left:4px solid #38BDF8; border-radius:10px; padding:1.3rem 1.5rem; margin-bottom:1.2rem;">
            <div style="font-size:0.85rem; font-weight:800; color:#38BDF8; margin-bottom:0.7rem; letter-spacing:0.04em;">
              📊 PHÂN TÍCH TÁC ĐỘNG ĐỜI SỐNG (SỨC KHỎE • TÀI LỘC • CÔNG DANH • GIA ĐẠO • NHÂN ĐINH):
            </div>
            <div style="font-size:0.86rem; color:#FEF3C7; line-height:1.65;">
              ${formatMultiLine(chapter.impactAnalysis)}
            </div>
          </div>
        ` : ''}

        <!-- Khối 3: Chu Kỳ Thời Vận -->
        ${chapter.cycleAnalysis ? `
          <div style="background:#121722; border:1px solid rgba(192,132,252,0.3); border-left:4px solid #C084FC; border-radius:10px; padding:1.1rem 1.4rem; margin-bottom:1.2rem;">
            <div style="font-size:0.85rem; font-weight:800; color:#C084FC; margin-bottom:0.5rem; letter-spacing:0.04em;">
              ⏳ CHU KỲ THỜI VẬN TÁC ĐỘNG (XEM CHO CẢ ĐỜI • VẬN 20 NĂM • HAY LƯU NIÊN TỪNG NĂM?):
            </div>
            <div style="font-size:0.85rem; color:#FEF3C7; line-height:1.6;">
              ${formatMultiLine(chapter.cycleAnalysis)}
            </div>
          </div>
        ` : ''}

        <!-- Khối 4: Quy Chuẩn Thực Hành & Hóa Giải Chánh Tông -->
        ${chapter.practicalProtocol ? `
          <div style="background:#121722; border:1px solid rgba(251,191,36,0.35); border-left:4px solid #FBBF24; border-radius:10px; padding:1.3rem 1.5rem; margin-bottom:2rem;">
            <div style="font-size:0.85rem; font-weight:800; color:#FBBF24; margin-bottom:0.7rem; letter-spacing:0.04em;">
              🛠️ QUY TRÌNH THỰC HÀNH KHẢO SÁT & HÓA GIẢI CHÁNH TÔNG:
            </div>
            <div style="font-size:0.86rem; color:#FEF3C7; line-height:1.65;">
              ${formatMultiLine(chapter.practicalProtocol)}
            </div>
          </div>
        ` : ''}

      </div>
    `;
  }
}

if (typeof window !== 'undefined') {
  window.LibraryUI = LibraryUI;
  window.libraryUI = new LibraryUI();
  window.loadLibraryBook = (bookId, chapterId) => {
    if (window.libraryUI) {
      if (bookId) {
        window.libraryUI.renderBookReader(bookId, chapterId);
      } else {
        window.libraryUI.renderCatalog();
      }
    }
  };
}

if (typeof module !== 'undefined') {
  module.exports = { LibraryUI };
}
