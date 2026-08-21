# 📋 Quiz Builder

A modern, full-stack Quiz Builder application built with **React**, **TypeScript**, **Express**, and **Prisma**.

> 📄 **Technical Specification**: Check out the full [Task Requirements](docs/REQUIREMENTS.md).

---

## 🌟 Overview

A full-stack web platform where users can **create custom quizzes** with various question types, view all available quizzes in an interactive dashboard, and inspect the structure of individual quizzes in detail.

## 🚀 Features

- 📝 **Dynamic Quiz Creation**: Build quizzes on the fly with multiple question types (Boolean, Short Answer, Multiple Choice Checkboxes).
- 📊 **Quiz Dashboard**: Clean, responsive list of all quizzes with question counts and creation timestamps.
- 🔍 **Detailed Structure View**: Dedicated read-only view to inspect questions, options, and correct answers.
- 🗑️ **Quiz Management**: Delete quizzes with automatic cascade deletion of related questions and options.
- 🛡️ **End-to-End Validation**: Strict type safety and validation with Zod on both frontend and backend.

## 🛠️ Tech Stack

### Backend ⚙️

- **Node.js & Express.js**
- **TypeScript**
- **Prisma ORM**
- **SQLite** (`better-sqlite3`)
- **Zod** (Request Validation)

### Frontend 💻

- **React 19 & Vite**
- **TypeScript**
- **Tailwind CSS**
- **React Router DOM**
- **React Hook Form & Zod**
- **Axios & React Hot Toast**

---

## 📁 Project Structure

```text
quiz-builder/
├── backend/               # ⚙️ Express.js REST API
│   ├── prisma/            # Prisma schema and SQLite database
│   └── src/
│       ├── controllers/   # Request handlers
│       ├── lib/           # Prisma client initialization
│       ├── routes/        # Express route definitions
│       ├── services/      # Business logic & database queries
│       └── validators/    # Zod validation schemas
├── frontend/              # 💻 React.js client application
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── pages/         # Page views (List, Detail, Create)
│       ├── services/      # Axios API service
│       ├── types/         # TypeScript interfaces
│       └── validators/    # Client-side form schemas
├── docs/                  # 📄 Project documentation
│   └── REQUIREMENTS.md
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm**

### 1. Backend Setup ⚙️

```bash
cd backend
npm install
npx prisma db push
npm run dev
```

> 🌐 The backend API will be running at `http://localhost:3000`.

### 2. Frontend Setup 💻

In a new terminal window:

```bash
cd frontend
npm install
npm run dev
```

> 🌐 The frontend web app will be running at `http://localhost:5173`.

---

## 🎯 Creating a Sample Quiz

### Option 1: Via the Web UI (Recommended) ✨

1. Open `http://localhost:5173` in your browser.
2. Click **Create Quiz** in the top navigation bar.
3. Enter a quiz title (e.g. _"World Geography & Capitals"_).
4. Add your questions using the interactive question builder:
   - **True / False**: Select the correct boolean answer.
   - **Short Answer**: Provide the question text and expected answer.
   - **Multiple Choice**: Add multiple options and check the boxes for correct ones.
5. Click **Save Quiz** to create your quiz!

### Option 2: Via Prisma Studio (Database GUI) 🗄️

```bash
cd backend
npx prisma studio
```

> 🌐 Launches a visual database manager at `http://localhost:5555` to view and edit database tables directly.

---

## 📜 Available Scripts

### Backend

- `npm run dev` — Start development server with auto-reload
- `npm run lint` — Run ESLint checks
- `npm run format` — Format code with Prettier

### Frontend

- `npm run dev` — Start Vite development server
- `npm run build` — Type-check and build for production
- `npm run lint` — Run ESLint checks
- `npm run format` — Format code with Prettier
