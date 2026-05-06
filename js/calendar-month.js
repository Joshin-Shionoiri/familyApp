let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth(); // 0=1月

let calendarEvents = {}; // 日付ごとの予定数を保存

// 予定データを読み込む
async function loadEvents() {
  const res = await fetch("data/calendar.json");
  const data = await res.json();

  // 日付ごとに予定数をカウント
  calendarEvents = {};
  data.events.forEach(e => {
    if (!calendarEvents[e.date]) {
      calendarEvents[e.date] = 0;
    }
    calendarEvents[e.date]++;
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

    // 予定がある日なら ● をつける
    const hasEvent = calendarEvents[dateStr] ? "●" : "";

    html += `
      <td>
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
