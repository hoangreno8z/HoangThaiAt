# ĐẶC TẢ ĐỘNG CƠ TÍNH TOÁN & TÍNH NHẤT QUÁN THUẬT TOÁN (RULE ENGINE SPEC)
**Dự án:** Huyền Học Mụ — Digital Scholarly Library  
**Phiên bản:** 1.0.0 (Phase 9)  
**Ngày phê duyệt:** 28/08/2026  
**Trạng thái:** Formal Computational Engine Specification

---

## 1. ĐỘNG CƠ BÁT TRẠCH MINH KÍNH (BAT TRACH ENGINE)

### 1.1. Công thức tính Cung Mệnh Quái (Gua Number Calculation)
* **Đầu vào (Input):** Năm sinh dương lịch ($Y$), Giới tính ($G \in \{ Nam, Nu \}$).
* **Thuật toán (Algorithm):**
  * Bước 1: Tính tổng các chữ số của năm sinh $Y$, rút gọn về $S \in [1, 9]$ bằng phép toán modulo 9:
    $$R = Y \pmod 9; \quad 	ext{nếu } R = 0 \implies S = 9; \quad 	ext{ngược lại } S = R$$
  * Bước 2 (Cho người sinh trước năm 2000):
    * Nam Mệnh: $Gua = 11 - S$. Nếu $Gua > 9 \implies Gua = Gua - 9$. Nếu $Gua = 5 \implies Gua = 2$ (Khôn Thổ).
    * Nữ Mệnh: $Gua = 4 + S$. Nếu $Gua > 9 \implies Gua = Gua - 9$. Nếu $Gua = 5 \implies Gua = 8$ (Cấn Thổ).
  * Bước 3 (Cho người sinh từ năm 2000 trở đi):
    * Nam Mệnh: $Gua = 10 - S$. Nếu $Gua = 5 \implies Gua = 2$ (Khôn Thổ).
    * Nữ Mệnh: $Gua = 5 + S$. Nếu $Gua > 9 \implies Gua = Gua - 9$. Nếu $Gua = 5 \implies Gua = 8$ (Cấn Thổ).

### 1.2. Bảng Phân Định Đông/Tây Tứ Mệnh & 8 Du Niên Cát Hung
* **Đông Tứ Mệnh:** Khảm (1 - Thủy), Ly (9 - Hỏa), Chấn (3 - Mộc), Tốn (4 - Mộc).
* **Tây Tứ Mệnh:** Càn (6 - Kim), Đoài (7 - Kim), Cấn (8 - Thổ), Khôn (2 - Thổ).
* **8 Du Niên:**
  * 4 Cung Cát: Sinh Khí (Tham Lang Mộc), Thiên Y (Cự Môn Thổ), Diên Niên (Vũ Khúc Kim), Phục Vị (Tả Phụ Mộc).
  * 4 Cung Hung: Họa Hại (Lộc Tồn Thổ), Lục Sát (Văn Khúc Thủy), Ngũ Quỷ (Liêm Trinh Hỏa), Tuyệt Mệnh (Phá Quân Kim).

---

## 2. ĐỘNG CƠ HUYỀN KHÔNG PHI TINH (HUYEN KHONG FLYING STARS ENGINE)

### 2.1. Quỹ Đạo Bay Cửu Cung Lạc Thư (Luoshu Flight Pattern)
Thứ tự các cung:
$$	ext{Trung Cung (5)} ightarrow 	ext{Càn (6)} ightarrow 	ext{Đoài (7)} ightarrow 	ext{Cấn (8)} ightarrow 	ext{Ly (9)} ightarrow 	ext{Khảm (1)} ightarrow 	ext{Khôn (2)} ightarrow 	ext{Chấn (3)} ightarrow 	ext{Tốn (4)}$$

### 2.2. Chiều Bay Thuận (+) và Nghịch (-) Của Tọa Tinh và Hướng Tinh
Căn cứ vào Tam Nguyên Long (Địa Nguyên Long, Thiên Nguyên Long, Nhân Nguyên Long) của Sơn Tọa / Sơn Hướng:
* Nếu can chi/quái thuộc tính Dương $\implies$ Phi tinh bay thuận (+).
* Nếu can chi/quái thuộc tính Âm $\implies$ Phi tinh bay nghịch (-).

---

## 3. ĐỘNG CƠ TAM HỢP THỦY PHÁP & VÒNG TRƯỜNG SINH

* 12 Cung Trường Sinh theo chiều thuận:
  $$Trường\ Sinh ightarrow Mộc\ Dục ightarrow Quan\ Đới ightarrow Lâm\ Quan ightarrow Đế\ Vượng ightarrow Suy ightarrow Bệnh ightarrow Tử ightarrow Mộ ightarrow Tuyệt ightarrow Thai ightarrow Dưỡng$$
* Cục Thủy nạp: Hỏa Cục (Dần Ngọ Tuất), Thủy Cục (Thân Tý Thìn), Kim Cục (Tỵ Dậu Sửu), Mộc Cục (Hợi Mão Mùi).
