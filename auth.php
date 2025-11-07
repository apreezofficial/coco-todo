<?php
session_start();

// If already logged in
if (isset($_SESSION['user'])) {
  header('Location: dashboard.php');
  exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CocoTodo — Auth</title>
  <link rel="stylesheet" href="style.css">
  <script src="https://cdn.jsdelivr.net/npm/cocobase/dist/cocobase.min.js"></script>
</head>
<body class="auth-body">
  <div class="auth-card">
    <h1 class="title">🪄 CocoTodo</h1>
    <p class="subtitle">Welcome! Sign up or log in to continue</p>

    <div class="tabs">
      <button id="loginTab" class="active">Login</button>
      <button id="signupTab">Sign Up</button>
    </div>

    <div id="formContainer">
      <input type="email" id="email" placeholder="Email">
      <input type="password" id="password" placeholder="Password">
      <button id="authBtn">Login</button>
    </div>

    <p id="msg" class="msg"></p>
  </div>

  <script src="script.js"></script>
</body>
</html>
