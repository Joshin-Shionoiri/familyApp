let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth(); // 0=1月

// 日付ごとの予定リスト
let calendarEvents = {};

// 色分け
function getColorByFrom(from) {
  switch (from) {
    case "mother": return "#FF8A80"; // ピンク
    case "father": return "#80D8FF"; // 青
    case "sister": return "#FFD180"; // オレンジ
    case "joshin": return "#A5D6A7"; // 緑
    default: return "#CCCCCC";
  }
}

// ●（色つき）を作る
function createDots(events) {
  return events
    .map(e => `
      <span style="
        display:inline-block;
        width:10px;
        height:10px;
        background:${getColorByFrom(e.from)};
        border-radius:50%;
        margin:0 2px;
      "></span>
    `)
    .join("");
}

// 予定データを読み込む
async function loadEvents() {
  const res = await fetch("data/calendar.json");
  const data = await res.json();

  // 日付ごとにまとめる
  calendarEvents = {};
  data.events.forEach(e => {
    if (!calendarEvents[e.date]) {
      calendarEvents[e.date] = [];
    }
    calendarEvents[e.date].push(e);
  });

  renderCalendar();
}

// カレンダーを描画
function renderCalendar() {
  const monthTitle = document.getElementById("monthTitle");
  const calendarBody = document.getElementById("calendarBody");

  monthTitle.textContent = `${currentYear}年${currentMonth + 1}月`;

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);

  const startWeekDay = firstDay.getDay();
  const totalDays = lastDay.getDate();

  let html = "<tr>";

  // 空白セル
  for (let i = 0; i < startWeekDay; i++) {
    html += "<td></td>";
  }

  // 日付を埋める
  for (let day = 1; day <= totalDays; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const events = calendarEvents[dateStr] || [];
    const dots = events.length > 0 ? createDots(events) : "";

    html += `
      <td onclick="showEvents('${dateStr}')" style="cursor:pointer;">
        ${day}
        <div style="margin-top:4px;">
          ${dots}
        </div>
      </td>
    `;

    if ((startWeekDay + day - 1) % 7 === 6) {
      html += "</tr><tr>";
    }
  }

  html += "</tr>";

  calendarBody.innerHTML = html;
}

// 日付クリックで予定表示
function showEvents(dateStr) {
  const title = document.getElementById("selectedDateTitle");
  const box = document.getElementById("selectedDateEvents");

  title.textContent = `${dateStr} の予定`;

  const events = calendarEvents[dateStr];

  if (!events || events.length === 0) {
    box.innerHTML = "予定はありません";
    return;
  }

  box.innerHTML = events
    .map(e => `
      <div style="
        padding:10px;
        border-left:8px solid ${getColorByFrom(e.from)};
        background:white;
        margin-bottom:10px;
        border-radius:6px;
      ">
        <strong>${e.title}</strong><br>
        <span>${e.detail || ""}</span>
      </div>
    `)
    .join("");
}

// 月移動
function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
}

loadEvents();
