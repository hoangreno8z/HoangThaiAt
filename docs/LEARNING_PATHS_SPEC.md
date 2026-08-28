# ĐẶC TẢ HỆ THỐNG GIÁO TRÌNH & TUYẾN HỌC TẬP (LEARNING PATHS SPEC)
**Dự án:** Huyền Học Mụ — Digital Scholarly Library  
**Phiên bản:** 1.0.0 (Phase 4)  
**Ngày phê duyệt:** 28/08/2026  
**Trạng thái:** Learning Architecture Specification

---

## 1. TỔNG QUAN 6 ĐẠI GIÁO TRÌNH HỌC THUẬT (THE 6 LEARNING TRACKS)

| Mã Tuyến (Track ID) | Tên Giáo Trình | Số Tiết | Cấp Độ | Môn Phái / Bản Thể | Tiền Đề Bắt Buộc (Prerequisites) | Thẻ Khái Niệm Chính |
| :--- | :--- | :---: | :---: | :--- | :--- | :--- |
| `nen-tang` | **Bản Thể Luận Âm Dương & Ngũ Hành** | 10 | Căn Bản ➔ Chuyên Sâu | Triết Học Bản Thể / Dịch Học | Không | `CPT-001` đến `CPT-012` (Vô Cực, Thái Cực, Ngũ Hành, Hà Lạc) |
| `loan-dau` | **Địa Lý Loan Đầu Hình Thế Phái** | 10 | Thực Chiến Địa Hình | Loan Đầu Hình Khí | `nen-tang` (Tiết 1-4) | `CPT-013` (Long, Huyệt, Sa, Thủy, Minh Đường, Án Sơn) |
| `bat-trach` | **Bát Trạch Minh Kính Lý Khí Phái** | 10 | Ứng Dụng Dương Trạch | Bát Trạch Minh Kính | `nen-tang` (Tiết 5-6) | `CPT-014` (Cung Phi, 8 Du Niên, Đông Tây Tứ Trạch, Quái Biến Hào) |
| `tam-hop` | **Tam Hợp Phái Thủy Pháp Huyết Mạch** | 10 | Địa Lý Huyết Mạch | Tam Hợp Phái | `nen-tang` (Tiết 7-11) | `CPT-015` (12 Cung Trường Sinh, Tứ Đại Cục, Thủy Pháp Hoàng Tuyền) |
| `huyen-khong` | **Huyền Không Phi Tinh Cửu Cung** | 10 | Thời Không Lý Khí | Huyền Không Chánh Tông | `nen-tang` (Tiết 6, 10, 11) | `CPT-016` (Tam Nguyên Cửu Vận, Tinh Bàn 24 Sơn, Tử Bạch Quyết) |
| `tho-cung` | **Phong Thủy Thờ Cúng Chánh Tông** | 4 | Tế Tự & Khoa Nghi | Nghi Lễ Học Cổ Truyền | `nen-tang` (Tiết 1-3), `bat-trach` | `CPT-017` (Tọa Cát Hướng Cát, Tẩy Uế, Khấn Nguyện, Lỗ Ban 38.8) |

---

## 2. CẤU TRÚC CHUẨN MỰC CỦA MỘT BÀI HỌC (LESSON ANATOMY)

Mỗi bài học trong 54 chuyên đề bắt buộc phải có đầy đủ 10 thành phần sư phạm:

1. **Header & Metadata:**
   * Tiêu đề bài học (`chapter_title`) & Phụ đề giải nghĩa (`sub_title`).
   * Mã định danh khái niệm (`Concept ID`).
   * Thời lượng đọc ước tính (ví dụ: `15 phút`).
   * Cấp độ học thuật (`Căn bản`, `Trung cấp`, `Thực chiến cao cấp`).
2. **Điều Kiện Tiên Quyết (Prerequisites Badges):**
   * Hiển thị danh sách các bài học / khái niệm cần nắm vững trước khi học bài này.
   * Có đường dẫn trực tiếp (Deep-link) quay lại bài trước nếu người học chưa có nền tảng.
3. **Mục Tiêu Bài Học (Learning Objectives):**
   * Khung tóm tắt 3-4 điểm cốt lõi người học sẽ nắm vững và ứng dụng được sau khi đọc.
4. **Cổ Huấn Nguyên Văn & Dịch Nghĩa (Primary Canon):**
   * Chữ Hán nguyên tác (`hanzi`) từ các thư tịch cổ (Hạng A/B).
   * Phiên âm (`pinyin` / Hán-Việt) chuẩn xác.
   * Dịch nghĩa tiếng Việt học thuật, trang trọng (`meaning`).
   * Xuất xứ thư tịch (`source`) có chỉ dẫn số chương/quyển.
5. **Thuyết Minh Học Thuật & Bản Thể Luận (Ontology Exposition):**
   * Phân tích logic vũ trụ, nguyên lý vật lý cổ đại, cấu trúc âm dương sinh khắc.
6. **Thẻ Khái Niệm & Chú Giải Thuật Ngữ (Concept Glossary):**
   * Danh mục các thuật ngữ chuyên sâu xuất hiện trong bài kèm định nghĩa ngắn gọn, chuẩn xác.
7. **Cẩm Nang Ứng Dụng Vật Lý 5 Tầng Lớp (Real Estate Physical Applications):**
   * Tầng 1: Đất nền & Quy hoạch vĩ mô.
   * Tầng 2: Nhà phố & Biệt thự thổ cư.
   * Tầng 3: Căn hộ chung cư cao tầng.
   * Tầng 4: Mặt bằng kinh doanh, Văn phòng, Nhà xưởng.
   * Tầng 5: Nội thất chi tiết (Bàn thờ, Giường ngủ, Bếp nấu).
8. **Sai Lầm Phổ Biến & Biện Giải Học Thuật (Common Misconceptions):**
   * Vạch trần các định kiến sai lệch, thông tin bịa đặt thương mại trên mạng xã hội hiện đại.
9. **Quy Trình Đo Đạc & Án Nghiệm Hiện Trường (Checklist & Case Studies):**
   * Danh mục kiểm tra từng bước đo đạc bằng La Bàn / Thước Lỗ Ban ngoài thực tế.
   * Các ca án nghiệm phong thủy thực tế tại các vùng miền Việt Nam.
10. **Tự Kiểm Tra Kiến Thức Cốt Lõi (Check Your Understanding):**
    * Câu hỏi trắc nghiệm / tự đánh giá kèm giải thích cơ chế để người học tự kiểm chứng mức độ hiểu sâu.

---

## 3. CƠ CHẾ THEO DÕI TIẾN ĐỘ & BẢO LƯU TRẠNG THÁI HỌC TẬP (LEARNING PROGRESS ENGINE)

* **Lưu trữ cục bộ (Local Persistence):** Trạng thái hoàn thành từng bài học được lưu vào `localStorage` dưới khóa `progress_{trackId}_{lessonIndex}`.
* **Thanh Tiến Độ Trực Quan (Progress Bar):** Hiển thị tỷ lệ % hoàn thành trên Header của từng giáo trình (ví dụ: `4/10 Tiết — 40% Hoàn Thành`).
* **Huy Hiệu Hoàn Thành (Completion Badge):** Tự động mở khóa huy hiệu sau khi hoàn tất toàn bộ các tiết trong một giáo trình.
