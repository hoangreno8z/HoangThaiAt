/**
 * BỘ SINH LA KINH VECTOR SVG TOÁN HỌC TRONG SUỐT (TECHNICAL TRANSPARENT OVERLAY)
 * Đặc điểm kỹ thuật:
 * 1. Nền trong suốt hoàn toàn, nét mảnh sắc sảo, không dùng mảng màu đặc che khuất ảnh vệ tinh.
 * 2. Chỉ highlight nhẹ tại 4 Sector trọng điểm: Hướng nhà, Tọa, Lai Thủy, Khứ Thủy.
 * 3. Thiên Trì (Tâm La Kinh) có khoảng rỗng lớn hoàn toàn trong suốt để nhìn thấy mái nhà và sân.
 * 4. Cơ chế LOD (Level of Detail): 144 vạch chia độ kỹ thuật thanh mảnh, không nhồi nhét 144 số.
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./luopan_geometry', './luopan_data'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./luopan_geometry'), require('./luopan_data'));
  } else {
    root.LuopanSvgRenderer = factory(root.LuopanGeometry, root.LuopanData);
  }
}(typeof self !== 'undefined' ? self : this, function(Geometry, Data) {
  'use strict';

  class LuopanSvgRenderer {
    constructor(config = {}) {
      this.size = config.size || 800;
      this.defaultCx = this.size / 2;
      this.defaultCy = this.size / 2;
      this.defaultRadius = this.size / 2 - 16;

      this.layers = Object.assign({
        centerPin: true,      // Chữ thập chỉ thị & tâm thiên trì rỗng
        trigrams: true,       // Bát Quái hậu thiên (8 quẻ)
        mountains24: true,    // 24 Sơn chánh vị
        waterMouth144: true,  // 144 Phân vị kỹ thuật
        degrees360: true,     // Chu thiên 360 độ
        pointers: true        // 4 Kim chỉ tiêu (Hướng, Tọa, Lai, Khứ)
      }, config.layers || {});
    }

    setLayerVisibility(layerId, isVisible) {
      if (layerId in this.layers) {
        this.layers[layerId] = Boolean(isVisible);
      }
    }

    render(state = {}) {
      const {
        cx = this.defaultCx,
        cy = this.defaultCy,
        radius = this.defaultRadius,
        rotation = 0,
        houseFacing = null,
        houseSitting = null,
        laiBearing = null,
        khuBearing = null,
        activeHsNum = null,
        opacity = 0.85
      } = state;

      const r = radius;
      // Bán kính các tầng đồng tâm (từ ngoài vào trong)
      const rOuter360 = r;
      const rInner360 = r - 26;

      const rOuter144 = rInner360;
      const rInner144 = rOuter144 - 36;

      const rOuter24 = rInner144;
      const rInner24 = rOuter24 - 48;

      const rOuterTrigram = rInner24;
      const rInnerTrigram = rOuterTrigram - 42;

      // Tâm Thiên Trì có bán kính rỗng lớn để nhìn thấy mái nhà/sân
      const rCenterHole = rInnerTrigram;

      // Xác định các Sơn được highlight
      const facingMountain = houseFacing !== null ? Data.getMountain(houseFacing).mountain.name : null;
      const sittingMountain = houseSitting !== null ? Data.getMountain(houseSitting).mountain.name : null;
      const laiMountain = laiBearing !== null ? Data.getMountain(laiBearing).mountain.name : null;
      const khuMountain = khuBearing !== null ? Data.getMountain(khuBearing).mountain.name : null;

      // ── TẦNG 1: CHU THIÊN 360 ĐỘ ──
      let svg360 = '';
      if (this.layers.degrees360) {
        const ticks = [];
        for (let deg = 0; deg < 360; deg++) {
          const isMajor = deg % 10 === 0;
          const isMedium = deg % 5 === 0;
          const tickLen = isMajor ? 11 : (isMedium ? 6 : 3.5);
          const p1 = Geometry.polarToSvgCartesian(cx, cy, rOuter360, deg);
          const p2 = Geometry.polarToSvgCartesian(cx, cy, rOuter360 - tickLen, deg);
          const stroke = isMajor ? '#FEF3C7' : (isMedium ? '#94A3B8' : '#475569');
          ticks.push(`<line x1="${p1.x.toFixed(2)}" y1="${p1.y.toFixed(2)}" x2="${p2.x.toFixed(2)}" y2="${p2.y.toFixed(2)}" stroke="${stroke}" stroke-width="${isMajor ? 1.4 : 0.8}" />`);

          if (isMajor) {
            const pText = Geometry.polarToSvgCartesian(cx, cy, rOuter360 - 17, deg);
            ticks.push(`<text x="${pText.x.toFixed(2)}" y="${pText.y.toFixed(2)}" font-size="7.5" font-family="'Be Vietnam Pro', sans-serif" fill="#FDE047" font-weight="700" text-anchor="middle" dominant-baseline="central" transform="rotate(${deg}, ${pText.x.toFixed(2)}, ${pText.y.toFixed(2)})">${deg}°</text>`);
          }
        }
        svg360 = `
          <g id="layer-360" class="dt-luopan-layer">
            <circle cx="${cx}" cy="${cy}" r="${rOuter360}" fill="none" stroke="#C5B382" stroke-width="1.8" />
            <circle cx="${cx}" cy="${cy}" r="${rInner360}" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1" />
            ${ticks.join('')}
          </g>`;
      }

      // ── TẦNG 2: 144 PHÂN VỊ KỸ THUẬT (LOD: VẠCH THANH MẢNH, CHỈ HIGHLIGHT SECTOR ĐANG XÉT) ──
      let svg144 = '';
      if (this.layers.waterMouth144) {
        const step = 360 / 144; // 2.5 độ mỗi phân vị
        const sectors144 = [];

        for (let i = 0; i < 144; i++) {
          const startDeg = i * step;
          const endDeg = (i + 1) * step;
          const centerDeg = startDeg + step / 2;

          // Kiểm tra xem sector có chứa Hướng nhà, Lai hoặc Khứ hay không
          let isHighlight = false;
          let highlightColor = 'transparent';

          if (houseFacing !== null && Math.abs(Geometry.normalizeBearing(houseFacing - centerDeg)) <= 1.25) {
            isHighlight = true;
            highlightColor = 'rgba(239, 68, 68, 0.35)'; // Đỏ Hướng nhà
          } else if (laiBearing !== null && Math.abs(Geometry.normalizeBearing(laiBearing - centerDeg)) <= 1.25) {
            isHighlight = true;
            highlightColor = 'rgba(52, 211, 153, 0.35)'; // Xanh Lai Thủy
          } else if (khuBearing !== null && Math.abs(Geometry.normalizeBearing(khuBearing - centerDeg)) <= 1.25) {
            isHighlight = true;
            highlightColor = 'rgba(56, 189, 248, 0.35)'; // Lam Khứ Thủy
          }

          const pathD = Geometry.createAnnularSectorPath(cx, cy, rInner144, rOuter144, startDeg, endDeg);
          const stroke = isHighlight ? '#FEF3C7' : 'rgba(255,255,255,0.08)';

          sectors144.push(`
            <path d="${pathD}" fill="${highlightColor}" stroke="${stroke}" stroke-width="${isHighlight ? 1.2 : 0.5}" />
          `);
        }

        svg144 = `
          <g id="layer-144" class="dt-luopan-layer">
            <circle cx="${cx}" cy="${cy}" r="${rInner144}" fill="none" stroke="#C5B382" stroke-width="1" />
            ${sectors144.join('')}
          </g>`;
      }

      // ── TẦNG 3: NHỊ THẬP TỨ SƠN (24 SƠN NỀN TRONG SUỐT KỸ THUẬT) ──
      let svg24 = '';
      if (this.layers.mountains24) {
        const sectors24 = [];
        Data.MOUNTAINS_24.forEach(m => {
          const pathD = Geometry.createAnnularSectorPath(cx, cy, rInner24, rOuter24, m.start, m.end);
          const pText = Geometry.polarToSvgCartesian(cx, cy, (rInner24 + rOuter24) / 2, m.center);
          
          // Nền mặc định HOÀN TOÀN TRONG SUỐT, chỉ highlight nhẹ khi trùng mốc đo
          let fill = 'none';
          let strokeWidth = 0.8;
          let strokeColor = 'rgba(255,255,255,0.15)';

          if (m.name === facingMountain) {
            fill = 'rgba(239, 68, 68, 0.22)';
            strokeColor = '#EF4444';
            strokeWidth = 1.5;
          } else if (m.name === sittingMountain) {
            fill = 'rgba(251, 191, 36, 0.18)';
            strokeColor = '#FBBF24';
            strokeWidth = 1.2;
          } else if (m.name === laiMountain) {
            fill = 'rgba(52, 211, 153, 0.22)';
            strokeColor = '#34D399';
            strokeWidth = 1.5;
          } else if (m.name === khuMountain) {
            fill = 'rgba(56, 189, 248, 0.22)';
            strokeColor = '#38BDF8';
            strokeWidth = 1.5;
          }

          sectors24.push(`
            <path d="${pathD}" fill="${fill}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
            <text x="${pText.x.toFixed(2)}" y="${(pText.y - 4).toFixed(2)}" font-size="12" font-family="'Noto Serif SC', serif" fill="${m.color}" font-weight="900" text-anchor="middle" dominant-baseline="central" transform="rotate(${m.center}, ${pText.x.toFixed(2)}, ${pText.y.toFixed(2)})">${m.hanzi}</text>
            <text x="${pText.x.toFixed(2)}" y="${(pText.y + 8).toFixed(2)}" font-size="7.5" font-family="'Be Vietnam Pro', sans-serif" fill="#FEF3C7" font-weight="800" text-anchor="middle" dominant-baseline="central" transform="rotate(${m.center}, ${pText.x.toFixed(2)}, ${pText.y.toFixed(2)})">${m.name}</text>
          `);
        });

        svg24 = `
          <g id="layer-24" class="dt-luopan-layer">
            <circle cx="${cx}" cy="${cy}" r="${rInner24}" fill="none" stroke="#C5B382" stroke-width="1.4" />
            ${sectors24.join('')}
          </g>`;
      }

      // ── TẦNG 4: BÁT QUÁI HẬU THIÊN (8 CUNG TRONG SUỐT) ──
      let svgTrigrams = '';
      if (this.layers.trigrams) {
        const trigramSectors = [];
        Data.TRIGRAMS_8.forEach(t => {
          const pathD = Geometry.createAnnularSectorPath(cx, cy, rInnerTrigram, rOuterTrigram, t.start, t.end);
          const pText = Geometry.polarToSvgCartesian(cx, cy, (rInnerTrigram + rOuterTrigram) / 2, t.center);

          trigramSectors.push(`
            <path d="${pathD}" fill="none" stroke="rgba(197,179,130,0.3)" stroke-width="1" />
            <text x="${pText.x.toFixed(2)}" y="${(pText.y - 5).toFixed(2)}" font-size="14" fill="#F5D485" font-weight="700" text-anchor="middle" dominant-baseline="central" transform="rotate(${t.center}, ${pText.x.toFixed(2)}, ${pText.y.toFixed(2)})">${t.symbol}</text>
            <text x="${pText.x.toFixed(2)}" y="${(pText.y + 8).toFixed(2)}" font-size="9" font-family="'Be Vietnam Pro', sans-serif" fill="#CBD5E1" font-weight="700" text-anchor="middle" dominant-baseline="central" transform="rotate(${t.center}, ${pText.x.toFixed(2)}, ${pText.y.toFixed(2)})">${t.name}</text>
          `);
        });

        svgTrigrams = `
          <g id="layer-trigrams" class="dt-luopan-layer">
            <circle cx="${cx}" cy="${cy}" r="${rInnerTrigram}" fill="none" stroke="#C5B382" stroke-width="1.6" />
            ${trigramSectors.join('')}
          </g>`;
      }

      // ── TẦNG 5: THIÊN TRÌ TRONG SUỐT (TÂM RỖNG LỚN NHÌN RÕ MÁI NHÀ VÀ SÂN) ──
      let svgCenter = '';
      if (this.layers.centerPin) {
        svgCenter = `
          <g id="layer-center" class="dt-luopan-layer">
            <!-- Vòng tròn Thiên Trì rỗng hoàn toàn, không che khuất bản đồ/mái nhà -->
            <circle cx="${cx}" cy="${cy}" r="${rCenterHole}" fill="none" stroke="rgba(197,179,130,0.5)" stroke-width="1.5" />
            <circle cx="${cx}" cy="${cy}" r="${rCenterHole * 0.4}" fill="none" stroke="rgba(56,189,248,0.3)" stroke-width="1" stroke-dasharray="4,4" />
            
            <!-- Thập đạo hồng tuyến nét đứt đỏ mảnh -->
            <line x1="${cx}" y1="${cy - rCenterHole}" x2="${cx}" y2="${cy + rCenterHole}" stroke="#EF4444" stroke-width="1.2" stroke-dasharray="4,3" />
            <line x1="${cx - rCenterHole}" y1="${cy}" x2="${cx + rCenterHole}" y2="${cy}" stroke="#EF4444" stroke-width="1.2" stroke-dasharray="4,3" />

            <!-- Điểm tâm trung tâm -->
            <circle cx="${cx}" cy="${cy}" r="4" fill="#EF4444" stroke="#FFF" stroke-width="1.2" />
          </g>`;
      }

      // ── TẦNG 6: 4 ĐƯỜNG CHỈ TIÊU (BẮC NÉT ĐỨT, HƯỚNG NÉT LIỀN, LAI MŨI TÊN VÀO, KHỨ MŨI TÊN RA) ──
      let svgPointers = '';
      if (this.layers.pointers) {
        const pointerLines = [];

        // 1. Đường Bắc Chuẩn (Nét đứt, chỉ hướng 0 độ)
        const pNorth = Geometry.polarToSvgCartesian(cx, cy, rOuter360 + 12, 0);
        pointerLines.push(`
          <line x1="${cx}" y1="${cy}" x2="${pNorth.x.toFixed(2)}" y2="${pNorth.y.toFixed(2)}" stroke="#CBD5E1" stroke-width="1.8" stroke-dasharray="6,4" />
          <text x="${pNorth.x.toFixed(2)}" y="${(pNorth.y - 8).toFixed(2)}" font-size="10" font-weight="900" fill="#CBD5E1" text-anchor="middle">BẮC</text>
        `);

        // 2. Kim Hướng Nhà (Nét Liền Màu Đỏ #EF4444)
        if (houseFacing !== null) {
          const pFacing = Geometry.polarToSvgCartesian(cx, cy, rOuter360 + 10, houseFacing);
          pointerLines.push(`
            <line x1="${cx}" y1="${cy}" x2="${pFacing.x.toFixed(2)}" y2="${pFacing.y.toFixed(2)}" stroke="#EF4444" stroke-width="3" />
            <circle cx="${pFacing.x.toFixed(2)}" cy="${pFacing.y.toFixed(2)}" r="6" fill="#EF4444" stroke="#FFF" stroke-width="1.5" />
          `);
        }

        // 3. Kim Tọa Nhà (Màu Vàng #FBBF24)
        if (houseSitting !== null) {
          const pSitting = Geometry.polarToSvgCartesian(cx, cy, rOuter360 - 5, houseSitting);
          pointerLines.push(`
            <line x1="${cx}" y1="${cy}" x2="${pSitting.x.toFixed(2)}" y2="${pSitting.y.toFixed(2)}" stroke="#FBBF24" stroke-width="2" stroke-dasharray="4,4" />
          `);
        }

        // 4. Kim Lai Thủy (Xanh Lục #34D399, Mũi Tên Hướng Vào Tâm)
        if (laiBearing !== null) {
          const pLai = Geometry.polarToSvgCartesian(cx, cy, rOuter360 + 8, laiBearing);
          pointerLines.push(`
            <line x1="${cx}" y1="${cy}" x2="${pLai.x.toFixed(2)}" y2="${pLai.y.toFixed(2)}" stroke="#34D399" stroke-width="2.5" />
            <polygon points="${pLai.x},${pLai.y} ${pLai.x-5},${pLai.y+9} ${pLai.x+5},${pLai.y+9}" fill="#34D399" transform="rotate(${laiBearing + 180}, ${pLai.x}, ${pLai.y})" />
          `);
        }

        // 5. Kim Khứ Thủy (Xanh Lam #38BDF8, Mũi Tên Hướng Ra Ngoài)
        if (khuBearing !== null) {
          const pKhu = Geometry.polarToSvgCartesian(cx, cy, rOuter360 + 8, khuBearing);
          pointerLines.push(`
            <line x1="${cx}" y1="${cy}" x2="${pKhu.x.toFixed(2)}" y2="${pKhu.y.toFixed(2)}" stroke="#38BDF8" stroke-width="2.5" />
            <polygon points="${pKhu.x},${pKhu.y} ${pKhu.x-5},${pKhu.y-9} ${pKhu.x+5},${pKhu.y-9}" fill="#38BDF8" transform="rotate(${khuBearing}, ${pKhu.x}, ${pKhu.y})" />
          `);
        }

        svgPointers = `<g id="layer-pointers" class="dt-luopan-layer">${pointerLines.join('')}</g>`;
      }

      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.size} ${this.size}" preserveAspectRatio="xMidYMid meet" width="100%" height="100%" style="opacity:${opacity}; filter:drop-shadow(0 8px 24px rgba(0,0,0,0.5));">
          <g transform="rotate(${-rotation}, ${cx}, ${cy})">
            ${svg360}
            ${svg144}
            ${svg24}
            ${svgTrigrams}
            ${svgCenter}
            ${svgPointers}
          </g>
        </svg>
      `;
    }
  }

  return LuopanSvgRenderer;
}));
