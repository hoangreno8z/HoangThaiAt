# GEOMETRY CLASSIFICATION POLICY v0.5

## 1. "Trước hẹp / sau rộng"
Không dùng ngưỡng phong thủy giả như `5%`.

Ta chỉ hỏi:
- front_width = bao nhiêu?
- rear_width = bao nhiêu?
- sai số phép đo = bao nhiêu?

Nếu chênh lệch nhỏ hơn hoặc bằng độ bất định đo:
`WIDTH_RELATION = INDETERMINATE`.

Nếu chênh lệch vượt sai số đo:
- front < rear → `FRONT_NARROWER_THAN_REAR`
- front > rear → `FRONT_WIDER_THAN_REAR`

Đây là phân loại hình học, KHÔNG phải ngưỡng cổ pháp.

## 2. "Trước / sau"
Phải có `front_reference`.
Không được mặc định phía Nam là mặt tiền.

## 3. "Xung"
`衝` chỉ được map sang geometry sau khi xác định:
- đối tượng nào xung;
- trục nào;
- xung vào parcel, house hay gate;
- khoảng cách;
- văn cảnh nguồn.

## 4. "返跳"
Tạm khóa:
`UNRESOLVED`.
Không được tự đồng nhất với "phản cung" từ diễn giải internet hiện đại.

## 5. Thủy
Mọi rule thủy truyền thống chạy SAU:
`MODERN_HYDROLOGY_HARD_GATE`.
