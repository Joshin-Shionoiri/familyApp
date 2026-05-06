const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");

let calendarData;
let targetEvent;

async function loadEvent() {
  const res = await fetch("data/calendar.json");
  calendarData = await res.json();

  targetEvent = calendarData.events.find(e => e.id === eventId);

  if (!targetEvent) {
    document.getElementById("status").textContent = "予定が見つかりません";
    return;
  }

  document.getElementById("eventDate").value = targetEvent.date;
  document.getElementById("eventTitle").value = targetEvent.title;
  document.getElementById("eventDetail").value = targetEvent.detail || "";
}

loadEvent();

async function saveEvent() {
  const status = document.getElementById("status");

  targetEvent.date = document.getElementById("eventDate").value;
  targetEvent.title = document.getElementById("eventTitle").value.trim();
  targetEvent.detail = document.getElementById("eventDetail").value.trim();

  if (!targetEvent.date || !targetEvent.title) {
    status.textContent = "日付とタイトルは必須です";
    return;
  }

  await updateCalendarOnGitHub(calendarData);

  status.textContent = "予定を更新しました！";
}

async function updateCalendarOnGitHub(updatedData) {
  console.log("GitHub更新処理（後で実装）", updatedData);
}
