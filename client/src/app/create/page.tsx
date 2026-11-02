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
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Create New Quiz
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Design your quiz questions and configure correct answers
          </p>
        </div>
        <Link
          href="/quizzes"
          className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          &larr; Back to Quizzes
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Quiz Title */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Quiz Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            placeholder="e.g. JavaScript Core Concepts"
            {...register('title')}
            className={`mt-2 block w-full rounded-lg border px-4 py-2.5 text-sm transition focus:outline-none focus:ring-2 ${
              errors.title
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
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
            <h2 className="text-lg font-semibold text-gray-900">
              Questions ({fields.length})
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  append({
                    type: 'boolean',
                    text: '',
                    correctAnswer: 'True',
                  })
                }
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
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
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
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
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
              >
                + Multiple Choice
              </button>
            </div>
          </div>

          {errors.questions?.message && (
            <p className="text-xs text-red-600">
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
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-6">
          <Link
            href="/quizzes"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating Quiz...' : 'Create Quiz'}
          </button>
        </div>
      </form>
    </div>
  );
}

