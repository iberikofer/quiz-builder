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

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
            {index + 1}
          </span>
          <span className="text-sm font-semibold text-gray-700">
            Question {index + 1}
          </span>
        </div>

        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-xs font-medium text-red-600 transition-colors hover:text-red-700"
          >
            Remove Question
          </button>
        )}
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
            Question Text <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. What is the capital of France?"
            {...register(`questions.${index}.text` as const)}
            className={`mt-1 block w-full rounded-lg border px-3.5 py-2 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
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

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
            Question Type
          </label>
          <select
            value={questionType}
            onChange={(e) =>
              handleTypeChange(
                e.target.value as 'boolean' | 'input' | 'checkbox',
              )
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="boolean">Boolean (True / False)</option>
            <option value="input">Short Text Answer</option>
            <option value="checkbox">Multiple Choice (Checkbox)</option>
          </select>
        </div>

        {/* Boolean Type Fields */}
        {questionType === 'boolean' && (
          <div className="rounded-lg bg-gray-50 p-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
              Correct Answer
            </label>
            <div className="mt-2 flex gap-6">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  value="True"
                  {...register(`questions.${index}.correctAnswer` as const)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                True
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  value="False"
                  {...register(`questions.${index}.correctAnswer` as const)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                False
              </label>
            </div>
          </div>
        )}

        {/* Input Type Fields */}
        {questionType === 'input' && (
          <div className="rounded-lg bg-gray-50 p-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
              Expected Answer (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Paris"
              {...register(`questions.${index}.correctAnswer` as const)}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        )}

        {/* Checkbox / Multiple Choice Fields */}
        {questionType === 'checkbox' && (
          <div className="space-y-3 rounded-lg bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                Options (Check the box if it is correct)
              </label>
              <button
                type="button"
                onClick={() => append({ text: '', isCorrect: false })}
                className="text-xs font-semibold text-blue-600 transition hover:text-blue-700"
              >
                + Add Option
              </button>
            </div>

            {questionErrors?.options &&
              typeof questionErrors.options.message === 'string' && (
                <p className="text-xs text-red-600">
                  {questionErrors.options.message}
                </p>
              )}

            <div className="space-y-2">
              {fields.map((field, optionIndex) => (
                <div key={field.id} className="flex items-center gap-2">
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
                    className="block flex-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
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
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionForm;
