async function login() {
  const inputKey = document.getElementById("keyInput").value.trim();
  const errorBox = document.getElementById("error");

  // users.json を読み込む
  const res = await fetch("data/users.json");
  const data = await res.json();

  // 入力キーと一致するユーザーを探す
  const user = data.users.find(u => u.key === inputKey);

  if (!user) {
    errorBox.style.display = "block";
    return;
  }

  // ロールに応じてページを切り替え
  switch (user.role) {
    case "mother":
      window.location.href = "mother-home.html";
      break;
    case "admin":
      window.location.href = "admin-home.html";
      break;
    case "sister":
      window.location.href = "sister-home.html";
      break;
    case "father":
      window.location.href = "father-home.html";
      break;
    default:
      errorBox.style.display = "block";
  }
}
