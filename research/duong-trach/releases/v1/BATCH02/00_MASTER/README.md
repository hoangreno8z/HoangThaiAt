# LAPQUE DƯƠNG TRẠCH — BATCH 02

## Phạm vi khóa
Batch 02 chỉ xử lý **chọn đất và đại thế địa điểm**:
- đại địa / sơn hà / hình thế;
- độ rộng, liên tục, tương đối bằng phẳng;
- sơn thủy bao bọc theo ngôn ngữ cổ;
- các thế dốc gãy, nghiêng lệch;
- một số vị trí truyền thống khuyên tránh;
- lớp phân biệt `TRADITIONAL_CLAIM` và `MODERN_SAFETY`.

Chưa xử lý:
- Bát Trạch;
- Huyền Không / Phi Tinh;
- bếp, phòng ngủ, cầu thang;
- trạch nhật;
- vật phẩm hóa giải.

## Luật chống ảo
1. Không SOURCE_ID -> không được xuất bản thành cổ pháp.
2. OCR nhiễu -> `OCR_CROSSCHECK_REQUIRED`.
3. Quy tác giả có tranh luận -> giữ `attribution_status`.
4. Hệ quả như bệnh tật, tù tội, phá tài chỉ là `TRADITIONAL_OUTCOME` nếu cổ thư nói; không chuyển thành quan hệ nhân quả hiện đại.
5. Không tự sinh ngưỡng %, mét, góc nếu cổ văn không cho số.
6. Âm trạch chỉ được giữ khi câu có giá trị trực tiếp cho Dương trạch; mặc định `SCOPE_WARNING`.

Ngày khóa batch: 2026-09-01.
