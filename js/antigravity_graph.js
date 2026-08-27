/**
 * ĐỒ THỊ TRI THỨC KHÔNG TRỌNG LỰC (ANTIGRAVITY KNOWLEDGE GRAPH)
 * Sử dụng D3.js v7 Force Simulation để mô phỏng mạng lưới tri thức đa chiều.
 * Hỗ trợ kéo thả (Drag), phóng to/thu nhỏ (Zoom), chạm cảm ứng (Touch) trên iOS/Android.
 */

class AntigravityGraph {
  constructor(containerId, drawerId) {
    this.container = document.getElementById(containerId);
    this.drawer = document.getElementById(drawerId);
    this.data = JSON.parse(JSON.stringify(COSMIC_DATA.knowledge_graph));
    this.simulation = null;
    this.svg = null;
    this.g = null;
    this.zoom = null;
    this.activeFilter = 'all';
    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
    this.bindWindowEvents();
  }

  render() {
    this.container.innerHTML = '';
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || 650;

    // Group Color Palette
    const groupColors = {
      genesis: '#E5C07B',   // Vàng Kim (Khởi Nguyên)
      polarity: '#38BDF8',  // Xanh Thiên Thể (Âm Dương)
      math: '#F59E0B',      // Hổ Phách (Hà Lạc)
      wuxing: '#10B981',    // Lục Bảo (Ngũ Hành)
      bagua: '#CBD5E1',     // Bạch Kim (Bát Quái)
      viet: '#E06C75',      // Chu Sa (Văn Hóa Lạc Việt)
      physics: '#2DD4BF',   // Ngọc Bích (Cát Hung)
      tamthuc: '#A855F7'    // Tử Khí (Tam Thức)
    };

    // Filter nodes if needed
    let displayNodes = this.data.nodes;
    let displayLinks = this.data.links;

    if (this.activeFilter !== 'all') {
      displayNodes = this.data.nodes.filter(n => n.group === this.activeFilter);
      const activeIds = new Set(displayNodes.map(n => n.id));
      displayLinks = this.data.links.filter(l => activeIds.has(l.source.id || l.source) && activeIds.has(l.target.id || l.target));
    }

    // 1. Create Main SVG with Zoom support
    this.svg = d3.select(this.container).append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('class', 'antigravity-svg');

    this.g = this.svg.append('g').attr('class', 'graph-content');

    this.zoom = d3.zoom()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        this.g.attr('transform', event.transform);
      });

    this.svg.call(this.zoom);

    // 2. Initialize Force Simulation (Anti-gravity physics)
    this.simulation = d3.forceSimulation(displayNodes)
      .force('link', d3.forceLink(displayLinks).id(d => d.id).distance(80))
      .force('charge', d3.forceManyBody().strength(-300)) // Lực đẩy phản trọng lực
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius(d => d.radius + 12));

    // 3. Draw Connecting Links
    const link = this.g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(displayLinks)
      .enter().append('line')
      .attr('stroke', 'rgba(229, 192, 123, 0.25)')
      .attr('stroke-width', d => Math.sqrt(d.value || 2) * 1.2)
      .attr('stroke-dasharray', d => d.value > 4 ? 'none' : '3 3');

    // 4. Draw Node Groups
    const node = this.g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(displayNodes)
      .enter().append('g')
      .attr('class', 'graph-node')
      .call(d3.drag()
        .on('start', (e, d) => this.dragStarted(e, d))
        .on('drag', (e, d) => this.dragged(e, d))
        .on('end', (e, d) => this.dragEnded(e, d))
      )
      .on('click', (e, d) => this.showNodeDetail(d));

    // Outer Halo Circle
    node.append('circle')
      .attr('r', d => d.radius + 4)
      .attr('fill', 'none')
      .attr('stroke', d => groupColors[d.group] || '#E5C07B')
      .attr('stroke-opacity', 0.3)
      .attr('stroke-width', 1)
      .attr('class', 'node-halo');

    // Main Core Circle
    node.append('circle')
      .attr('r', d => d.radius)
      .attr('fill', '#090D16')
      .attr('stroke', d => groupColors[d.group] || '#E5C07B')
      .attr('stroke-width', 2)
      .attr('class', 'node-core');

    // Node Label
    node.append('text')
      .text(d => d.id)
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('fill', '#F8FAFC')
      .attr('font-size', d => d.radius > 26 ? '12px' : '10px')
      .attr('font-family', "'Inter', sans-serif")
      .attr('font-weight', '600')
      .style('pointer-events', 'none')
      .style('text-shadow', '0 2px 4px rgba(0,0,0,0.8)');

    // 5. Tick Handler
    this.simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Auto select first node to showcase details
    if (displayNodes.length > 0 && !this.drawer.classList.contains('open')) {
      const rootNode = displayNodes.find(n => n.id === 'Thái Cực') || displayNodes[0];
      this.showNodeDetail(rootNode);
    }
  }

  dragStarted(event, d) {
    if (!event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
    if (window.soundCtrl) window.soundCtrl.playBell(580);
  }

  dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  dragEnded(event, d) {
    if (!event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  filterGroup(group) {
    this.activeFilter = group;
    this.render();
  }

  resetView() {
    if (this.svg && this.zoom) {
      this.svg.transition().duration(750).call(
        this.zoom.transform,
        d3.zoomIdentity
      );
    }
  }

  showNodeDetail(nodeData) {
    if (!this.drawer) return;
    if (window.soundCtrl) window.soundCtrl.playBell(528);

    // Find connections
    const connections = this.data.links.filter(l => 
      (l.source.id || l.source) === nodeData.id || 
      (l.target.id || l.target) === nodeData.id
    ).map(l => {
      const otherId = (l.source.id || l.source) === nodeData.id ? (l.target.id || l.target) : (l.source.id || l.source);
      return otherId;
    });

    this.drawer.innerHTML = `
      <div class="drawer-header">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <div>
            <span class="drawer-category">${nodeData.cat}</span>
            <h3 class="drawer-title">${nodeData.id}</h3>
          </div>
          <button class="drawer-close-btn" onclick="window.antigravityGraph.closeDrawer()">
            ${renderIcon('close', 18)}
          </button>
        </div>
      </div>

      <div class="drawer-body">
        <div class="drawer-desc-card">
          <h4 style="color:var(--gold-primary); font-size:0.85rem; margin-bottom:0.4rem; text-transform:uppercase; letter-spacing:1px;">Ý Nghĩa Khởi Nguyên & Bản Thể:</h4>
          <p style="color:var(--text-pure); font-size:0.95rem; line-height:1.7;">${nodeData.desc}</p>
        </div>

        ${nodeData.quote ? `
          <div style="background:rgba(229,192,123,0.08); border-left:3px solid var(--gold-primary); padding:0.8rem 1rem; border-radius:0 8px 8px 0; margin-top:1rem;">
            <div style="font-size:0.75rem; color:var(--gold-primary); font-weight:600; text-transform:uppercase; margin-bottom:0.2rem;">Cổ Thư Trích Yếu:</div>
            <div style="font-size:0.9rem; color:var(--text-pure); font-style:italic;">"${nodeData.quote}"</div>
          </div>
        ` : ''}

        <div style="margin-top:1.5rem;">
          <h4 style="color:var(--jade-cyan); font-size:0.85rem; text-transform:uppercase; letter-spacing:1px; margin-bottom:0.6rem;">
            Liên Kết Trong Mạng Lưới (${connections.length}):
          </h4>
          <div style="display:flex; flex-wrap:wrap; gap:0.4rem;">
            ${connections.map(c => `
              <span class="connection-tag" onclick="window.antigravityGraph.focusNode('${c}')">${c}</span>
            `).join('')}
          </div>
        </div>

        <div style="margin-top:1.8rem; border-top:1px solid var(--border-subtle); padding-top:1rem;">
          <a href="#treatises-section" class="btn-secondary" style="width:100%; justify-content:center; font-size:0.85rem; padding:0.6rem 1rem;">
            <span>Xem Đại Luận Thuyết Chuyên Sâu</span>
            ${renderIcon('arrowRight', 12)}
          </a>
        </div>
      </div>
    `;

    this.drawer.classList.add('open');
  }

  closeDrawer() {
    if (this.drawer) {
      this.drawer.classList.remove('open');
    }
  }

  focusNode(nodeId) {
    const target = this.data.nodes.find(n => n.id === nodeId);
    if (target) {
      this.showNodeDetail(target);
    }
  }

  bindWindowEvents() {
    window.addEventListener('resize', () => {
      if (this.container) {
        this.render();
      }
    });
  }
}
