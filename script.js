// Lists of Celestial Stems (Can) and Terrestrial Branches (Chi)
const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tị", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

// Base details for the 9 Palaces (Lạc Thư Cửu Cung)
const PALACE_DETAILS = {
    1: {
        name: "Khảm",
        element: "thủy",
        elementText: "Thủy (Nước)",
        direction: "Chính Bắc",
        desc: "Cung Khảm tượng trưng cho nước sâu, vực hiểm, lòng tin và sự thông thái nhưng cũng ẩn chứa hiểm họa tiềm tàng. Ở thế trận, cung này thích hợp cho việc dùng mưu kế ngầm, phòng thủ kiên cố, tĩnh lặng chờ thời cơ."
    },
    2: {
        name: "Khôn",
        element: "thổ",
        elementText: "Thổ (Đất Đai)",
        direction: "Tây Nam",
        desc: "Cung Khôn tượng trưng cho đất mẹ hiền hòa, sự nhu thuận, bao dung và nâng đỡ. Cung này rất cát lợi cho việc xây dựng căn cứ vững chắc, tập hợp lòng dân, tích lũy lương thảo, không nên vội vã tấn công công khai."
    },
    3: {
        name: "Chấn",
        element: "mộc",
        elementText: "Mộc (Sấm Sét)",
        direction: "Chính Đông",
        desc: "Cung Chấn tượng trưng cho sấm chớp, sự chấn động, khởi đầu mới và lòng dũng cảm vượt qua nghịch cảnh. Thích hợp cho các chiến dịch đột kích bất ngờ, tạo thanh thế lớn, cổ động quân sĩ hành động mau lẹ."
    },
    4: {
        name: "Tốn",
        element: "mộc",
        elementText: "Mộc (Gió)",
        direction: "Đông Nam",
        desc: "Cung Tốn tượng trưng cho gió lùa khắp nơi, sự mềm mại, lan tỏa và ngoại giao. Thích hợp cho việc truyền tin, do thám, đàm phán ngoại giao, đi sứ hoặc phân tán thế lực đối phương một cách êm dịu."
    },
    5: {
        name: "Trung Cung",
        element: "thổ",
        elementText: "Thổ (Trung tâm)",
        direction: "Trung tâm",
        desc: "Trung Cung là trục xoay của Cửu Cung, là nơi Hoàng Cực tọa lạc. Trong Thái Ất, Trung Cung đại diện cho sự trung lập, điều phối toàn cục và giữ thế cân bằng vững chắc giữa Chủ và Khách."
    },
    6: {
        name: "Càn",
        element: "kim",
        elementText: "Kim (Trời)",
        direction: "Tây Bắc",
        desc: "Cung Càn tượng trưng cho bầu trời, người cha, đấng quân vương, sự cương kiện và luật pháp nghiêm minh. Thích hợp cho việc ban hành mệnh lệnh, thiết lập kỷ luật quân đội, hoặc tìm kiếm sự trợ giúp từ cấp trên có uy thế lớn."
    },
    7: {
        name: "Đoài",
        element: "kim",
        elementText: "Kim (Đầm hồ)",
        direction: "Chính Tây",
        desc: "Cung Đoài tượng trưng cho đầm nước, sự vui vẻ, hội họp, đàm luận nhưng cũng có thể là khẩu thiệt (tranh cãi). Phù hợp tổ chức yến tiệc khích lệ quân sĩ, thương thảo đàm phán, cần đề phòng nội bộ cãi cọ làm suy giảm binh lực."
    },
    8: {
        name: "Cấn",
        element: "thổ",
        elementText: "Thổ (Núi)",
        direction: "Đông Bắc",
        desc: "Cung Cấn tượng trưng cho núi cao hiểm trở, sự ngưng nghỉ, bất động và phòng thủ thụ động. Gặp cung này nên án binh bất động, củng cố thành trì tường lũy, lấy sự vững chãi như núi đá để chế ngự đối phương."
    },
    9: {
        name: "Ly",
        element: "hỏa",
        elementText: "Hỏa (Lửa)",
        direction: "Chính Nam",
        desc: "Cung Ly tượng trưng cho lửa ấm, ánh sáng, văn minh, sự hiển lộ rõ ràng và công khai. Phù hợp cho việc tuyên chiến công khai, phô diễn binh lực, làm sáng tỏ các mối nghi ngờ hoặc tấn công trực diện vào ban ngày."
    }
};

// Palace placement order for Tai Yi movement (skipping Trung Cung 5)
const PALACE_ORDER = [1, 8, 3, 4, 9, 2, 7, 6];

// Star definition templates
const STAR_INFO = {
    "thai-at": {
        name: "Thái Ất (太乙)",
        role: "Thiên Mệnh / Quân Vương",
        desc: "Ngôi sao tôn quý nhất trong hệ thống, đại diện cho Thiên lý, Hoàng đế và ý trời. Cung có Thái Ất ngự trị là cung mang nguồn năng lượng tối cao, vạn sự hanh thông, hóa giải mọi hung hiểm cho bất kỳ thế lực nào đóng cùng cung đó."
    },
    "van-xuong": {
        name: "Văn Xương (文昌)",
        role: "Chủ tướng / Bộ tham mưu",
        desc: "Đại diện cho phe Chủ (chủ nhà, bên thủ, bên trong quốc gia). Vị trí của Văn Xương cho biết trạng thái tinh thần, mưu lược và khả năng tổ chức phòng ngự hay phản công của nội bộ."
    },
    "thuy-kich": {
        name: "Thủy Kích (始擊)",
        role: "Khách tướng / Kẻ xâm lược",
        desc: "Đại diện cho phe Khách (bên ngoài, bên tấn công, thiên tai, kẻ thù). Vị trí của Thủy Kích biểu hiện thế lực xâm lấn, sức mạnh công phá ban đầu của ngoại cảnh hoặc đối phương."
    },
    "chu-tuong": {
        name: "Chủ Đại Tướng (主大將)",
        role: "Lực lượng công kích của Chủ",
        desc: "Đại diện cho quân chủ lực tiến công của phe Chủ. Phối hợp với Văn Xương để tạo thế công thủ toàn diện."
    },
    "khach-tuong": {
        name: "Khách Đại Tướng (客大將)",
        role: "Lực lượng công kích của Khách",
        desc: "Đại diện cho quân chủ lực tiến công của phe Khách. Quyết định sức mạnh đột phá trận địa của phe tấn công."
    },
    "dinh-xuong": {
        name: "Định Xương (定脇)",
        role: "Đại tướng Định Quốc / Hậu cần",
        desc: "Bổ trợ cho Văn Xương và Chủ tướng, đại diện cho hậu cần vững chắc, lòng trung thành và các nhân tố ổn định phía sau."
    }
};

// Five Elements generation & overcoming relations
const ELEMENT_RELATIONS = {
    "mộc": { generates: "hỏa", overcomes: "thổ" },
    "hỏa": { generates: "thổ", overcomes: "kim" },
    "thổ": { generates: "kim", overcomes: "thủy" },
    "kim": { generates: "thủy", overcomes: "mộc" },
    "thủy": { generates: "mộc", overcomes: "hỏa" }
};

// Helper: Get Julian Date (JD) since Epoch
function getJD(year, month, day) {
    let y = year;
    let m = month;
    if (m <= 2) {
        y--;
        m += 12;
    }
    const A = Math.floor(y / 100);
    const B = Math.floor(A / 4);
    const C = 2 - A + B;
    const E = Math.floor(365.25 * (y + 4716));
    const F = Math.floor(30.6001 * (m + 1));
    return C + day + E + F - 1524.5;
}

// Get approximate Solar Term based on Month and Day
function getTietKhi(month, day) {
    // Array of solar terms with approximate start dates
    const terms = [
        { name: "Tiểu Hàn", m: 1, d: 5 },
        { name: "Đại Hàn", m: 1, d: 20 },
        { name: "Lập Xuân", m: 2, d: 4 },
        { name: "Vũ Thủy", m: 2, d: 19 },
        { name: "Kinh Trập", m: 3, d: 5 },
        { name: "Xuân Phân", m: 3, d: 20 },
        { name: "Thanh Minh", m: 4, d: 4 },
        { name: "Cốc Vũ", m: 4, d: 19 },
        { name: "Lập Hạ", m: 5, d: 5 },
        { name: "Tiểu Mãn", m: 5, d: 20 },
        { name: "Mang Chủng", m: 6, d: 5 },
        { name: "Hạ Chí", m: 6, d: 21 },
        { name: "Tiểu Thử", m: 7, d: 7 },
        { name: "Đại Thử", m: 7, d: 23 },
        { name: "Lập Thu", m: 8, d: 7 },
        { name: "Xử Thử", m: 8, d: 23 },
        { name: "Bạch Lộ", m: 9, d: 7 },
        { name: "Thu Phân", m: 9, d: 22 },
        { name: "Hàn Lộ", m: 10, d: 8 },
        { name: "Sương Giáng", m: 10, d: 23 },
        { name: "Lập Đông", m: 11, d: 7 },
        { name: "Tiểu Tuyết", m: 11, d: 22 },
        { name: "Đại Tuyết", m: 12, d: 7 },
        { name: "Đông Chí", m: 12, d: 21 }
    ];

    // Find the current term
    for (let i = terms.length - 1; i >= 0; i--) {
        const term = terms[i];
        if (month > term.m || (month === term.m && day >= term.d)) {
            return term.name;
        }
    }
    // Default to the last term of the previous year (Đông Chí)
    return "Đông Chí";
}

// Determine Dun (Yang/Yin Cycle) based on solar term
function getDunType(solarTerm) {
    const yangTerms = [
        "Đông Chí", "Tiểu Hàn", "Đại Hàn", "Lập Xuân", "Vũ Thủy", "Kinh Trập",
        "Xuân Phân", "Thanh Minh", "Cốc Vũ", "Lập Hạ", "Tiểu Mãn", "Mang Chủng"
    ];
    return yangTerms.includes(solarTerm) ? "Dương Độn" : "Âm Độn";
}

// Convert hours (0-23) to Chi Hour Index (0-11)
function getChiHourIndex(hours) {
    // 23:00 to 00:59 is Tý (0)
    if (hours >= 23 || hours < 1) return 0;
    return Math.floor((hours + 1) / 2);
}

// Document Ready Functionality
document.addEventListener("DOMContentLoaded", () => {
    // Auto-fill today's date and time
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    const formattedTime = today.toTimeString().split(" ")[0].substring(0, 5);
    
    document.getElementById("solar-date").value = formattedDate;
    document.getElementById("solar-time").value = formattedTime;

    // Set up tabs navigation
    const tabBtns = document.querySelectorAll(".tab-btn");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const targetTab = btn.getAttribute("data-tab");
            document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
            document.getElementById(targetTab).classList.add("active");
        });
    });

    // Form submission
    const form = document.getElementById("thai-at-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        castThaiAt();
    });

    // Palace cell click event listener
    const palaceCells = document.querySelectorAll(".palace-cell");
    palaceCells.forEach(cell => {
        cell.addEventListener("click", () => {
            const palaceNum = parseInt(cell.getAttribute("data-palace"));
            showPalaceModal(palaceNum);
        });
    });

    // Close modal listener
    const modal = document.getElementById("palace-modal");
    const closeBtn = document.querySelector(".close-btn");
    
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
    
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Cast the initial chart on load
    castThaiAt();
});

// Main Casting Function
let currentCastedChart = null; // Store chart results for the modal

function castThaiAt() {
    const dateInput = document.getElementById("solar-date").value;
    const timeInput = document.getElementById("solar-time").value;
    const selectChiHour = parseInt(document.getElementById("chi-hour").value);
    const selectDunType = document.getElementById("dun-type").value;

    if (!dateInput || !timeInput) return;

    // Parse date components
    const dateParts = dateInput.split("-");
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2]);

    const timeParts = timeInput.split(":");
    const hours = parseInt(timeParts[0]);
    
    // 1. Calculate Can Chi of Year
    let yearCanIndex = (year - 3) % 10;
    if (yearCanIndex < 0) yearCanIndex += 10;
    let yearChiIndex = (year - 3) % 12;
    if (yearChiIndex < 0) yearChiIndex += 12;
    const yearCanChi = CAN[yearCanIndex] + " " + CHI[yearChiIndex];

    // 2. Calculate Can Chi of Month (Approximation)
    // Month 1 (Lunar Dần) begins in early Feb (around Lập Xuân).
    // For simplicity, we align Solar month to Can Chi month offset.
    let monthCanIndex = (yearCanIndex * 2 + month) % 10;
    let monthChiIndex = (month + 1) % 12; // Dần is month index 2
    const monthCanChi = CAN[monthCanIndex] + " " + CHI[monthChiIndex];

    // 3. Calculate Can Chi of Day
    const targetDate = new Date(year, month - 1, day);
    // Align time zone offset
    const timeZoneOffset = targetDate.getTimezoneOffset() * 60000;
    const localMs = targetDate.getTime() - timeZoneOffset;
    const diffDays = Math.floor(localMs / (24 * 3600 * 1000));
    
    let dayCanIndex = (diffDays + 5) % 10;
    if (dayCanIndex < 0) dayCanIndex += 10;
    let dayChiIndex = (diffDays + 5) % 12;
    if (dayChiIndex < 0) dayChiIndex += 12;
    const dayCanChi = CAN[dayCanIndex] + " " + CHI[dayChiIndex];

    // 4. Calculate Can Chi of Hour
    let hourChiIndex = selectChiHour !== -1 ? selectChiHour : getChiHourIndex(hours);
    // Hour Can is based on Day Can: Giáp/Kỷ starting with Giáp Tý, etc.
    let hourCanIndex = (dayCanIndex * 2 + hourChiIndex) % 10;
    const hourCanChi = CAN[hourCanIndex] + " " + CHI[hourChiIndex];

    // 5. Determine Solar Term (Tiết Khí) and Dun Type
    const solarTerm = getTietKhi(month, day);
    let dunType = getDunType(solarTerm);
    if (selectDunType === "yang") dunType = "Dương Độn";
    if (selectDunType === "yin") dunType = "Âm Độn";

    // 6. Calculate Cục Number
    // Period cycle has 72 cục
    const jd = getJD(year, month, day);
    const cucNum = Math.floor(((jd * 12 + hourChiIndex) % 72) + 1);

    // 7. Calculate Star Positions (in PALACE_ORDER indices 0-7)
    let taiYiIndex = 0;
    if (dunType === "Dương Độn") {
        taiYiIndex = (cucNum - 1) % 8;
    } else {
        taiYiIndex = (72 - cucNum) % 8;
    }
    const starTaiYiPalace = PALACE_ORDER[taiYiIndex];

    // Văn Xương (Chủ) calculation
    const wenChangIndex = (cucNum * 3 + hourChiIndex * 2) % 8;
    const starWenChangPalace = PALACE_ORDER[wenChangIndex];

    // Thủy Kích (Khách) calculation
    const shijiIndex = (cucNum * 5 + hourChiIndex * 7) % 8;
    const starShijiPalace = PALACE_ORDER[shijiIndex];

    // Chủ Đại Tướng calculation
    const chuIndex = (taiYiIndex + 3) % 8;
    const starChuPalace = PALACE_ORDER[chuIndex];

    // Khách Đại Tướng calculation
    const khachIndex = (taiYiIndex + 5) % 8;
    const starKhachPalace = PALACE_ORDER[khachIndex];

    // Định Xương calculation
    const dinhIndex = (wenChangIndex + 5) % 8;
    const starDinhPalace = PALACE_ORDER[dinhIndex];

    // Compile Casted Chart Data
    currentCastedChart = {
        tuTru: `${yearCanChi} (Năm) / ${monthCanChi} (Tháng) / ${dayCanChi} (Ngày) / ${hourCanChi} (Giờ)`,
        tietKhi: solarTerm,
        vongDon: dunType,
        cucSo: `${dunType} - Cục Số ${cucNum}`,
        stars: {
            "thai-at": starTaiYiPalace,
            "van-xuong": starWenChangPalace,
            "thuy-kich": starShijiPalace,
            "chu-tuong": starChuPalace,
            "khach-tuong": starKhachPalace,
            "dinh-xuong": starDinhPalace
        }
    };

    // Update Quick Info Box
    document.getElementById("info-tu-tru").textContent = currentCastedChart.tuTru;
    document.getElementById("info-tiet-khi").textContent = currentCastedChart.tietKhi;
    document.getElementById("info-vong-don").textContent = currentCastedChart.vongDon;
    document.getElementById("info-cuc-so").textContent = currentCastedChart.cucSo;

    // Render stars onto the grid
    renderStarsOnGrid();

    // Generate Battle Verdict & Detailed Interpretations
    generateInterpretations(starWenChangPalace, starShijiPalace, starTaiYiPalace);
}

// Render Star Badges into Grid Cells
function renderStarsOnGrid() {
    // Clear all existing star containers
    document.querySelectorAll(".palace-stars").forEach(container => {
        container.innerHTML = "";
    });

    const stars = currentCastedChart.stars;
    
    // Loop through each star and create badge
    Object.keys(stars).forEach(starKey => {
        const palaceNum = stars[starKey];
        const cell = document.getElementById(`palace-${palaceNum}`);
        if (cell) {
            const container = cell.querySelector(".palace-stars");
            const badge = document.createElement("span");
            badge.className = `star-badge ${starKey}`;
            
            // Short star name for the badge
            let shortName = "";
            switch(starKey) {
                case "thai-at": shortName = "Thái Ất"; break;
                case "van-xuong": shortName = "Văn Xương"; break;
                case "thuy-kich": shortName = "Thủy Kích"; break;
                case "chu-tuong": shortName = "Chủ Tướng"; break;
                case "khach-tuong": shortName = "Khách Tướng"; break;
                case "dinh-xuong": shortName = "Định Xương"; break;
            }
            
            badge.textContent = shortName;
            container.appendChild(badge);
        }
    });
}

// Generate Battle Verdict and Deity Meanings text
function generateInterpretations(wenChangPalace, shijiPalace, taiYiPalace) {
    const verdictTextEl = document.getElementById("verdict-text");
    const analysisContainer = document.getElementById("star-analysis-container");
    const adviceTextEl = document.getElementById("advice-text");

    const chuElement = PALACE_DETAILS[wenChangPalace].element;
    const khachElement = PALACE_DETAILS[shijiPalace].element;

    let verdict = "";
    let verdictClass = "";
    let advice = "";

    // Calculate elements relations
    if (ELEMENT_RELATIONS[chuElement].overcomes === khachElement) {
        verdict = "CHỦ THẮNG (Nội khắc ngoại - Phe Chủ phòng thủ đắc thế)";
        verdictClass = "chu-thang";
        advice = "Thế quẻ chỉ ra rằng năng lượng của phe Chủ (Văn Xương) khắc chế phe Khách (Thủy Kích). Thích hợp nhất cho việc thủ vững thành trì, lập kế hoạch chi tiết từ bên trong, chờ đối phương mệt mỏi tấn công trước rồi mới phản công. Mọi hoạt động xây dựng cơ nghiệp nội bộ hoặc củng cố quốc phòng thời điểm này đều đại cát.";
    } else if (ELEMENT_RELATIONS[khachElement].overcomes === chuElement) {
        verdict = "KHÁCH THẮNG (Ngoại khắc nội - Phe Khách tấn công chiếm thế thượng phong)";
        verdictClass = "khach-thang";
        advice = "Năng lượng của phe Khách (Thủy Kích) đang lấn át phe Chủ (Văn Xương). Thế công của ngoại cảnh hoặc thế lực đối phương rất mạnh. Nếu bạn đóng vai trò là người chủ động tấn công, đi tiên phong, hoặc xuất hành ra ngoài mưu sự thì sẽ cực kỳ thuận lợi. Trái lại, nếu phòng thủ bị động hoặc chần chừ sẽ gánh lấy thất bại.";
    } else if (ELEMENT_RELATIONS[chuElement].generates === khachElement || ELEMENT_RELATIONS[khachElement].generates === chuElement) {
        verdict = "LƯỠNG LỢI / HÒA HỢP (Chủ Khách tương sinh - Giao hòa đàm phán đại cát)";
        verdictClass = "hoa-hop";
        advice = "Ngũ hành cung của Văn Xương và Thủy Kích tương sinh hỗ trợ lẫn nhau. Đây là thời cơ vàng để tiến hành đàm phán, hòa giải mâu thuẫn, ký kết hợp đồng, hoặc liên kết đồng minh. Không nên dùng vũ lực hay đối đầu trực diện, thay vào đó hãy dùng biện pháp ngoại giao mềm dẻo để đôi bên cùng có lợi.";
    } else {
        verdict = "LƯỠNG TRÌ / GIẰNG CO (Đồng khí tương hòa - Thế trận giằng co)";
        verdictClass = "giang-co";
        advice = "Hai bên có cùng thuộc tính ngũ hành, tạo nên thế trận cân bằng kéo dài. Việc hành quân hay quyết định kinh doanh đột ngột vào thời điểm này dễ lâm vào bế tắc, kéo dài hao binh tổn tướng. Hãy giữ thế bình tĩnh, kiên trì tích lũy nội lực, chuẩn bị kỹ càng và chờ thời điểm có sự thay đổi về Tiết khí tốt hơn.";
    }

    // Update UI Verdict
    verdictTextEl.textContent = verdict;
    verdictTextEl.className = `verdict-value ${verdictClass}`;
    adviceTextEl.textContent = advice;

    // Render deity positions details
    analysisContainer.innerHTML = "";
    const stars = currentCastedChart.stars;

    Object.keys(stars).forEach(starKey => {
        const palaceNum = stars[starKey];
        const palaceInfo = PALACE_DETAILS[palaceNum];
        const starTemplate = STAR_INFO[starKey];

        const item = document.createElement("div");
        item.className = `analysis-item star-${starKey}`;
        
        let headerText = `<strong>${starTemplate.name}</strong> (${starTemplate.role}) ngự tại <strong>Cung ${palaceInfo.name} (${palaceNum})</strong>`;
        
        item.innerHTML = `
            <h4>${headerText}</h4>
            <p style="margin-bottom: 0.3rem;"><em>Thuộc tính cung: Ngũ hành ${palaceInfo.elementText}, Phương vị ${palaceInfo.direction}.</em></p>
            <p>${starTemplate.desc}</p>
        `;
        analysisContainer.appendChild(item);
    });
}

// Show detailed information in the Palace Modal on click
function showPalaceModal(palaceNum) {
    const modal = document.getElementById("palace-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalElement = document.getElementById("modal-element");
    const modalDirection = document.getElementById("modal-direction");
    const modalStarsList = document.getElementById("modal-stars-list");
    const modalDesc = document.getElementById("modal-desc");

    const pInfo = PALACE_DETAILS[palaceNum];
    
    modalTitle.textContent = `CUNG ${pInfo.name.toUpperCase()} (${palaceNum})`;
    modalElement.textContent = pInfo.elementText.toUpperCase();
    modalElement.className = pInfo.element;
    modalDirection.textContent = pInfo.direction;
    modalDesc.textContent = pInfo.desc;

    // Get stars in this palace
    modalStarsList.innerHTML = "";
    let hasStars = false;
    
    if (currentCastedChart) {
        const stars = currentCastedChart.stars;
        Object.keys(stars).forEach(starKey => {
            if (stars[starKey] === palaceNum) {
                hasStars = true;
                const starTemplate = STAR_INFO[starKey];
                
                const badge = document.createElement("div");
                badge.className = `star-badge ${starKey}`;
                badge.style.padding = "0.3rem 0.6rem";
                badge.style.fontSize = "0.85rem";
                badge.textContent = starTemplate.name;
                
                modalStarsList.appendChild(badge);
            }
        });
    }

    if (!hasStars) {
        modalStarsList.innerHTML = "<span style='color: var(--text-muted); font-style: italic; font-size: 0.9rem;'>Hiện không có cát hung thần nào ngự trị tại đây.</span>";
    }

    modal.style.display = "flex";
}
