# 📝 Full-Stack RESTful To-Do Application

A modern, responsive full-stack To-Do application built with vanilla JavaScript, Express.js, and Node.js. The application features complete asynchronous CRUD functionality, live state persistence, light/dark theme toggling, and interactive filtering.

🚀 **Live Demo:** [https://todo-app-main-fh2d.onrender.com](https://todo-app-main-fh2d.onrender.com)

---

## ✨ Key Features

- **Full-Stack Persistence**: Asynchronous network pipeline keeping client UI synchronized with the server.
- **Complete CRUD Capabilities**: Create, Read, Update (completion toggle), and Delete tasks via REST API endpoints.
- **Optimistic UI Updates**: Instant client-side DOM rendering backed by asynchronous backend fetches.
- **Dynamic Filtering**: Filter tasks by status (`All`, `Active`, `Completed`).
- **Theme Switching**: Toggle between dark and light UI themes with persistent preference styling.
- **Production-Ready Deployment**: Configured with CORS middleware and relative API routing for cloud deployment on Render.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 (Custom CSS Variables & Flexbox), Vanilla JavaScript (ES6+ / Async Fetch API)
- **Backend**: Node.js, Express.js
- **Middleware**: CORS, Express JSON parser, Static File Middleware
- **Deployment & Hosting**: Render, Git, GitHub

---

## 📡 REST API Documentation

The backend exposes standard RESTful endpoints serving and receiving JSON payloads:

| Method   | Endpoint         | Description                                                    |
| :------- | :--------------- | :------------------------------------------------------------- |
| `GET`    | `/api/todos`     | Retrieves all stored tasks from the server                     |
| `POST`   | `/api/todos`     | Adds a new task package to the server storehouse               |
| `PATCH`  | `/api/todos/:id` | Toggles the completion status (`completed`) of a specific task |
| `DELETE` | `/api/todos/:id` | Removes a specific task from the server by ID                  |

---

## 💻 Local Development Setup

To run this project locally on your machine:

1. **Clone the repository**:
   ```bash
   git clone [https://github.com/AbdulroqeebIb/todo-app-main.git](https://github.com/AbdulroqeebIb/todo-app-main.git)
   cd todo-app-main
   ```
