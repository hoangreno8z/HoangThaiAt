# DECISION TREE v0.2 — CHỌN ĐẤT

```text
MẢNH ĐẤT ỨNG VIÊN
│
├─ [M0] MODERN SAFETY HARD GATE
│   ├─ sạt lở / nền không an toàn?
│   ├─ ngập nghiêm trọng?
│   ├─ hành lang thoát lũ / dòng chảy nguy hiểm?
│   ├─ ô nhiễm nghiêm trọng?
│   ├─ PCCC / tiếp cận cứu nạn bất khả thi?
│   └─ FAIL → LOẠI hoặc yêu cầu thiết kế kỹ thuật chuyên môn
│
├─ [C1] ĐẠI THẾ TRUYỀN THỐNG
│   ├─ đại địa / sơn hà
│   ├─ độ rộng / liên tục / bằng-phục
│   ├─ sơn thủy bao-hướng
│   └─ thế dốc gãy / nghiêng lệch
│
├─ [C2] HÌNH THÁI LÔ ĐẤT
│   ├─ trước-sau rộng hẹp
│   ├─ độ dốc
│   ├─ bồn trũng
│   └─ xung dòng / nút giao / vị trí đặc thù
│
├─ [C3] MÔI TRƯỜNG
│   ├─ sáng
│   ├─ ẩm
│   ├─ gió
│   ├─ nước
│   └─ cây cối / bề mặt
│
└─ REPORT
    ├─ MODERN_RISK
    ├─ TRADITIONAL_FORM
    ├─ TRADITIONAL_TABOO
    ├─ UNKNOWN
    └─ REQUIRED_SURVEY
```

## Luật ưu tiên
`MODERN_SAFETY_HARD_GATE` luôn có quyền phủ quyết.  
Một claim cổ “cát” không được ghi đè nguy cơ ngập, sạt lở, nền yếu, cháy, ô nhiễm hay tiếp cận cứu nạn.
