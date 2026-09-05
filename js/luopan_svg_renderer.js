/**
 * BỘ SINH LA KINH VECTOR SVG TOÁN HỌC TRONG SUỐT (TECHNICAL TRANSPARENT OVERLAY)
 * Đặc điểm kỹ thuật & Tối ưu khả năng đọc trên ảnh vệ tinh:
 * 1. Halo kép (Two-pass halo outline) cho toàn bộ text: lớp sau làm viền tối dày chống bết, lớp trước là glyph màu sắc nét.
 * 2. Phân cấp thị giác rõ ràng: Chu thiên 360 độ (2x) & 24 Sơn (1.8-2x) là 2 tầng ưu tiên số 1; Bát Quái tăng nhẹ 1.25x.
 * 3. Nới rộng khoảng cách radial: Vòng 360 rộng 40px (chữ không đè vạch chia); Vòng 24 Sơn rộng 66px (chữ Hán + chữ Việt thoáng đãng).
 * 4. Tách biệt ringOpacity và textOpacity: Khi kéo slider mờ, vạch chia/vòng làm mờ nhiều để nhìn rõ vệ tinh, còn chữ vẫn giữ độ tương phản cao.
 * 5. Giữ nguyên toàn bộ logic toán học, sector angle, dữ liệu 24 Sơn và Thủy Khẩu 144.
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
      this.defaultRadius = 365;

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

    renderHaloText({
      x,
      y,
      text,
      fontSize,
      fontFamily = "'Be Vietnam Pro', sans-serif",
      fontWeight = '700',
      fill = '#FEF3C7',
      transform = '',
      textAnchor = 'middle',
      dominantBaseline = 'central',
      haloWidth = 2.4,
      haloColor = 'rgba(0, 0, 0, 0.95)',
      innerStroke = 'rgba(0, 0, 0, 0.35)',
      innerStrokeWidth = 0.3,
      className = 'luopan-text'
    }) {
      const tf = transform ? ` transform="${transform}"` : '';
      const ff = fontFamily ? ` font-family="${fontFamily}"` : '';
      const xStr = typeof x === 'number' ? x.toFixed(2) : x;
      const yStr = typeof y === 'number' ? y.toFixed(2) : y;
      return `
        <text x="${xStr}" y="${yStr}" font-size="${fontSize}"${ff} font-weight="${fontWeight}" text-anchor="${textAnchor}" dominant-baseline="${dominantBaseline}"${tf} class="${className}-halo luopan-text-halo" fill="none" stroke="${haloColor}" stroke-width="${haloWidth}" stroke-linejoin="round" stroke-linecap="round" pointer-events="none">${text}</text>
        <text x="${xStr}" y="${yStr}" font-size="${fontSize}"${ff} font-weight="${fontWeight}" text-anchor="${textAnchor}" dominant-baseline="${dominantBaseline}"${tf} class="${className}-main luopan-text-main" fill="${fill}" stroke="${innerStroke}" stroke-width="${innerStrokeWidth}" style="paint-order:stroke fill;" pointer-events="none">${text}</text>
      `;
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

      // ── BÁN KÍNH TỪNG TẦNG (THIẾT KẾ NỚI RỘNG CHO CHỮ LỚN CÓ HALO) ──
      const r = Math.max(350, Math.min(this.size / 2 - 25, radius || this.defaultRadius));

      // Tầng 1: Chu thiên 360 độ (bề rộng 40px, số độ to 14px không chạm tick)
      const rOuter360 = r;             // 365
      const rInner360 = rOuter360 - 40; // 325

      // Tầng 2: 144 phân vị kỹ thuật (LOD: vạch thanh mảnh, highlight khi có mốc)
      const rOuter144 = rInner360;     // 325
      const rInner144 = rOuter144 - 26; // 299

      // Tầng 3: 24 Sơn chánh vị (bề rộng 66px, tăng 37.5% cho Hanzi 16px & Tên Việt 14px)
      const rOuter24 = rInner144;      // 299
      const rInner24 = rOuter24 - 66;  // 233

      // Tầng 4: Bát Quái hậu thiên (bề rộng 40px, Quẻ 17px & Tên quẻ 11.5px)
      const rOuterTrigram = rInner24;  // 233
      const rInnerTrigram = rOuterTrigram - 40; // 193

      // Tầng 5: Thiên Trì rỗng lớn nhìn trọn mái nhà & sân
      const rCenterHole = rInnerTrigram; // 193

      // ── TÁCH BIỆT RING OPACITY VÀ TEXT OPACITY ──
      // Slider opacity điều khiển độ mờ của vòng & nền; text giữ độ tương phản cao
      const ringOpacity = Number.isFinite(opacity) ? Math.max(0.1, Math.min(1.0, opacity)) : 0.85;
      const textOpacity = Math.min(1.0, Math.max(0.75, 0.65 + 0.35 * ringOpacity));

      // Xác định các Sơn được highlight
      const facingMountain = houseFacing !== null ? Data.getMountain(houseFacing).mountain.name : null;
      const sittingMountain = houseSitting !== null ? Data.getMountain(houseSitting).mountain.name : null;
      const laiMountain = laiBearing !== null ? Data.getMountain(laiBearing).mountain.name : null;
      const khuMountain = khuBearing !== null ? Data.getMountain(khuBearing).mountain.name : null;

      // ── TẦNG 1: CHU THIÊN 360 ĐỘ ──
      let svg360 = '';
      if (this.layers.degrees360) {
        const ticks = [];
        const degreeTexts = [];
        for (let deg = 0; deg < 360; deg++) {
          const isMajor = deg % 10 === 0;
          const isMedium = deg % 5 === 0;
          const tickLen = isMajor ? 11 : (isMedium ? 6.5 : 3.5);
          const p1 = Geometry.polarToSvgCartesian(cx, cy, rOuter360, deg);
          const p2 = Geometry.polarToSvgCartesian(cx, cy, rOuter360 - tickLen, deg);
          const stroke = isMajor ? '#FEF3C7' : (isMedium ? '#94A3B8' : '#475569');
          ticks.push(`<line x1="${p1.x.toFixed(2)}" y1="${p1.y.toFixed(2)}" x2="${p2.x.toFixed(2)}" y2="${p2.y.toFixed(2)}" stroke="${stroke}" stroke-width="${isMajor ? 1.2 : (isMedium ? 0.8 : 0.5)}" />`);

          if (isMajor) {
            // Đặt số độ tại bán kính cách tick an toàn
            const pText = Geometry.polarToSvgCartesian(cx, cy, rOuter360 - 25, deg);
            degreeTexts.push(this.renderHaloText({
              x: pText.x,
              y: pText.y,
              text: `${deg}°`,
              fontSize: 14,
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: '700',
              fill: '#FDE047',
              transform: `rotate(${deg}, ${pText.x.toFixed(2)}, ${pText.y.toFixed(2)})`,
              haloWidth: 2.6,
              haloColor: 'rgba(0, 0, 0, 0.95)',
              innerStroke: 'rgba(0, 0, 0, 0.35)',
              innerStrokeWidth: 0.35,
              className: 'luopan-degree-text'
            }));
          }
        }
        svg360 = `
          <g id="layer-360" class="dt-luopan-layer">
            <g class="dt-luopan-geometry" opacity="${ringOpacity}">
              <circle cx="${cx}" cy="${cy}" r="${rOuter360}" fill="none" stroke="#C5B382" stroke-width="1.6" />
              <circle cx="${cx}" cy="${cy}" r="${rInner360}" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="0.8" />
              ${ticks.join('')}
            </g>
            <g class="dt-luopan-labels" opacity="${textOpacity}">
              ${degreeTexts.join('')}
            </g>
          </g>`;
      }

      // ── TẦNG 2: 144 PHÂN VỊ KỸ THUẬT (LOD) ──
      let svg144 = '';
      if (this.layers.waterMouth144) {
        const step = 360 / 144; // 2.5 độ mỗi phân vị
        const sectors144 = [];

        for (let i = 0; i < 144; i++) {
          const startDeg = i * step;
          const endDeg = (i + 1) * step;
          const centerDeg = startDeg + step / 2;

          let isHighlight = false;
          let highlightColor = 'none';

          if (houseFacing !== null && Math.abs(Geometry.normalizeBearing(houseFacing - centerDeg)) <= 1.25) {
            isHighlight = true;
            highlightColor = 'rgba(239, 68, 68, 0.4)';
          } else if (laiBearing !== null && Math.abs(Geometry.normalizeBearing(laiBearing - centerDeg)) <= 1.25) {
            isHighlight = true;
            highlightColor = 'rgba(52, 211, 153, 0.4)';
          } else if (khuBearing !== null && Math.abs(Geometry.normalizeBearing(khuBearing - centerDeg)) <= 1.25) {
            isHighlight = true;
            highlightColor = 'rgba(56, 189, 248, 0.4)';
          }

          const pathD = Geometry.createAnnularSectorPath(cx, cy, rInner144, rOuter144, startDeg, endDeg);
          const stroke = isHighlight ? '#FEF3C7' : 'rgba(255,255,255,0.06)';

          sectors144.push(`
            <path d="${pathD}" fill="${highlightColor}" stroke="${stroke}" stroke-width="${isHighlight ? 1.2 : 0.4}" />
          `);
        }

        svg144 = `
          <g id="layer-144" class="dt-luopan-layer">
            <g class="dt-luopan-geometry" opacity="${ringOpacity}">
              <circle cx="${cx}" cy="${cy}" r="${rInner144}" fill="none" stroke="rgba(197,179,130,0.4)" stroke-width="0.8" />
              ${sectors144.join('')}
            </g>
          </g>`;
      }

      // ── TẦNG 3: NHỊ THẬP TỨ SƠN (24 SƠN NỀN TRONG SUỐT KỸ THUẬT) ──
      let svg24 = '';
      if (this.layers.mountains24) {
        const sectors24 = [];
        const texts24 = [];
        const rHanzi = rOuter24 - 20; // 279
        const rName = rInner24 + 18;  // 251

        Data.MOUNTAINS_24.forEach(m => {
          const pathD = Geometry.createAnnularSectorPath(cx, cy, rInner24, rOuter24, m.start, m.end);
          const pHanzi = Geometry.polarToSvgCartesian(cx, cy, rHanzi, m.center);
          const pName = Geometry.polarToSvgCartesian(cx, cy, rName, m.center);

          let fill = 'none';
          let strokeWidth = 0.7;
          let strokeColor = 'rgba(255,255,255,0.14)';

          if (m.name === facingMountain) {
            fill = 'rgba(239, 68, 68, 0.28)';
            strokeColor = '#EF4444';
            strokeWidth = 1.5;
          } else if (m.name === sittingMountain) {
            fill = 'rgba(251, 191, 36, 0.22)';
            strokeColor = '#FBBF24';
            strokeWidth = 1.2;
          } else if (m.name === laiMountain) {
            fill = 'rgba(52, 211, 153, 0.28)';
            strokeColor = '#34D399';
            strokeWidth = 1.5;
          } else if (m.name === khuMountain) {
            fill = 'rgba(56, 189, 248, 0.28)';
            strokeColor = '#38BDF8';
            strokeWidth = 1.5;
          }

          sectors24.push(`
            <path d="${pathD}" fill="${fill}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
          `);

          // Chữ Hán (tăng lên 16px, halo đậm, giữ màu m.color)
          texts24.push(this.renderHaloText({
            x: pHanzi.x,
            y: pHanzi.y,
            text: m.hanzi,
            fontSize: 16,
            fontFamily: "'Noto Serif SC', serif",
            fontWeight: '900',
            fill: m.color,
            transform: `rotate(${m.center}, ${pHanzi.x.toFixed(2)}, ${pHanzi.y.toFixed(2)})`,
            haloWidth: 2.8,
            haloColor: 'rgba(0, 0, 0, 0.95)',
            innerStroke: 'rgba(0, 0, 0, 0.35)',
            innerStrokeWidth: 0.35,
            className: 'luopan-mountain-hanzi'
          }));

          // Tên Tiếng Việt 24 Sơn (tăng lên 14px, font-weight 800, halo đậm)
          texts24.push(this.renderHaloText({
            x: pName.x,
            y: pName.y,
            text: m.name,
            fontSize: 14,
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontWeight: '800',
            fill: '#FEF3C7',
            transform: `rotate(${m.center}, ${pName.x.toFixed(2)}, ${pName.y.toFixed(2)})`,
            haloWidth: 2.6,
            haloColor: 'rgba(0, 0, 0, 0.95)',
            innerStroke: 'rgba(0, 0, 0, 0.35)',
            innerStrokeWidth: 0.35,
            className: 'luopan-mountain-name'
          }));
        });

        svg24 = `
          <g id="layer-24" class="dt-luopan-layer">
            <g class="dt-luopan-geometry" opacity="${ringOpacity}">
              <circle cx="${cx}" cy="${cy}" r="${rInner24}" fill="none" stroke="#C5B382" stroke-width="1.2" />
              ${sectors24.join('')}
            </g>
            <g class="dt-luopan-labels" opacity="${textOpacity}">
              ${texts24.join('')}
            </g>
          </g>`;
      }

      // ── TẦNG 4: BÁT QUÁI HẬU THIÊN (8 CUNG TRONG SUỐT) ──
      let svgTrigrams = '';
      if (this.layers.trigrams) {
        const trigramSectors = [];
        const trigramTexts = [];
        const rSymbol = rOuterTrigram - 14; // 219
        const rName = rInnerTrigram + 12;   // 205

        Data.TRIGRAMS_8.forEach(t => {
          const pathD = Geometry.createAnnularSectorPath(cx, cy, rInnerTrigram, rOuterTrigram, t.start, t.end);
          const pSym = Geometry.polarToSvgCartesian(cx, cy, rSymbol, t.center);
          const pName = Geometry.polarToSvgCartesian(cx, cy, rName, t.center);

          trigramSectors.push(`
            <path d="${pathD}" fill="none" stroke="rgba(197,179,130,0.25)" stroke-width="0.8" />
          `);

          // Ký hiệu quẻ (17px, tăng 1.21x)
          trigramTexts.push(this.renderHaloText({
            x: pSym.x,
            y: pSym.y,
            text: t.symbol,
            fontSize: 17,
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontWeight: '700',
            fill: '#F5D485',
            transform: `rotate(${t.center}, ${pSym.x.toFixed(2)}, ${pSym.y.toFixed(2)})`,
            haloWidth: 2.4,
            haloColor: 'rgba(0, 0, 0, 0.92)',
            innerStroke: 'rgba(0, 0, 0, 0.3)',
            innerStrokeWidth: 0.3,
            className: 'luopan-trigram-symbol'
          }));

          // Tên quẻ (11.5px, tăng 1.28x)
          trigramTexts.push(this.renderHaloText({
            x: pName.x,
            y: pName.y,
            text: t.name,
            fontSize: 11.5,
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontWeight: '700',
            fill: '#CBD5E1',
            transform: `rotate(${t.center}, ${pName.x.toFixed(2)}, ${pName.y.toFixed(2)})`,
            haloWidth: 2.2,
            haloColor: 'rgba(0, 0, 0, 0.92)',
            innerStroke: 'rgba(0, 0, 0, 0.3)',
            innerStrokeWidth: 0.3,
            className: 'luopan-trigram-name'
          }));
        });

        svgTrigrams = `
          <g id="layer-trigrams" class="dt-luopan-layer">
            <g class="dt-luopan-geometry" opacity="${ringOpacity}">
              <circle cx="${cx}" cy="${cy}" r="${rInnerTrigram}" fill="none" stroke="#C5B382" stroke-width="1.3" />
              ${trigramSectors.join('')}
            </g>
            <g class="dt-luopan-labels" opacity="${textOpacity}">
              ${trigramTexts.join('')}
            </g>
          </g>`;
      }

      // ── TẦNG 5: THIÊN TRÌ TRONG SUỐT (TÂM RỖNG LỚN) ──
      let svgCenter = '';
      if (this.layers.centerPin) {
        svgCenter = `
          <g id="layer-center" class="dt-luopan-layer">
            <g class="dt-luopan-geometry" opacity="${ringOpacity}">
              <circle cx="${cx}" cy="${cy}" r="${rCenterHole}" fill="none" stroke="rgba(197,179,130,0.5)" stroke-width="1.2" />
              <circle cx="${cx}" cy="${cy}" r="${rCenterHole * 0.4}" fill="none" stroke="rgba(56,189,248,0.3)" stroke-width="0.8" stroke-dasharray="4,4" />
              <line x1="${cx}" y1="${cy - rCenterHole}" x2="${cx}" y2="${cy + rCenterHole}" stroke="#EF4444" stroke-width="1.2" stroke-dasharray="4,3" />
              <line x1="${cx - rCenterHole}" y1="${cy}" x2="${cx + rCenterHole}" y2="${cy}" stroke="#EF4444" stroke-width="1.2" stroke-dasharray="4,3" />
            </g>
            <!-- Điểm tâm trung tâm luôn giữ rõ -->
            <circle cx="${cx}" cy="${cy}" r="4" fill="#EF4444" stroke="#FFF" stroke-width="1.2" opacity="${textOpacity}" />
          </g>`;
      }

      // ── TẦNG 6: 4 ĐƯỜNG CHỈ TIÊU (BẮC, HƯỚNG, TỌA, LAI, KHỨ) ──
      let svgPointers = '';
      if (this.layers.pointers) {
        const pointerLines = [];
        const pointerOpacity = Math.min(1.0, textOpacity + 0.05);

        // 1. Đường Bắc Chuẩn (Chỉ 0 độ)
        const pNorth = Geometry.polarToSvgCartesian(cx, cy, rOuter360 + 14, 0);
        const pNorthText = Geometry.polarToSvgCartesian(cx, cy, rOuter360 + 24, 0);
        pointerLines.push(`
          <line x1="${cx}" y1="${cy}" x2="${pNorth.x.toFixed(2)}" y2="${pNorth.y.toFixed(2)}" stroke="#CBD5E1" stroke-width="1.8" stroke-dasharray="6,4" />
          ${this.renderHaloText({
            x: pNorthText.x,
            y: pNorthText.y,
            text: 'BẮC',
            fontSize: 12,
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontWeight: '900',
            fill: '#FEF3C7',
            haloWidth: 2.6,
            haloColor: 'rgba(0, 0, 0, 0.95)',
            className: 'luopan-pointer-north'
          })}
        `);

        // 2. Kim Hướng Nhà (Nét liền Đỏ)
        if (houseFacing !== null) {
          const pFacing = Geometry.polarToSvgCartesian(cx, cy, rOuter360 + 12, houseFacing);
          pointerLines.push(`
            <line x1="${cx}" y1="${cy}" x2="${pFacing.x.toFixed(2)}" y2="${pFacing.y.toFixed(2)}" stroke="#EF4444" stroke-width="3" />
            <circle cx="${pFacing.x.toFixed(2)}" cy="${pFacing.y.toFixed(2)}" r="6" fill="#EF4444" stroke="#FFF" stroke-width="1.5" />
          `);
        }

        // 3. Kim Tọa Nhà (Màu Vàng)
        if (houseSitting !== null) {
          const pSitting = Geometry.polarToSvgCartesian(cx, cy, rOuter360 - 5, houseSitting);
          pointerLines.push(`
            <line x1="${cx}" y1="${cy}" x2="${pSitting.x.toFixed(2)}" y2="${pSitting.y.toFixed(2)}" stroke="#FBBF24" stroke-width="2" stroke-dasharray="4,4" />
          `);
        }

        // 4. Kim Lai Thủy (Xanh Lục, Mũi Tên Vào)
        if (laiBearing !== null) {
          const pLai = Geometry.polarToSvgCartesian(cx, cy, rOuter360 + 10, laiBearing);
          pointerLines.push(`
            <line x1="${cx}" y1="${cy}" x2="${pLai.x.toFixed(2)}" y2="${pLai.y.toFixed(2)}" stroke="#34D399" stroke-width="2.5" />
            <polygon points="${pLai.x},${pLai.y} ${pLai.x-6},${pLai.y+10} ${pLai.x+6},${pLai.y+10}" fill="#34D399" stroke="#000" stroke-width="0.8" transform="rotate(${laiBearing + 180}, ${pLai.x}, ${pLai.y})" />
          `);
        }

        // 5. Kim Khứ Thủy (Xanh Lam, Mũi Tên Ra)
        if (khuBearing !== null) {
          const pKhu = Geometry.polarToSvgCartesian(cx, cy, rOuter360 + 10, khuBearing);
          pointerLines.push(`
            <line x1="${cx}" y1="${cy}" x2="${pKhu.x.toFixed(2)}" y2="${pKhu.y.toFixed(2)}" stroke="#38BDF8" stroke-width="2.5" />
            <polygon points="${pKhu.x},${pKhu.y} ${pKhu.x-6},${pKhu.y-10} ${pKhu.x+6},${pKhu.y-10}" fill="#38BDF8" stroke="#000" stroke-width="0.8" transform="rotate(${khuBearing}, ${pKhu.x}, ${pKhu.y})" />
          `);
        }

        svgPointers = `<g id="layer-pointers" class="dt-luopan-layer" opacity="${pointerOpacity}">${pointerLines.join('')}</g>`;
      }

      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.size} ${this.size}" preserveAspectRatio="xMidYMid meet" width="100%" height="100%" class="dt-luopan-svg" style="filter:drop-shadow(0 8px 24px rgba(0,0,0,0.5));">
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
