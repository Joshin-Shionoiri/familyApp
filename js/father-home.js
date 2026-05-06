// 今日の予定
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

// メッセージ（父宛て）
async function loadMessages() {
  const box = document.getElementById("messageList");

  const res = await fetch("data/messages.json");
  const data = await res.json();

  const msgs = data.messages
    .filter(m => m.to === "father" || m.to === "all")
    .slice(-3)
    .reverse();

  if (msgs.length === 0) {
    box.textContent = "メッセージはありません";
    return;
  }

  box.innerHTML = msgs
    .map(m => `<div class="event-item">${m.text}</div>`)
    .join("");
}

loadTodaySchedule();
loadMessages();
