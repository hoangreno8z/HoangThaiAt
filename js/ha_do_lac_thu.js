/**
 * HÀ ĐỒ & LẠC THƯ INTERACTIVE VISUALIZER
 * Vẽ Hà Đồ (Sinh/Thành số, chấm đen/trắng, trục Thổ 5-10)
 * và Ma Trận Lạc Thư (Ma phương Cửu Cung bậc 3, hằng số 15)
 */

class HaDoVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width = 340;
    this.height = this.canvas.height = 340;
    this.activePair = null;
    this.init();
  }

  init() {
    this.draw();
  }

  draw(highlightPair = null) {
    const ctx = this.ctx;
    const cx = this.width / 2;
    const cy = this.height / 2;
    ctx.clearRect(0, 0, this.width, this.height);

    // Background cosmic subtle ring
    ctx.strokeStyle = 'rgba(229, 192, 123, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, 140, 0, Math.PI * 2);
    ctx.stroke();

    // Coordinate grid lines
    ctx.beginPath();
    ctx.moveTo(cx, 20); ctx.lineTo(cx, this.height - 20);
    ctx.moveTo(20, cy); ctx.lineTo(this.width - 20, cy);
    ctx.stroke();

    // Pairs definition in Ha Do
    // 1 (Trắng, Bắc trong), 6 (Đen, Bắc ngoài) - Thủy
    // 2 (Đen, Nam trong), 7 (Trắng, Nam ngoài) - Hỏa
    // 3 (Trắng, Đông trong), 8 (Đen, Đông ngoài) - Mộc
    // 4 (Đen, Tây trong), 9 (Trắng, Tây ngoài) - Kim
    // 5 (Trắng, Tâm), 10 (Đen, Tâm vòng ngoài) - Thổ

    // Draw connecting lines between pairs
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
    ctx.lineWidth = 1.5;

    // Draw North (1-6) Thủy
    this.drawDotLine(cx, cy - 35, 1, true, highlightPair === '1-6'); // 1 dot White
    this.drawDotLine(cx, cy - 90, 6, false, highlightPair === '1-6', 15); // 6 dots Black
    
    // Draw South (2-7) Hỏa
    this.drawDotLine(cx, cy + 35, 2, false, highlightPair === '2-7', 20); // 2 dots Black
    this.drawDotLine(cx, cy + 90, 7, true, highlightPair === '2-7', 15); // 7 dots White

    // Draw East (3-8) Mộc
    this.drawDotLineH(cx - 35, cy, 3, true, highlightPair === '3-8', 16); // 3 dots White
    this.drawDotLineH(cx - 90, cy, 8, false, highlightPair === '3-8', 14); // 8 dots Black

    // Draw West (4-9) Kim
    this.drawDotLineH(cx + 35, cy, 4, false, highlightPair === '4-9', 16); // 4 dots Black
    this.drawDotLineH(cx + 90, cy, 9, true, highlightPair === '4-9', 13); // 9 dots White

    // Draw Center (5-10) Thổ
    this.drawCenter5and10(cx, cy, highlightPair === '5-10');

    // Directional Labels
    ctx.font = '11px "Inter", sans-serif';
    ctx.fillStyle = 'rgba(229, 192, 123, 0.7)';
    ctx.textAlign = 'center';
    ctx.fillText('BẮC (1,6 THỦY)', cx, 15);
    ctx.fillText('NAM (2,7 HỎA)', cx, this.height - 8);
    ctx.fillText('ĐÔNG (3,8 MỘC)', 45, cy + 4);
    ctx.fillText('TÂY (4,9 KIM)', this.width - 45, cy + 4);
  }

  drawDot(x, y, isWhite, isHighlighted) {
    const ctx = this.ctx;
    const radius = 5;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    if (isWhite) {
      ctx.fillStyle = isHighlighted ? '#FBBF24' : '#F8FAFC';
      ctx.fill();
      ctx.strokeStyle = isHighlighted ? '#D97706' : '#94A3B8';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    } else {
      ctx.fillStyle = isHighlighted ? '#EF4444' : '#1E293B';
      ctx.fill();
      ctx.strokeStyle = isHighlighted ? '#F87171' : '#64748B';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  drawDotLine(cx, cy, count, isWhite, isHighlighted, spacing = 14) {
    const startX = cx - ((count - 1) * spacing) / 2;
    for (let i = 0; i < count; i++) {
      this.drawDot(startX + i * spacing, cy, isWhite, isHighlighted);
    }
  }

  drawDotLineH(cx, cy, count, isWhite, isHighlighted, spacing = 14) {
    const startY = cy - ((count - 1) * spacing) / 2;
    for (let i = 0; i < count; i++) {
      this.drawDot(cx, startY + i * spacing, isWhite, isHighlighted);
    }
  }

  drawCenter5and10(cx, cy, isHighlighted) {
    // 5 dots in cross (+)
    const r = 14;
    this.drawDot(cx, cy, true, isHighlighted);
    this.drawDot(cx - r, cy, true, isHighlighted);
    this.drawDot(cx + r, cy, true, isHighlighted);
    this.drawDot(cx, cy - r, true, isHighlighted);
    this.drawDot(cx, cy + r, true, isHighlighted);

    // 10 black dots surrounding in rectangle
    const d = 26;
    // 5 top, 5 bottom
    for (let i = -2; i <= 2; i++) {
      this.drawDot(cx + i * 10, cy - d, false, isHighlighted);
      this.drawDot(cx + i * 10, cy + d, false, isHighlighted);
    }
  }
}

// Lạc Thư Controller & Magic Sum Check
class LacThuController {
  constructor(gridElementId, infoElementId) {
    this.grid = document.getElementById(gridElementId);
    this.info = document.getElementById(infoElementId);
    this.matrix = [
      [4, 9, 2],
      [3, 5, 7],
      [8, 1, 6]
    ];
    this.names = [
      ["Tốn (Mộc)", "Ly (Hỏa)", "Khôn (Thổ)"],
      ["Chấn (Mộc)", "Trung (Thổ)", "Đoài (Kim)"],
      ["Cấn (Thổ)", "Khảm (Thủy)", "Càn (Kim)"]
    ];
    this.init();
  }

  init() {
    if (!this.grid) return;
    this.renderGrid();
  }

  renderGrid() {
    this.grid.innerHTML = '';
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const val = this.matrix[r][c];
        const cell = document.createElement('div');
        cell.className = `magic-cell ${val === 5 ? 'center' : ''}`;
        cell.dataset.r = r;
        cell.dataset.c = c;
        cell.innerHTML = `
          <span class="cell-num">${val}</span>
          <span class="cell-sub">${this.names[r][c]}</span>
        `;

        cell.addEventListener('mouseenter', () => this.highlightRays(r, c));
        cell.addEventListener('mouseleave', () => this.clearHighlight());
        this.grid.appendChild(cell);
      }
    }
  }

  highlightRays(row, col) {
    const cells = this.grid.querySelectorAll('.magic-cell');
    cells.forEach(cell => {
      const r = parseInt(cell.dataset.r);
      const c = parseInt(cell.dataset.c);
      if (r === row || c === col || (row === col && r === c) || (row + col === 2 && r + c === 2)) {
        cell.classList.add('highlight');
      }
    });

    if (this.info) {
      const val = this.matrix[row][col];
      const sumRow = this.matrix[row].reduce((a, b) => a + b, 0);
      const sumCol = this.matrix[0][col] + this.matrix[1][col] + this.matrix[2][col];
      this.info.innerHTML = `
        <div style="font-size:0.9rem; color:var(--gold-primary);">
          <strong>Cung [${this.names[row][col]} - Số ${val}]:</strong>
        </div>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-top:0.3rem;">
          • Tổng Hàng ngang = <strong>${sumRow}</strong> | Tổng Cột dọc = <strong>${sumCol}</strong><br>
          • Mọi trục đi qua Trung Cung 5 đều đạt hằng số cân bằng vũ trụ: <strong>15</strong>.
        </p>
      `;
    }
  }

  clearHighlight() {
    const cells = this.grid.querySelectorAll('.magic-cell');
    cells.forEach(cell => cell.classList.remove('highlight'));
    if (this.info) {
      this.info.innerHTML = `
        <p style="font-size:0.85rem; color:var(--text-muted); font-style:italic;">
          * Rê chuột vào từng cung để kiểm tra tính đối xứng và hằng số ma phương 15 của Lạc Thư.
        </p>
      `;
    }
  }
}
