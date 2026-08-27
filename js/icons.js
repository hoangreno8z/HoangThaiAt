/**
 * THƯ VIỆN BIỂU TƯỢNG VECTOR THUẦN CODE (SVG ICONS ENGINE)
 * Tuyệt đối không dùng ký tự Unicode Emoji - 100% được vẽ bằng toán học và SVG Path.
 */

const ICONS = {
  // Biểu tượng Thái Cực Âm Dương
  taiji: (size = 24, color = '#E5C07B') => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon svg-taiji">
      <circle cx="50" cy="50" r="46" fill="none" stroke="${color}" stroke-width="3"/>
      <!-- Nửa Dương (Vàng Kim) -->
      <path d="M 50 4 A 46 46 0 0 1 50 96 A 23 23 0 0 1 50 50 A 23 23 0 0 0 50 4" fill="${color}"/>
      <!-- Nửa Âm (Đen Huyền) -->
      <path d="M 50 4 A 23 23 0 0 1 50 50 A 23 23 0 0 0 50 96 A 46 46 0 0 1 50 4" fill="#0A0E17"/>
      <!-- Mắt Dương trong Âm -->
      <circle cx="50" cy="27" r="6" fill="#0A0E17"/>
      <!-- Mắt Âm trong Dương -->
      <circle cx="50" cy="73" r="6" fill="${color}"/>
    </svg>
  `,

  // Chuông Đồng Thanh Tịnh (Bật)
  bellOn: (size = 18, color = '#E5C07B') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      <line x1="2" y1="8" x2="4" y2="8"/>
      <line x1="20" y1="8" x2="22" y2="8"/>
    </svg>
  `,

  // Chuông Đồng (Tắt)
  bellOff: (size = 18, color = '#94A3B8') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      <path d="M18.63 13A17.89 17.89 0 0 1 18 8"/>
      <path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"/>
      <path d="M18 8a6 6 0 0 0-9.33-5"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  `,

  // Cuốn Thư Cổ / Kinh Điển
  book: (size = 18, color = '#E5C07B') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      <line x1="8" y1="6" x2="16" y2="6"/>
      <line x1="8" y1="10" x2="14" y2="10"/>
    </svg>
  `,

  // Kính Lúp / Tìm Kiếm
  search: (size = 18, color = '#E5C07B') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  `,

  // La Bàn / Phương Vị
  compass: (size = 18, color = '#E5C07B') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="${color}" fill-opacity="0.3"/>
    </svg>
  `,

  // Mạng Lưới Đồ Thị Antigravity (Nodes & Links)
  graph: (size = 18, color = '#2DD4BF') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <circle cx="6" cy="6" r="3"/>
      <circle cx="18" cy="6" r="3"/>
      <circle cx="12" cy="18" r="3"/>
      <line x1="8.5" y1="7.5" x2="15.5" y2="7.5"/>
      <line x1="7.5" y1="8.5" x2="10.5" y2="15.5"/>
      <line x1="16.5" y1="8.5" x2="13.5" y2="15.5"/>
    </svg>
  `,

  // Sao Trống Đồng Đông Sơn (Thái Cực Mặt Trời)
  dongSonStar: (size = 22, color = '#E5C07B') => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon">
      <circle cx="50" cy="50" r="48" fill="none" stroke="${color}" stroke-width="2"/>
      <circle cx="50" cy="50" r="40" fill="none" stroke="${color}" stroke-width="1" stroke-dasharray="3 3"/>
      <g transform="translate(50, 50)">
        <!-- 12 tia sao Đông Sơn -->
        ${Array.from({length: 12}).map((_, i) => `
          <polygon points="0,0 -4,-34 0,-38 4,-34" fill="${color}" transform="rotate(${i * 30})"/>
        `).join('')}
        <circle cx="0" cy="0" r="8" fill="#0A0E17" stroke="${color}" stroke-width="2"/>
      </g>
    </svg>
  `,

  // Mũi Tên Động Lực (Arrow Right)
  arrowRight: (size = 16, color = 'currentColor') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  `,

  // Nút Đóng / Thoát
  close: (size = 18, color = '#E2E8F0') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  `,

  // Mã Nguồn & API
  code: (size = 18, color = '#38BDF8') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  `,

  // Lăng Kính / Khí Hóa
  sparkle: (size = 16, color = '#E5C07B') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" class="svg-icon">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/>
    </svg>
  `,

  // Cực Dương (Dương Khí)
  yangSymbol: (size = 16, color = '#EF4444') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 6" class="svg-icon">
      <rect width="24" height="6" rx="2" fill="${color}"/>
    </svg>
  `,

  // Cực Âm (Âm Khí - Hào đứt)
  yinSymbol: (size = 16, color = '#3B82F6') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 6" class="svg-icon">
      <rect width="10" height="6" rx="2" fill="${color}"/>
      <rect x="14" width="10" height="6" rx="2" fill="${color}"/>
    </svg>
  `
};

// Render helper for HTML inserting
function renderIcon(iconName, ...args) {
  if (typeof ICONS[iconName] === 'function') {
    return ICONS[iconName](...args);
  }
  return '';
}
