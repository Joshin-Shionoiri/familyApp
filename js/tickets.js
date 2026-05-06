async function loadTicket() {
  const res = await fetch("data/tickets.json");
  const data = await res.json();

  // 未使用の券を探す
  const unused = data.tickets.find(t => t.used === false);

  const info = document.getElementById("ticketInfo");

  if (!unused) {
    info.textContent = "未使用のマッサージ券がありません";
    return;
  }

  info.textContent = "券ID: " + unused.id;

  // QRコード生成
  const qr = new QRCode(document.getElementById("qrcode"), {
    text: unused.id,
    width: 200,
    height: 200
  });
}

loadTicket();
