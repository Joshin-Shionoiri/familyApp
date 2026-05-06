async function loadTodayMessage() {
  const res = await fetch("data/messages.json");
  const data = await res.json();

  // "today": true のメッセージを探す
  const todayMsg = data.messages.find(m => m.today === true);

  const box = document.getElementById("todayMessage");

  if (todayMsg) {
    box.textContent = todayMsg.text;
  } else {
    box.textContent = "今日のメッセージはありません";
  }
}

loadTodayMessage();
