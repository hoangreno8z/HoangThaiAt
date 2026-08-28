# ĐẶC TẢ HỆ THỐNG THƯ TỊCH CỔ ĐIỂN & KHẢO CỨU HỌC THUẬT (PHASE 5)
**Dự án:** Huyền Học Mụ — Digital Scholarly Library  
**Phiên bản:** 1.0.0 (Phase 5)  
**Ngày phê duyệt:** 28/08/2026  
**Trạng thái:** Library & Research Architecture Specification

---

## 1. THƯ MỤC KHO TÀNG THƯ TỊCH CỔ ĐIỂN (CLASSICAL SOURCE CORPUS)

| Mã Sách (Book ID) | Tên Tác Phẩm | Tác Giả / Tương Truyền | Triều Đại | Phân Loại Học Thuật | Nguồn Lưu Trữ (Repository) | Cấp Độ Nguồn |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| `tang-thu` | **Táng Thư (葬書)** | Quách Phác (郭璞) | Đông Tấn (276–324) | Loan Đầu Hình Thế Chi Tổ | Tứ Khố Toàn Thư (Tử Bộ) | **Hạng A** |
| `thanh-nang-kinh` | **Thanh Nang Kinh (青囊經)** | Hoàng Thạch Công (黃石公) | Tần - Hán | Bản Thể Lý Khí & Hình Thế | Đạo Tạng / Tứ Khố | **Hạng A** |
| `trach-kinh` | **Hoàng Đế Trạch Kinh (黃帝宅經)** | Khuyết Danh | Hán - Đường | Dương Trạch Bản Thể | Tứ Khố Toàn Thư | **Hạng A** |
| `tuyet-tam-phu` | **Tuyết Tâm Phú (雪心賦)** | Bốc Ứng Thiên (卜應天) | Đường Triều | Loan Đầu Địa Hình Phú | Tứ Khố Toàn Thư | **Hạng B** |
| `bat-trach-minh-kinh` | **Bát Trạch Minh Kính (八宅明鏡)** | Dương Quân Tùng / Cố Ngô Huệ Cảnh | Thanh Triều | Bát Trạch Lý Khí | Cổ Bản Khắc Gỗ Càn Long | **Hạng B** |
| `la-kinh-thau-giai` | **La Kinh Thấu Giải (羅經透解)** | Vương Đạo Hanh (王道亨) | Thanh Triều | Tam Hợp La Bàn Phân Tầng | Mộc Bản Thanh Đại | **Hạng B** |
| `tham-thi-huyen-khong` | **Thẩm Thị Huyền Không Học (沈氏玄空學)** | Thẩm Trúc Nhưng (沈竹礽) | Thanh Mạt - Dân Quốc | Huyền Không Phi Tinh | Bản in Hoằng Hóa Xã (1927) | **Hạng B** |
| `chu-tu-gia-le` | **Chu Tử Gia Lễ (朱子家禮)** | Chu Hy (朱熹) | Nam Tống | Khoa Nghi Tế Tự & Ban Thờ | Nho Khoa Toàn Thư | **Hạng A** |

---

## 2. MA TRẬN ĐỐI CHIẾU MÂU THUẪN GIỮA CÁC TRƯỜNG PHÁI (CONFLICT MATRIX)

Hệ thống ghi nhận và hiển thị nguyên vẹn các bất đồng học thuật cốt tử trong lịch sử phong thủy phương Đông:

```
┌──────────────────────────────────┬──────────────────────────────────┬──────────────────────────────────┐
│        VẤN ĐỀ TRANH LUẬN         │        QUAN ĐIỂM TRƯỜNG PHÁI A   │        QUAN ĐIỂM TRƯỜNG PHÁI B   │
├──────────────────────────────────┼──────────────────────────────────┼──────────────────────────────────┤
│ 1. Xác Định Hướng Nhà Dương Trạch│ BÁT TRẠCH: Lấy Tọa Hướng cửa ra  │ HUYÈN KHÔNG: Lấy Hướng nạp khí   │
│                                  │ vào làm Hướng chính của ngôi nhà.│ sáng nhất (Mặt tiền, Ban công).  │
├──────────────────────────────────┼──────────────────────────────────┼──────────────────────────────────┤
│ 2. Tính Thời Gian & Vận Khí      │ BÁT TRẠCH: Mệnh Quái bất biến    │ HUYỀN KHÔNG: Vận khí luân chuyển │
│                                  │ theo năm sinh suốt đời người.    │ 20 năm/Vận (Tam Nguyên Cửu Vận). │
├──────────────────────────────────┼──────────────────────────────────┼──────────────────────────────────┤
│ 3. Phương Vị Thủy Pháp Nạp Khí   │ TAM HỢP: Dựa vào 12 Cung Trường  │ HUYỀN KHÔNG: Dựa vào Tinh Bàn    │
│                                  │ Sinh và Tứ Đại Cục (Cục Thủy).   │ Sao Hướng Đương Lệnh (Vận 9).    │
├──────────────────────────────────┼──────────────────────────────────┼──────────────────────────────────┤
│ 4. Vị Trí Ban Thờ Tế Tự Gia Đình │ BÁT TRẠCH: Tọa Cát Hướng Cát     │ NHO GIA / TỤC LỆ: Đặt tại Trung  │
│                                  │ (Tọa Sinh Khí / Diên Niên).      │ Cung hoặc Vị trí trang nghiêm.   │
└──────────────────────────────────┴──────────────────────────────────┴──────────────────────────────────┘
```

---

## 3. CẤU TRÚC ĐỌC ĐỐI CHIẾU SONG SONG (SIDE-BY-SIDE SCHOLARLY READER)

Trên màn hình Desktop, Thư Khố cho phép bật chế độ **Song Ngữ Đối Chiếu (Side-by-Side Mode)**:

* **Cột Trái (Original Hanzi):** Văn bản cổ thư khắc gỗ, chấm câu ngắt đoạn theo chuẩn văn bản học.
* **Cột Phải (Vietnamese & Commentary):** Phiên âm, bản dịch học thuật và chú giải của các danh sư thời Tống, Minh, Thanh.
* **Thanh Công Cụ Xuất Trích Dẫn (Citation Exporter):** Cho phép sao chép mã trích dẫn học thuật chuẩn URN (ví dụ: `URN:CORPUS:FENGSHUI:TANG_SHU:CH01:P04`).
