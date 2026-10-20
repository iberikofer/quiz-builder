# 📋 Quiz Builder

A modern, full-stack Quiz Builder application built with **React**, **TypeScript**, **Express**, **Prisma**, and **PostgreSQL**.

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
- ☁️ **Production-Ready**: Configured for seamless deployment on **Vercel** (frontend), **Render** (backend), and **Neon / Render** (PostgreSQL).

## 🛠️ Tech Stack

### Backend ⚙️

- **Node.js & Express.js**
- **TypeScript**
- **Prisma ORM (v7)**
- **PostgreSQL** (`@prisma/adapter-pg`, `pg`)
- **Zod** (Request Validation)
- **CORS & Dotenv**

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
├── client/                # 💻 React.js client application (Vite)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page views (Home, List, Detail, Create)
│   │   ├── services/      # Axios API service
│   │   ├── types/         # TypeScript interfaces
│   │   └── validators/    # Client-side form schemas
│   ├── vercel.json        # Vercel SPA routing configuration
│   └── .env.example       # Example client environment variables
├── server/                # ⚙️ Express.js REST API
│   ├── prisma/            # Prisma schema, migrations, and seed script
│   │   ├── schema.prisma  # PostgreSQL schema definition
│   │   └── seed.ts        # Database seed with sample quizzes
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── lib/           # Prisma client initialization (PostgreSQL adapter)
│   │   ├── routes/        # Express route definitions
│   │   ├── services/      # Business logic & database queries
│   │   └── validators/    # Zod validation schemas
│   ├── prisma.config.ts   # Prisma configuration
│   └── .env.example       # Example server environment variables
├── render.yaml            # Render Blueprint for one-click backend deployment
├── docs/                  # 📄 Project documentation
└── README.md
```

---

## ⚡ Getting Started (Local Development)

### Prerequisites

- **Node.js** (v18 or higher)
- **npm**
- **PostgreSQL Database URL** (e.g., from [Neon.tech](https://neon.tech/) — free, or local PostgreSQL)

### 1. Backend Setup ⚙️

1. Navigate to the `server` directory:
   ```bash
   cd server
   npm install
   ```

2. Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Add your PostgreSQL connection string:
   ```env
   PORT=3000
   DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
   ```

3. Push the schema to PostgreSQL and seed initial data:
   ```bash
   npx prisma db push
   npm run seed
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

> 🌐 The backend API will be running at `http://localhost:3000` (Health check at `http://localhost:3000/health`).

### 2. Frontend Setup 💻

In a new terminal window:

1. Navigate to the `client` directory:
   ```bash
   cd client
   npm install
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```

> 🌐 The frontend web app will be running at `http://localhost:5173` (proxies `/api` requests to `http://localhost:3000` automatically).

---

## 🚀 Deployment Guide (Vercel + Render + PostgreSQL)

### Step 1: Create a Free PostgreSQL Database
We recommend **[Neon.tech](https://neon.tech/)** (free, never expires, fast serverless PostgreSQL):
1. Sign up at [neon.tech](https://neon.tech/) and create a project (e.g., `quiz-builder`).
2. Copy the **Connection String** (it looks like `postgresql://user:password@ep-...neon.tech/neondb?sslmode=require`).

*(Alternative: You can also create a PostgreSQL instance on [Render.com](https://render.com/), though Render's free databases expire after 30 days).*

---

### Step 2: Deploy Backend to Render
1. Push your project to GitHub.
2. Go to **[Render Dashboard](https://dashboard.render.com/)** -> **New** -> **Web Service**.
3. Connect your GitHub repository.
4. Fill in the service settings:
   - **Name**: `quiz-builder-api`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npx prisma generate && npx prisma db push && npm run seed && npm run build`
   - **Start Command**: `npm start`
   - **Health Check Path**: `/health`
5. In **Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: *(paste your PostgreSQL connection string from Step 1)*
6. Click **Create Web Service**.
7. Once deployed, copy your Render service URL (e.g., `https://quiz-builder-api.onrender.com`).

---

### Step 3: Deploy Frontend to Vercel
1. Go to **[Vercel Dashboard](https://vercel.com/)** -> **Add New...** -> **Project**.
2. Import your GitHub repository.
3. Configure the project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: click **Edit** and select `client`.
4. Under **Environment Variables**, add:
   - `VITE_API_URL`: *(paste your Render backend URL, e.g. `https://quiz-builder-api.onrender.com`)*
5. Click **Deploy**.
6. That's it! Your Quiz Builder is live with a custom Vercel domain and backed by a PostgreSQL database on Render.

---

## 🎯 Creating a Sample Quiz

### Option 1: Via the Web UI ✨
1. Open the website in your browser.
2. Click **Create Quiz** in the top navigation bar.
3. Enter a quiz title (e.g. _"World Geography & Capitals"_).
4. Add questions using the interactive question builder:
   - **True / False**: Select the correct boolean answer.
   - **Short Answer**: Provide the question text and expected answer.
   - **Multiple Choice**: Add multiple options and check the boxes for correct ones.
5. Click **Save Quiz**!

### Option 2: Via Prisma Studio (Database GUI) 🗄️
```bash
cd server
npx prisma studio
```
> 🌐 Launches a visual database manager at `http://localhost:5555` to view and edit PostgreSQL tables directly.

---

## 📜 Available Scripts

### Backend (`server/`)
- `npm run dev` — Start development server with auto-reload
- `npm run build` — Compile TypeScript to `dist/`
- `npm start` — Run compiled production server
- `npm run prisma:generate` — Generate Prisma Client
- `npm run prisma:push` — Sync Prisma schema with database
- `npm run seed` — Seed sample quizzes into the database
- `npm run lint` — Run ESLint checks
- `npm run format` — Format code with Prettier

### Frontend (`client/`)
- `npm run dev` — Start Vite development server
- `npm run build` — Type-check and build production bundle
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint checks
- `npm run format` — Format code with Prettier
