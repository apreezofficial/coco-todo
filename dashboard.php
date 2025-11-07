<?php
session_start();
if (!isset($_SESSION['user'])) {
  header('Location: auth.php');
  exit;
}
$user = $_SESSION['user'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CocoTodo Dashboard</title>
  <link rel="stylesheet" href="style.css">
  <script src="https://cdn.jsdelivr.net/npm/cocobase/dist/cocobase.min.js"></script>
</head>
<body class="dash-body">
  <header class="dash-header">
    <h2>CocoTodo</h2>
    <div class="right">
      <span class="user">👋 <?php echo htmlspecialchars($user['email']); ?></span>
      <a href="logout.php" class="logout">Logout</a>
    </div>
  </header>

  <main class="dash-main">
    <section class="todo-section">
      <h3>My Todos</h3>
      <div class="input-box">
        <input id="todoInput" type="text" placeholder="What needs to be done?">
        <button id="addBtn">Add</button>
      </div>
      <ul id="todoList"></ul>
    </section>

    <section class="ideas">
      <h3>Ideas for Later</h3>
      <ul>
        <li>💡 Add due dates</li>
        <li>📅 Filter by priority</li>
        <li>🌈 Share todos with friends</li>
      </ul>
    </section>
  </main>

  <footer class="dash-footer">
    <p>Built with 💜 CocoBase & PHP</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
