import { useFieldArray } from 'react-hook-form';
import type {
  Control,
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
} from 'react-hook-form';
import type { QuizFormData } from '../validators/quizFormSchema';

interface QuestionFormProps {
  index: number;
  control: Control<QuizFormData>;
  register: UseFormRegister<QuizFormData>;
  errors: FieldErrors<QuizFormData>;
  setValue: UseFormSetValue<QuizFormData>;
  questionType: 'boolean' | 'input' | 'checkbox';
  onRemove: () => void;
  canRemove: boolean;
}

function QuestionForm({
  index,
  control,
  register,
  errors,
  setValue,
  questionType,
  onRemove,
  canRemove,
}: QuestionFormProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.options` as const,
  });

  const questionErrors = errors.questions?.[index];

  const handleTypeChange = (newType: 'boolean' | 'input' | 'checkbox') => {
    setValue(`questions.${index}.type`, newType);
    if (newType === 'boolean') {
      setValue(`questions.${index}.correctAnswer`, 'True');
      setValue(`questions.${index}.options`, undefined);
    } else if (newType === 'input') {
      setValue(`questions.${index}.correctAnswer`, '');
      setValue(`questions.${index}.options`, undefined);
    } else if (newType === 'checkbox') {
      setValue(`questions.${index}.correctAnswer`, undefined);
      setValue(`questions.${index}.options`, [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
      ]);
    }
  };

  const typeOptions: Array<{
    type: 'boolean' | 'input' | 'checkbox';
    label: string;
    icon: React.ReactNode;
  }> = [
    {
      type: 'boolean',
      label: 'True / False',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      type: 'input',
      label: 'Short Answer',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      type: 'checkbox',
      label: 'Multiple Choice',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
            {index + 1}
          </span>
          <span className="text-sm font-semibold text-gray-800">
            Question {index + 1}
          </span>
        </div>

        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-xs font-medium text-red-600 transition-colors hover:text-red-700 hover:underline"
          >
            Remove Question
          </button>
        )}
      </div>

      <div className="mt-5 space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
            Question Type
          </label>
          <div className="mt-2 grid grid-cols-1 gap-2 rounded-xl bg-gray-100 p-1.5 sm:grid-cols-3">
            {typeOptions.map((opt) => (
              <button
                key={opt.type}
                type="button"
                onClick={() => handleTypeChange(opt.type)}
                className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition ${
                  questionType === opt.type
                    ? 'bg-white text-blue-700 shadow-sm ring-1 ring-black/5'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
            Question Text <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. What is the capital of France?"
            {...register(`questions.${index}.text` as const)}
            className={`mt-1.5 block w-full rounded-lg border px-3.5 py-2.5 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
              questionErrors?.text
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
            }`}
          />
          {questionErrors?.text && (
            <p className="mt-1 text-xs text-red-600">
              {questionErrors.text.message}
            </p>
          )}
        </div>

        {questionType === 'boolean' && (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
              Select Correct Answer
            </label>
            <div className="mt-2 flex gap-4">
              {['True', 'False'].map((val) => (
                <label
                  key={val}
                  className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-800 transition hover:bg-gray-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:text-blue-700"
                >
                  <input
                    type="radio"
                    value={val}
                    {...register(`questions.${index}.correctAnswer` as const)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  {val}
                </label>
              ))}
            </div>
          </div>
        )}

        {questionType === 'input' && (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
              Expected Answer
            </label>
            <input
              type="text"
              placeholder="e.g. Paris"
              {...register(`questions.${index}.correctAnswer` as const)}
              className="mt-1.5 block w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        )}

        {questionType === 'checkbox' && (
          <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                Options (Check the box for correct answers)
              </label>
            </div>

            {questionErrors?.options &&
              typeof questionErrors.options.message === 'string' && (
                <p className="text-xs text-red-600">
                  {questionErrors.options.message}
                </p>
              )}

            <div className="space-y-2.5">
              {fields.map((field, optionIndex) => (
                <div key={field.id} className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    title="Mark as correct answer"
                    {...register(
                      `questions.${index}.options.${optionIndex}.isCorrect` as const,
                    )}
                    className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder={`Option ${optionIndex + 1}`}
                    {...register(
                      `questions.${index}.options.${optionIndex}.text` as const,
                    )}
                    className="block flex-1 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                  {fields.length > 2 && (
                    <button
                      type="button"
                      onClick={() => remove(optionIndex)}
                      className="p-1 text-gray-400 transition hover:text-red-500"
                      title="Remove Option"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => append({ text: '', isCorrect: false })}
              className="mt-2 w-full rounded-lg border border-dashed border-gray-300 bg-white py-2 text-xs font-semibold text-blue-600 transition hover:border-blue-400 hover:bg-blue-50/50"
            >
              + Add Option
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionForm;
