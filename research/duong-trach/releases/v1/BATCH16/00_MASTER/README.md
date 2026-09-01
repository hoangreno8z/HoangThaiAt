# LAPQUE DƯƠNG TRẠCH — BATCH 16
## NƯỚC SẠCH / GIẾNG / BỂ NƯỚC / NƯỚC MƯA / THOÁT NƯỚC

Ngày khóa: 2026-09-01

## Scope
- 井: giếng lịch sử
- 泉: nguồn/mạch/suối theo văn cảnh
- 天井積水: nước đọng sân/thiên tỉnh
- 溝渠: mương/rãnh
- 水路 / 放水: đường thoát nước theo hệ cổ
- potable water / domestic water
- bể nước ngầm, bể mái, két nước
- nước mưa
- thoát nước trong nhà / ngoài nhà
- cấp nước hạ tầng

## Anti-hallucination locks
1. `井 != POTABLE_WATER_TANK`.
2. `井 != ROOF_TANK`.
3. `井 != TAP_WATER_SOURCE`.
4. `糞屋 != SEPTIC_TANK`.
5. `水路 / 放水` cổ không tự đồng nhất với ống PVC, sewer, storm drain hiện đại.
6. Không đưa lời cổ về hướng giếng sang bể nước nếu không có direct bridge evidence.
7. Không dùng phán bệnh/tài/sinh tử cổ như causal claim.
8. Không lấy kỹ thuật cổ như bỏ chì vào giếng làm ứng dụng hiện đại.
9. QCVN/TCVN phải dùng đúng phiên bản và đúng phạm vi.
10. Nếu water safety FAIL -> mọi recommendation cổ bị override.
