# AUDIT NOTE — 2026-09-01

- QCVN 02:2022/BXD vẫn là base text được tìm thấy trên Bộ Xây dựng.
- Có **dự thảo Sửa đổi 01:2026** đã lấy ý kiến lần 2 đến 12/07/2026.
- Trong lượt tra cứu này chưa tìm thấy văn bản Bộ Xây dựng xác nhận sửa đổi đó đã được ban hành chính thức trước 01/09/2026.
- Vì vậy database dùng:
  `legal_status = CURRENT_BASE_TEXT_WITH_PENDING/UNCONFIRMED_AMENDMENT`
  chứ không tự tuyên bố bản dự thảo đã có hiệu lực.

- Thông tư 97/2025/TT-BNNMT: hiệu lực 15/02/2026, rất quan trọng cho bản đồ sạt lở đất/lũ quét tỷ lệ 1:10.000 và 1:2.000.
- Cục Khí tượng Thủy văn và DMC/VNDMS được đánh dấu nguồn động (dynamic source): dữ liệu cảnh báo phải có timestamp, không cache như chân lý vĩnh viễn.
