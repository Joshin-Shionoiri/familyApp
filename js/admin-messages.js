async function sendAdminMessage() {
  const text = document.getElementById("messageText").value.trim();
  const target = document.getElementById("target").value;
  const status = document.getElementById("status");

  if (!text) {
    status.textContent = "メッセージを入力してください";
    return;
  }

  // メッセージデータ作成
  const newMessage = {
    id: "msg-" + Date.now(),
    from: "joshin",
    to: target,
    text: text,
    today: false
  };

  // 既存メッセージを取得
  const res = await fetch("data/messages.json");
  const data = await res.json();

  // 追加
  data.messages.push(newMessage);

  // GitHub API で更新（後で実装）
  await updateMessagesOnGitHub(data);

  status.textContent = "メッセージを送信しました！";
  document.getElementById("messageText").value = "";
}


// GitHub API 書き込み（後で実装）
async function updateMessagesOnGitHub(updatedData) {
  console.log("GitHub更新処理（後で実装）", updatedData);
}
