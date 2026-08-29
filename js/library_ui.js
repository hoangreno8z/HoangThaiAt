// =========================================================================
// HUYỀN HỌC MỤ — THƯ KHỐ CỔ ĐIỂN CHÁNH TÔNG (LIBRARY UI CONTROLLER)
// TOÀN THƯ 22 BỘ KINH ĐIỂN: HÁN VĂN • DỊCH NGHĨA • KHÍ TRƯỜNG • THỰC CHIẾN
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
    const container = document.getElementById('library-books-grid');
    if (!container) return;

    const allBooks = this.getBooks();
    const filteredBooks = (this.currentCategory === 'ALL')
      ? allBooks
      : allBooks.filter(b => b.category === this.currentCategory);

    const filterButtonsHtml = `
      <div style="display:flex; justify-content:center; gap:0.6rem; flex-wrap:wrap; margin-bottom:2rem; width:100%;">
        <button onclick="window.libraryUI.filterCategory('ALL')" style="background:${this.currentCategory === 'ALL' ? '#FBBF24' : 'rgba(255,255,255,0.05)'}; color:${this.currentCategory === 'ALL' ? '#07090E' : 'var(--text-primary)'}; border:1px solid ${this.currentCategory === 'ALL' ? '#FBBF24' : 'rgba(255,255,255,0.1)'}; padding:0.5rem 1rem; border-radius:8px; font-weight:700; font-size:0.85rem; cursor:pointer;">
          Tất Cả Thư Khố (${allBooks.length} Bộ)
        </button>
        <button onclick="window.libraryUI.filterCategory('LOAN_DAU_CHON_DAT')" style="background:${this.currentCategory === 'LOAN_DAU_CHON_DAT' ? '#34D399' : 'rgba(255,255,255,0.05)'}; color:${this.currentCategory === 'LOAN_DAU_CHON_DAT' ? '#07090E' : 'var(--text-primary)'}; border:1px solid ${this.currentCategory === 'LOAN_DAU_CHON_DAT' ? '#34D399' : 'rgba(255,255,255,0.1)'}; padding:0.5rem 1rem; border-radius:8px; font-weight:700; font-size:0.85rem; cursor:pointer;">
          1. Chọn Đất & Tầm Long (${allBooks.filter(b => b.category === 'LOAN_DAU_CHON_DAT').length})
        </button>
        <button onclick="window.libraryUI.filterCategory('DUONG_TRACH_XEM_NHA')" style="background:${this.currentCategory === 'DUONG_TRACH_XEM_NHA' ? '#38BDF8' : 'rgba(255,255,255,0.05)'}; color:${this.currentCategory === 'DUONG_TRACH_XEM_NHA' ? '#07090E' : 'var(--text-primary)'}; border:1px solid ${this.currentCategory === 'DUONG_TRACH_XEM_NHA' ? '#38BDF8' : 'rgba(255,255,255,0.1)'}; padding:0.5rem 1rem; border-radius:8px; font-weight:700; font-size:0.85rem; cursor:pointer;">
          2. Xem Nhà & Trạch Thuật (${allBooks.filter(b => b.category === 'DUONG_TRACH_XEM_NHA').length})
        </button>
        <button onclick="window.libraryUI.filterCategory('THIEN_VAN_CHIEM_TINH')" style="background:${this.currentCategory === 'THIEN_VAN_CHIEM_TINH' ? '#C084FC' : 'rgba(255,255,255,0.05)'}; color:${this.currentCategory === 'THIEN_VAN_CHIEM_TINH' ? '#07090E' : 'var(--text-primary)'}; border:1px solid ${this.currentCategory === 'THIEN_VAN_CHIEM_TINH' ? '#C084FC' : 'rgba(255,255,255,0.1)'}; padding:0.5rem 1rem; border-radius:8px; font-weight:700; font-size:0.85rem; cursor:pointer;">
          3. Thiên Văn & Tam Thức (${allBooks.filter(b => b.category === 'THIEN_VAN_CHIEM_TINH').length})
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
                <span style="font-size:0.75rem; color:#94A3B8;">${b.dynasty}</span>
              </div>

              <h3 style="font-family:var(--font-title); font-size:1.25rem; color:#FEF3C7; margin:0 0 0.25rem 0;">
                ${b.title}
              </h3>
              <div style="font-size:0.82rem; color:#38BDF8; font-weight:700; margin-bottom:0.6rem;">
                Tác giả: ${b.author}
              </div>

              <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.5; margin-bottom:0.8rem;">
                ${b.desc}
              </p>

              <div style="font-size:0.75rem; color:#94A3B8; margin-bottom:1.2rem; background:#0D111A; padding:0.4rem 0.6rem; border-radius:4px;">
                <strong>Lưu trữ:</strong> ${b.repository} • <strong>${b.chapters.length} Thiên/Chương Toàn Bản</strong>
              </div>
            </div>

            <a href="#/library/${b.id}/1" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.15); color:#FEF3C7; text-decoration:none; padding:0.6rem 1rem; border-radius:6px; font-weight:700; font-size:0.82rem; text-align:center; display:block; transition:all 0.2s ease;">
              Mở Đọc Toàn Bộ Nguyên Tác & Luận Giải →
            </a>
          </div>
        `).join('')}
      </div>
    `;

    const gate = document.getElementById('gate-library');
    if (gate) {
      gate.innerHTML = `
        <div style="max-width:1200px; margin:0 auto; padding:1.5rem 1rem;">
          <div style="margin-bottom:1.5rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:1rem;">
            <span style="font-size:0.75rem; font-weight:800; color:#FBBF24; text-transform:uppercase; letter-spacing:0.08em;">THƯ KHỐ CHÁNH TÔNG</span>
            <h2 style="font-family:var(--font-title); font-size:1.8rem; color:#FEF3C7; margin:0.2rem 0 0.3rem 0;">
              Đại Kho Tàng 22 Bộ Thư Tịch Cổ Điển
            </h2>
            <p style="font-size:0.86rem; color:var(--text-muted); margin:0;">
              Toàn văn chữ Hán, phiên âm Hán-Việt, dịch nghĩa tường tận, luận giải bản chất khí trường và quy chuẩn ứng dụng thực chiến.
            </p>
          </div>

          ${filterButtonsHtml}
          ${gridHtml}
        </div>
      `;
    }
  }

  renderBookReader(bookId, chapterId = '1') {
    const allBooks = this.getBooks();
    const book = allBooks.find(b => b.id === bookId) || allBooks[0];
    const chapter = book.chapters.find(c => c.id === chapterId) || book.chapters[0];
    const container = document.getElementById('gate-library');
    if (!container) return;

    const formattedCommentary = (chapter.commentary || '')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => `<p style="margin:0 0 0.6rem 0; line-height:1.65;">${line}</p>`)
      .join('');

    const formattedApplication = (chapter.application || '')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => `<p style="margin:0 0 0.6rem 0; line-height:1.65;">${line}</p>`)
      .join('');

    container.innerHTML = `
      <div style="max-width:1150px; margin:0 auto; padding:1.5rem 1rem;">
        
        <!-- Breadcrumb Header -->
        <nav style="margin-bottom:1.2rem; font-size:0.82rem; color:var(--text-muted); display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
          <a href="#/" style="color:var(--text-muted); text-decoration:none;">Sảnh Thư Viện</a>
          <span>/</span>
          <a href="#/library" style="color:#FBBF24; text-decoration:none;">Thư Khố Cổ Điển</a>
          <span>/</span>
          <span style="color:#FEF3C7; font-weight:700;">${book.title}</span>
        </nav>

        <!-- Book Header -->
        <header style="background:#121722; border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1.4rem; margin-bottom:1.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.8rem; margin-bottom:0.6rem;">
            <span style="font-size:0.75rem; font-weight:800; color:#FBBF24; background:rgba(251,191,36,0.1); border:1px solid rgba(251,191,36,0.25); padding:0.2rem 0.6rem; border-radius:4px;">
              ${book.grade} • ${book.dynasty}
            </span>
            <a href="#/library" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.12); color:#FEF3C7; padding:0.35rem 0.8rem; border-radius:6px; font-size:0.78rem; text-decoration:none; font-weight:600;">
              ← Về Danh Mục Thư Khố
            </a>
          </div>

          <h1 style="font-family:var(--font-title); font-size:1.8rem; color:#FEF3C7; margin:0 0 0.3rem 0;">
            ${book.title}
          </h1>
          <div style="font-size:0.86rem; color:#38BDF8;">
            Tác giả: <strong>${book.author}</strong> • Lưu trữ: <em>${book.repository}</em>
          </div>

          <!-- Thanh Chọn Chương Mục -->
          <div style="margin-top:1rem; padding-top:0.8rem; border-top:1px solid rgba(255,255,255,0.06); display:flex; gap:0.5rem; flex-wrap:wrap; align-items:center;">
            <span style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">Danh sách thiên/chương:</span>
            ${book.chapters.map(c => `
              <a 
                href="#/library/${book.id}/${c.id}"
                style="background:${c.id === chapter.id ? '#FBBF24' : 'rgba(255,255,255,0.05)'}; color:${c.id === chapter.id ? '#07090E' : 'var(--text-primary)'}; text-decoration:none; padding:0.3rem 0.7rem; border-radius:4px; font-size:0.78rem; font-weight:700; border:1px solid ${c.id === chapter.id ? '#FBBF24' : 'rgba(255,255,255,0.1)'};"
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
              📜 NGUYÊN VĂN CHỮ HÁN CHÁNH TÔNG:
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

        <!-- Khối Luận Giải Sâu Sắc: VÌ SAO TỐT / VÌ SAO XẤU & BẢN CHẤT KHÍ TRƯỜNG -->
        <div style="background:#121722; border:1px solid rgba(52,211,153,0.3); border-left:4px solid #34D399; border-radius:10px; padding:1.3rem 1.5rem; margin-bottom:1.3rem;">
          <div style="font-size:0.85rem; font-weight:800; color:#34D399; margin-bottom:0.7rem; letter-spacing:0.04em;">
            ⚖️ KHẢO CHỨNG HỌC THUẬT: BẢN CHẤT KHÍ TRƯỜNG & VÌ SAO TỐT / VÌ SAO XẤU:
          </div>
          <div style="font-size:0.86rem; color:#FEF3C7; line-height:1.65;">
            ${formattedCommentary}
          </div>
        </div>

        <!-- Khối Quy Chuẩn Ứng Dụng Thực Chiến -->
        ${chapter.application ? `
          <div style="background:#121722; border:1px solid rgba(251,191,36,0.3); border-left:4px solid #FBBF24; border-radius:10px; padding:1.3rem 1.5rem; margin-bottom:2rem;">
            <div style="font-size:0.85rem; font-weight:800; color:#FBBF24; margin-bottom:0.7rem; letter-spacing:0.04em;">
              🛠️ QUY CHUẨN ỨNG DỤNG THỰC CHIẾN BỐ CỤC KIẾN TRÚC:
            </div>
            <div style="font-size:0.86rem; color:#FEF3C7; line-height:1.65;">
              ${formattedApplication}
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
