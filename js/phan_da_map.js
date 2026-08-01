/**
 * Cửu Cung Phận Dã Map Component — Thái Ất Thần Số
 * Bản đồ mặc định hiển thị 9 Châu Phận Dã độc lập dưới sa bàn
 */

const PHAN_DA_MAP_DATA = [
    {
        cungNum: 9,
        cungName: "Tốn",
        trigram: "☴",
        chauName: "Dương Châu",
        direction: "Đông Nam",
        ancientInfo: "Thời cổ gọi là Hoang Phục. Sách Vũ Cống viết: 'Dương Châu là lãnh thổ của Bách Việt ở phía nam'.",
        modernInfo: "Bao gồm thành phố Thượng Hải, tỉnh Giang Tô, tỉnh Triết Giang, tỉnh Phúc Kiến, tỉnh Quảng Đông.",
        color: "#2ecc71"
    },
    {
        cungNum: 2,
        cungName: "Ly",
        trigram: "☲",
        chauName: "Kinh Châu",
        direction: "Chính Nam",
        ancientInfo: "Thời Đế Minh phân định thuộc địa phận nước Sở. Người Bắc Phương khi xưa gọi đây là vùng đất Nam Man cường thịnh.",
        modernInfo: "Bao gồm tỉnh Hồ Nam, Hồ Bắc, khu vực tự trị dân tộc Tráng tỉnh Quảng Tây, phần lớn tỉnh Quý Châu và một phần nhỏ tỉnh Quảng Đông.",
        color: "#e74c3c"
    },
    {
        cungNum: 7,
        cungName: "Khôn",
        trigram: "☷",
        chauName: "Lương Châu",
        direction: "Tây Nam",
        ancientInfo: "Bao gồm các vùng đất Hoa Dương, Hắc Thủy. Thời nhà Hán đổi tên gọi là Hán Trung, Ích Châu.",
        modernInfo: "Thuộc địa phận phần lớn tỉnh Tứ Xuyên và thành phố Trùng Khánh.",
        color: "#e67e22"
    },
    {
        cungNum: 4,
        cungName: "Chấn",
        trigram: "☳",
        chauName: "Từ Châu",
        direction: "Chính Đông",
        ancientInfo: "Phía Đông giáp với biển lớn, ứng với chòm sao Cang, Đê. Đến thời Xuân Thu Chiến Quốc là phận dã của nước Tống.",
        modernInfo: "Bao gồm thành phố Thương Khâu (Hà Nam); thành phố Hà Trạch, Tế Ninh (Sơn Đông); thành phố Từ Châu, Túc Thiên (Giang Tô).",
        color: "#27ae60"
    },
    {
        cungNum: 5,
        cungName: "Trung Cung",
        trigram: "☯",
        chauName: "Dự Châu",
        direction: "Trung Cung",
        ancientInfo: "Vùng đất nằm ở giữa 9 Châu, còn gọi là Dự Châu, Nhữ Nam, Hà Nam. Thời Tần gọi là Tam Xuyên.",
        modernInfo: "Gồm các phần đất thuộc các tỉnh: Hà Nam, An Huy, Giang Tô.",
        color: "#f1c40f"
    },
    {
        cungNum: 6,
        cungName: "Đoài",
        trigram: "☱",
        chauName: "Ung Châu",
        direction: "Chính Tây",
        ancientInfo: "Bao gồm vùng đất Vĩnh Hưng, Hà Tây, Vị Thủy, Mân Sơn. Thời nhà Tần đổi tên thành Ung Châu, làm cơ sở thống nhất 6 nước.",
        modernInfo: "Gồm các phần đất thuộc tỉnh Thiểm Tây và một phần của tỉnh Tứ Xuyên.",
        color: "#d35400"
    },
    {
        cungNum: 3,
        cungName: "Cấn",
        trigram: "☶",
        chauName: "Thanh Châu",
        direction: "Đông Bắc",
        ancientInfo: "Thời xưa bao gồm các vùng đất thuộc Bắc Hải và Thanh Hải (Tân Cương) ứng với chòm sao Nguy, Hư.",
        modernInfo: "Gồm các khu vực cục bộ của tỉnh Hà Bắc và phần lớn của tỉnh Sơn Đông.",
        color: "#16a085"
    },
    {
        cungNum: 8,
        cungName: "Khảm",
        trigram: "☵",
        chauName: "Duyện Châu",
        direction: "Chính Bắc",
        ancientInfo: "Khu vực giữa Tề Thủy và Hoàng Hà, còn có tên gọi là Cứu Sơn, Thái Sơn (bắt nguồn từ tên Duyện Thủy).",
        modernInfo: "Tương ứng với các vùng đất thuộc thành phố Duyện Châu; thành phố Nghi Châu, Huyện Doanh thuộc tỉnh Sơn Đông và tỉnh Hà Nam, Giang Tô.",
        color: "#2980b9"
    },
    {
        cungNum: 1,
        cungName: "Càn",
        trigram: "☰",
        chauName: "Ký Châu",
        direction: "Tây Bắc",
        ancientInfo: "Thời xưa gọi là Cửa Việt, sau gọi Ký Châu, thời Chiến Quốc thuộc nước Triệu.",
        modernInfo: "Tương ứng với các vùng đất thuộc các tỉnh Hà Bắc, Sơn Tây và khu vực cục bộ của tỉnh Hà Nam, Sơn Đông.",
        color: "#9b59b6"
    }
];

function initPhanDaMap() {
    const gridContainer = document.getElementById("phan-da-grid-map");
    const cardsContainer = document.getElementById("phan-da-cards-list");
    if (!gridContainer || !cardsContainer) return;

    let gridHtml = "";
    let cardsHtml = "";

    PHAN_DA_MAP_DATA.forEach(item => {
        gridHtml += `
            <div class="pd-grid-box" data-cung="${item.cungNum}" onclick="highlightPhanDaCard(${item.cungNum})">
                <div class="pd-box-header">
                    <span class="pd-cung-title">${item.trigram} Cung ${item.cungNum} ${item.cungName}</span>
                    <span class="pd-direction">${item.direction}</span>
                </div>
                <div class="pd-chau-name" style="color: ${item.color}">${item.chauName}</div>
                <div class="pd-box-preview">${item.modernInfo.substring(0, 42)}...</div>
            </div>
        `;

        cardsHtml += `
            <div class="pd-card glass" id="pd-card-${item.cungNum}" style="border-left: 4px solid ${item.color}">
                <div class="pd-card-header">
                    <h4 style="color: ${item.color}">${item.trigram} Cung ${item.cungNum} ${item.cungName} — ${item.chauName}</h4>
                    <span class="pd-card-badge">${item.direction}</span>
                </div>
                <div class="pd-card-body">
                    <p><strong>🏛️ Lịch Sử & Tên Cổ:</strong> ${item.ancientInfo}</p>
                    <p><strong>📍 Địa Lý Ngày Nay:</strong> ${item.modernInfo}</p>
                </div>
            </div>
        `;
    });

    gridContainer.innerHTML = gridHtml;
    cardsContainer.innerHTML = cardsHtml;
}

function highlightPhanDaCard(cungNum) {
    document.querySelectorAll(".pd-grid-box").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".pd-card").forEach(c => c.classList.remove("active-highlight"));

    const selectedBox = document.querySelector(`.pd-grid-box[data-cung="${cungNum}"]`);
    const selectedCard = document.getElementById(`pd-card-${cungNum}`);

    if (selectedBox) selectedBox.classList.add("active");
    if (selectedCard) {
        selectedCard.classList.add("active-highlight");
        selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

document.addEventListener("DOMContentLoaded", initPhanDaMap);
