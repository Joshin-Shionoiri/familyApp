const resultBox = document.getElementById("result");

// QR読み取り開始
new QRScanner(document.getElementById("preview"), async (ticketId) => {
  resultBox.textContent = "読み取り中…";

  const res = await fetch("data/tickets.json");
  const data = await res.json();

  const ticket = data.tickets.find(t => t.id === ticketId);

  if (!ticket) {
    resultBox.textContent = "この券は存在しません";
    return;
  }

  if (ticket.used) {
    resultBox.textContent = "この券はすでに使用済みです";
    return;
  }

  // 使用済みに変更
  ticket.used = true;
  ticket.usedAt = new Date().toISOString();

  // GitHub API で更新（後で実装）
  await updateTicketsOnGitHub(data);

  resultBox.textContent = "使用済みにしました！";
});


// GitHub API 書き込み（後で実装）
async function updateTicketsOnGitHub(updatedData) {
  console.log("GitHub更新処理（後で実装）", updatedData);
}
