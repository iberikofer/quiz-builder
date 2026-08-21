# Technical Assessment: Quiz Builder

## 📌 Overview

The objective of this assessment is to build a full-stack **Quiz Builder** web application where users can create custom quizzes with various types of questions, view all available quizzes on an interactive dashboard, and inspect individual quizzes in detail.

The project consists of a **Backend** REST API (Node.js/Express) and a **Frontend** client application (React).

---

## 🎯 Objectives & User Stories

1. **Quiz Creation**: A user can create a quiz with a title and one or more questions of different supported types.
2. **Dashboard / Listing**: All created quizzes are listed on a central dashboard with summary details (title, question count, creation date).
3. **Quiz Details**: Each quiz can be viewed on a dedicated page displaying its complete structure in a read-only view.
4. **Quiz Management**: Users can delete any quiz directly from the interface with cascade removal of associated questions and options.

---

## ⚙️ Backend Requirements

### Tech Stack

- **Runtime & Framework**: Node.js with Express.js (or NestJS)
- **Language**: TypeScript
- **Database & ORM**: SQLite (or PostgreSQL) via Prisma ORM (or Sequelize)
- **Validation**: Zod schema validation for incoming request payloads

### REST Endpoints

| Method   | Endpoint           | Description                                                                   |
| -------- | ------------------ | ----------------------------------------------------------------------------- |
| `POST`   | `/api/quizzes`     | Create a new quiz with nested questions and options                           |
| `GET`    | `/api/quizzes`     | Return a list of all quizzes with titles, creation dates, and question counts |
| `GET`    | `/api/quizzes/:id` | Return full details of a quiz including all questions and options             |
| `DELETE` | `/api/quizzes/:id` | Delete a quiz and its associated questions/options (cascade delete)           |

---

## 💻 Frontend Requirements

### Tech Stack

- **Framework & Build Tool**: React.js with Vite (or Next.js)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (clean, responsive, minimalist layout)
- **Routing**: React Router DOM
- **Forms & Validation**: React Hook Form with Zod resolver
- **HTTP Client**: Axios
- **Notifications**: Toast notifications for user feedback (e.g. `react-hot-toast`)

### Pages & Views

#### 1. Quiz Creation Page (`/create`)

- Form to configure:
  - **Quiz Title** (required)
  - **Questions List** (at least one question required)
- **Supported Question Types**:
  - **Boolean**: True / False options.
  - **Input**: Short text answer question.
  - **Checkbox**: Multiple choice question with multiple options and one or more correct answers.
- **Dynamic Actions**:
  - Ability to dynamically add and remove questions.
  - Ability to dynamically add and remove options for checkbox questions (minimum 2 options).
- **Submission**: Validates input data and submits to `POST /api/quizzes`, redirects to `/quizzes` on success.

#### 2. Quiz List Page (`/quizzes`)

- Fetches all quizzes from `GET /api/quizzes`.
- Displays each quiz with its title, question count, and creation date.
- Card/list items link to the respective Quiz Detail Page (`/quizzes/:id`).
- Each item includes a delete action (`DELETE /api/quizzes/:id`) with confirmation dialog.
- Includes loading skeletons and an empty state when no quizzes exist.

#### 3. Quiz Detail Page (`/quizzes/:id`)

- Fetches quiz details from `GET /api/quizzes/:id`.
- Displays the quiz title, metadata, and all questions in sequential order.
- Renders questions in a **read-only** mode for structural inspection (not an active solving mode):
  - Radio buttons for boolean questions (highlighting the correct answer).
  - Text placeholder and expected answer for input questions.
  - Checkboxes for multiple-choice questions (highlighting correct options).
- Includes navigation to return to the quiz list.

---

## 📋 Additional Technical Requirements

1. **Responsive Design**: Clean UI layout supporting desktop, tablet, and mobile screen sizes.
2. **Code Quality**:
   - ESLint and Prettier configured across the monorepo.
   - All files must be cleanly formatted and pass linting without errors or warnings.
3. **Environment Configuration**:
   - Use `.env` files for backend database connection strings and environment variables.
   - Sensitive environment files and local database files must be excluded from Git via `.gitignore`.
4. **Documentation**:
   - Comprehensive `README.md` describing project setup, prerequisites, development commands, and sample quiz creation guides.

---

## 📦 Project Structure

```text
quiz-builder/
├── backend/               # Express.js REST API
│   ├── prisma/            # Prisma schema and SQLite database
│   └── src/
│       ├── controllers/   # Route handlers
│       ├── lib/           # Prisma client config
│       ├── routes/        # Express routes
│       ├── services/      # Business logic & database queries
│       └── validators/    # Zod schemas
├── frontend/              # React.js application
│   └── src/
│       ├── components/    # Reusable components (Header, QuizCard, QuestionView, QuestionForm)
│       ├── pages/         # Application pages (CreateQuizPage, QuizListPage, QuizDetailPage)
│       ├── services/      # API client wrappers
│       ├── types/         # TypeScript definitions
│       └── validators/    # Form schemas
└── README.md
```
