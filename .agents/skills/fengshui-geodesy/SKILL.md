---
name: fengshui-geodesy
description: >-
  Chuẩn trắc địa và hình học GIS bất biến cho ứng dụng La Kinh & Phong Thủy Chánh Tông.
  Bắt buộc áp dụng cho mọi tác vụ đo đạc tọa độ, tính toán phương vị, phân tích tim đường,
  đối soát ảnh vệ tinh, phân định 24 Sơn, đánh giá hẻm cụt, ngã ba và dòng chảy thủy pháp.
---

# FENGSHUI GEODESY ENGINE — NON-NEGOTIABLE INVARIANTS

Tài liệu này xác lập các nguyên lý trắc địa, hình học GIS và quy tắc học thuật chánh tông
bắt buộc phải tuân thủ tuyệt đối trong toàn bộ mã nguồn, thuật toán và giao diện của hệ thống.
Bất kỳ thay đổi nào vi phạm các điều khoản dưới đây đều bị coi là lỗi kiến trúc nghiêm trọng.

--------------------------------------------------------------------------------

## 15 NGUYÊN TẮC BẤT BIẾN (NON-NEGOTIABLE INVARIANTS)

### 1. WGS84 Lat/Lng Là Nguồn Dữ Liệu Gốc Duy Nhất (Single Source of Truth)
- Tọa độ địa lý WGS84 (Ellipsoid EPSG:4326) là chuẩn chân lý duy nhất của mọi thực thể:
  - Tâm nhà / Điểm Lập Cực: $O = (lat_O, lng_O)$
  - Mép mặt tiền: $A = (lat_A, lng_A), B = (lat_B, lng_B)$
  - Tuyến đường / Dòng nước: $[(lat_1, lng_1), (lat_2, lng_2), ...]$
  - Cổng / Lối vào (Access Point): $G = (lat_G, lng_G)$
  - Điểm tận hẻm cụt (Dead-End): $P_{\text{dead}} = (lat_P, lng_P)$
- Tuyệt đối không lưu trữ trạng thái gốc dưới dạng tọa độ pixel hoặc mốc tương đối.

### 2. Cấm Tuyệt Đối Tính Phương Vị Từ Không Gian Hiển Thị
Phương vị (bearing) tuyệt đối KHÔNG được tính toán hoặc suy luận từ:
- Pixel màn hình ($x, y$)
- Tọa độ SVG / Canvas
- CSS transform / matrix
- Screen / Container coordinates
- Vị trí góc xoay của kim chỉ nam hoặc marker trên vòng vẽ La Kinh.

### 3. Phương Vị Bắt Buộc Tính Geodesic Từ Tọa Độ Thực
- Mọi góc phương vị bắt buộc phải tính bằng công thức Trắc địa Cầu / Ellipsoid (Great Circle Bearing / Geodesic)
  thông qua `GeoMeasurementEngine.calculateGeodesicBearing(point1, point2)`.
- Chuẩn hóa góc: $0.0000^\circ \le \theta < 360.0000^\circ$ theo Bắc Thật (True North).

### 4. Bất Biến Tuyệt Đối Khi Zoom / Pan / Resize Màn Hình
- Cùng một cấu hình hình học thực địa, phương vị đo được tại các cấp zoom phải đồng nhất tuyệt đối:
  $$\text{Zoom } 15 = \text{Zoom } 17 = \text{Zoom } 18 = \text{Zoom } 20 = \text{Zoom } 22$$
  Dung sai cho phép: $\Delta\theta < 0.001^\circ$.
- Quá trình zoom/pan chỉ chiếu tọa độ WGS84 sang màn hình để vẽ (`projectMapGeometry`),
  tuyệt đối KHÔNG được gọi hàm tái lấy mẫu GPS (`captureMapGeometry`) làm trôi dữ liệu gốc.

### 5. La Kinh Chỉ Là Renderer Hiển Thị Một Chiều
- Luồng dữ liệu là một chiều, đơn hướng và phi định kiến:
  $$\text{Vector GIS WGS84} \longrightarrow \text{Geodesic Bearing} \longrightarrow \text{24 Sơn & Bát Quái} \longrightarrow \text{La Kinh Render}$$
- La Kinh là công cụ vẽ kết quả, không bao giờ là thước đo hay nguồn phát sinh dữ liệu ngược lại.

### 6. Tách Biệt Tuyệt Đối 6 Lớp Phương Vị Không Gian
Hệ thống bắt buộc phải quản lý và hiển thị tách bạch 6 khái niệm:
1. **OBJECT_BEARING**: Phương vị từ tâm nhà đến một vật thể cụ thể (vd: tâm nhà đến điểm tận cùng hẻm cụt $= 275.5^\circ$).
2. **ROAD_AXIS**: Trục đường cục bộ trước mặt nhà (vô hướng, hai chiều ngược nhau: $\theta \leftrightarrow \theta + 180^\circ$).
3. **ROAD_FLOW**: Chiều dòng chảy nạp khí động tế của tuyến đường (Tả sang Hữu hoặc Hữu sang Tả so với mặt tiền).
4. **ROAD_NETWORK_MOUTH**: Khí khẩu tiếp nhận từ mạng lưới giao thông công cộng (ngã ba, miệng hẻm nạp khí).
5. **ROAD_TERMINATION**: Điểm kết thúc / chặn cụt của tuyến đường (Cul-de-sac physical terminus).
6. **WATER_EXIT**: Thủy khẩu tiêu thoát nước thực tế (theo rãnh cống, độ dốc mặt đất hoặc sông ngòi).

### 7. Nguyên Tắc Hẻm Cụt: Endpoint != Khứ Khẩu != Thủy Khẩu
- Trong hẻm cụt, điểm tận cùng (`ROAD_TERMINATION`) chỉ là một vật thể ngoại cục (`OBJECT_BEARING`).
- Tuyệt đối không được gán điểm cụt làm Khứ Khẩu (`khuBearing = null`).
- Địa cuộc hẻm cụt được định danh là **Bế Khí / Tụ Khí**. Thoát thủy thực tế diễn ra ngược ra miệng hẻm theo rãnh nước.

### 8. Local Geometry Window 20–50m Quanh Nhà
- Trục tim đường cục bộ (`ROAD_AXIS`) phải được tính toán trên cửa sổ thích ứng $20 - 50\text{ m}$ trước nhà.
- Tuyệt đối không lấy điểm đầu $P_1$ nối thẳng điểm cuối $P_n$ của cả tuyến hẻm dài.
- Cửa sổ thích ứng dừng khi: gặp nút giao (`INTERSECTION`), gặp góc ngoặt lớn (`CURVATURE`), hoặc hết đoạn (`GEOMETRY_END`).

### 9. Đối Soát Ảnh Vệ Tinh & Vector Đường
- Đường vector OSM / Overture chỉ là giả thuyết ban đầu (candidate).
- Khi có ảnh vệ tinh phân giải cao, phải đối soát vị trí tim đường thực tế so với vệt mặt đường quang học.

### 10. Ưu Tiên Nhận Diện Hai Mép Đường Suy Tim Đường
- Vị trí chuẩn xác nhất của tuyến đường đô thị được xác định từ hai mép tường/mép hè, sau đó lấy trung tuyến (centerline).
- Mép mặt tiền nhà và cửa cổng phải được gióng vuông góc tới tim đường cục bộ.

### 11. Tính Toán Positional Uncertainty và Angular Uncertainty
- Phải lượng hóa sai số định vị vệ tinh $\sigma_{\text{pos}}$ (mặc định $1.0 - 1.5\text{ m}$).
- Độ bất định góc thực tế:
  $$\Delta\theta = \arctan\left(\frac{\sigma_{\text{pos}}}{d}\right) \times \frac{180}{\pi}$$
  với $d$ là khoảng cách từ tâm nhà tới mốc đo. Cự ly càng ngắn, $\Delta\theta$ càng lớn!

### 12. Phân Định Giáp Biên (Border Zone) — Cấm Ép Một Sơn Khi Cận Ranh
- Ranh giới giữa 24 Sơn cách nhau $15^\circ$ (ranh giới tại $7.5^\circ, 22.5^\circ, ...$).
- Khoảng cách tới ranh $\Delta_{\text{boundary}} = \min_k |\theta - \text{boundary}_k|$:
  - Nếu $\Delta_{\text{boundary}} \le 1.0^\circ$: Gán nhãn `CRITICAL_BORDER`, cảnh báo đỏ bắt buộc đo La Kinh thực địa.
  - Nếu $1.0^\circ < \Delta_{\text{boundary}} \le 2.0^\circ$ hoặc $\le \Delta\theta$: Gán nhãn `BORDER_ZONE` (vd: `DẬU / TÂN — GIÁP BIÊN`), mức tin cậy `MEDIUM/LOW`.
  - Nếu $\Delta_{\text{boundary}} > 2.0^\circ$ và $> \Delta\theta$: Gán nhãn `PURE_MOUNTAIN`, mức tin cậy `HIGH`.
- Tuyệt đối không được ép về một Sơn duy nhất khi dữ liệu nằm trong vùng giáp biên.

### 13. Sân Nhà & Lối Riêng: Loại Khỏi Đồ Thị Giao Thông Công Cộng
- Khoảng sân nội bộ, lối đi riêng sát vách chỉ phục vụ một hộ (`PRIVATE_DRIVEWAY` / `PRIVATE_COURTYARD`)
  phải được loại bỏ khỏi đồ thị giao thông (`PRIVATE_SIDE_ACCESS = IGNORE`).
- Tuyến tiếp cận chỉ tính trên không gian lưu thông công cộng có động khí thực sự.

### 14. Mọi Thay Đổi GIS Phải Có Regression Tests
- Bất kỳ can thiệp nào vào module trắc địa, phân loại hay giao diện bản đồ đều phải chạy qua:
  - `scripts/test_zoom_invariant.js`
  - `scripts/test_pure_gis_road_geometry.js`
  - `scripts/test_real_world_10_cases.js`
  - `scripts/test_acceptance_t1_t14.js`
  - `npm test`
- Tỷ lệ đạt yêu cầu: **100% PASS, 0 FAIL**.

### 15. Bộ 11 Kịch Bản Kiểm Định Nghiệm Thu Thực Địa Bắt Buộc
Hệ thống phải vượt qua bài kiểm tra thực nghiệm trên 11 loại địa hình và điều kiện:
1. **Zoom Invariance**: Kiểm tra $0.0000^\circ$ độ lệch từ zoom 15 đến 22.
2. **Pan Invariance**: Di chuyển bản đồ không làm lệch số đo phương vị WGS84.
3. **Mobile / Desktop Invariance**: Cùng tọa độ cho kết quả đồng nhất trên mọi độ phân giải màn hình.
4. **Cul-de-sac Topology**: Hẻm cụt tách bạch điểm tận, trục đường và không gán Khứ Thủy.
5. **Curved Road**: Đường cong tự động dừng cửa sổ hình học trước góc ngoặt $\ge 35^\circ$.
6. **Road Near 24-Mountain Boundary**: Nhận diện giáp biên và báo động đo thực địa khi sát ranh $\le 1.0^\circ$.
7. **Satellite / Vector Offset**: Đối soát độ lệch giữa tim đường bản đồ và vệt đường ảnh vệ tinh.
8. **Rural Road**: Đường liên thôn/liên xã không có vỉa hè rõ ràng.
9. **Dense Urban Alley**: Hẻm đô thị ngoằn ngoèo, bề rộng nhỏ ($2 - 4\text{ m}$).
10. **Mountain Road**: Đường đèo dốc quanh co, độ uốn lượn liên tục.
11. **Coastal Road**: Đường ven biển / ven sông có một bên là mặt nước thoáng đãng.

--------------------------------------------------------------------------------

## NGUYÊN TẮC HỌC THUẬT PHONG THỦY ĐÔ THỊ (HƯ THỦY LOẠI SUY)

1. **Hư Thủy vs Chân Thủy:** Đường sá đô thị là *Hư Thủy*, dòng xe cộ và người đi lại tạo ra động khí loại suy, không mang tính chất thủy dịch chất lỏng như sông ngòi tự nhiên.
2. **Phân Tầng Khí Lộ:**
   - *Ngoại Cục:* Đại lộ, tỉnh lộ ở xa. Động thế mạnh nhưng bị triệt tiêu qua các khúc ngoặt của hẻm.
   - *Trung Cục:* Nhánh hẻm dẫn vào, chuyển tiếp khí trường.
   - *Cận Trạch:* Đoạn đường $20 - 50\text{ m}$ trực diện trước cửa nhà. Đây là phân đoạn quyết định trực tiếp đến nạp khí và 12 Cung Trường Sinh.
3. **Đánh Giá Trực Xung (Thương Sát):**
   - Trục đường đâm thẳng vào tim cửa chính: *Thương Sát*.
   - Trục đường đâm lệch mép nhà $\ge 1.5\text{ m}$ (`SAFE_OFFSET`): Khí không xung xạ trực diện, *Không phạm Trực Xung*.
