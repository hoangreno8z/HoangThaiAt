/**
 * THƯ VIỆN BIỂU TƯỢNG VECTOR THUẦN CODE (SVG ICONS ENGINE)
 * Tuyệt đối không dùng ký tự Unicode Emoji - 100% được vẽ bằng toán học và SVG Path.
 */

const ICONS = {
  // Biểu tượng Thái Cực Âm Dương
  taiji: (size = 24, color = '#E5C07B') => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="svg-icon svg-taiji">
      <circle cx="50" cy="50" r="46" fill="none" stroke="${color}" stroke-width="3"/>
      <path d="M 50 4 A 46 46 0 0 1 50 96 A 23 23 0 0 1 50 50 A 23 23 0 0 0 50 4" fill="${color}"/>
      <path d="M 50 4 A 23 23 0 0 1 50 50 A 23 23 0 0 0 50 96 A 46 46 0 0 1 50 4" fill="#0A0E17"/>
      <circle cx="50" cy="27" r="6" fill="#0A0E17"/>
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

  // Menu Hamburger
  menu: (size = 20, color = 'currentColor') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  `,

  // Nút Đóng / Thoát
  close: (size = 18, color = '#E2E8F0') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  `,

  // Kính Lúp / Tìm Kiếm
  search: (size = 18, color = '#E5C07B') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  `,

  // Chevron Down
  chevronDown: (size = 16, color = 'currentColor') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  `,

  // Chevron Right
  chevronRight: (size = 16, color = 'currentColor') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  `,

  // Núi Non / Loan Đầu / Long Mạch
  mountain: (size = 18, color = '#F59E0B') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <path d="M8 3l4 8 5-5 5 15H2L8 3z"/>
    </svg>
  `,

  // La Bàn / Bát Trạch / Phương Vị
  compass: (size = 18, color = '#60A5FA') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="${color}" fill-opacity="0.3"/>
    </svg>
  `,

  // Sóng Nước / Tam Hợp / Thủy Pháp
  water: (size = 18, color = '#34D399') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <path d="M2 12c2.5-3 5.5-3 8 0s5.5 3 8 0 5.5-3 8 0"/>
      <path d="M2 18c2.5-3 5.5-3 8 0s5.5 3 8 0 5.5-3 8 0"/>
      <path d="M2 6c2.5-3 5.5-3 8 0s5.5 3 8 0 5.5-3 8 0"/>
    </svg>
  `,

  // Gian Thờ / Điện Thờ / Thờ Cúng
  altar: (size = 18, color = '#E5C07B') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <path d="M3 8h18v4H3z"/>
      <path d="M6 12v8M18 12v8"/>
      <path d="M2 4h20"/>
      <path d="M12 4v4"/>
    </svg>
  `,

  // Cổ Huấn / Cuộn Thư / Thư Tịch
  scroll: (size = 18, color = '#E5C07B') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z"/>
      <path d="M7 8h10M7 12h8M7 16h6"/>
    </svg>
  `,

  // Giải Nghĩa Học Thuật / Mũ Học Giả
  scholar: (size = 18, color = '#2DD4BF') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  `,

  // Cán Cân / Quy Luật / Cát Hung
  scale: (size = 18, color = '#E2E8F0') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <path d="M12 3v18M3 7h18M6 7l-3 7h6l-3-7zM18 7l-3 7h6l-3-7z"/>
    </svg>
  `,

  // Bất Động Sản / Tòa Nhà
  building: (size = 18, color = '#60A5FA') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
      <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/>
    </svg>
  `,

  // Checklist / Tích Chọn
  check: (size = 16, color = '#34D399') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  `,

  // Dụng Cụ / Hóa Giải / Cải Tạo
  tools: (size = 18, color = '#F59E0B') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  `,

  // Cảnh Báo / Sát Khí / Tranh Cãi
  alert: (size = 16, color = '#EF4444') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  `,

  // Bản Đồ / Địa Danh Việt Nam
  mapPin: (size = 18, color = '#2DD4BF') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  `,

  // Bộ Tính Toán / Calculator
  calculator: (size = 18, color = '#38BDF8') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <rect x="4" y="2" width="16" height="20" rx="2"/>
      <line x1="8" y1="6" x2="16" y2="6"/>
      <line x1="16" y1="14" x2="16" y2="18"/>
      <path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M8 18h.01M12 18h.01"/>
    </svg>
  `,

  // Mạng Lưới Đồ Thị Antigravity
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

  // Mầm Cây / Sinh Khí
  leaf: (size = 16, color = '#34D399') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.2A7 7 0 0 1 11 20z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6"/>
    </svg>
  `,

  // Khóa Khí / Thủy Khẩu
  lock: (size = 16, color = '#E5C07B') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  `,

  // Tiền Tệ / Tài Lộc
  money: (size = 16, color = '#FCD34D') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <rect x="2" y="6" width="20" height="12" rx="2"/>
      <circle cx="12" cy="12" r="2"/>
      <path d="M6 12h.01M18 12h.01"/>
    </svg>
  `,

  // Ngôi Sao / Điểm Nhấn
  star: (size = 16, color = '#E5C07B') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" class="svg-icon">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  `,

  // Mũi Tên Chỉ Dẫn
  arrowRight: (size = 16, color = 'currentColor') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="svg-icon">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
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
