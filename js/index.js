function login() {
  const user = document.getElementById("userSelect").value;

  // ログインユーザーを保存
  localStorage.setItem("loginUser", user);

  // ユーザーごとのホームに移動
  switch (user) {
    case "mother":
      location.href = "mother-home.html";
      break;
    case "father":
      location.href = "father-home.html";
      break;
    case "sister":
      location.href = "sister-home.html";
      break;
    case "joshin":
      location.href = "admin-home.html";
      break;
  }
}
