// =========================================================================
// VẤN ĐÁP CỔ PHÁP — BÁCH CỤC THỦY KHẨU (GIAO DIỆN HỌC THUẬT CỔ BẢN)
// Tối ưu: Ngữ phong cổ điển, 2-4 chữ, 0 Emoji, 100% Thuần Việt & Hán tự
// =========================================================================

class HoiDapUI {
  constructor() {
    this.containerId = 'gate-hoidap';
    this.activeChapter = 1; // Mặc định mở Chương 1 (10 điều)
    this.searchQuery = '';
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

    // Check if params has chapter
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

        <!-- Controls: Search & Chapter Ribbon -->
        <div class="hoidap-controls">
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

              <!-- 2. Kinh Văn Chữ Hán -->
              <div class="hoidap-sec-block">
                <div class="hoidap-sec-heading">Kinh Văn Chữ Hán</div>
                <div class="hoidap-hanzi-box">${this.escapeHtml(item.hanzi)}</div>
              </div>

              <!-- 3. Phiên Âm Diễn Nghĩa -->
              <div class="hoidap-sec-block">
                <div class="hoidap-sec-heading">Phiên Âm Diễn Nghĩa</div>
                <div class="hoidap-sec-content">${this.formatContent(item.hanviet)}</div>
                ${item.meaning ? `<div class="hoidap-sec-content" style="margin-top:0.5rem; font-style:italic;">${this.formatContent(item.meaning)}</div>` : ''}
              </div>

              <!-- 4. Biện Chứng Khí Học -->
              <div class="hoidap-sec-block">
                <div class="hoidap-sec-heading">Biện Chứng Khí Học</div>
                <div class="hoidap-sec-content">${this.formatContent(item.qi_mechanism)}</div>
              </div>

              <!-- 5. Họa Phúc Ngũ Phương -->
              <div class="hoidap-sec-block">
                <div class="hoidap-sec-heading">Họa Phúc Ngũ Phương</div>
                <div class="hoidap-sec-content">${this.renderTable(item.hoa_phuc)}</div>
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
      // Khi tìm kiếm, mở tất cả kết quả
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
    // Convert numbered lists or bullet points
    let formatted = this.escapeHtml(text);
    // Bold tags: **text**
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    // Italic tags: *text*
    formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    // Line breaks
    formatted = formatted.replace(/\n\n/g, '<br><br>');
    formatted = formatted.replace(/\n/g, '<br>');
    return formatted;
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
      // Skip separator lines like |---|---|
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
