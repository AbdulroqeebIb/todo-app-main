// --- SELECTORS ---
const todoInput = document.querySelector(".input-container input");
const todoList = document.querySelector("#todo-list");
const itemsCounter = document.querySelector("#items-left");
const clearBtn = document.querySelector("#clear-completed");
const themeToggle = document.querySelector("#theme-toggle");
const filterButtons = document.querySelectorAll(".filter-btn");

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

function addTodo(text) {
  const li = document.createElement("li");
  li.className = "todo-item";
  li.setAttribute("data-status", "active");

  li.innerHTML = `
    <div class="todo-content">
      <div class="circle"></div>
      <p>${text}</p>
    </div>
    <img src="./images/icon-cross.svg" class="cross-icon" alt="Delete">
  `;

  // Delete specific item
  const cross = li.querySelector(".cross-icon");
  cross.addEventListener("click", () => {
    li.remove();
    updateCounter();
  });

  // Toggle Completion
  const circle = li.querySelector(".circle");
  const todoText = li.querySelector("p");

  const toggleComplete = () => {
    li.classList.toggle("completed");
    const isCompleted = li.classList.contains("completed");
    li.setAttribute("data-status", isCompleted ? "completed" : "active");
    updateCounter();
  };

  circle.addEventListener("click", toggleComplete);
  todoText.addEventListener("click", toggleComplete);

  todoList.appendChild(li);
  updateCounter();
}

// --- EVENT LISTENERS ---

// Input listener (Enter key)
todoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const taskText = todoInput.value.trim();

    if (taskText !== "") {
      // 1. Draw it on the frontend browser screen instantly (your original logic)
      addTodo(taskText);

      // =========================================================================
      // 🚢 NEW FULL-STACK DATA PIPELINE CODE
      // =========================================================================
      const taskPackage = {
        text: taskText,
        completed: false,
      };

      // Ship the package across the local network to our Node server route
      fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskPackage),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("📬 Server confirmation packet received back:", data);
        })
        .catch((error) => {
          console.error("❌ Network pipeline error:", error);
        });
      // =========================================================================

      // Clear the input field
      todoInput.value = "";
    }
  }
});

// Clear Completed listener
clearBtn.addEventListener("click", () => {
  const completedItems = todoList.querySelectorAll(".completed");
  completedItems.forEach((item) => item.remove());
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

// --- INITIAL TASKS ---
// (Commented out for now so you can clearly see your custom live database entries!)
// addTodo("Complete online JavaScript course");
// addTodo("Jog around the park 3x");
// addTodo("Read for 1 hour");
