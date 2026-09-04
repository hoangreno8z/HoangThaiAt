/**
 * =========================================================================
 * BẢO MẬT & BẢN QUYỀN TRI THỨC — HUY HOÀNG (ZALO: 0933116860)
 * =========================================================================
 * 1. Bẫy Copy-Paste (Copy-Paste Poisoning): Tự động tiêm thông tin bản quyền
 *    vào đầu, giữa và cuối đoạn khi người dùng bôi đen và sao chép.
 * 2. Hoa văn chữ chìm toàn màn hình (Watermark Overlay): Hiện mờ trên màn hình
 *    và hiện rõ mồn một khi chụp màn hình hoặc in ấn / PDF.
 * 3. Bẫy DevTools & Bot Inspector: Cảnh báo bản quyền trên bảng điều khiển.
 * =========================================================================
 */
(function () {
  'use strict';

  const AUTHOR_NAME = 'Thầy Huy Hoàng';
  const ZALO_CONTACT = '0933116860';
  const SYSTEM_TITLE = 'Dương Trạch Chánh Tông Cổ Pháp';

  // ── 1. BẪY SAO CHÉP BÔI ĐEN (COPY-PASTE POISONING) ──
  document.addEventListener('copy', function (event) {
    try {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const rawText = selection.toString();
      // Bỏ qua nếu sao chép đoạn quá ngắn (< 20 ký tự, ví dụ từ đơn, số đo)
      if (!rawText || rawText.trim().length < 20) return;

      const paragraphs = rawText
        .split(/\r?\n+/)
        .map(function (p) { return p.trim(); })
        .filter(Boolean);

      const header = '【BẢN QUYỀN HỌC THUẬT: ' + AUTHOR_NAME.toUpperCase() + ' — ZALO: ' + ZALO_CONTACT + '】\n--------------------------------------------------\n';
      const middleMarker = '\n\n[' + SYSTEM_TITLE + ' — Nghiên cứu độc quyền của ' + AUTHOR_NAME + ', Zalo: ' + ZALO_CONTACT + ']\n\n';
      const footer = '\n--------------------------------------------------\n【Nguồn chính tông: Thư Viện Dương Trạch Cổ Thư — ' + AUTHOR_NAME + ' (Zalo: ' + ZALO_CONTACT + '). Sao chép không trích dẫn nguồn là vi phạm bản quyền và đạo đức học thuật】';

      let poisonedContent = '';

      if (paragraphs.length <= 1) {
        poisonedContent = paragraphs[0] || rawText;
      } else {
        const parts = [];
        paragraphs.forEach(function (para, idx) {
          parts.push(para);
          // Cứ sau mỗi 2 đoạn văn, tiêm bẫy bản quyền vào giữa
          if ((idx + 1) % 2 === 0 && idx < paragraphs.length - 1) {
            parts.push(middleMarker.trim());
          }
        });
        poisonedContent = parts.join('\n\n');
      }

      const finalText = header + poisonedContent + footer;

      if (event.clipboardData) {
        event.clipboardData.setData('text/plain', finalText);
        event.preventDefault();
      }
    } catch (err) {
      // Fallback an toàn nếu trình duyệt chặn clipboardData
    }
  });

  // ── 2. HOA VĂN CHỮ CHÌM CHỐNG CHỤP MÀN HÌNH (WATERMARK OVERLAY) ──
  function initWatermarkOverlay() {
    if (document.getElementById('dt-watermark-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'dt-watermark-overlay';
    overlay.className = 'dt-watermark-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWatermarkOverlay);
  } else {
    initWatermarkOverlay();
  }

  // ── 3. CẢNH BÁO BẢN QUYỀN TRÊN DEVTOOLS CONSOLE CHO BOT & DEV ──
  try {
    const consoleStyleTitle = 'color: #FBBF24; font-size: 16px; font-weight: bold; padding: 4px 8px; background: #0E131F; border: 1px solid #C5B382; border-radius: 4px;';
    const consoleStyleSub = 'color: #38BDF8; font-size: 12px; font-weight: 600;';
    const consoleStyleWarn = 'color: #F87171; font-size: 11px;';

    console.log('%c⚡ ' + SYSTEM_TITLE + ' — ' + AUTHOR_NAME.toUpperCase() + ' (ZALO: ' + ZALO_CONTACT + ') ⚡', consoleStyleTitle);
    console.log('%cTư liệu nghiên cứu đã được bảo hộ độc quyền. Mọi hành vi cào quét tự động sẽ bị ghi lại IP.', consoleStyleSub);
    console.log('%cLiên hệ trực tiếp: Hoàng — Zalo: ' + ZALO_CONTACT + ' để được trao đổi học thuật chính tông.', consoleStyleWarn);
  } catch (_) {}

})();
