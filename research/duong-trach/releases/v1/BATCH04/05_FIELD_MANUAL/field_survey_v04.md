# FIELD MANUAL v0.4 — KHẢO SÁT ĐỊA THẾ

## A. Trước khi nói cát/hung
1. Chụp 360° toàn khu đất.
2. Ghi tọa độ và cao độ.
3. Đánh dấu Bắc thật/Bắc từ nếu có.
4. Vẽ ranh đất thành polygon.
5. Ghi độ dốc và hướng dốc.
6. Ghi tất cả dòng nước, mương, hồ, cống và hướng chảy.
7. Ghi toàn bộ đường, ngõ, giao lộ, đường cong.
8. Ghi vật thể cao/đồi/gò/công trình lớn quanh đất.
9. Ghi khoảng trống phía trước.
10. Chạy Modern Hard Gate trước.

## B. Các observable cần cho Hình thế
- `site_width_front`
- `site_width_back`
- `site_depth`
- `slope_mean_deg`
- `slope_direction`
- `front_open_depth`
- `front_open_angle`
- `left_enclosure`
- `right_enclosure`
- `rear_support`
- `water_feature_type`
- `water_flow_direction`
- `water_curvature_relative_to_site`
- `water_mouth_closure`
- `road_curvature_relative_to_site`
- `road_impact_axis`
- `surrounding_height_profile`

## C. Cấm suy diễn
- “Minh đường dung vạn mã” ≠ X m².
- “Thủy khẩu thu thập khẩn” ≠ góc ≤ X°.
- “Phản khiêu” chưa có geometric definition được kiểm chứng → `UNKNOWN`.
- “Có khí” ≠ đo được năng lượng.
- Nguồn âm trạch không tự động sinh rule dương trạch.

## D. Output
Mỗi site phải sinh 4 bảng riêng:
1. `MODERN_SAFETY`
2. `OBSERVED_GEOMETRY`
3. `CLASSICAL_FORM_MATCHES`
4. `UNKNOWN / CONFLICTS`
