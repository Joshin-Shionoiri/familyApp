let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth(); // 0=1月

function renderCalendar() {
  const monthTitle = document.getElementById("monthTitle");
  const calendarBody = document.getElementById("calendarBody");

  // タイトル更新
  monthTitle.textContent = `${currentYear}年${currentMonth + 1}月`;

  // 月初と月末
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);

  const startWeekDay = firstDay.getDay();
  const totalDays = lastDay.getDate();

  let html = "<tr>";

  // 空白セル（1日の前）
  for (let i = 0; i < startWeekDay; i++) {
    html += "<td></td>";
  }

  // 日付を埋める
  for (let day = 1; day <= totalDays; day++) {
    const weekDay = (startWeekDay + day - 1) % 7;

    html += `<td>${day}</td>`;

    // 土曜で改行
    if (weekDay === 6) {
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

renderCalendar();
