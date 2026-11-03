'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { createQuiz } from '../../services/api';
import {
  quizFormSchema,
  type QuizFormData,
} from '../../validators/quizFormSchema';
import type { CreateQuizPayload } from '../../types/quiz';
import QuestionForm from '../../components/QuestionForm';
import { useStorageMode } from '../../context/StorageModeContext';

export default function CreateQuizPage() {
  const router = useRouter();
  const { isLocalMode, refreshLocalCount } = useStorageMode();
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

      const created = await createQuiz(payload);
      refreshLocalCount();
      toast.success(
        isLocalMode
          ? 'Quiz created successfully! (Saved in browser memory)'
          : 'Quiz created successfully!'
      );
      router.push(`/quizzes/${created.id}`);
    } catch (err: unknown) {
      console.error('Failed to create quiz', err);
      toast.error('Failed to create quiz. Please check your inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Create New Quiz
          </h1>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
            Design your quiz questions and configure correct answers
          </p>
        </div>
        <Link
          href="/quizzes"
          className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          &larr; Back to Quizzes
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Quiz Title */}
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Quiz Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            placeholder="e.g. JavaScript Core Concepts"
            {...register('title')}
            className={`mt-2 block w-full rounded-md border px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white ${
              errors.title
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200 dark:border-red-800'
                : 'border-gray-300 focus:border-violet-500 focus:ring-violet-200 dark:focus:ring-violet-900'
            }`}
          />
          {errors.title && (
            <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Questions Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Questions ({fields.length})
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  append({
                    type: 'boolean',
                    text: '',
                    correctAnswer: 'True',
                  })
                }
                className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-all duration-150 ease-out hover:-translate-y-0.5 hover:bg-gray-50 active:translate-y-0 active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-750"
              >
                + True/False
              </button>
              <button
                type="button"
                onClick={() =>
                  append({
                    type: 'input',
                    text: '',
                    correctAnswer: '',
                  })
                }
                className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-all duration-150 ease-out hover:-translate-y-0.5 hover:bg-gray-50 active:translate-y-0 active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-750"
              >
                + Short Answer
              </button>
              <button
                type="button"
                onClick={() =>
                  append({
                    type: 'checkbox',
                    text: '',
                    options: [
                      { text: '', isCorrect: false },
                      { text: '', isCorrect: false },
                    ],
                  })
                }
                className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-all duration-150 ease-out hover:-translate-y-0.5 hover:bg-gray-50 active:translate-y-0 active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-750"
              >
                + Multiple Choice
              </button>
            </div>
          </div>

          {errors.questions?.message && (
            <p className="text-xs text-red-600 dark:text-red-400">
              {errors.questions.message}
            </p>
          )}

          <div className="space-y-4">
            {fields.map((field, index) => (
              <QuestionForm
                key={field.id}
                index={index}
                register={register}
                control={control}
                setValue={setValue}
                remove={remove}
                errors={errors}
                watchedType={watchedQuestions?.[index]?.type}
                canRemove={fields.length > 1}
              />
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-6 dark:border-gray-800">
          <Link
            href="/quizzes"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-150 ease-out hover:bg-gray-50 active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-750"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-violet-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 ease-out hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-md active:translate-y-0 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:opacity-50 dark:bg-violet-600 dark:hover:bg-violet-500"
          >
            {isSubmitting ? 'Creating Quiz...' : 'Create Quiz'}
          </button>
        </div>
      </form>
    </div>
  );
}
