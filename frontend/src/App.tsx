import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import QuizListPage from './pages/QuizListPage';
import QuizDetailPage from './pages/QuizDetailPage';
import CreateQuizPage from './pages/CreateQuizPage';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/quizzes" replace />} />
          <Route path="/quizzes" element={<QuizListPage />} />
          <Route path="/quizzes/:id" element={<QuizDetailPage />} />
          <Route path="/create" element={<CreateQuizPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
