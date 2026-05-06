// 今日のメッセージを読み込む
async function loadTodayMessage() {
  const res = await fetch("data/messages.json");
  const data = await res.json();

  const todayMsg = data.messages.find(m => m.today === true);
  const box = document.getElementById("todayMessage");

  if (todayMsg) {
    box.textContent = todayMsg.text;
  } else {
    box.textContent = "今日のメッセージはありません";
  }
}

loadTodayMessage();


// お母さんがメッセージを送る
async function sendMotherMessage() {
  const text = document.getElementById("motherMessage").value.trim();
  const status = document.getElementById("sendStatus");

  if (!text) {
    status.textContent = "メッセージを入力してください";
    return;
  }

  const newMessage = {
    id: "msg-" + Date.now(),
    from: "mother",
    text: text,
    today: false
  };

  // 既存メッセージを取得
  const res = await fetch("data/messages.json");
  const data = await res.json();

  // 追加
  data.messages.push(newMessage);

  // GitHub API で messages.json を更新（後で実装）
  await updateMessagesOnGitHub(data);

  status.textContent = "送信しました！";
  document.getElementById("motherMessage").value = "";
}


// GitHub API 書き込み（後で実装）
async function updateMessagesOnGitHub(updatedData) {
  console.log("GitHub更新処理（後で実装）", updatedData);
}
