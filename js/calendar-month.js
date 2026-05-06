let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

let calendarEvents = {}; // 日付ごとの予定リストを保存

// 予定データを読み込む
async function loadEvents() {
  const res = await fetch("data/calendar.json");
  const data = await res.json();

  // 日付ごとに予定をまとめる
  calendarEvents = {};
  data.events.forEach(e => {
    if (!calendarEvents[e.date]) {
      calendarEvents[e.date] = [];
    }
    calendarEvents[e.date].push(e);
  });

  renderCalendar();
}

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

    const hasEvent = calendarEvents[dateStr] ? "●" : "";

    html += `
      <td onclick="showEvents('${dateStr}')" style="cursor:pointer;">
        ${day}
        <div style="color:#4CAF50; font-size:18px; margin-top:4px;">
          ${hasEvent}
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

// 日付クリックで予定を表示
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
      <div style="padding:10px; border-bottom:1px solid #ddd;">
        <strong>${e.title}</strong><br>
        <span>${e.detail || ""}</span>
      </div>
    `)
    .join("");
}

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
