# BÁO CÁO TOÀN DIỆN AUDIT HỆ THỐNG (PHASE 0)
**Dự án:** Huyền Học Mụ — Digital Scholarly Library  
**Ngày thực hiện:** 28/08/2026  
**Trạng thái:** Hoàn tất Kiểm toán Hiện trạng (Phase 0 Audit)

---

## 1. TỔNG QUAN HỆ THỐNG HIỆN TẠI (SYSTEM OVERVIEW)

### 1.1. Framework & Runtime
* **Kiến trúc hiện tại:** Vanilla HTML5, CSS3 và Vanilla ES6 JavaScript thuần (Single Page Application tĩnh).
* **Quản lý module:** Chưa sử dụng module bundler (ESM / Webpack / Vite). Toàn bộ 18 file JavaScript được nhúng trực tiếp qua thẻ `<script>` vào `index.html`.
* **Phạm vi biến (Scope):** Toàn bộ dữ liệu, hằng số và hàm điều khiển đang được gán trực tiếp vào Global Scope (`window`), dẫn đến nguy cơ xung đột tên biến và khó kiểm soát trạng thái.

### 1.2. Build System & Package Management
* **Build System:** Chưa có hệ thống build tự động (`package.json`, TypeScript compiler, Babel hay Vite chưa được cấu hình).
* **Triển khai (Deployment):** Mã nguồn tĩnh đẩy trực tiếp lên GitHub (`origin/main`) và tự động deploy qua Vercel Static Hosting.
* **Kiểm thử tự động (Test Runner):** Chưa có Jest/Vitest/Playwright; kiểm tra cú pháp đang thực hiện thủ công qua `node -c`.

---

## 2. KIỂM TOÁN CHI TIẾT 17 HẠNG MỤC CỐT LÕI

### 2.1. Routes & URL Structure
* **Hiện trạng:** Chỉ có 1 URL duy nhất (`/`). Việc chuyển đổi nội dung hoàn toàn dựa trên Fragment Identifier / Hash (`#mach-amduong-10tiet`, `#mach-loandau`, `#amduong-tiet-1`...).
* **Hạn chế:** Không hỗ trợ Router cấp trang, không có URL riêng cho từng bài học, từng cuốn sách cổ hay từng công cụ; nút Back/Forward của trình duyệt không chuyển đổi được giữa các trạng thái học tập/đọc sách; không có Deep-Link ổn định dạng `/learn/...`, `/library/...`, `/concepts/...`.

### 2.2. Components & UI Architecture
* **Hiện trạng:** Kiến trúc dạng "Endless Landing Page" (Trang cuộn dọc vô tận). Toàn bộ giao diện được render đồng loạt khi sự kiện `DOMContentLoaded` kích hoạt thông qua việc ghép nối chuỗi HTML (`innerHTML = ...`).
* **Hạn chế:** 
  * Không có khái niệm Component độc lập hay Component Lifecycle.
  * DOM ban đầu gánh hơn 50.000 phần tử (HTML Nodes) được tạo ra ngay trong 1 lần tải.
  * Trộn lẫn logic tính toán, dữ liệu văn bản và mã HTML trực tiếp trong file điều khiển `main.js`.

### 2.3. Data Sources & Storage
* **Hiện trạng:** Dữ liệu học thuật được hardcode dưới dạng các hằng số JavaScript (`const AMDUONG_NGUHANH_PART_1..10`, `LOANDAU_FENGSHUI_PART_1..10`, `BATTRACH_FENGSHUI_PART_1..10`, `TAMHOP_FENGSHUI_PART_1..10`, `HUYENKHONG_FENGSHUI_PART_1..10`, `WORSHIP_...`, `COSMIC_DATA`).
* **Tổng dung lượng dữ liệu tĩnh:** ~584 KB dữ liệu JSON/JS literals.
* **Hạn chế:** 
  * Dữ liệu chưa được phân rã thành các đơn vị nguyên tử (Atomic Claims / Evidence Units).
  * Chưa có cấu trúc lưu trữ quan hệ (Graph Relations / Relational Database).
  * Chưa có hệ thống định danh thư tịch chuẩn mực (Source Registry URN / ISBN / Digital Identifier).

### 2.4. Current Content (Nội Dung Hiện Có)
* **Quy mô:** ~50 chuyên đề học thuật lớn bao quát:
  1. Bản Thể Luận Âm Dương Ngũ Hành (10 Tiết)
  2. Phong Thủy Thờ Cúng Chánh Tông (4 Chuyên đề đại sự)
  3. Địa Lý Loan Đầu Hình Thế Phái (10 Tiết)
  4. Bát Trạch Minh Kính Lý Khí Phái (10 Tiết)
  5. Tam Hợp Phái Thủy Pháp Huyết Mạch (10 Tiết)
  6. Huyền Không Phi Tinh Cửu Cung (10 Tiết)
* **Đánh giá giá trị:** Khối lượng văn bản trích dẫn Hán văn, phiên âm, dịch nghĩa, án nghiệm Việt Nam và cẩm nang ứng dụng rất phong phú và đồ sộ. Đây là tài sản tri thức cốt lõi cần **GIỮ LẠI (KEEP)** và chuyển dịch cấu trúc (MIGRATE) sang Evidence Packs.

### 2.5. Current UI Architecture & Layout
* **Hiện trạng:** Layout dạng dọc một cột kéo dài từ trên xuống dưới:
  `Header (Thương hiệu + Search)` -> `Hero Banner` -> `Section Âm Dương (10 Cards)` -> `Section Thờ Cúng` -> `Section Loan Đầu (10 Cards)` -> `Section Bát Trạch (10 Cards)` -> `Section Tam Hợp (10 Cards)` -> `Section Huyền Không (10 Cards)` -> `Section Công Cụ (Bát Trạch + Phi Tinh + Càn Khôn Đồ Hình)` -> `Footer`.
* **Hạn chế:** Người dùng bị ngợp trước một lượng thông tin khổng lồ xếp chồng lên nhau; không có không gian đọc tập trung (Reading Mode), không có không gian đối chiếu học thuật (Research Mode).

### 2.6. Current Navigation
* **Hiện trạng:** Thanh Navigation trên Header có thanh Search và nút mở `Mega Drawer Menu` (Menu trượt phân cấp bên phải).
* **Hạn chế:** Menu Drawer chỉ thực hiện nhiệm vụ cuộn trang (`scrollIntoView`) xuống vị trí thẻ tương ứng trên trang đơn lẻ, chưa phải là hệ thống điều hướng của một Thư viện số 5 Cửa (Học, Thư Tịch, Tra Cứu, Khảo Cứu, Công Cụ).

### 2.7. Mobile Behavior & Responsiveness
* **Hiện trạng:** Đã có responsive CSS, drawer menu mở toàn màn hình, thanh search co giãn chiếm 80% chiều rộng.
* **Hạn chế:** Trên thiết bị di động, toàn bộ 50 bài học vẫn được render đồng thời xuống một trang siêu dài, gây hiện tượng tràn bộ nhớ (Memory Pressure), lag khi vuốt nhanh và khó định vị vị trí đọc hiện tại; chưa có cơ chế `Bottom Sheet` cho mục lục/chú giải.

### 2.8. Current Search
* **Hiện trạng:** Bộ tìm kiếm `Instant Client-Side Search` trong `js/main.js` quét qua mảng `rawList` (34+ mục dữ liệu), chuẩn hóa bỏ dấu tiếng Việt (`removeVietnameseTones`) và cuộn tới thẻ đầu tiên khớp từ khóa.
* **Hạn chế:** Chưa phân nhóm kết quả đa chiều (Khái niệm, Bài học, Thư tịch, Nguồn trích, Công cụ); chưa có bộ lọc (Filter by School / Era / Type); chỉ nhảy đến thẻ DOM trên trang đơn.

### 2.9. Accessibility (a11y)
* **Hiện trạng:** Phông chữ rõ ràng, độ tương phản màu tốt (chữ sáng trên nền tối).
* **Hạn chế:** Chưa có chuẩn ARIA roles/landmarks đầy đủ (`role="main"`, `aria-expanded`, `aria-controls`), chưa quản lý focus bàn phím khi đóng/mở drawer, chưa hỗ trợ chế độ giảm chuyển động (`prefers-reduced-motion`).

### 2.10. Performance & Rendering
* **Hiện trạng:** Tải file ban đầu nhanh nhờ file tĩnh (HTML ~50KB, CSS ~35KB).
* **Hạn chế:** Trình duyệt phải parse ~700KB mã JavaScript đồng bộ trước khi vẽ giao diện; vẽ hơn 50.000 phần tử DOM cùng một lúc làm tăng thời gian TBT (Total Blocking Time) và INP (Interaction to Next Paint) trên điện thoại cấu hình yếu.

### 2.11. Broken & Fragile Features
* Thư viện D3.js tải qua CDN bên ngoài (`https://d3js.org/d3.v7.min.js`), nếu mất mạng hoặc CDN chập chờn sẽ khiến `antigravity_graph.js` báo lỗi.
* Việc gán sự kiện trực tiếp vào các phần tử DOM sinh ra động tiềm ẩn lỗi mất liên kết sự kiện nếu DOM bị render lại.

### 2.12. Duplicated Code
* Mã tạo thẻ bài học trong `renderLoanDauAcademicSection` và `renderGeneric10Parts` lặp lại 85% cấu trúc HTML.
* Thuật toán loại bỏ dấu tiếng Việt (`removeVietnameseTones`) được viết lặp lại ở nhiều nơi.

### 2.13. Unused & Legacy Code
* Các file động cơ đồ họa thử nghiệm cũ: `bat_quai_simulator.js`, `ha_do_lac_thu.js`, `cat_hung_matrix.js`, `trong_dong_engine.js` hiện chỉ vẽ canvas đơn lẻ, chưa liên kết với luồng dữ liệu học thuật chính.

### 2.14. Codebase Risks (Rủi Ro Hệ Thống)
1. **Rủi ro ô nhiễm Global Scope:** Bất kỳ file nào khai báo trùng tên biến `const data` hoặc hàm sẽ làm sập toàn bộ ứng dụng.
2. **Rủi ro dữ liệu không kiểm chứng:** Thiếu lớp kiểm tra nguồn gốc (Evidence Verification Gate), dễ bị lẫn lộn giữa kinh điển cổ thư và suy diễn hiện đại.
3. **Rủi ro hiệu năng thiết bị di động:** Gánh nặng DOM đè nặng khi tiếp tục bổ sung thêm 50-100 bài học mới.

### 2.15. Migration Strategy (Chiến Lược Chuyển Đổi)
* **Tách rời 4 tầng kiến trúc (Separation of Concerns):**
  1. `Domain Engine Layer`: TypeScript thuần túy xử lý thuật toán (Can Chi, Lục Thập Hoa Giáp, Cửu Cung, Phi Tinh, Bát Trạch) độc lập hoàn toàn với giao diện và AI.
  2. `Evidence & Knowledge Layer`: Chuyển đổi dữ liệu từ các file JS thô thành các tệp có cấu trúc `Source Registry`, `Corpus`, `Claims`, `Concepts`, `Evidence Graph`.
  3. `Application / State Layer`: Quản lý tuyến học tập (Learning Paths), tiến độ người học, lịch sử đọc, bộ lọc tìm kiếm và router điều hướng.
  4. `UI Presentation Layer`: 5 Cửa chính (HỌC, THƯ TỊCH, TRA CỨU, KHẢO CỨU, CÔNG CỤ), Desktop 3-Panel Reader, Mobile Reader + Bottom Sheet.

---

## 3. BẢNG PHÂN LOẠI TÀI SẢN MÃ NGUỒN (KEEP / REFACTOR / REPLACE / DEPRECATE)

| File / Module | Hiện Trạng | Hành Động | Lý Do & Kế Hoạch Chuyển Đổi |
| :--- | :--- | :---: | :--- |
| `js/amduong_nguhanh_data.js` | Dữ liệu 10 Tiết Bản Thể Luận | **REFACTOR** | Chuyển đổi từ JS Object thô sang cấu trúc JSON Evidence Pack, bổ sung mã định danh Passages & Claims. |
| `js/loandau_data.js` | Dữ liệu 10 Tiết Loan Đầu | **REFACTOR** | Chuẩn hóa vào Thư viện thư tịch (Tree B) & Tuyến bài học (Tree A). |
| `js/battrach_data.js` | Dữ liệu 10 Tiết Bát Trạch | **REFACTOR** | Tách riêng phần thư tịch khảo cứu và phần tham số hóa cho Bát Trạch Engine. |
| `js/tamhop_data.js` | Dữ liệu 10 Tiết Tam Hợp | **REFACTOR** | Chuẩn hóa 12 Cung Trường Sinh, Thủy Pháp Khảo Cứu vào Knowledge Graph. |
| `js/huyenkhong_data.js` | Dữ liệu 10 Tiết Huyền Không | **REFACTOR** | Phân tách dữ liệu lý thuyết sang Library và quy tắc phi tinh sang Domain Engine. |
| `js/tho_cung_data.js` | Dữ liệu Nghi Lễ Thờ Cúng | **REFACTOR** | Chuyển đổi thành chuyên khảo Thờ Cúng & Văn Khấn Cổ Truyền trong Thư Tịch. |
| `js/huyen_khong_engine.js` | Thuật toán Phi Tinh Cửu Cung | **REFACTOR** | Chuyển hóa thành Pure Domain Engine (TypeScript), bổ sung Unit Tests toán học Cửu Cung. |
| `js/bat_trach_engine.js` | Thuật toán Quẻ Bát Trạch | **REFACTOR** | Tách biệt logic tính toán Cung Mệnh Quái thành Pure Function có test case. |
| `js/ngu_hanh_engine.js` | Thuật toán Ngũ Hành Sinh Khắc | **REFACTOR** | Nâng cấp thành Rule Engine phân định Sinh Khắc Thừa Vũ và Phản Sinh Phản Khắc. |
| `index.html` | Trang đích cuộn dài vô tận | **REPLACE** | Thay thế bằng Kiến trúc Sảnh Thư Viện (Library Lobby) & Shell 5 Cửa Điều Hướng. |
| `js/main.js` | Script điều khiển nguyên khối 160KB | **REPLACE** | Phân rã thành các module chuyên trách: Navigation, Reader Shell, Search Engine, Router. |
| `css/style.css` | Phong cách giao diện cũ | **REFACTOR** | Tinh chỉnh Typography: Giấy ngà cổ thư kết hợp Hiện đại, tối ưu 3-Pane Desktop & Mobile Bottom Sheet. |
| `js/antigravity_graph.js` | Đồ hình mạng lực D3.js | **REFACTOR** | Chuyển sang đồ hình quan hệ tri thức (Knowledge Relation Graph) nội bộ, bỏ phụ thuộc CDN. |
| `js/bat_quai_simulator.js` | Canvas Bát Quái mô phỏng cũ | **DEPRECATE** | Tích hợp vào Visualizer của CÔNG CỤ (Gate 5). |
| `js/ha_do_lac_thu.js` | Canvas Hà Đồ Lạc Thư cũ | **DEPRECATE** | Tích hợp vào Visualizer chuẩn SVG trong CÔNG CỤ. |
| `js/cat_hung_matrix.js` | Ma trận cát hung cũ | **DEPRECATE** | Hợp nhất logic vào Bát Trạch & Huyền Không Rule Engine. |
| `js/trong_dong_engine.js` | Trống đồng visualizer cũ | **DEPRECATE** | Lưu trữ vào kho lưu trữ đồ họa mở rộng (`docs/FUTURE_IDEAS.md`). |
| `js/timeline_data.js` | Dữ liệu dòng thời gian cũ | **REFACTOR** | Chuyển vào phần Lịch Sử Khái Niệm trong KHẢO CỨU (Gate 4). |
| `js/icons.js` | Thư viện biểu tượng SVG | **KEEP** | Giữ lại kho icon SVG thuần túy để sử dụng cho hệ thống giao diện. |

---

## 4. KẾT LUẬN KIỂM TOÁN & ĐỀ XUẤT CHUYỂN BƯỚC (PHASE TRANSITION)

* Toàn bộ tài sản tri thức học thuật hiện có (~584 KB văn bản và 5 bộ thuật toán cốt lõi) được **bảo toàn nguyên vẹn 100%**, sẵn sàng để tái cấu trúc.
* Không có mã nào bị xóa trong Phase 0.
* **Đủ điều kiện chuyển sang Phase 1:** Khởi tạo `docs/MASTER_KNOWLEDGE_MAP.md` (Bản đồ tri thức tổng thể, phân định 3 Cây Tri Thức: Học Tập, Thư Tịch, Công Cụ và thiết lập chuỗi tri thức khởi đầu từ Vô Cực -> Lạc Thư).
