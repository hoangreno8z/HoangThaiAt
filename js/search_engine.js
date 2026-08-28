// =========================================================================
// HUYỀN HỌC MỤ — MULTI-DIMENSIONAL GROUPED SEARCH ENGINE (PHASE 7)
// =========================================================================

class ScholarlySearchEngine {
  constructor() {
    this.index = [];
    this.currentCategory = 'all';
    this.currentSchool = 'all';
    this.buildIndex();
  }

  removeTones(str) {
    if (!str) return '';
    return str.toString().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/Đ/g, 'D')
      .toLowerCase();
  }

  buildIndex() {
    this.index = [];

    // 1. Index Concepts
    const conceptsList = [
      { id: 'CPT-001', name: 'Vô Cực', hanzi: '無極', pinyin: 'Wu ji', school: 'Bản Thể Luận', type: 'Khái Niệm', desc: 'Trạng thái hư vô tuyệt đối trước khi hình thành vật chất.', link: '#/learn/nen-tang/1' },
      { id: 'CPT-002', name: 'Thái Cực', hanzi: '太極', pinyin: 'Tai ji', school: 'Bản Thể Luận', type: 'Khái Niệm', desc: 'Khởi điểm xuất hiện của năng lượng nhất nguyên, nguồn gốc sinh hóa vạn vật.', link: '#/learn/nen-tang/1' },
      { id: 'CPT-003', name: 'Âm Dương', hanzi: '陰陽', pinyin: 'Yin yang', school: 'Bản Thể Luận', type: 'Khái Niệm', desc: 'Hai trạng thái đối lập tương hỗ: Âm (Tĩnh, Nước) và Dương (Động, Lửa).', link: '#/learn/nen-tang/1' },
      { id: 'CPT-007', name: 'Ngũ Hành Sinh Khắc', hanzi: '五行生剋', pinyin: 'Wu xing', school: 'Bản Thể Luận', type: 'Khái Niệm', desc: 'Năm trạng thái vận động: Kim, Mộc, Thủy, Hỏa, Thổ.', link: '#/learn/nen-tang/4' },
      { id: 'CPT-009', name: 'Hà Đồ', hanzi: '河圖', pinyin: 'He tu', school: 'Dịch Học', type: 'Khái Niệm', desc: 'Số Sinh & Số Thành: Thiên 1 sinh Thủy - Địa 6 thành chi.', link: '#/learn/nen-tang/5' },
      { id: 'CPT-010', name: 'Lạc Thư', hanzi: '洛書', pinyin: 'Luo shu', school: 'Dịch Học', type: 'Khái Niệm', desc: 'Ma phương Cửu Cung 3x3 tổng 15.', link: '#/learn/nen-tang/6' },
      { id: 'CPT-013', name: 'Địa Lý Loan Đầu', hanzi: '巒頭地理', pinyin: 'Luan tou', school: 'Loan Đầu Phái', type: 'Khái Niệm', desc: 'Nghệ thuật Tầm Long, Điểm Huyệt, Sa Thủy, Minh Đường.', link: '#/learn/loan-dau/1' },
      { id: 'CPT-014', name: 'Bát Trạch Minh Kính', hanzi: '八宅明鏡', pinyin: 'Ba zhai', school: 'Bát Trạch Phái', type: 'Khái Niệm', desc: 'Cung Phi Mệnh Quái, Đông Tây Tứ Trạch, 8 Du Niên Cát Hung.', link: '#/learn/bat-trach/1' },
      { id: 'CPT-015', name: 'Tam Hợp Thủy Pháp', hanzi: '三合水法', pinyin: 'San he', school: 'Tam Hợp Phái', type: 'Khái Niệm', desc: '12 Cung Trường Sinh, Tứ Đại Cục Thủy Pháp và Hoàng Tuyền Sát.', link: '#/learn/tam-hop/1' },
      { id: 'CPT-016', name: 'Huyền Không Phi Tinh', hanzi: '玄空飛星', pinyin: 'Xuan kong', school: 'Huyền Không Phái', type: 'Khái Niệm', desc: 'Tam Nguyên Cửu Vận, Tinh Bàn 24 Sơn Hướng, Vận 9 Ly Hỏa.', link: '#/learn/huyen-khong/1' }
    ];

    conceptsList.forEach(c => {
      this.index.push({
        id: c.id,
        title: `${c.name} (${c.hanzi})`,
        subtitle: `${c.id} • ${c.pinyin}`,
        category: 'concept',
        categoryLabel: 'Khái Niệm',
        school: c.school,
        desc: c.desc,
        link: c.link,
        searchStr: this.removeTones(`${c.id} ${c.name} ${c.hanzi} ${c.pinyin} ${c.school} ${c.desc}`)
      });
    });

    // 2. Index Lessons (From Reader Tracks)
    if (window.scholarlyReader && window.scholarlyReader.tracks) {
      Object.entries(window.scholarlyReader.tracks).forEach(([tKey, track]) => {
        track.parts.forEach((p, idx) => {
          if (!p) return;
          const lNum = idx + 1;
          this.index.push({
            id: `LES-${tKey}-${lNum}`,
            title: p.chapter_title || `Tiết ${lNum}`,
            subtitle: `${track.title} • Tiết ${lNum}`,
            category: 'lesson',
            categoryLabel: 'Bài Học',
            school: track.school,
            desc: p.sub_title || '',
            link: `#/learn/${tKey}/${lNum}`,
            searchStr: this.removeTones(`${p.chapter_title} ${p.sub_title} ${track.title} ${track.school}`)
          });
        });
      });
    }

    // 3. Index Sources & Tools
    const staticItems = [
      { id: 'SRC-001', title: 'Táng Thư (葬書)', subtitle: 'Quách Phác (Đông Tấn) • Hạng A', category: 'source', categoryLabel: 'Thư Tịch Cổ', school: 'Loan Đầu Phái', desc: 'Khí thừa phong tắc tán, giới thủy tắc chỉ.', link: '#/library/tang-thu/1' },
      { id: 'SRC-002', title: 'Thanh Nang Kinh (青囊經)', subtitle: 'Hoàng Thạch Công • Hạng A', category: 'source', categoryLabel: 'Thư Tịch Cổ', school: 'Bản Thể Luận', desc: 'Thiên tôn địa ti, Càn Khôn định hĩ.', link: '#/library/thanh-nang-kinh/1' },
      { id: 'SRC-004', title: 'Bát Trạch Minh Kính (八宅明鏡)', subtitle: 'Dương Quân Tùng • Hạng B', category: 'source', categoryLabel: 'Thư Tịch Cổ', school: 'Bát Trạch Phái', desc: 'Đông tứ mệnh nghi cư đông tứ trạch, tây tứ mệnh nghi cư tây tứ trạch.', link: '#/library/bat-trach-minh-kinh/1' },
      { id: 'SRC-005', title: 'Thẩm Thị Huyền Không Học (沈氏玄空學)', subtitle: 'Thẩm Trúc Nhưng • Hạng B', category: 'source', categoryLabel: 'Thư Tịch Cổ', school: 'Huyền Không Phái', desc: 'Huyền Không chi pháp, dĩ thời vi bản. Tam nguyên cửu vận.', link: '#/library/tham-thi-huyen-khong/1' },
      { id: 'TOOL-001', title: 'Lập Quẻ Bát Trạch Minh Kính', subtitle: 'Công cụ tính Cung Mệnh Quái', category: 'tool', categoryLabel: 'Công Cụ', school: 'Bát Trạch Phái', desc: 'Tính toán Cung Phi, Đông Tây Tứ Mệnh và ma trận 8 phương vị cát hung.', link: '#/tools' },
      { id: 'TOOL-002', title: 'Tinh Bàn Huyền Không Phi Tinh 9 Vận', subtitle: 'Công cụ lập Tinh Bàn 24 Sơn', category: 'tool', categoryLabel: 'Công Cụ', school: 'Huyền Không Phái', desc: 'Phi tinh Cửu Cung 3 tầng (Vận - Tọa - Hướng) cho 24 Sơn Hướng.', link: '#/tools' }
    ];

    staticItems.forEach(item => {
      this.index.push({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        category: item.category,
        categoryLabel: item.categoryLabel,
        school: item.school,
        desc: item.desc,
        link: item.link,
        searchStr: this.removeTones(`${item.id} ${item.title} ${item.subtitle} ${item.school} ${item.desc}`)
      });
    });
  }

  highlightMatch(text, query) {
    if (!text || !query) return text || '';
    const cleanQ = query.trim();
    if (!cleanQ) return text;
    try {
      const reg = new RegExp(`(${cleanQ.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      return text.replace(reg, '<mark style="background:rgba(245,158,11,0.3); color:#FEF3C7; padding:0 3px; border-radius:3px; font-weight:700;">$1</mark>');
    } catch (e) {
      return text;
    }
  }

  search(query, category = 'all', school = 'all') {
    if (this.index.length === 0) this.buildIndex();

    const cleanQ = this.removeTones(query.trim());
    if (!cleanQ) return [];

    return this.index.filter(item => {
      const matchCat = category === 'all' || item.category === category;
      const matchSchool = school === 'all' || item.school.toLowerCase().includes(school.toLowerCase());
      const matchText = item.searchStr.includes(cleanQ);
      return matchCat && matchSchool && matchText;
    });
  }

  renderSearchResults(query) {
    const resultsContainer = document.getElementById('grouped-search-results');
    const inputEl = document.getElementById('grouped-search-input');
    if (!resultsContainer) return;

    if (inputEl && query) inputEl.value = query;

    const results = this.search(query, this.currentCategory, this.currentSchool);

    if (!query.trim()) {
      resultsContainer.innerHTML = `
        <div style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom:1rem; opacity:0.5;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <div style="font-size:1.1rem; color:#FEF3C7; font-weight:700; margin-bottom:0.4rem;">Nhập từ khóa để tra cứu đa chiều</div>
          <p style="font-size:0.9rem; max-width:500px; margin:0 auto;">Gõ tên khái niệm, bài học, tác phẩm cổ thư, quẻ, sơn hướng hoặc sao phi tinh...</p>
        </div>
      `;
      return;
    }

    if (results.length === 0) {
      resultsContainer.innerHTML = `
        <div style="text-align:center; padding:3rem 1rem; background:#121722; border-radius:14px; border:1px solid rgba(255,255,255,0.06);">
          <div style="font-size:1.1rem; color:#FCA5A5; font-weight:700; margin-bottom:0.4rem;">Không tìm thấy kết quả phù hợp cho "${query}"</div>
          <p style="font-size:0.9rem; color:var(--text-muted);">Vui lòng thử lại với từ khóa ngắn gọn hơn (ví dụ: Vô Cực, Thái Cực, Loan Đầu, Vận 9...).</p>
        </div>
      `;
      return;
    }

    // Group by category
    const grouped = {
      concept: results.filter(r => r.category === 'concept'),
      lesson: results.filter(r => r.category === 'lesson'),
      source: results.filter(r => r.category === 'source'),
      tool: results.filter(r => r.category === 'tool')
    };

    const renderGroup = (label, items, color) => {
      if (!items || items.length === 0) return '';
      const cardsHtml = items.map(item => `
        <a href="${item.link}" class="search-result-card" style="background:#121722; border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1.2rem; text-decoration:none; display:flex; flex-direction:column; justify-content:space-between; transition:all 0.2s ease;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
              <span style="font-size:0.75rem; font-weight:800; color:${color}; background:${color}18; padding:0.2rem 0.5rem; border-radius:10px;">
                ${item.categoryLabel} • ${item.school}
              </span>
            </div>
            <h4 style="font-size:1.1rem; color:#FEF3C7; font-weight:700; margin:0 0 0.25rem 0;">
              ${this.highlightMatch(item.title, query)}
            </h4>
            <div style="font-size:0.8rem; color:#38BDF8; margin-bottom:0.6rem;">
              ${item.subtitle}
            </div>
            <p style="font-size:0.86rem; color:var(--text-muted); line-height:1.5; margin:0;">
              ${this.highlightMatch(item.desc, query)}
            </p>
          </div>
          <div style="margin-top:1rem; font-size:0.82rem; color:${color}; font-weight:700; display:flex; align-items:center; gap:0.3rem;">
            Truy cập mục này ➔
          </div>
        </a>
      `).join('');

      return `
        <div style="margin-bottom:2.5rem;">
          <h3 style="font-size:1.15rem; color:#FEF3C7; font-weight:800; margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.5rem;">
            <span>${label}</span>
            <span style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">(${items.length} kết quả)</span>
          </h3>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1.2rem;">
            ${cardsHtml}
          </div>
        </div>
      `;
    };

    resultsContainer.innerHTML = `
      <div style="margin-bottom:1.5rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.8rem;">
        <span style="font-size:0.9rem; color:var(--text-muted);">
          Tìm thấy <strong>${results.length}</strong> kết quả cho từ khóa "<strong style="color:#FEF3C7;">${query}</strong>"
        </span>
      </div>
      <div>
        ${renderGroup('🌟 Khái Niệm Cốt Lõi', grouped.concept, '#FBBF24')}
        ${renderGroup('📚 Bài Học Giáo Trình', grouped.lesson, '#34D399')}
        ${renderGroup('📜 Thư Tịch Cổ Điển', grouped.source, '#60A5FA')}
        ${renderGroup('⚙️ Bàn Tính & Công Cụ', grouped.tool, '#C084FC')}
      </div>
    `;
  }
}

// Khởi tạo Search Engine
window.scholarlySearchEngine = new ScholarlySearchEngine();
window.executeGroupedSearch = function(query) {
  window.scholarlySearchEngine.renderSearchResults(query);
};
