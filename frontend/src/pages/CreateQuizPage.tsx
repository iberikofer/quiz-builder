import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createQuiz } from '../services/api';
import {
  quizFormSchema,
  type QuizFormData,
} from '../validators/quizFormSchema';
import type { CreateQuizPayload } from '../types/quiz';
import QuestionForm from '../components/QuestionForm';

function CreateQuizPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QuizFormData>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      title: '',
      questions: [
        {
          type: 'boolean',
          text: '',
          correctAnswer: 'True',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const watchedQuestions = watch('questions');

  const onSubmit = async (data: QuizFormData) => {
    try {
      setIsSubmitting(true);

      const payload: CreateQuizPayload = {
        title: data.title.trim(),
        questions: data.questions.map((q, index) => ({
          type: q.type,
          text: q.text.trim(),
          order: index,
          correctAnswer:
            q.type === 'boolean' || q.type === 'input'
              ? q.correctAnswer?.trim()
              : undefined,
          options:
            q.type === 'checkbox' && q.options
              ? q.options.map((opt) => ({
                  text: opt.text.trim(),
                  isCorrect: opt.isCorrect,
                }))
              : undefined,
        })),
      };

      await createQuiz(payload);
      toast.success('Quiz created successfully!');
      navigate('/quizzes');
    } catch (err: unknown) {
      console.error('Failed to create quiz', err);
      toast.error('Failed to create quiz. Please check your inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddQuestion = () => {
    append({
      type: 'boolean',
      text: '',
      correctAnswer: 'True',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to="/quizzes"
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          &larr; Cancel & Back
        </Link>
      </div>

      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Create a New Quiz</h1>
        <p className="mt-1 text-sm text-gray-500">
          Fill in the quiz title and add one or more questions below.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Title Section */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <label className="block text-sm font-semibold text-gray-900">
            Quiz Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. World Geography & Capitals"
            {...register('title')}
            className={`mt-2 block w-full rounded-lg border px-4 py-2.5 text-base text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
              errors.title
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
            }`}
          />
          {errors.title && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Questions Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Questions</h2>
            <button
              type="button"
              onClick={handleAddQuestion}
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-600 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
              + Add Question
            </button>
          </div>

          {errors.questions && typeof errors.questions.message === 'string' && (
            <div className="rounded-lg bg-red-50 p-3 text-xs text-red-600">
              {errors.questions.message}
            </div>
          )}

          <div className="space-y-4">
            {fields.map((field, index) => (
              <QuestionForm
                key={field.id}
                index={index}
                control={control}
                register={register}
                errors={errors}
                setValue={setValue}
                questionType={watchedQuestions?.[index]?.type || 'boolean'}
                onRemove={() => remove(index)}
                canRemove={fields.length > 1}
              />
            ))}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <Link
            to="/quizzes"
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Saving Quiz...
              </>
            ) : (
              'Save Quiz'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateQuizPage;
