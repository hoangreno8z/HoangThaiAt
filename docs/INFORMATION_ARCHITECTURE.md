# THIẾT KẾ KIẾN TRÚC THÔNG TIN & KHUNG ĐIỀU HƯỚNG 5 CỬA (PHASE 2)
**Dự án:** Huyền Học Mụ — Digital Scholarly Library  
**Phiên bản:** 1.0.0 (Phase 2)  
**Ngày phê duyệt:** 28/08/2026  
**Trạng thái:** Information Architecture Blueprint

---

## 1. ROUTE MAP & HỆ THỐNG ĐIỀU HƯỚNG CHÍNH (5 MAIN GATES)

Website chuyển đổi triệt để từ mô hình Trang đích cuộn dài (Endless Landing Page) sang mô hình **Thư Viện Số 5 Cửa Độc Lập**:

```
                              ┌───────────────────────────────────┐
                              │      TRANG CHỦ: SẢNH THƯ VIỆN     │
                              │           Route: / (Lobby)        │
                              └─────────────────┬─────────────────┘
                                                │
         ┌───────────────┬──────────────────────┼──────────────────────┬───────────────┐
         │               │                      │                      │               │
         ▼               ▼                      ▼                      ▼               ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│     1. HỌC      │ │   2. THƯ TỊCH   │ │   3. TRA CỨU    │ │   4. KHẢO CỨU   │ │   5. CÔNG CỤ    │
│  Route: /learn  │ │ Route: /library │ │ Route: /search  │ │Route: /research │ │ Route: /tools   │
├─────────────────┤ ├─────────────────┤ ├─────────────────┤ ├─────────────────┤ ├─────────────────┤
│ • Learning Path │ │ • Thư mục sách  │ │ • Tra cứu thuật │ │ • Khảo dị bản   │ │ • Lập Bát Trạch │
│ • Bài học tuần  │ │ • Trọng điểm    │ │   ngữ, quái,    │ │ • Phân tích bất │ │ • Tinh Bàn Phi  │
│   tự (Lessons)  │   chương mục      │   sao, can chi    │   đồng trường     │   Tinh 9 Vận      │
│ • Tiền đề & tiến│ │ • Bản dịch,     │ │ • Phân nhóm kết │   phái            │ • Ma trận Cửu     │
│   độ người học  │   chú giải cổ     │   quả đa chiều    │ │ • Evidence Graph│   Cung & Can Chi  │
└─────────────────┘ └─────────────────┘ └─────────────────┘ └─────────────────┘ └─────────────────┘
```

### 1.1. Chi Tiết Route Map & Deep-Link URL
| Tuyến Đường (Route) | Tên Phân Hệ | Mục Đích Sử Dụng | Các Tuyến Đường Con (Sub-Routes) |
| :--- | :--- | :--- | :--- |
| `/` hoặc `#/` | **Sảnh Thư Viện** | Cổng chào, điều hướng theo nhu cầu, tìm kiếm tổng, lối tắt bắt đầu | `#/` |
| `/learn` hoặc `#/learn` | **Phân Hệ Học** | Học tuần tự theo giáo trình sư phạm có tiến độ | `#/learn/:trackId/:lessonId` (ví dụ: `#/learn/nen-tang/cpt-001`) |
| `/library` hoặc `#/library` | **Phân Hệ Thư Tịch** | Đọc sách cổ, đối chiếu Hán văn nguyên tác và dịch nghĩa | `#/library/:bookId/:chapterId` (ví dụ: `#/library/tang-thu/chuong-1`) |
| `/search` hoặc `#/search` | **Phân Hệ Tra Cứu** | Tìm kiếm đa chiều phân nhóm (Khái niệm, Thư tịch, Bài học, Công cụ) | `#/search?q=:query&category=:cat` |
| `/research` hoặc `#/research` | **Phân Hệ Khảo Cứu** | Phân tích nguồn, khảo sát mâu thuẫn học thuật, Evidence Graph | `#/research/concepts/:conceptId`, `#/research/conflicts/:id` |
| `/tools` hoặc `#/tools` | **Phân Hệ Công Cụ** | Thực hành tính toán toán học Phong Thủy & Dịch Học thuần túy | `#/tools/bat-trach`, `#/tools/phi-tinh`, `#/tools/can-chi` |

---

## 2. KIẾN TRÚC BỐ CỤC 3 VÙNG ĐỘC LẬP (DESKTOP 3-PANE LAYOUT)

Trên màn hình Desktop (Màn hình rộng >= 1024px), toàn bộ website được chia thành 3 cột độc lập không cuộn chung:

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [HEADER]: HUY HOÀNG - 0933116860 | [HỌC] [THƯ TỊCH] [TRA CỨU] [KHẢO CỨU] [CÔNG CỤ] | [Search] [Mode]   │
├──────────────────────┬─────────────────────────────────────────────────┬───────────────────────────────┤
│   LEFT PANE (260px)  │               CENTER PANE (Flex)                │      RIGHT PANE (300px)       │
│  [Navigation Tree]   │                 [Main Reader]                   │     [Context / Annotation]    │
├──────────────────────┼─────────────────────────────────────────────────┼───────────────────────────────┤
│ • Danh mục bài học / │ • Tiêu đề bài học / Thư tịch                    │ • Thuật ngữ xuất hiện trong   │
│   Danh mục sách      │ • Metadata: Thời lượng đọc, Cấp độ, Tiền đề     │   đoạn đọc (Term Glossary)    │
│ • Cây phân cấp       │ • Mục tiêu học tập (Learning Objectives)        │ • Trích dẫn thư tịch gốc      │
│   Module / Chapter   │ • Nội dung chính (Thuyết minh + Kinh văn gốc)   │   (Source Citation)           │
│ • Bộ lọc & Trạng thái│ • Ví dụ thực tế & Sai lầm phổ biến              │ • Quan điểm các danh sư       │
│   hoàn thành (Check) │ • Điều hướng: [Bài Trước] ── [Bài Kế Tiếp]      │ • Khái niệm liên quan         │
└──────────────────────┴─────────────────────────────────────────────────┴───────────────────────────────┘
```

---

## 3. KIẾN TRÚC DI ĐỘNG (MOBILE READER + BOTTOM SHEET)

Trên màn hình di động (< 1024px), loại bỏ hoàn toàn việc nhồi nhét 3 cột. Áp dụng chuẩn công thái học:

```
┌──────────────────────────────────────┐
│ [HEADER]: HUY HOÀNG | [Search] [Menu]│
├──────────────────────────────────────┤
│ [BREADCRUMB]: Học > Nền Tảng > Vô Cực│
├──────────────────────────────────────┤
│                                      │
│         MAIN READER (Mobile)         │
│                                      │
│ • Tập trung 100% vào trải nghiệm đọc │
│ • Typography giấy ngà thanh nhã      │
│ • Khoảng cách dòng thoáng (1.8)      │
│ • Chạm vào thuật ngữ để xem chú giải │
│                                      │
├──────────────────────────────────────┤
│ [BOTTOM ACTION BAR]:                 │
│ [ ≡ Mục Lục ]  [ 📖 Chú Giải ] [ ➡️ ] │
└──────────────────────────────────────┘
                   │
                   ▼ (Khi bấm mở)
┌──────────────────────────────────────┐
│        BOTTOM SHEET OVERLAY          │
│ • Mục lục chương bài hoặc Chú giải   │
│ • Vuốt xuống để đóng mượt mà         │
└──────────────────────────────────────┘
```

---

## 4. BA CHẾ ĐỘ TRẢI NGHIỆM NGƯỜI DÙNG (USER EXPERIENCE MODES)

1. **Reading Mode (Chế Độ Đọc):**
   * Ẩn thanh Context bên phải và đồ thị mạng lực phức tạp.
   * Căn giữa văn bản, tối ưu font Serif và phông chữ Hán, tập trung hoàn toàn vào việc hấp thụ kiến thức.
2. **Research Mode (Chế Độ Khảo Cứu):**
   * Mở rộng thanh Context bên phải, hiển thị trọn vẹn: Mã Passage ID, Claim ID, nguồn thư tịch (Hạng A-F), các dị bản và điểm bất đồng giữa các trường phái.
3. **Tool Mode (Chế Độ Công Cụ):**
   * Ẩn văn bản dài, hiển thị giao diện tương tác: Input tham số, Ma trận bàn tính, Đồ họa vector SVG và bảng phân tích logic từ Domain Engine.

---

## 5. PHONG CÁCH ĐỒ HỌA & TYPOGRAPHY CỔ THƯ HIỆN ĐẠI

* **Màu sắc chủ đạo:** 
  * Nền: Màu xám đen trầm mặc (`#0B0E14` / `#111622`) kết hợp lớp giấy ngà nhẹ (`#161B26`).
  * Điểm nhấn: Vàng Hoàng Gia (`#F59E0B` / `#FBBF24`), Xanh Ngọc Bích (`#2DD4BF`), Tím Huyền Môn (`#A78BFA`).
* **Hệ thống Phông chữ (Typography):**
  * Tiêu đề & Cổ thư: `'Ma Shan Zheng', 'Cinzel', 'Noto Serif SC', serif`.
  * Văn bản thân bài & Đọc hiểu: `'Be Vietnam Pro', -apple-system, sans-serif`.
  * Dòng chữ Hán: Cỡ chữ lớn hơn 15%, có phiên âm Pinyin/Hán-Việt ngay phía dưới.
