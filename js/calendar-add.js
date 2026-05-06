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
    date: date,
    title: title,
    detail: detail,
    from: from
  };

  // 既存データ取得
  const res = await fetch("data/calendar.json");
  const data = await res.json();

  // 新しい予定を追加
  data.events.push(newEvent);

  // GitHub API で保存（後で実装）
  await updateCalendarOnGitHub(data);

  status.textContent = "予定を追加しました！";

  // 入力欄リセット
  document.getElementById("eventTitle").value = "";
  document.getElementById("eventDetail").value = "";
}


// GitHub API 書き込み（後で実装）
async function updateCalendarOnGitHub(updatedData) {
  console.log("GitHub更新処理（後で実装）", updatedData);
}
