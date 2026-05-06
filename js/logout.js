function logout() {
  // ログイン情報を削除
  localStorage.removeItem("loginUser");

  // ログイン画面へ戻る
  location.href = "index.html";
}
