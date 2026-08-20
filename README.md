<h1 align="center">
  🎯 The Quiz Builder
</h1>
<p align="center">
  <i>Full-Stack JS Engineer Test Assessment</i>
</p>

---

## 📖 Overview
This project is a modern, full-stack quiz creation platform where users can **create custom quizzes** with various types of questions, view all available quizzes in a dashboard, and explore details of individual quizzes.

## ✨ Features
- 📝 **Quiz Creation**: Build quizzes dynamically with multiple question types (Boolean, Input, Checkbox).
- 📊 **Dashboard**: View a clean list of all available quizzes with their titles and total number of questions.
- 🔍 **Quiz Details**: Explore each quiz on a dedicated read-only page.
- 🗑️ **Management**: Delete quizzes directly from the dashboard with ease.

## 💻 Tech Stack

### Backend ⚙️
- **Node.js & Express.js**
- **TypeScript**
- **Prisma ORM**
- **SQLite**

### Frontend 🎨
- **React.js (Vite)**
- **TypeScript**
- **Tailwind CSS** (v3)
- **React Router DOM**
- **React Hook Form & Zod**

## 📂 Project Structure
```text
quiz-builder/
├── backend/         # ⚙️ Express.js REST API
│   ├── src/         # Controllers, services, routes
│   └── prisma/      # Prisma schema and SQLite database
├── frontend/        # 🎨 React.js application
│   ├── src/         
│   │   ├── pages/      # Page components (Create, List, Detail)
│   │   ├── components/ # Reusable UI components
│   │   └── services/   # API call wrappers
│   └── public/      
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- **Node.js** (v18 or higher)
- **npm**

### 1. Set up Database (Backend)
Navigate to the `backend` directory, install dependencies, and initialize the SQLite database:
```bash
cd backend
npm install
npx prisma db push
```
> 💡 **Note**: Prisma will automatically create a local `dev.db` file based on the schema.

### 2. Start the Servers

**Start the Backend Server:**
```bash
cd backend
npm run dev
```
> The API will be available at `http://localhost:3000`

**Start the Frontend Application:**
In a **new terminal window**, run:
```bash
cd frontend
npm install
npm run dev
```
> The React application will be available at `http://localhost:5173`

---

## 🧪 How to Create a Sample Quiz
You can create a sample quiz in two ways:

### Option A: Through the UI (Recommended)
1. Open the frontend application in your browser.
2. Navigate to the **Create Quiz** page.
3. Fill in the quiz title, add your questions dynamically, and click submit.

### Option B: Through the Database (Prisma Studio)
If you want to seed data manually without the UI, you can use Prisma Studio (a visual database editor):
```bash
cd backend
npx prisma studio
```
This opens a web interface where you can manually add records to the `Quiz` and `Question` tables.
