// Initialize CocoBase
const coco = new CocoBase("YOUR_PROJECT_ID", "YOUR_API_KEY");

const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const authBtn = document.getElementById("authBtn");
const msg = document.getElementById("msg");
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

let mode = "login";

// Switch tabs
if (loginTab && signupTab) {
  loginTab.onclick = () => setMode("login");
  signupTab.onclick = () => setMode("signup");
}

function setMode(newMode) {
  mode = newMode;
  if (loginTab && signupTab) {
    loginTab.classList.toggle("active", mode === "login");
    signupTab.classList.toggle("active", mode === "signup");
  }
  if (authBtn) authBtn.textContent = mode === "login" ? "Login" : "Sign Up";
}

if (authBtn) {
  authBtn.onclick = async () => {
    const email = emailInput.value.trim();
    const password = passInput.value.trim();

    if (!email || !password) {
      msg.textContent = "Fill all fields";
      return;
    }

    try {
      if (mode === "signup") {
        await coco.auth().signup(email, password);
        msg.textContent = "Signup successful! You can now log in.";
        setMode("login");
      } else {
        const user = await coco.auth().login(email, password);

        // Save to PHP session
        fetch("session.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user)
        }).then(() => window.location = "dashboard.php");
      }
    } catch (err) {
      msg.textContent = "❌ " + err.message;
    }
  };
}

// Dashboard todo logic
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

if (addBtn) {
  loadTodos();

  addBtn.onclick = async () => {
    const text = todoInput.value.trim();
    if (!text) return alert("Please enter something!");

    const todo = await coco.collection("todos").add({
      text,
      done: false,
      created_at: new Date().toISOString(),
    });
    addToList(todo);
    todoInput.value = "";
  };
}

async function loadTodos() {
  const todos = await coco.collection("todos").get();
  todos.forEach(addToList);
}

function addToList(todo) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span class="${todo.done ? 'done' : ''}">${todo.text}</span>
    <button class="del">×</button>
  `;
  li.querySelector("span").onclick = async () => {
    const newStatus = !todo.done;
    await coco.collection("todos").update(todo.id, { done: newStatus });
    li.querySelector("span").classList.toggle("done");
  };
  li.querySelector(".del").onclick = async () => {
    await coco.collection("todos").delete(todo.id);
    li.remove();
  };
  todoList.appendChild(li);
}
