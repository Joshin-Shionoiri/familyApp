async function loadCalendar() {
  const res = await fetch("data/calendar.json");
  const data = await res.json();

  const todayBox = document.getElementById("todayEvents");
  const weekBox = document.getElementById("weekEvents");
  const allBox = document.getElementById("allEvents");

  const today = new Date().toISOString().split("T")[0];

  // 今日の予定
  const todayEvents = data.events.filter(e => e.date === today);

  if (todayEvents.length === 0) {
    todayBox.textContent = "今日の予定はありません";
  } else {
    todayBox.innerHTML = todayEvents.map(e => formatEvent(e)).join("");
  }

  // 今週の予定
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay() + 1); // 月曜

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6); // 日曜

  const weekEvents = data.events.filter(e => {
    const d = new Date(e.date);
    return d >= weekStart && d <= weekEnd;
  });

  if (weekEvents.length === 0) {
    weekBox.textContent = "今週の予定はありません";
  } else {
    weekBox.innerHTML = weekEvents.map(e => formatEvent(e)).join("");
  }

  // 全ての予定
  allBox.innerHTML = data.events
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(e => formatEvent(e))
    .join("");
}


// 予定の表示テンプレート（編集ボタン付き）
function formatEvent(e) {
  return `
    <div class="event-item">
      <div class="date">${e.date}</div>
      <div class="title">${e.title}</div>
      <div class="from">登録者: ${convertName(e.from)}</div>
      <div class="detail">${e.detail || ""}</div>
      <a class="btn" href="calendar-edit.html?id=${e.id}">編集</a>
    </div>
  `;
}

// 名前変換
function convertName(name) {
  switch (name) {
    case "mother": return "お母さん";
    case "father": return "お父さん";
    case "sister": return "妹";
    case "joshin": return "JOSHIN";
    default: return name;
  }
}

loadCalendar();
