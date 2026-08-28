// =========================================================================
// HUYỀN HỌC MỤ — NATIVE SVG KNOWLEDGE GRAPH & EVIDENCE INSPECTOR (PHASE 8)
// =========================================================================

class EvidenceGraphUI {
  constructor() {
    this.currentTab = 'graph'; // 'graph' | 'conflicts' | 'sources' | 'claims'
    this.nodes = [
      { id: 'CPT-001', name: 'Vô Cực (0)', hanzi: '無極', tier: 0, x: 500, y: 50, color: '#FBBF24', link: '#/learn/nen-tang/1', desc: 'Trạng thái hư vô tuyệt đối trước khi phân hóa.' },
      { id: 'CPT-002', name: 'Thái Cực (1)', hanzi: '太極', tier: 1, x: 500, y: 130, color: '#FBBF24', link: '#/learn/nen-tang/1', desc: 'Nhất nguyên đạo khí, khởi điểm sinh hóa.' },
      { id: 'CPT-003', name: 'Âm Dương (2)', hanzi: '陰陽', tier: 2, x: 500, y: 210, color: '#FBBF24', link: '#/learn/nen-tang/1', desc: 'Hai cực phân hóa: Âm (Tĩnh) & Dương (Động).' },
      { id: 'CPT-004', name: 'Tứ Tượng (4)', hanzi: '四象', tier: 3, x: 500, y: 290, color: '#FBBF24', link: '#/learn/nen-tang/2', desc: 'Thái Dương, Thiếu Âm, Thiếu Dương, Thái Âm.' },
      
      { id: 'CPT-005', name: 'Tiên Thiên Bát Quái', hanzi: '伏羲八卦', tier: 4, x: 300, y: 380, color: '#60A5FA', link: '#/learn/nen-tang/3', desc: 'Càn Khôn định vị, Sơn Trạch thông khí.' },
      { id: 'CPT-007', name: 'Ngũ Hành Bản Thể', hanzi: '五行生剋', tier: 4, x: 700, y: 380, color: '#34D399', link: '#/learn/nen-tang/4', desc: 'Kim, Mộc, Thủy, Hỏa, Thổ tương sinh tương khắc.' },

      { id: 'CPT-006', name: 'Hậu Thiên Bát Quái', hanzi: '文王八卦', tier: 5, x: 300, y: 470, color: '#60A5FA', link: '#/learn/nen-tang/3', desc: 'Trục thời gian 4 mùa và 8 hướng La Bàn.' },
      { id: 'CPT-008', name: 'Phản Sinh Phản Khắc', hanzi: '反生反剋', tier: 5, x: 700, y: 470, color: '#34D399', link: '#/learn/nen-tang/4', desc: 'Vật cực tất phản: Ngũ hành thừa vũ và thoái khí.' },

      { id: 'CPT-009', name: 'Hà Đồ (Số Sinh Thành)', hanzi: '河圖', tier: 6, x: 380, y: 560, color: '#FBBF24', link: '#/learn/nen-tang/5', desc: 'Thiên 1 sinh Thủy - Địa 6 thành chi.' },
      { id: 'CPT-010', name: 'Lạc Thư (Cửu Cung)', hanzi: '洛書', tier: 6, x: 620, y: 560, color: '#C084FC', link: '#/learn/nen-tang/6', desc: 'Ma phương 3x3 tổng 15, khẩu quyết Đới Cửu Lý Nhất.' },

      { id: 'CPT-013', name: 'Địa Lý Loan Đầu', hanzi: '巒頭派', tier: 7, x: 150, y: 670, color: '#D97706', link: '#/learn/loan-dau/1', desc: 'Tầm Long, Tróc Mạch, Điểm Huyệt, Sa Thủy.' },
      { id: 'CPT-014', name: 'Bát Trạch Minh Kính', hanzi: '八宅派', tier: 7, x: 380, y: 670, color: '#60A5FA', link: '#/learn/bat-trach/1', desc: 'Cung Phi Mệnh Quái, 8 Du Niên Cát Hung.' },
      { id: 'CPT-015', name: 'Tam Hợp Thủy Pháp', hanzi: '三合派', tier: 7, x: 620, y: 670, color: '#34D399', link: '#/learn/tam-hop/1', desc: '12 Cung Trường Sinh, Tứ Đại Cục Thủy Pháp.' },
      { id: 'CPT-016', name: 'Huyền Không Phi Tinh', hanzi: '玄空派', tier: 7, x: 850, y: 670, color: '#C084FC', link: '#/learn/huyen-khong/1', desc: 'Tam Nguyên Cửu Vận, Tinh Bàn 24 Sơn Hướng.' }
    ];

    this.links = [
      { source: 'CPT-001', target: 'CPT-002' },
      { source: 'CPT-002', target: 'CPT-003' },
      { source: 'CPT-003', target: 'CPT-004' },
      { source: 'CPT-004', target: 'CPT-005' },
      { source: 'CPT-004', target: 'CPT-007' },
      { source: 'CPT-005', target: 'CPT-006' },
      { source: 'CPT-007', target: 'CPT-008' },
      { source: 'CPT-006', target: 'CPT-009' },
      { source: 'CPT-008', target: 'CPT-010' },
      { source: 'CPT-005', target: 'CPT-013' },
      { source: 'CPT-006', target: 'CPT-014' },
      { source: 'CPT-007', target: 'CPT-015' },
      { source: 'CPT-010', target: 'CPT-016' }
    ];
  }

  render(tab = 'graph') {
    this.currentTab = tab;
    const container = document.getElementById('research-evidence-panel');
    if (!container) return;

    container.innerHTML = `
      <div style="max-width:1150px; margin:0 auto;">
        <!-- Tab Navigation -->
        <div style="display:flex; gap:0.6rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:1rem; margin-bottom:2rem; flex-wrap:wrap;">
          <button onclick="window.evidenceGraphUI.render('graph')" style="background:${this.currentTab === 'graph' ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentTab === 'graph' ? '#FBBF24' : 'rgba(255,255,255,0.1)'}; color:#FEF3C7; padding:0.5rem 1rem; border-radius:8px; font-weight:700; font-size:0.85rem; cursor:pointer;">
            🌐 Đồ Hình Quan Hệ Tri Thức
          </button>
          <button onclick="window.evidenceGraphUI.render('conflicts')" style="background:${this.currentTab === 'conflicts' ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentTab === 'conflicts' ? '#FBBF24' : 'rgba(255,255,255,0.1)'}; color:#FEF3C7; padding:0.5rem 1rem; border-radius:8px; font-weight:700; font-size:0.85rem; cursor:pointer;">
            ⚖️ Ma Trận Bất Đồng Trường Phái
          </button>
          <button onclick="window.evidenceGraphUI.render('sources')" style="background:${this.currentTab === 'sources' ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentTab === 'sources' ? '#FBBF24' : 'rgba(255,255,255,0.1)'}; color:#FEF3C7; padding:0.5rem 1rem; border-radius:8px; font-weight:700; font-size:0.85rem; cursor:pointer;">
            📜 Thang Phân Cấp Thư Tịch (A - F)
          </button>
          <button onclick="window.evidenceGraphUI.render('claims')" style="background:${this.currentTab === 'claims' ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentTab === 'claims' ? '#FBBF24' : 'rgba(255,255,255,0.1)'}; color:#FEF3C7; padding:0.5rem 1rem; border-radius:8px; font-weight:700; font-size:0.85rem; cursor:pointer;">
            🔍 Danh Mục Khẳng Định & Kiểm Chứng
          </button>
        </div>

        <!-- Tab Content View -->
        <div id="evidence-tab-content">
          ${this.getTabContent(this.currentTab)}
        </div>
      </div>
    `;
  }

  getTabContent(tab) {
    if (tab === 'graph') {
      return this.renderSvgGraph();
    } else if (tab === 'conflicts') {
      return window.researchUI ? window.researchUI.conflicts.map(c => `
        <div style="background:#121722; border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:1.5rem; margin-bottom:1.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.6rem;">
            <h3 style="font-family:var(--font-title); font-size:1.2rem; color:#FEF3C7; margin:0;">${c.issue}</h3>
            <span style="font-size:0.75rem; font-weight:800; color:#F472B6; background:rgba(236,72,153,0.12); padding:0.25rem 0.6rem; border-radius:12px;">${c.status}</span>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:1.2rem; margin-bottom:1.2rem;">
            <div style="background:rgba(59,130,246,0.06); border-left:3px solid #60A5FA; padding:1rem; border-radius:0 8px 8px 0;">
              <strong style="color:#60A5FA; font-size:0.92rem; display:block; margin-bottom:0.3rem;">[A] ${c.schoolA}:</strong>
              <p style="font-size:0.88rem; color:var(--text-pure); line-height:1.6; margin:0;">${c.viewA}</p>
            </div>
            <div style="background:rgba(192,132,252,0.06); border-left:3px solid #C084FC; padding:1rem; border-radius:0 8px 8px 0;">
              <strong style="color:#C084FC; font-size:0.92rem; display:block; margin-bottom:0.3rem;">[B] ${c.schoolB}:</strong>
              <p style="font-size:0.88rem; color:var(--text-pure); line-height:1.6; margin:0;">${c.viewB}</p>
            </div>
          </div>
          <div style="background:rgba(0,0,0,0.3); padding:0.8rem 1rem; border-radius:8px; font-size:0.85rem; color:var(--text-muted); line-height:1.55;">
            <strong style="color:#FBBF24;">Biện giải học thuật:</strong> ${c.analysis}
          </div>
        </div>
      `).join('') : '';
    } else if (tab === 'sources') {
      return `
        <div style="background:#121722; border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:1.8rem;">
          <h3 style="font-size:1.2rem; color:#FEF3C7; margin-bottom:1rem;">Hệ Thống Phân Cấp Nguồn Thư Tịch Chuẩn Mực</h3>
          <div style="display:flex; flex-direction:column; gap:1rem;">
            <div style="background:rgba(245,158,11,0.08); border-left:4px solid #FBBF24; padding:1rem; border-radius:0 8px 8px 0;">
              <strong style="color:#FBBF24; font-size:1rem;">HẠNG A: Thư Tịch Cổ Điển Chính Điển (Độ Tin Cậy: 100%)</strong>
              <p style="font-size:0.88rem; color:var(--text-pure); line-height:1.6; margin:0.3rem 0 0 0;">Lưu trữ tại Tứ Khố Toàn Thư, Đạo Tạng, Giáp Cốt Văn, Trúc Giản Quách Điếm. Ví dụ: Táng Thư, Thanh Nang Kinh, Hoàng Đế Trạch Kinh.</p>
            </div>
            <div style="background:rgba(96,165,250,0.08); border-left:4px solid #60A5FA; padding:1rem; border-radius:0 8px 8px 0;">
              <strong style="color:#60A5FA; font-size:1rem;">HẠNG B: Chú Giải & Khảo Luận Của Danh Sư (Độ Tin Cậy: 90%)</strong>
              <p style="font-size:0.88rem; color:var(--text-pure); line-height:1.6; margin:0.3rem 0 0 0;">Công trình của các học giả danh tiếng: Thẩm Thị Huyền Không Học, Bát Trạch Minh Kính, Chu Tử Gia Lễ, Tả Ao Địa Lý.</p>
            </div>
            <div style="background:rgba(52,211,153,0.08); border-left:4px solid #34D399; padding:1rem; border-radius:0 8px 8px 0;">
              <strong style="color:#34D399; font-size:1rem;">HẠNG C: Tài Liệu Chép Tay & Gia Truyền (Độ Tin Cậy: 75%)</strong>
              <p style="font-size:0.88rem; color:var(--text-pure); line-height:1.6; margin:0.3rem 0 0 0;">Bản chép tay có xuất xứ dòng họ hoặc địa phương xác định được.</p>
            </div>
            <div style="background:rgba(239,68,68,0.08); border-left:4px solid #EF4444; padding:1rem; border-radius:0 8px 8px 0;">
              <strong style="color:#EF4444; font-size:1rem;">HẠNG F: Dữ Liệu Tự Suy Diễn / AI Tự Sinh (BỊ CẤM XUẤT BẢN)</strong>
              <p style="font-size:0.88rem; color:#FCA5A5; line-height:1.6; margin:0.3rem 0 0 0;">Mọi nội dung không có nguồn trích cổ thư đều bị gắn cờ UNVERIFIED và không được xem là chân lý.</p>
            </div>
          </div>
        </div>
      `;
    } else if (tab === 'claims') {
      return `
        <div style="background:#121722; border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:1.8rem;">
          <h3 style="font-size:1.2rem; color:#FEF3C7; margin-bottom:1.2rem;">Danh Mục Các Khẳng Định Nguyên Tử Đã Kiểm Chứng (Verified Claims)</h3>
          <div style="display:flex; flex-direction:column; gap:1rem;">
            <div style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:1.2rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
                <span style="color:#38BDF8; font-weight:800; font-size:0.85rem;">[CLM-001] • CPT-013 (Loan Đầu)</span>
                <span style="background:rgba(16,185,129,0.15); color:#34D399; font-size:0.75rem; font-weight:800; padding:0.2rem 0.5rem; border-radius:10px;">VERIFIED (Hạng A)</span>
              </div>
              <p style="font-size:0.92rem; color:var(--text-pure); line-height:1.6; margin:0 0 0.5rem 0;">"Phong Thủy là nghệ thuật tàng phong tụ khí: Khí gặp gió thì tán, gặp nước thì dừng."</p>
              <div style="font-size:0.8rem; color:var(--text-muted);">Xuất xứ: <strong>Táng Thư (Quách Phác)</strong> • Tứ Khố Toàn Thư</div>
            </div>

            <div style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:1.2rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
                <span style="color:#38BDF8; font-weight:800; font-size:0.85rem;">[CLM-002] • CPT-016 (Huyền Không)</span>
                <span style="background:rgba(16,185,129,0.15); color:#34D399; font-size:0.75rem; font-weight:800; padding:0.2rem 0.5rem; border-radius:10px;">VERIFIED (Hạng B)</span>
              </div>
              <p style="font-size:0.92rem; color:var(--text-pure); line-height:1.6; margin:0 0 0.5rem 0;">"Vận khí dương trạch biến thiên theo chu kỳ Tam Nguyên Cửu Vận 180 năm (mỗi vận 20 năm)."</p>
              <div style="font-size:0.8rem; color:var(--text-muted);">Xuất xứ: <strong>Thẩm Thị Huyền Không Học (Thẩm Trúc Nhưng)</strong> • Hoằng Hóa Xã</div>
            </div>
          </div>
        </div>
      `;
    }
    return '';
  }

  renderSvgGraph() {
    const nodeMap = {};
    this.nodes.forEach(n => { nodeMap[n.id] = n; });

    const linesSvg = this.links.map(l => {
      const s = nodeMap[l.source];
      const t = nodeMap[l.target];
      if (!s || !t) return '';
      return `<line x1="${s.x}" y1="${s.y}" x2="${t.x}" y2="${t.y}" stroke="rgba(255,255,255,0.15)" stroke-width="2" stroke-dasharray="4 2"/>`;
    }).join('');

    const nodesSvg = this.nodes.map(n => `
      <g class="svg-graph-node" onclick="window.location.hash = '${n.link}'" style="cursor:pointer;" transform="translate(${n.x}, ${n.y})">
        <circle r="26" fill="#121722" stroke="${n.color}" stroke-width="2.5" filter="drop-shadow(0 0 8px ${n.color}44)"/>
        <text text-anchor="middle" y="5" font-family="'Ma Shan Zheng', serif" font-size="13" fill="${n.color}">${n.hanzi}</text>
        <text text-anchor="middle" y="44" font-family="var(--font-body)" font-size="11" font-weight="700" fill="#FEF3C7">${n.name}</text>
      </g>
    `).join('');

    return `
      <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:1.5rem; text-align:center;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
          <span style="font-size:0.85rem; color:#FBBF24; font-weight:800; text-transform:uppercase;">
            🌐 Đồ Hình Phụ Thuộc Khái Niệm Tiên Thiên & Hậu Thiên
          </span>
          <span style="font-size:0.8rem; color:var(--text-muted);">
            💡 Nhấp vào từng node để truy cập trực tiếp bài học tương ứng
          </span>
        </div>

        <div style="overflow-x:auto; padding:1rem 0;">
          <svg viewBox="0 0 1000 740" style="width:100%; min-width:850px; max-width:1000px; height:auto; display:block; margin:0 auto;">
            ${linesSvg}
            ${nodesSvg}
          </svg>
        </div>
      </div>
    `;
  }
}

// Khởi tạo EvidenceGraphUI
window.evidenceGraphUI = new EvidenceGraphUI();
