// ログインチェック
const user = localStorage.getItem("loginUser");
if (user !== "mother") {
  location.href = "index.html";
}
// 今日のひとこと
async function loadTodayMessage() {
  const box = document.getElementById("todayMessage");

  const res = await fetch("data/messages.json");
  const data = await res.json();

  const todayMsg = data.messages.find(m => m.today === true);

  if (!todayMsg) {
    box.textContent = "今日のひとことはありません";
    return;
  }

  box.textContent = todayMsg.text;
}


// 今日の予定（今回追加）
async function loadTodaySchedule() {
  const box = document.getElementById("todaySchedule");

  const res = await fetch("data/calendar.json");
  const data = await res.json();

  const today = new Date().toISOString().split("T")[0];

  const todayEvents = data.events.filter(e => e.date === today);

  if (todayEvents.length === 0) {
    box.textContent = "今日の予定はありません";
    return;
  }

  box.innerHTML = todayEvents
    .map(e => `
      <div class="event-item">
        <strong>${e.title}</strong><br>
        <span>${e.detail || ""}</span>
      </div>
    `)
    .join("");
}


// メッセージ一覧（最新3件）
async function loadMessages() {
  const box = document.getElementById("messageList");

  const res = await fetch("data/messages.json");
  const data = await res.json();

  const motherMsgs = data.messages
    .filter(m => m.to === "mother" || m.to === "all")
    .slice(-3)
    .reverse();

  if (motherMsgs.length === 0) {
    box.textContent = "メッセージはありません";
    return;
  }

  box.innerHTML = motherMsgs
    .map(m => `<div class="event-item">${m.text}</div>`)
    .join("");
}


// ページ読み込み時に実行
loadTodayMessage();
loadTodaySchedule();
loadMessages();
