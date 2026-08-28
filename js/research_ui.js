// =========================================================================
// HUYỀN HỌC MỤ — SCHOLARLY RESEARCH & CONFLICT MATRIX CONTROLLER (PHASE 5)
// =========================================================================

class ResearchUI {
  constructor() {
    this.conflicts = [
      {
        issue: '1. Xác Định Hướng Nhà Dương Trạch',
        schoolA: 'Bát Trạch Minh Kính',
        viewA: 'Lấy Tọa Hướng của cửa ra vào (Đại Môn) làm hướng quyết định cung mệnh của toàn bộ trạch quái.',
        schoolB: 'Huyền Không Phi Tinh',
        viewB: 'Lấy hướng nạp khí sáng nhất, có trường năng lượng dương lớn nhất (Mặt tiền, Ban công, Cửa sổ lớn) làm Hướng để lập Tinh Bàn.',
        status: 'CONFLICTED (Bất đồng trường phái cốt tử)',
        analysis: 'Huyền Không chú trọng ánh sáng và dòng chảy trường khí thực tế; Bát Trạch chú trọng cánh cửa dẫn khí người ra vào.'
      },
      {
        issue: '2. Yếu Tố Thời Gian & Vận Khí Biến Thiên',
        schoolA: 'Bát Trạch Phái',
        viewA: 'Mệnh Quái tính theo năm sinh bất biến suốt đời người, hướng nhà tốt xấu giữ nguyên theo năm sinh.',
        schoolB: 'Huyền Không Tam Nguyên',
        viewB: 'Vận khí biến thiên theo chu kỳ 20 năm (Tam Nguyên Cửu Vận). Một hướng nhà vượng ở Vận 8 có thể trở thành suy bại ở Vận 9 nếu sao hướng thoái khí.',
        status: 'CONFLICTED (Khác biệt hệ quy chiếu)',
        analysis: 'Bát Trạch là hệ quy chiếu tĩnh (Không gian thuần túy); Huyền Không là hệ quy chiếu động (Không - Thời gian 4 chiều).'
      },
      {
        issue: '3. Phương Pháp Định Vị Thủy Pháp Khảo Sát',
        schoolA: 'Tam Hợp Phái',
        viewA: 'Căn cứ vào 12 Cung Trường Sinh và Tứ Đại Cục (Hỏa Cục, Thủy Cục, Kim Cục, Mộc Cục) để phân định Sinh - Vượng - Tử - Tuyệt và tránh Hoàng Tuyền Sát.',
        schoolB: 'Huyền Không Phái',
        viewB: 'Căn cứ vào Tinh Bàn Lạc Thư: Nơi có Thủy bắt buộc phải gặp Sao Hướng Đương Lệnh (Vận 9 cần gặp Cửu Tử Hỏa Tinh nạp thủy).',
        status: 'COMPLEMENTARY / CONFLICTED',
        analysis: 'Có thể kết hợp: Chọn địa thế hợp Tam Hợp Thủy Pháp rồi dùng Tinh Bàn Huyền Không để kích hoạt thời điểm vượng khí.'
      }
    ];
  }

  renderPanel() {
    const container = document.getElementById('research-evidence-panel');
    if (!container) return;

    const conflictsHtml = this.conflicts.map(c => `
      <div style="background:#121722; border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:1.5rem; margin-bottom:1.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.6rem;">
          <h3 style="font-family:var(--font-title); font-size:1.2rem; color:#FEF3C7; margin:0;">
            ${c.issue}
          </h3>
          <span style="font-size:0.75rem; font-weight:800; color:#F472B6; background:rgba(236,72,153,0.12); padding:0.25rem 0.6rem; border-radius:12px;">
            ${c.status}
          </span>
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
    `).join('');

    container.innerHTML = `
      <div style="max-width:1100px; margin:0 auto;">
        <!-- Nav Tabs -->
        <div style="display:flex; gap:1rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:1rem; margin-bottom:2rem;">
          <button style="background:rgba(245,158,11,0.15); border:1px solid rgba(245,158,11,0.4); color:#FEF3C7; padding:0.5rem 1rem; border-radius:8px; font-weight:700; font-size:0.88rem; cursor:pointer;">
            ⚖️ Ma Trận Bất Đồng Trường Phái (Conflict Matrix)
          </button>
        </div>

        <!-- Conflicts List -->
        <div>
          ${conflictsHtml}
        </div>
      </div>
    `;
  }
}

// Khởi tạo ResearchUI
window.researchUI = new ResearchUI();
