# BÁO CÁO CHUYỂN ĐỔI KIẾN TRÚC & DỌN DẸP MÃ NGUỒN CŨ (PHASE 12)
**Dự án:** Huyền Học Mụ — Digital Scholarly Library  
**Phiên bản:** 1.0.0 (Phase 12)  
**Ngày phê duyệt:** 28/08/2026  
**Trạng thái:** Migration & Deprecation Verification Report

---

## 1. DANH MỤC THÀNH PHẦN ĐÃ CHUYỂN ĐỔI & KHỬ BỎ (DEPRECATION MATRIX)

| Thành Phần Cũ (Legacy) | Trạng Thái | Thành Phần Mới Thay Thế (New Architecture) | Lý Do Kiến Trúc |
| :--- | :---: | :--- | :--- |
| **Endless Landing Page DOM** | `REMOVED` | **Sảnh Thư Viện (`#/`) + 5 Cửa Chính** | Loại bỏ cấu trúc kéo dài vô tận, tập trung vào hành trình người dùng. |
| **DOM Tĩnh Trong `#gate-tools`** | `REMOVED` | **`ToolUI` Động (`js/tool_ui.js`)** | Render động đa tab phản ứng nhanh theo thời gian thực. |
| **Cơ Chế Tìm Kiếm Nhảy DOM** | `REMOVED` | **`ScholarlySearchEngine` (`js/search_engine.js`)** | Tìm kiếm đa chiều phân nhóm có highlight và bộ lọc trường phái. |
| **Đồ Thị D3.js Phụ Thuộc CDN** | `REMOVED` | **Native SVG Graph (`js/evidence_graph_ui.js`)** | Đồ thị vector độc lập 100%, không bị ảnh hưởng khi đứt mạng. |
| **3 Cột Cố Định Trên Mobile** | `REMOVED` | **Mobile Reader-First + Bottom Sheet** | Cột đọc 100% chiều rộng, mục lục và chú giải trượt từ đáy. |

---

## 2. KIỂM TRA ĐIỀU HƯỚNG & REDIRECTS (ROUTING AUDIT)

* `#/` $ightarrow$ Sảnh Thư Viện với Big Search Bar và 6 Thẻ Lối Đi (*Pathway Cards*).
* `#/learn` $ightarrow$ Bảng điều khiển 6 Đại Giáo Trình Sư Phạm.
* `#/learn/:track/:lesson` $ightarrow$ Khung đọc bài học 10 tầng sư phạm.
* `#/library` $ightarrow$ Thư Khố Cổ Điển Chính Điển.
* `#/library/:book/:chapter` $ightarrow$ Chế độ đọc Song Ngữ Đối Chiếu Hán - Việt.
* `#/search?q=...` $ightarrow$ Bộ máy tìm kiếm đa chiều 4 phân nhóm.
* `#/research` $ightarrow$ Đồ hình tri thức SVG, Ma trận mâu thuẫn và Thang bằng chứng A-F.
* `#/tools` $ightarrow$ Bàn tính Bát Trạch, Phi Tinh Vận 9 và Xuất Báo Cáo Chẩn Đoán.
