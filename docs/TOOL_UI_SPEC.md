# ĐẶC TẢ GIAO DIỆN BÀN TÍNH SỐ HÓA & BÁO CÁO CHẨN ĐOÁN (TOOL UI SPEC)
**Dự án:** Huyền Học Mụ — Digital Scholarly Library  
**Phiên bản:** 1.0.0 (Phase 10)  
**Ngày phê duyệt:** 28/08/2026  
**Trạng thái:** Tool UI & Diagnostic Specification

---

## 1. CẤU TRÚC PHÂN HỆ BÀN TÍNH SỐ HÓA (GATE 5: `#/tools`)

### 1.1. Bàn Tính Bát Trạch Minh Kính (Trạch Mệnh & Phương Vị)
* **Form nhập liệu:**
  * Năm sinh dương lịch (1900 - 2100).
  * Giới tính (Nam / Nữ).
  * Hướng nhà khảo sát (8 hướng: Bắc, Nam, Đông, Đông Nam, Tây Bắc, Tây, Đông Bắc, Tây Nam).
* **Kết quả tính toán thời gian thực:**
  * Cung Phi Mệnh Quái, Ngũ Hành, Nhóm (Đông/Tây Tứ Mệnh).
  * Đồ hình 8 cung Du Niên cát hung kèm ngũ hành của từng sao.
  * Hướng dẫn định vị 5 khu vực: Cửa chính (Đại Môn), Phòng ngủ (Chủ Phòng), Bếp (Tọa Hung Hướng Cát), Ban thờ tế tự, Khu vệ sinh (Tọa Hung để trấn áp hung tinh).
  * Trích dẫn thư tịch: *Bát Trạch Minh Kính* (Cố Ngô Huệ Cảnh) & *Hoàng Đế Trạch Kinh*.

### 1.2. Bàn Tính Huyền Không Phi Tinh (Tam Nguyên Cửu Vận)
* **Form nhập liệu:**
  * Vận xây dựng / nhập trạch (Vận 1 - Vận 9, mặc định Vận 9: 2024 - 2043).
  * 24 Sơn Hướng (Khảm: Nhâm/Tý/Quý, Cấn: Sửu/Cấn/Dần, Chấn: Giáp/Mão/Ất, Tốn: Thìn/Tốn/Tỵ, Ly: Bính/Ngọ/Đinh, Khôn: Mùi/Khôn/Thân, Đoài: Canh/Dậu/Tân, Càn: Tuất/Càn/Hợi).
* **Kết quả tính toán:**
  * Lưới Tinh Bàn 3x3 Lạc Thư: Sao Vận trung tâm, Tọa tinh, Hướng tinh.
  * Nhận định các vị trí đắc sinh khí và các vị trí cần tiết chế sát khí (Nhị Hắc, Ngũ Hoàng).
  * Trích dẫn thư tịch: *Thẩm Thị Huyền Không Học* (Thẩm Trúc Nhưng).

### 1.3. Báo Cáo Chẩn Đoán Phong Thủy Toàn Diện & Xuất Bản
* Trích xuất báo cáo học thuật đầy đủ.
* Hỗ trợ 2 phương thức xuất bản:
  * `[📋 Sao Chép Báo Cáo Markdown]`: Sao chép văn bản có định dạng chuẩn vào clipboard.
  * `[🖨️ In Báo Cáo / Lưu PDF]`: Kích hoạt cửa sổ in trình duyệt với định dạng sạch sẽ chuyên dụng cho in ấn.
