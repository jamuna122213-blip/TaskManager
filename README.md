# ✅ TaskManager
Organize Tasks. Stay Productive.

TaskManager is a full-stack task management web application built to make managing daily tasks simple and organized. Users can create tasks, set due dates, update task details, track completion, and manage their work in one place.

Built with React, Tailwind CSS, Node.js, Express, and MongoDB, TaskManager combines a clean dashboard interface with a full-stack architecture.

🌐 **Live Website:** [TaskManager](#)

📦 **GitHub Repository:** [TaskManager on GitHub](#)

---

## 📸 Screenshots

### 🏠 Dashboard
TaskManager Dashboard

![TaskManager Dashboard](./docs/screenshots/dashboard.png)

### 🔐 Login Page
TaskManager Login Page

![TaskManager Login](./docs/screenshots/login.png)

### 📝 Register Page
TaskManager Register Page

![TaskManager Register](./docs/screenshots/register.png)

### ➕ Create Task
TaskManager Create Task

![TaskManager Create Task](./docs/screenshots/create-task.png)

### ✏️ Update Task
TaskManager Update Task

![TaskManager Update Task](./docs/screenshots/update-task.png)

---

## ✨ Features

✅ **Task Management** — Create, view, update, and delete tasks.

🔍 **Task Search** — Find tasks using their titles.

🗂️ **Task Filtering** — Filter tasks by completion status.

↕️ **Task Sorting** — Organize tasks based on selected sorting options.

📅 **Due Dates** — Set deadlines for tasks.

✔️ **Completion Tracking** — Mark tasks as completed or pending.

🔐 **User Authentication** — Register and log in securely.

🍪 **Cookie-Based Authentication** — JWT authentication using HTTP-only cookies.

👤 **Personal Tasks** — Each user can manage their own tasks.

📱 **Responsive UI** — Designed for comfortable use across different screen sizes.

---

## 🛠️ Tech Stack

### Frontend

- **React** — Component-based user interface.
- **Vite** — Development server and build tool.
- **Tailwind CSS** — Utility-first styling.
- **Axios** — HTTP requests to the backend.

### Backend

- **Node.js** — JavaScript runtime.
- **Express.js** — Backend API and routing.
- **MongoDB** — NoSQL database.
- **Mongoose** — MongoDB object modeling.
- **JWT** — Authentication.
- **bcrypt** — Password hashing.
- **cookie-parser** — Cookie handling.

### Tools and Deployment

- **Git & GitHub** — Version control and source code hosting.
- **Vercel** — Frontend and backend deployment.
- **MongoDB Atlas** — Cloud database hosting.

---

## 📁 Project Structure

```text
TaskManager/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── CreateTask.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .gitignore
│   ├── server.js
│   └── package.json
│
├── docs/
│   └── screenshots/
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Install the following tools:

- Node.js
- npm
- Git
- MongoDB locally or a MongoDB Atlas account

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd TaskManager
```

### 2. Set Up the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Replace the placeholders with your own MongoDB connection string and JWT secret.

Start the backend:

```bash
npm run dev
```

The local backend is expected to run at:

```text
http://localhost:5000
```

### 3. Set Up the Frontend

Open a second terminal at the project root:

```bash
cd client
npm install
npm run dev
```

Open the local URL displayed by Vite, usually:

```text
http://localhost:5173
```

### 4. Verify the Application

- Confirm the frontend loads.
- Confirm the backend starts successfully.
- Confirm the MongoDB connection works.
- Register a new account and log in.
- Create a task and verify it appears in the dashboard.
- Update and delete a task.
- Test task completion, search, filtering, and sorting.

**Security:** Never commit your `.env` file or expose database credentials in your repository.

---

## 🌐 Deployment

TaskManager is intended to be deployed using Vercel and MongoDB Atlas.

### Frontend

The TaskManager frontend is deployed on Vercel.

🔗 **Live Website:** [Add your frontend Vercel URL here](#)

### Backend

The Express backend is deployed separately.

🔗 **Backend URL:** [Add your backend Vercel URL here](#)

### Database

MongoDB Atlas is used to host the cloud database. The backend connects to Atlas through the `MONGO_URI` environment variable.

Production deployments require the correct environment variables, database credentials, API configuration, and CORS settings.

---

## 💡 My Deployment Journey

Deploying TaskManager is an important part of my full-stack development learning journey.

The application works locally, but deploying it introduces new challenges. The frontend, backend, and database need to communicate correctly in a production environment.

Some of the challenges I am working through include:

- Deploying the frontend and backend separately.
- Configuring environment variables for production.
- Connecting the Express backend to MongoDB Atlas.
- Configuring authentication cookies for production.
- Setting up the correct frontend API URL.
- Configuring CORS between the frontend and backend.
- Troubleshooting deployment errors through Vercel logs.
- Testing task operations after deployment.

This process helps me understand that building an application is only one part of full-stack development. Deploying it, debugging production issues, and connecting different services are equally important skills.

The biggest lesson: Errors are part of development. Reading logs, understanding the root cause, and fixing problems step by step are important parts of learning.

---

## 🧠 What I Learned

Through TaskManager, I am learning and practicing:

- Building reusable components with React.
- Managing application state in React.
- Creating REST APIs with Express.js.
- Connecting MongoDB with Mongoose.
- Implementing authentication with JWT and HTTP-only cookies.
- Handling CRUD operations.
- Implementing search, filtering, and sorting.
- Connecting the frontend with the backend using Axios.
- Using Git and GitHub for version control.
- Deploying applications using Vercel.
- Connecting a backend to a cloud database with MongoDB Atlas.
- Debugging deployment and configuration errors.

---

## 🔮 Future Improvements

- Add task priority levels.
- Add task categories.
- Improve dashboard analytics.
- Add pagination for task lists.
- Add notifications for upcoming deadlines.
- Improve task organization and filtering.
- Add loading states and better error handling.
- Improve accessibility and mobile responsiveness.
- Add automated tests and performance optimizations.

---

## 🤝 Contributing

Suggestions and improvements are welcome.

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Open a pull request.

---

## 👨‍💻 Author

**Sri Sabari**

GitHub: [Your GitHub Profile](#)

Project: TaskManager Repository

Live Website: TaskManager

---

## 📄 License

This is currently a personal learning project. A formal open-source license can be added when the project is ready for public distribution.

Made with ❤️, persistence, and code.

**TaskManager — Stay organized. Keep moving forward!**
