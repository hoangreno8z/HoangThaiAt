// =========================================================================
// HUYỀN HỌC MỤ — CLASSICAL LIBRARY CONTROLLER (PHASE 5)
// =========================================================================

class LibraryUI {
  constructor() {
    this.books = [
      {
        id: 'tang-thu',
        title: 'Táng Thư (葬書)',
        author: 'Quách Phác (郭璞)',
        dynasty: 'Đông Tấn (276–324)',
        category: 'Loan Đầu Hình Thế Chi Tổ',
        grade: 'HẠNG A (Kinh Điển Cốt Lõi)',
        repository: 'Tứ Khố Toàn Thư (Tử Bộ - Thuật Số Loại)',
        desc: 'Tác phẩm khai sơn lập phái của phong thủy học phương Đông, đặt định định nghĩa kinh điển về Khí: Khí thừa phong tắc tán, giới thủy tắc chỉ.',
        chapters: [
          { id: '1', title: 'Thiên Thứ Nhất: Khởi Nguyên Khí Mạch', hanzi: '葬者，乘生氣也。五氣行乎地中，發而生乎萬物。氣乘風則散，界水則止。古人聚之使不散，行之使有止，故謂之風水。', pinyin: 'Táng zhě, chéng shēng qì yě. Wǔ qì xíng hū dì zhōng, fā ér shēng hū wàn wù. Qì chéng fēng zé sàn, jiè shuǐ zé zhǐ. Gǔ rén jù zhī shǐ bù sàn, xíng zhī shǐ yǒu zhǐ, gù wèi zhī fēng shuǐ.', meaning: 'Mai táng là thuận theo sinh khí. Ngũ khí vận hành trong lòng đất, phát khởi nuôi dưỡng vạn vật. Khí gặp gió thì phân tán, gặp nước ngăn lại thì dừng tụ. Cổ nhân thu gom khí khiến nó không tán, dẫn truyền khí khiến nó dừng tụ, do đó gọi môn học này là Phong Thủy.' },
          { id: '2', title: 'Thiên Thứ Hai: Âm Dương & Hình Thế Cương Lĩnh', hanzi: '地有四勢，氣從八方。故為術者，審五氣，貴五事，行十二辰，觀二十四向，考差歲時，審神煞，避凶趨吉。', pinyin: 'Dì yǒu sì shì, qì cóng bā fāng. Gù wéi shù zhě, shěn wǔ qì, guì wǔ shì, xíng shí èr chén, guān èr shí sì xiàng, kǎo chā suì shí, shěn shén shà, bì xiōng qū jí.', meaning: 'Đất có bốn thế, khí từ tám phương. Cho nên người hành thuật phong thủy phải thẩm sát ngũ khí, trọng thị ngũ sự, thuận theo 12 Địa Chi, quan sát 24 Sơn Hướng, khảo sát tuần hoàn thời tiết, phân định cát hung để lánh dữ đón lành.' }
        ]
      },
      {
        id: 'thanh-nang-kinh',
        title: 'Thanh Nang Kinh (青囊經)',
        author: 'Hoàng Thạch Công (黃石公)',
        dynasty: 'Tần - Hán',
        category: 'Bản Thể Lý Khí & Hình Thế',
        grade: 'HẠNG A (Kinh Điển Cốt Lõi)',
        repository: 'Đạo Tạng (Chính Thống Đạo Tạng)',
        desc: 'Thiên kinh địa nghĩa về sự hợp nhất giữa Hà Đồ, Lạc Thư, Bát Quái và địa hình địa vật trong vũ trụ quan cổ đại.',
        chapters: [
          { id: '1', title: 'Thượng Quyển: Bản Thể Luận Càn Khôn', hanzi: '天尊地卑，乾坤定矣。卑高以陳，貴賤位矣。動靜有常，剛柔斷矣。方以類聚，物以群分，吉凶生矣。', pinyin: 'Tiān zūn dì bēi, qián kūn dìng yǐ. Bēi gāo yǐ chén, guì jiàn wèi yǐ. Dòng jìng yǒu cháng, gāng róu duàn yǐ. Fāng yǐ lèi jù, wù yǐ qún fēn, jí xiōng shēng yǐ.', meaning: 'Trời cao đất thấp, Càn Khôn định vị. Cao thấp bày ra, quý tiện có ngôi. Động tĩnh có thường tắc, cương nhu phân minh. Phương theo loài mà tụ, vật theo đàn mà chia, cát hung do đó mà sinh khởi.' }
        ]
      },
      {
        id: 'bat-trach-minh-kinh',
        title: 'Bát Trạch Minh Kính (八宅明鏡)',
        author: 'Dương Quân Tùng / Cố Ngô Huệ Cảnh',
        dynasty: 'Thanh Triều (Càn Long Khắc Bản)',
        category: 'Bát Trạch Lý Khí Phái',
        grade: 'HẠNG B (Thư Tịch Học Thuật)',
        repository: 'Cổ Bản Khắc Gỗ Thanh Đại',
        desc: 'Bộ sách căn bản của Bát Trạch Phái: Khảo sát Cung Phi Mệnh Quái, phối hợp Đông Tây Tứ Mệnh và 8 cung Du Niên cát hung trong dương trạch.',
        chapters: [
          { id: '1', title: 'Tổng Luận: Cung Mệnh & Trạch Quái', hanzi: '宅有八門，門有八方。以人生年干支，求其命宮。東四命宜居東四宅，西四命宜居西四宅，配合得宜，富貴綿長。', pinyin: 'Zhái yǒu bā mén, mén yǒu bā fāng. Yǐ rén shēng nián gān zhī, qiú qí mìng gōng. Dōng sì mìng yí jū dōng sì zhái, xī sì mìng yí jū xī sì zhái, pèi hé dé yí, fù guì mián cháng.', meaning: 'Nhà có tám cửa, cửa có tám phương. Lấy can chi năm sinh của người mà tìm Cung Mệnh. Người Đông Tứ Mệnh nên ở nhà Đông Tứ Trạch, người Tây Tứ Mệnh nên ở nhà Tây Tứ Trạch, phối hợp đúng phép thì giàu sang bền vững.' }
        ]
      },
      {
        id: 'tham-thi-huyen-khong',
        title: 'Thẩm Thị Huyền Không Học (沈氏玄空學)',
        author: 'Thẩm Trúc Nhưng (沈竹礽)',
        dynasty: 'Thanh Mạt - Dân Quốc (1927)',
        category: 'Huyền Không Phi Tinh Phái',
        grade: 'HẠNG B (Thư Tịch Học Thuật)',
        repository: 'Bản in Hoằng Hóa Xã',
        desc: 'Bộ đại toàn kinh điển giải mã bí mật phi tinh Tam Nguyên Cửu Vận, lập Tinh Bàn 24 Sơn Hướng và phân tích Tử Bạch cát hung.',
        chapters: [
          { id: '1', title: 'Chương 1: Tam Nguyên Cửu Vận Quyết', hanzi: '玄空之法，以時為本。三元九運，六十年為一元，一百八十年為正元。當令者旺，將來者生，已過者衰。', pinyin: 'Xuán kōng zhī fǎ, yǐ shí wéi běn. Sān yuán jiǔ yùn, liù shí nián wéi yī yuán, yī bǎi bā shí nián wéi zhèng yuán. Dāng lìng zhě wàng, jiāng lái zhě shēng, yǐ guò zhě shuāi.', meaning: 'Phép Huyền Không lấy thời gian làm gốc. Ba nguyên chín vận, 60 năm là một nguyên, 180 năm là một chính nguyên. Sao đương lệnh thì vượng, sao tương lai thì sinh khí, sao đã qua thì suy thoái.' }
        ]
      }
    ];
  }

  renderCatalog() {
    const container = document.getElementById('library-books-grid');
    if (!container) return;

    container.innerHTML = this.books.map(b => `
      <div class="library-book-card" style="background:#121722; border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:1.5rem; display:flex; flex-direction:column; justify-content:space-between; transition:all 0.25s ease;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem; flex-wrap:wrap; gap:0.4rem;">
            <span style="font-size:0.75rem; font-weight:800; color:#FBBF24; background:rgba(245,158,11,0.12); padding:0.25rem 0.6rem; border-radius:12px; text-transform:uppercase;">
              ${b.grade}
            </span>
            <span style="font-size:0.8rem; color:var(--text-muted);">${b.dynasty}</span>
          </div>

          <h3 style="font-family:var(--font-title); font-size:1.35rem; color:#FEF3C7; margin:0 0 0.3rem 0;">
            ${b.title}
          </h3>
          <div style="font-size:0.85rem; color:#38BDF8; font-weight:600; margin-bottom:0.8rem;">
            Tác giả: ${b.author}
          </div>

          <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.55; margin-bottom:1rem;">
            ${b.desc}
          </p>

          <div style="font-size:0.78rem; color:var(--text-muted); margin-bottom:1.5rem; background:rgba(0,0,0,0.3); padding:0.5rem 0.8rem; border-radius:6px;">
            <strong>Lưu trữ:</strong> ${b.repository}
          </div>
        </div>

        <a href="#/library/${b.id}/1" style="background:linear-gradient(135deg, #2563EB, #1D4ED8); color:#fff; text-decoration:none; padding:0.6rem 1.2rem; border-radius:8px; font-weight:700; font-size:0.88rem; text-align:center; display:block;">
          Đọc Nguyên Tác & Chú Giải ➡️
        </a>
      </div>
    `).join('');
  }

  renderBookReader(bookId, chapterId = '1') {
    const book = this.books.find(b => b.id === bookId) || this.books[0];
    const chapter = book.chapters.find(c => c.id === chapterId) || book.chapters[0];
    const container = document.getElementById('gate-library');
    if (!container) return;

    container.innerHTML = `
      <div style="max-width:1100px; margin:0 auto;">
        <!-- Breadcrumb Header -->
        <nav style="margin-bottom:1.5rem; font-size:0.85rem; color:var(--text-muted); display:flex; align-items:center; gap:0.5rem;">
          <a href="#/" style="color:var(--text-muted); text-decoration:none;">Sảnh Thư Viện</a>
          <span>/</span>
          <a href="#/library" style="color:#FBBF24; text-decoration:none;">Thư Khố Cổ Điển</a>
          <span>/</span>
          <span style="color:var(--text-pure); font-weight:600;">${book.title}</span>
        </nav>

        <!-- Book Reader Header -->
        <header style="background:#121722; border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:1.8rem; margin-bottom:2rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:0.8rem;">
            <span style="font-size:0.78rem; font-weight:800; color:#FBBF24; background:rgba(245,158,11,0.12); padding:0.25rem 0.7rem; border-radius:20px; text-transform:uppercase;">
              ${book.grade} • ${book.dynasty}
            </span>
            <button onclick="navigator.clipboard.writeText('Trích dẫn: ${book.title} - ${book.author} (${book.dynasty}). Lưu trữ: ${book.repository}.'); alert('Đã sao chép trích dẫn học thuật!');" style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); color:#FEF3C7; padding:0.35rem 0.8rem; border-radius:6px; font-size:0.8rem; font-weight:600; cursor:pointer;">
              📋 Xuất Trích Dẫn Chuẩn URN
            </button>
          </div>

          <h1 style="font-family:var(--font-title); font-size:2rem; color:#FEF3C7; margin:0 0 0.4rem 0;">
            ${book.title} — ${chapter.title}
          </h1>
          <div style="font-size:0.92rem; color:#38BDF8;">
            Tác giả: <strong>${book.author}</strong> • Xuất xứ: <em>${book.repository}</em>
          </div>
        </header>

        <!-- Side-by-Side Dual-Pane Text Container -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(400px, 1fr)); gap:2rem; margin-bottom:3rem;">
          <!-- Cột Trái: Chữ Hán Nguyên Bản -->
          <div style="background:#0D111A; border:1px solid rgba(245,158,11,0.2); border-radius:12px; padding:1.8rem;">
            <div style="font-size:0.85rem; font-weight:800; color:#FBBF24; text-transform:uppercase; margin-bottom:1rem; letter-spacing:0.06em; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.5rem;">
              📜 Nguyên Tác Hán Văn (Văn Bản Học)
            </div>
            <div style="font-family:'Ma Shan Zheng', var(--font-title); font-size:1.45rem; color:#FEF3C7; line-height:1.9; letter-spacing:0.08em; margin-bottom:1.5rem;">
              ${chapter.hanzi}
            </div>
            <div style="font-style:italic; color:#FEF3C7; font-size:0.95rem; line-height:1.6; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">
              <strong>Phiên âm:</strong> "${chapter.pinyin}"
            </div>
          </div>

          <!-- Cột Phải: Bản Dịch Học Thuật & Chú Giải -->
          <div style="background:#0D111A; border:1px solid rgba(59,130,246,0.2); border-radius:12px; padding:1.8rem;">
            <div style="font-size:0.85rem; font-weight:800; color:#60A5FA; text-transform:uppercase; margin-bottom:1rem; letter-spacing:0.06em; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.5rem;">
              📖 Bản Dịch Học Thuật & Khảo Chú
            </div>
            <div style="font-size:1.05rem; color:var(--text-pure); line-height:1.85; margin-bottom:1.5rem;">
              ${chapter.meaning}
            </div>
            <div style="background:rgba(255,255,255,0.02); border-left:3px solid #60A5FA; padding:0.9rem 1.1rem; border-radius:0 8px 8px 0; font-size:0.88rem; color:var(--text-muted); line-height:1.6;">
              <strong style="color:#60A5FA;">Khảo chú học thuật:</strong> Đoạn văn trên khẳng định nguyên lý cơ bản của Phong Thủy: Khí không thể tự tồn tại ở trạng thái tĩnh tuyệt đối mà luôn vận động theo địa hình và nguồn nước.
            </div>
          </div>
        </div>

        <div style="text-align:center;">
          <a href="#/library" style="color:var(--text-muted); text-decoration:none; font-size:0.9rem; font-weight:600;">
            ⬅️ Quay lại danh mục thư tịch
          </a>
        </div>
      </div>
    `;
  }
}

// Khởi tạo LibraryUI
window.libraryUI = new LibraryUI();
window.loadLibraryBook = function(bookId, chapterId) {
  if (!bookId || bookId === 'library') {
    window.libraryUI.renderCatalog();
  } else {
    window.libraryUI.renderBookReader(bookId, chapterId);
  }
};
