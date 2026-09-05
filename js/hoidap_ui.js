// =========================================================================
// VẤN ĐÁP CỔ PHÁP — BÁCH CỤC THỦY KHẨU (GIAO DIỆN HỌC THUẬT CỔ BẢN)
// Tối ưu: Ngữ phong cổ điển, 2-4 chữ, 0 Emoji, 100% Thuần Việt & Hán tự
// Bổ sung: Bật/Tắt Hán Văn, Căn chỉnh nét chữ Hán thanh mảnh, Bố trí câu mạch lạc
// =========================================================================

class HoiDapUI {
  constructor() {
    this.containerId = 'gate-hoidap';
    this.activeChapter = 1; // Mặc định mở Chương 1 (10 điều)
    this.searchQuery = '';
    this.showHanzi = true; // Mặc định bật Hán văn
    this.expandedItems = new Set([1]); // Mặc định mở điều 1
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    this.isInitialized = true;
  }

  render(params) {
    this.init();
    const container = document.getElementById(this.containerId);
    if (!container) return;

    if (params && params.chapter) {
      this.activeChapter = parseInt(params.chapter, 10) || 1;
    }

    const chapters = window.HOIDAP_CHAPTERS || [];
    const allItems = window.HOIDAP_DATA || [];

    // Filter items based on active chapter and search query
    let filteredItems = allItems;
    if (this.activeChapter > 0) {
      filteredItems = filteredItems.filter(item => item.chapter === this.activeChapter);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase();
      filteredItems = allItems.filter(item => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.topo.toLowerCase().includes(q) ||
          item.hanzi.toLowerCase().includes(q) ||
          item.hanviet.toLowerCase().includes(q) ||
          item.qi_mechanism.toLowerCase().includes(q) ||
          item.remediation.toLowerCase().includes(q)
        );
      });
    }

    const romanNumerals = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
    const currentChapterInfo = this.activeChapter > 0 ? chapters[this.activeChapter - 1] : null;

    let html = `
      <div class="hoidap-container">
        <!-- Hero Header -->
        <section class="hoidap-hero">
          <span class="hoidap-hero-eyebrow">ĐẠI THƯ VIỆN ĐỊA LÝ KHÁM DƯ CHÁNH TÔNG</span>
          <h1 class="hoidap-hero-title">Vấn Đáp Cổ Pháp</h1>
          <div class="hoidap-hero-sub">Bách Cục Thủy Khẩu • Tầm Long Điểm Huyệt • Tiêu Sa Nạp Thủy</div>
          <p class="hoidap-hero-desc">
            Tổng tập một trăm địa cuộc thực chứng cổ bản: Giải mã toàn diện cơ chế Lai Thủy, Khứ Thủy, 
            phân định mười hai cung Trường Sinh, ứng dụng một trăm bốn mươi bốn thủy khẩu chánh tông và bí quyết tiêu sát nạp cát.
          </p>
        </section>

        <!-- Controls: Search Row & Chapter Ribbon -->
        <div class="hoidap-controls">
          <div class="hoidap-search-row">
            <div class="hoidap-search-wrapper">
              <input 
                type="text" 
                class="hoidap-search-input" 
                id="hoidap-search-input"
                placeholder="Tra cứu thế đất, cổ kinh, sa thủy, hoàng tuyền..." 
                value="${this.escapeHtml(this.searchQuery)}"
                oninput="window.hoidapUI.onSearch(this.value)"
              />
            </div>
            <!-- Nút Bật/Tắt Hán Văn -->
            <button 
              id="hoidap-toggle-hanzi-btn" 
              class="hoidap-toggle-hanzi-btn ${this.showHanzi ? '' : 'off'}" 
              title="Nhấn để ẩn hoặc hiện nguyên văn chữ Hán"
              onclick="window.hoidapUI.toggleHanzi()">
              ${this.showHanzi ? 'Tắt Hán Văn' : 'Bật Hán Văn'}
            </button>
          </div>

          <!-- 10 Chapters Selector Ribbon -->
          <div class="hoidap-chapters-ribbon">
            <button 
              class="hoidap-ch-btn ${this.activeChapter === 0 ? 'active' : ''}" 
              onclick="window.hoidapUI.selectChapter(0)">
              Toàn Bách Cục (100)
            </button>
    `;

    chapters.forEach(ch => {
      const roman = romanNumerals[ch.num] || ch.num;
      const isActive = this.activeChapter === ch.num && !this.searchQuery.trim();
      html += `
        <button 
          class="hoidap-ch-btn ${isActive ? 'active' : ''}" 
          onclick="window.hoidapUI.selectChapter(${ch.num})">
          Chương ${roman}: ${ch.title}
        </button>
      `;
    });

    html += `
          </div>
        </div>

        <!-- Status Bar -->
        <div class="hoidap-status-bar">
          <span class="hoidap-status-title">
            ${this.searchQuery.trim() 
              ? `Kết quả tra cứu: "${this.escapeHtml(this.searchQuery)}" (${filteredItems.length} điều)`
              : (this.activeChapter === 0 
                  ? `Hiển thị toàn bộ: 10 Chương — 100 Điều Toàn Bích` 
                  : `Chương ${romanNumerals[this.activeChapter]}: ${currentChapterInfo ? currentChapterInfo.title : ''} (${filteredItems.length} điều)`)}
          </span>
          <span>${filteredItems.length} / 100 điều chánh tông</span>
        </div>

        <!-- Cards List -->
        <div class="hoidap-items-list">
    `;

    if (filteredItems.length === 0) {
      html += `
        <div class="hoidap-empty">
          <p>Không tìm thấy địa cuộc tương ứng trong cổ thư. Xin thử lại với từ khóa khác.</p>
        </div>
      `;
    } else {
      filteredItems.forEach(item => {
        const isExpanded = this.expandedItems.has(item.index);
        const itemRoman = romanNumerals[item.chapter] || item.chapter;
        html += `
          <article class="hoidap-card ${isExpanded ? 'expanded' : ''}" id="hoidap-card-${item.index}">
            <div class="hoidap-card-header" onclick="window.hoidapUI.toggleItem(${item.index})">
              <div class="hoidap-card-title-group">
                <span class="hoidap-card-number-badge">Chương ${itemRoman} • Điều ${item.index}</span>
                <h3 class="hoidap-card-main-title">${item.title}</h3>
                <p class="hoidap-card-subtitle">${item.subtitle}</p>
              </div>
              <button class="hoidap-expand-btn" aria-label="Mở rộng chi tiết">
                ${isExpanded ? 'Thu Gọn Điển Cố' : 'Khai Triển Điển Cố'}
              </button>
            </div>

            <div class="hoidap-card-body" style="display: ${isExpanded ? 'flex' : 'none'};">
              <!-- 1. Thế Đất Khảo Nghiệm -->
              <div class="hoidap-sec-block">
                <div class="hoidap-sec-heading">Thế Đất Khảo Nghiệm</div>
                <div class="hoidap-sec-content">${this.formatContent(item.topo)}</div>
              </div>

              <!-- 2. Kinh Văn Chữ Hán (Có thể bật/tắt) -->
              <div class="hoidap-sec-block hoidap-sec-hanzi" style="display: ${this.showHanzi ? 'flex' : 'none'};">
                <div class="hoidap-sec-heading">Kinh Văn Chữ Hán</div>
                <div class="hoidap-hanzi-box">${this.escapeHtml(item.hanzi)}</div>
              </div>

              <!-- 3. Phiên Âm Diễn Nghĩa -->
              <div class="hoidap-sec-block">
                <div class="hoidap-sec-heading">Phiên Âm Diễn Nghĩa</div>
                <div class="hoidap-sec-content">${this.formatContent(item.hanviet)}</div>
                ${item.meaning ? `<div class="hoidap-sec-content" style="margin-top:0.6rem; font-style:italic; border-left:2px solid rgba(255,255,255,0.15); padding-left:0.8rem;">${this.formatContent(item.meaning)}</div>` : ''}
              </div>

              <!-- 4. Biện Chứng Khí Học -->
              <div class="hoidap-sec-block">
                <div class="hoidap-sec-heading">Biện Chứng Khí Học</div>
                <div class="hoidap-sec-content">${this.formatContent(item.qi_mechanism)}</div>
              </div>

              <!-- 5. Họa Phúc Ngũ Phương -->
              <div class="hoidap-sec-block">
                <div class="hoidap-sec-heading">Họa Phúc Ngũ Phương</div>
                <div class="hoidap-sec-content">${this.renderHoaPhuc(item.hoa_phuc)}</div>
              </div>

              <!-- 6. Pháp Môn Tiêu Sát -->
              <div class="hoidap-sec-block">
                <div class="hoidap-sec-heading">Pháp Môn Tiêu Sát</div>
                <div class="hoidap-sec-content">${this.formatContent(item.remediation)}</div>
              </div>
            </div>
          </article>
        `;
      });
    }

    html += `
        </div>

        <!-- Pager (Chương Trước / Chương Tiếp) -->
    `;

    if (this.activeChapter > 0 && !this.searchQuery.trim()) {
      const prevCh = this.activeChapter > 1 ? this.activeChapter - 1 : null;
      const nextCh = this.activeChapter < 10 ? this.activeChapter + 1 : null;
      html += `
        <div class="hoidap-pager">
          <button 
            class="hoidap-pager-btn" 
            ${prevCh ? '' : 'disabled'}
            onclick="window.hoidapUI.selectChapter(${prevCh || 1})">
            ${prevCh ? '← Chương Trước: ' + chapters[prevCh - 1].title : '← Chương Trước'}
          </button>

          <span style="font-size:0.85rem; color:var(--text-muted);">
            Chương ${this.activeChapter} / 10
          </span>

          <button 
            class="hoidap-pager-btn" 
            ${nextCh ? '' : 'disabled'}
            onclick="window.hoidapUI.selectChapter(${nextCh || 10})">
            ${nextCh ? 'Chương Tiếp: ' + chapters[nextCh - 1].title + ' →' : 'Chương Tiếp →'}
          </button>
        </div>
      `;
    }

    html += `
      </div>
    `;

    container.innerHTML = html;
  }

  toggleHanzi() {
    this.showHanzi = !this.showHanzi;
    const hanziBlocks = document.querySelectorAll('.hoidap-sec-hanzi');
    hanziBlocks.forEach(el => {
      el.style.display = this.showHanzi ? 'flex' : 'none';
    });
    const btn = document.getElementById('hoidap-toggle-hanzi-btn');
    if (btn) {
      btn.textContent = this.showHanzi ? 'Tắt Hán Văn' : 'Bật Hán Văn';
      btn.classList.toggle('off', !this.showHanzi);
    }
  }

  selectChapter(chNum) {
    this.activeChapter = chNum;
    this.searchQuery = '';
    // Mở mặc định điều đầu tiên của chương
    if (chNum > 0) {
      const firstIdx = (chNum - 1) * 10 + 1;
      this.expandedItems = new Set([firstIdx]);
    }
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSearch(query) {
    this.searchQuery = query;
    if (query.trim()) {
      const allItems = window.HOIDAP_DATA || [];
      const q = query.trim().toLowerCase();
      const matched = allItems.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.topo.toLowerCase().includes(q) ||
        item.hanzi.toLowerCase().includes(q) ||
        item.hanviet.toLowerCase().includes(q) ||
        item.qi_mechanism.toLowerCase().includes(q) ||
        item.remediation.toLowerCase().includes(q)
      );
      this.expandedItems = new Set(matched.map(m => m.index));
    }
    this.render();
  }

  toggleItem(index) {
    if (this.expandedItems.has(index)) {
      this.expandedItems.delete(index);
    } else {
      this.expandedItems.add(index);
    }
    const card = document.getElementById(`hoidap-card-${index}`);
    if (card) {
      const isExpanded = this.expandedItems.has(index);
      card.classList.toggle('expanded', isExpanded);
      const body = card.querySelector('.hoidap-card-body');
      if (body) {
        body.style.display = isExpanded ? 'flex' : 'none';
      }
      const btn = card.querySelector('.hoidap-expand-btn');
      if (btn) {
        btn.textContent = isExpanded ? 'Thu Gọn Điển Cố' : 'Khai Triển Điển Cố';
      }
    }
  }

  formatContent(text) {
    if (!text) return '';
    let formatted = this.escapeHtml(text);

    // Convert bold: **text**
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    // Convert italic: *text*
    formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Tách các khối bằng hai dấu xuống dòng liên tiếp
    const blocks = formatted.split(/\n\n+/);
    return blocks.map(block => {
      block = block.trim();
      if (!block) return '';

      // Trường hợp khối chứa danh sách gạch đầu dòng
      if (block.includes('\n- ') || block.startsWith('- ') || block.includes('\n— ') || block.startsWith('— ')) {
        const lines = block.split(/\n(?=[-—]\s+)/);
        let listHtml = '<ul class="hoidap-ul">';
        lines.forEach(l => {
          const cleanLine = l.replace(/^[-—]\s+/, '').trim();
          if (cleanLine) {
            listHtml += `<li>${cleanLine}</li>`;
          }
        });
        listHtml += '</ul>';
        return listHtml;
      }

      // Trường hợp khối là điều khoản được đánh số: 1. <strong>...</strong>
      if (/^\d+\.\s+/.test(block)) {
        return `<div class="hoidap-point-item">${block.replace(/\n/g, '<br>')}</div>`;
      }

      // Đoạn văn thông thường với ngắt dòng đơn
      const lines = block.replace(/\n/g, '<br>');
      return `<p class="hoidap-p">${lines}</p>`;
    }).join('');
  }

  renderHoaPhuc(rawText) {
    if (!rawText) return '';

    // Tách khối Cát Khánh và khối Hung Họa
    const catMatch = rawText.match(/\*\*Khi Hợp Cách[^\n]*\n([\s\S]*?)(?=\n\s*\*\*Khi Phạm Cách|$)/);
    const hungMatch = rawText.match(/\*\*Khi Phạm Cách[^\n]*\n([\s\S]*)$/);

    if (!catMatch || !hungMatch) {
      return this.formatContent(rawText);
    }

    const parseAspects = (blockText) => {
      const aspects = [
        { key: 'Tài lộc', label: 'Tài Lộc' },
        { key: 'Nhân đinh', label: 'Nhân Đinh' },
        { key: 'Tật ách', label: 'Tật Ách' },
        { key: 'Gia đạo', label: 'Gia Đạo' },
        { key: 'Quan vận', label: 'Quan Vận' }
      ];

      return aspects.map(asp => {
        const regex = new RegExp(`-\\s*\\*\\*${asp.key}\\*\\*:\\s*([^\\n\\r]+)`);
        const m = blockText.match(regex);
        const content = m ? m[1].trim() : '';
        return { label: asp.label, content: this.escapeHtml(content) };
      });
    };

    const catItems = parseAspects(catMatch[1]);
    const hungItems = parseAspects(hungMatch[1]);

    const renderCard = (titleBadge, titleSub, items, typeClass) => {
      let rowsHtml = '';
      items.forEach(it => {
        if (!it.content) return;
        rowsHtml += `
          <div class="hoidap-hp-row">
            <span class="hoidap-hp-label">${it.label}:</span>
            <span class="hoidap-hp-text">${it.content}</span>
          </div>
        `;
      });

      return `
        <div class="hoidap-hp-card ${typeClass}">
          <div class="hoidap-hp-header">
            <span class="hoidap-hp-badge ${typeClass}">${titleBadge}</span>
            <span class="hoidap-hp-subtitle">${titleSub}</span>
          </div>
          <div class="hoidap-hp-body">
            ${rowsHtml}
          </div>
        </div>
      `;
    };

    return `
      <div class="hoidap-hoaphuc-container">
        ${renderCard('CÁT KHÁNH', 'Khi Hợp Cách • Đắc Thế', catItems, 'cat')}
        ${renderCard('HUNG HỌA', 'Khi Phạm Cách • Thất Thế', hungItems, 'hung')}
      </div>
    `;
  }

  renderTable(rawText) {
    if (!rawText) return '';
    if (!rawText.includes('|')) {
      return this.formatContent(rawText);
    }

    const lines = rawText.trim().split('\n').filter(l => l.trim() && l.includes('|'));
    if (lines.length < 2) {
      return this.formatContent(rawText);
    }

    let tableHtml = '<div class="hoidap-table-wrapper"><table>';
    let isHeader = true;

    lines.forEach(line => {
      const trimmed = line.trim();
      // Bỏ qua dòng ngăn cách bảng |---|---|
      if (/^\|?[\s\-:|]+\|?$/.test(trimmed)) {
        isHeader = false;
        return;
      }

      const cells = trimmed.split('|').slice(1, -1);
      if (cells.length === 0) return;

      tableHtml += '<tr>';
      cells.forEach(cell => {
        const content = this.formatContent(cell.trim());
        if (isHeader) {
          tableHtml += `<th>${content}</th>`;
        } else {
          tableHtml += `<td>${content}</td>`;
        }
      });
      tableHtml += '</tr>';
    });

    tableHtml += '</table></div>';
    return tableHtml;
  }

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Khởi tạo thực thể toàn cục
window.hoidapUI = new HoiDapUI();
