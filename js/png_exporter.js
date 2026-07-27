/**
 * PNG Exporter for Thai At Sa Ban
 * Handles high-resolution canvas capture and bypasses Zalo/Messenger in-app download blocks.
 */

async function exportChartToPNG() {
    const chartContainer = document.getElementById("thai-at-chart-capture");
    if (!chartContainer) {
        alert("Không tìm thấy khung sa bàn để xuất ảnh!");
        return;
    }

    const btn = document.getElementById("btn-export-png");
    const originalText = btn.innerHTML;
    btn.innerHTML = "⏳ Đang tạo ảnh...";
    btn.disabled = true;

    try {
        // Use html2canvas with scale 2 for crisp resolution
        const canvas = await html2canvas(chartContainer, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#050711",
            logging: false
        });

        const imgDataUrl = canvas.toDataURL("image/png");

        // Detect Zalo, Messenger, Facebook, WeChat WebViews or iOS
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        const isInAppBrowser = /Zalo|FBAN|FBAV|Messenger|Instagram|MicroMessenger/i.test(ua);

        // Always show the preview modal with long-press instructions for max reliability!
        showPNGModal(imgDataUrl, isInAppBrowser);

        // Also trigger direct download attempt if Web Share API is available
        if (navigator.share && navigator.canShare) {
            try {
                const blob = await (await fetch(imgDataUrl)).blob();
                const file = new File([blob], "SaBan_ThaiAt.png", { type: "image/png" });
                if (navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        files: [file],
                        title: "Sa Bàn Thái Ất Thần Số",
                        text: "Hình ảnh Sa Bàn Thái Ất Thần Số"
                    });
                }
            } catch (err) {
                console.log("Web Share skipped or cancelled:", err);
            }
        }
    } catch (error) {
        console.error("Lỗi khi xuất ảnh PNG:", error);
        alert("Có lỗi xảy ra khi tạo ảnh PNG: " + error.message);
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

// Display Preview Modal with Base64 Image
function showPNGModal(imgDataUrl, isInAppBrowser) {
    let modal = document.getElementById("png-export-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "png-export-modal";
        modal.className = "modal";
        modal.innerHTML = `
            <div class="modal-content glass png-modal-content">
                <span class="close-btn" id="close-png-modal">&times;</span>
                <h2 class="png-modal-title">🖼️ Hình Ảnh Sa Bàn Thái Ất (PNG)</h2>
                
                <div class="png-instruction-box">
                    <p class="highlight-text">👉 <strong>ĐỂ LƯU ẢNH VỀ ĐIỆN THOẠI (ZALO / MESSENGER / SAFARI / CHROME):</strong></p>
                    <p>Nhấn giữ trực tiếp vào bức ảnh bên dưới từ <strong>1 - 2 giây</strong>, sau đó chọn <strong>"Lưu hình ảnh"</strong> (hoặc <em>"Download Image" / "Tải ảnh xuống"</em>).</p>
                </div>

                <div class="png-image-wrapper">
                    <img id="exported-png-img" src="" alt="Sa Bàn Thái Ất PNG">
                </div>

                <div class="png-modal-actions">
                    <a id="png-direct-download" href="" download="SaBan_ThaiAt.png" class="btn-primary">
                        💾 Tải Ảnh Trực Tiếp
                    </a>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById("close-png-modal").onclick = () => {
            modal.style.display = "none";
        };
    }

    const img = document.getElementById("exported-png-img");
    const downloadLink = document.getElementById("png-direct-download");
    
    img.src = imgDataUrl;
    downloadLink.href = imgDataUrl;

    modal.style.display = "flex";
}
