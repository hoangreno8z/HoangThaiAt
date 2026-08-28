# ĐẶC TẢ TỐI ƯU HÓA DI ĐỘNG & HIỆU NĂNG (MOBILE & PERF SPEC)
**Dự án:** Huyền Học Mụ — Digital Scholarly Library  
**Phiên bản:** 1.0.0 (Phase 11)  
**Ngày phê duyệt:** 28/08/2026  
**Trạng thái:** Mobile Ergonomics & Performance Specification

---

## 1. TIÊU CHUẨN TRẢI NGHIỆM DI ĐỘNG (MOBILE ERGONOMICS)

1. **Giao Diện Đọc Sách Độc Tôn (Reader-Centric Mobile Layout):**
   * Ẩn toàn bộ thanh điều hướng 3 cột phức tạp trên màn hình < 1024px.
   * Cột nội dung trung tâm (Center Reader) mở rộng 100% chiều rộng màn hình.
   * Cỡ chữ văn bản đạt chuẩn: Tối thiểu 16px, chiều cao dòng (`line-height`) 1.75 giúp chống mỏi mắt khi đọc lâu.
2. **Hệ Thống Bảng Vuốt Đáy (Bottom Sheet Architecture):**
   * Toàn bộ Mục Lục (TOC), Chú Giải Thuật Ngữ và Bằng Chứng được mở bằng Bottom Sheet trượt mượt mà từ dưới lên với `backdrop-filter: blur(12px)`.
   * Vùng đóng/mở trực quan kèm nút đóng lớn $\ge 44 	imes 44	ext{px}$.
3. **Thanh Thao Tác Đáy Cố Định (Fixed Mobile Bottom Bar):**
   * Nằm cố định ở đáy màn hình di động: `[≡ Mục Lục] [📖 Chú Giải] [🔍 Tra Cứu] [⚙️ Bàn Tính]`.
   * Chiều cao 64px, kích thước nút bấm tối thiểu 44px chuẩn công thái học ngón tay cái.

---

## 2. TIÊU CHUẨN HIỆU NĂNG TỐI CAO (PERFORMANCE BENCHMARKS)

* **Cumulative Layout Shift (CLS):** `0.00` (Không nhảy layout khi nạp tài nguyên).
* **First Contentful Paint (FCP):** `< 0.8s` (Không phụ thuộc mạng CDN bên ngoài).
* **Time to Interactive (TTI):** `< 1.2s` (Thuật toán tính toán chạy ngay trên Client).
* **Bộ Nhớ & Tải Trọng:** Không sử dụng bất kỳ thư viện JS bên thứ 3 nào (0kb bloatware).
