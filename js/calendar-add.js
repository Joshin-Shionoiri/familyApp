async function addEvent() {
  const date = document.getElementById("eventDate").value;
  const title = document.getElementById("eventTitle").value.trim();
  const detail = document.getElementById("eventDetail").value.trim();
  const from = document.getElementById("eventFrom").value;
  const status = document.getElementById("status");

  if (!date || !title) {
    status.textContent = "日付とタイトルは必須です";
    return;
  }

  const newEvent = {
    id: "event-" + Date.now(),
    date,
    title,
    detail,
    from
  };

  const res = await fetch("data/calendar.json");
  const data = await res.json();

  data.events.push(newEvent);

  await updateCalendarOnGitHub(data);

  status.textContent = "予定を追加しました！";
}

async function updateCalendarOnGitHub(updatedData) {
  console.log("GitHub更新処理（後で実装）", updatedData);
}
