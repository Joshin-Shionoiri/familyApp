async function loadCalendar() {
  const res = await fetch("data/calendar.json");
  const data = await res.json();

  const todayBox = document.getElementById("todayEvents");
  const weekBox = document.getElementById("weekEvents");
  const allBox = document.getElementById("allEvents");

  const today = new Date().toISOString().split("T")[0];

  const todayEvents = data.events.filter(e => e.date === today);
  todayBox.innerHTML = todayEvents.length
    ? todayEvents.map(e => formatEvent(e)).join("")
    : "今日の予定はありません";

  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay() + 1);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const weekEvents = data.events.filter(e => {
    const d = new Date(e.date);
    return d >= weekStart && d <= weekEnd;
  });

  weekBox.innerHTML = weekEvents.length
    ? weekEvents.map(e => formatEvent(e)).join("")
    : "今週の予定はありません";

  allBox.innerHTML = data.events
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(e => formatEvent(e))
    .join("");
}

function formatEvent(e) {
  return `
    <div class="event-item">
      <div>${e.date}</div>
      <div><strong>${e.title}</strong></div>
      <div>${e.detail || ""}</div>
      <a class="btn" href="calendar-edit.html?id=${e.id}">編集</a>
      <button class="btn" onclick="deleteEvent('${e.id}')">削除</button>
    </div>
  `;
}

async function deleteEvent(id) {
  if (!confirm("この予定を削除しますか？")) return;

  const res = await fetch("data/calendar.json");
  const data = await res.json();

  data.events = data.events.filter(e => e.id !== id);

  await updateCalendarOnGitHub(data);

  alert("予定を削除しました");
  location.reload();
}

async function updateCalendarOnGitHub(updatedData) {
  console.log("GitHub更新処理（後で実装）", updatedData);
}

loadCalendar();
