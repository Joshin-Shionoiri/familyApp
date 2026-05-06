// 発行済み券を読み込む
async function loadTickets() {
  const list = document.getElementById("ticketList");

  const res = await fetch("data/tickets.json");
  const data = await res.json();

  list.innerHTML = "";

  data.tickets.forEach(ticket => {
    const div = document.createElement("div");
    div.className = "ticket-item";

    div.innerHTML = `
      <strong>${ticket.id}</strong><br>
      発行日: ${ticket.createdAt}<br>
      状態: ${ticket.used ? "<span class='used'>使用済み</span>" : "未使用"}
    `;

    list.appendChild(div);
  });
}

loadTickets();


// 新しい券を発行する
async function createTicket() {
  const status = document.getElementById("createStatus");

  // 新しい券IDを生成
  const newId = "TICKET-" + new Date().getFullYear() + "-" + Date.now();

  const newTicket = {
    id: newId,
    used: false,
    createdAt: new Date().toISOString(),
    usedAt: null,
    from: "joshin"
  };

  // 既存データを取得
  const res = await fetch("data/tickets.json");
  const data = await res.json();

  // 追加
  data.tickets.push(newTicket);

  // GitHub API で tickets.json を更新（後で実装）
  await updateTicketsOnGitHub(data);

  status.textContent = "券を発行しました: " + newId;

  // 再読み込み
  loadTickets();
}


// GitHub API 書き込み（後で実装）
async function updateTicketsOnGitHub(updatedData) {
  console.log("GitHub更新処理（後で実装）", updatedData);
}
