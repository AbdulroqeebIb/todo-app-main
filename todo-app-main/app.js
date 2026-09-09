// --- SELECTORS ---
const todoInput = document.querySelector(".input-container input");
const todoList = document.querySelector("#todo-list");
const itemsCounter = document.querySelector("#items-left");
const clearBtn = document.querySelector("#clear-completed");
const themeToggle = document.querySelector("#theme-toggle");
const filterButtons = document.querySelectorAll(".filter-btn");

// ✅ CHANGED: Uses relative URL so it works seamlessly locally and on Render
const API_BASE_URL = "/api/todos";

// --- THEME LOGIC ---
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.hasAttribute("data-theme");

    if (isLight) {
      document.body.removeAttribute("data-theme");
      themeToggle.src = "./images/icon-sun.svg";
    } else {
      document.body.setAttribute("data-theme", "light");
      themeToggle.src = "./images/icon-moon.svg";
    }
  });
}

// --- CORE FUNCTIONS ---
function updateCounter() {
  const activeItems = todoList.querySelectorAll("li:not(.completed)").length;
  const itemText = activeItems === 1 ? "item" : "items";
  itemsCounter.innerHTML = `${activeItems} ${itemText} left`;
}

// 📥 FETCH ALL TASKS FROM BACKEND ON PAGE LOAD
async function loadTodosFromBackend() {
  try {
    const response = await fetch(API_BASE_URL);
    const todos = await response.json();

    // Clear list before rendering fetched items
    todoList.innerHTML = "";

    todos.forEach((todo) => {
      renderTodoItem(todo);
    });

    updateCounter();
  } catch (error) {
    console.error("❌ Failed to load tasks from server:", error);
  }
}

// 🎨 RENDER SINGLE TODO ELEMENT WITH API BINDINGS
function renderTodoItem(todo) {
  const li = document.createElement("li");
  li.className = `todo-item ${todo.completed ? "completed" : ""}`;
  li.setAttribute("data-status", todo.completed ? "completed" : "active");
  li.setAttribute("data-id", todo.id);

  li.innerHTML = `
    <div class="todo-content">
      <div class="circle"></div>
      <p>${todo.text}</p>
    </div>
    <img src="./images/icon-cross.svg" class="cross-icon" alt="Delete">
  `;

  // 🗑️ Delete specific item (Local UI + Server DELETE call)
  const cross = li.querySelector(".cross-icon");
  cross.addEventListener("click", () => {
    li.remove();
    updateCounter();

    fetch(`${API_BASE_URL}/${todo.id}`, { method: "DELETE" }).catch((error) =>
      console.error("❌ Server delete error:", error),
    );
  });

  // 🔄 Toggle Completion (Local UI + Server PATCH call)
  const circle = li.querySelector(".circle");
  const todoText = li.querySelector("p");

  const toggleComplete = () => {
    li.classList.toggle("completed");
    const isCompleted = li.classList.contains("completed");
    li.setAttribute("data-status", isCompleted ? "completed" : "active");
    updateCounter();

    fetch(`${API_BASE_URL}/${todo.id}`, { method: "PATCH" }).catch((error) =>
      console.error("❌ Server status update error:", error),
    );
  };

  circle.addEventListener("click", toggleComplete);
  todoText.addEventListener("click", toggleComplete);

  todoList.appendChild(li);
}

// --- EVENT LISTENERS ---

// Input listener (Enter key)
todoInput.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    const taskText = todoInput.value.trim();

    if (taskText !== "") {
      const taskPackage = {
        id: Date.now().toString(), // Generate temporary unique ID
        text: taskText,
        completed: false,
      };

      // 1. Render immediately for speed
      renderTodoItem(taskPackage);
      updateCounter();
      todoInput.value = "";

      // 2. Persist to Express/Render Backend
      try {
        await fetch(API_BASE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskPackage),
        });
      } catch (error) {
        console.error("❌ Network pipeline error:", error);
      }
    }
  }
});

// Clear Completed listener
clearBtn.addEventListener("click", () => {
  const completedItems = todoList.querySelectorAll(".completed");
  completedItems.forEach((item) => {
    const id = item.getAttribute("data-id");
    item.remove();

    if (id) {
      fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" }).catch((err) =>
        console.error("❌ Delete error:", err),
      );
    }
  });
  updateCounter();
});

// Filtering Logic
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");
    const allItems = todoList.querySelectorAll(".todo-item");

    allItems.forEach((item) => {
      const status = item.getAttribute("data-status");
      if (filterValue === "all" || filterValue === status) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// --- INITIALIZE FROM SERVER ON LOAD ---
loadTodosFromBackend();
