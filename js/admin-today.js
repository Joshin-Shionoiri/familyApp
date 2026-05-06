async function setTodayMessage() {
  const text = document.getElementById("todayText").value.trim();
  const status = document.getElementById("status");

  if (!text) {
    status.textContent = "メッセージを入力してください";
    return;
  }

  // 新しい today メッセージ
  const newMessage = {
    id: "msg-" + Date.now(),
    from: "joshin",
    to: "mother",
    text: text,
    today: true
  };

  // 既存メッセージを取得
  const res = await fetch("data/messages.json");
  const data = await res.json();

  // 既存の today:true を全部 false にする
  data.messages.forEach(m => m.today = false);

  // 新しい today メッセージを追加
  data.messages.push(newMessage);

  // GitHub API で更新（後で実装）
  await updateMessagesOnGitHub(data);

  status.textContent = "今日のひとことを設定しました！";
  document.getElementById("todayText").value = "";
}


// GitHub API 書き込み（後で実装）
async function updateMessagesOnGitHub(updatedData) {
  console.log("GitHub更新処理（後で実装）", updatedData);
}
