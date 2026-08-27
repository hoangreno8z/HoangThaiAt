/**
 * NGŨ HÀNH DYNAMIC ENGINE & VECTOR PHASES
 * Mô phỏng 5 pha vận động của Khí, vòng Tương Sinh, Tương Khắc và Cơ chế Chế Hóa.
 */

class NguHanhEngine {
  constructor(canvasId, infoPanelId) {
    this.canvas = document.getElementById(canvasId);
    this.infoPanel = document.getElementById(infoPanelId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width = 460;
    this.height = this.canvas.height = 460;
    this.activeCycle = 'all'; // 'sinh', 'khac', 'che_hoa', 'all'
    this.activePhase = 'wood';
    this.nodes = [];
    this.animFrame = 0;
    this.init();
  }

  init() {
    this.calculateNodePositions();
    this.bindEvents();
    this.animate();
    this.displayPhaseInfo(this.activePhase);
  }

  calculateNodePositions() {
    const cx = this.width / 2;
    const cy = this.height / 2;
    const radius = 145;
    // Order in pentagram (Top: Fire, Right: Earth, Bottom-Right: Metal, Bottom-Left: Water, Left: Wood)
    const phases = COSMIC_DATA.ngu_hanh.phases;
    // Standard ancient layout:
    // Fire (Nam/Top: -90 deg)
    // Earth (Trung/Tây Nam: -18 deg)
    // Metal (Tây/Bottom-Right: 54 deg)
    // Water (Bắc/Bottom-Left: 126 deg)
    // Wood (Đông/Left: 198 deg)
    const phaseOrder = ['fire', 'earth', 'metal', 'water', 'wood'];
    const angles = [-90, -18, 54, 126, 198];

    this.nodes = phaseOrder.map((id, idx) => {
      const data = phases.find(p => p.id === id);
      const rad = angles[idx] * (Math.PI / 180);
      return {
        id: data.id,
        name: data.name,
        hanzi: data.hanzi,
        color: data.color,
        x: cx + radius * Math.cos(rad),
        y: cy + radius * Math.sin(rad),
        radius: 34,
        data: data
      };
    });
  }

  bindEvents() {
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.width / rect.width;
      const scaleY = this.height / rect.height;
      const mouseX = (e.clientX - rect.left) * scaleX;
      const mouseY = (e.clientY - rect.top) * scaleY;

      for (let node of this.nodes) {
        const dist = Math.hypot(node.x - mouseX, node.y - mouseY);
        if (dist <= node.radius) {
          this.activePhase = node.id;
          this.displayPhaseInfo(node.id);
          break;
        }
      }
    });
  }

  setCycle(cycleType) {
    this.activeCycle = cycleType;
    if (this.infoPanel && cycleType === 'che_hoa') {
      this.displayCheHoaPrinciple();
    }
  }

  animate() {
    this.animFrame++;
    this.draw();
    requestAnimationFrame(() => this.animate());
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
    const cx = this.width / 2;
    const cy = this.height / 2;

    // Draw background subtle pentagram
    ctx.strokeStyle = 'rgba(229, 192, 123, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, 145, 0, Math.PI * 2);
    ctx.stroke();

    // 1. Draw Sinh Cycle (Outer Circle: Wood -> Fire -> Earth -> Metal -> Water -> Wood)
    if (this.activeCycle === 'sinh' || this.activeCycle === 'all' || this.activeCycle === 'che_hoa') {
      this.drawSinhLines();
    }

    // 2. Draw Khắc Cycle (Inner Star: Wood -> Earth -> Water -> Fire -> Metal -> Wood)
    if (this.activeCycle === 'khac' || this.activeCycle === 'all' || this.activeCycle === 'che_hoa') {
      this.drawKhacLines();
    }

    // 3. Draw Nodes
    this.nodes.forEach(node => {
      const isSelected = node.id === this.activePhase;

      // Glow effect for selected
      if (isSelected) {
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 20;
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#0B101D';
      ctx.fill();
      ctx.lineWidth = isSelected ? 3 : 1.5;
      ctx.strokeStyle = node.color;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Inner text
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = node.color;
      ctx.font = 'bold 16px "Cinzel", serif';
      ctx.fillText(node.name, node.x, node.y - 6);

      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = '12px "Ma Shan Zheng", cursive';
      ctx.fillText(node.hanzi, node.x, node.y + 12);
    });
  }

  drawSinhLines() {
    const ctx = this.ctx;
    const sinhOrder = ['wood', 'fire', 'earth', 'metal', 'water', 'wood'];
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';

    for (let i = 0; i < sinhOrder.length - 1; i++) {
      const fromNode = this.nodes.find(n => n.id === sinhOrder[i]);
      const toNode = this.nodes.find(n => n.id === sinhOrder[i + 1]);
      this.drawCurvedArrow(fromNode, toNode, 'rgba(16, 185, 129, 0.6)');
    }
  }

  drawKhacLines() {
    const ctx = this.ctx;
    const khacOrder = ['wood', 'earth', 'water', 'fire', 'metal', 'wood'];
    ctx.lineWidth = 1.5;

    for (let i = 0; i < khacOrder.length - 1; i++) {
      const fromNode = this.nodes.find(n => n.id === khacOrder[i]);
      const toNode = this.nodes.find(n => n.id === khacOrder[i + 1]);
      this.drawDashedLine(fromNode.x, fromNode.y, toNode.x, toNode.y, 'rgba(239, 68, 68, 0.5)');
    }
  }

  drawCurvedArrow(from, to, color) {
    const ctx = this.ctx;
    const cx = this.width / 2;
    const cy = this.height / 2;
    
    // Draw arc connecting points
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.moveTo(from.x, from.y);
    ctx.quadraticCurveTo(cx, cy, to.x, to.y);
    ctx.stroke();
  }

  drawDashedLine(x1, y1, x2, y2, color) {
    const ctx = this.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = color;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  }

  displayPhaseInfo(phaseId) {
    const phase = COSMIC_DATA.ngu_hanh.phases.find(p => p.id === phaseId);
    if (!this.infoPanel || !phase) return;

    this.infoPanel.innerHTML = `
      <div style="animation: fadeIn 0.3s ease;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem;">
          <div>
            <h3 style="font-family:var(--font-title); font-size:1.8rem; color:${phase.color};">Hành ${phase.name} (${phase.hanzi})</h3>
            <p style="color:var(--text-muted); font-size:0.85rem;">${phase.nature}</p>
          </div>
          <span style="font-size:2.5rem; color:${phase.color}; font-family:'Ma Shan Zheng', cursive;">${phase.hanzi}</span>
        </div>

        <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); border-radius:12px; padding:1.2rem; margin-bottom:1rem;">
          <div style="margin-bottom:0.6rem;">
            <strong style="color:var(--gold-primary); font-size:0.85rem; text-transform:uppercase;">Vector Vận Động:</strong>
            <p style="color:var(--text-pure); font-size:0.95rem;">${phase.vector}</p>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.8rem; font-size:0.85rem; color:var(--text-muted);">
            <div>• Phương vị: <strong style="color:var(--text-pure);">${phase.direction}</strong></div>
            <div>• Mùa tương ứng: <strong style="color:var(--text-pure);">${phase.season}</strong></div>
            <div>• Tạng phủ cơ thể: <strong style="color:var(--text-pure);">${phase.body}</strong></div>
            <div>• Âm luật & Vị: <strong style="color:var(--text-pure);">${phase.sound}, ${phase.taste}</strong></div>
          </div>
        </div>

        <div style="font-size:0.85rem; color:var(--text-dim); line-height:1.6;">
          <em>* Nhấn vào các hành khác trên sơ đồ mạng lưới để xem đặc tính khí hóa và liên kết tương hỗ.</em>
        </div>
      </div>
    `;
  }

  displayCheHoaPrinciple() {
    if (!this.infoPanel) return;
    this.infoPanel.innerHTML = `
      <div style="animation: fadeIn 0.3s ease;">
        <h3 style="font-family:var(--font-title); font-size:1.5rem; color:var(--gold-primary); margin-bottom:0.8rem;">Quy Luật Chế Hóa (Homeostasis Cổ Đại)</h3>
        <p style="color:var(--text-pure); font-size:0.95rem; line-height:1.7; margin-bottom:1rem;">
          ${COSMIC_DATA.ngu_hanh.cycles.che_hoa_explain}
        </p>
        <div style="background:rgba(229,192,123,0.08); border-left:3px solid var(--gold-primary); padding:1rem; border-radius:0 8px 8px 0; font-size:0.88rem; color:var(--gold-primary);">
          "Khắc chi trung hữu sinh, sinh chi trung hữu khắc. Vô sinh tắc vô do dĩ phát, vô khắc tắc quá cực vi hại."
          <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.4rem;">(Trong Khắc có Sinh, trong Sinh có Khắc. Không có Sinh thì không lấy gì nảy nở, không có Khắc thì bành trướng quá cực sinh họa).</div>
        </div>
      </div>
    `;
  }
}
