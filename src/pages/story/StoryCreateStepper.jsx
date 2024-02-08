export default function StoryCreateStepper({ step }) {
  return (
    <ol className="flex items-center w-full mb-12 p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
      <li className="flex items-center text-blue-600 dark:text-blue-500">
        <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
          1
        </span>
        Info
        <svg
          className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 12 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m7 9 4-4-4-4M1 9l4-4-4-4"
          />
        </svg>
      </li>
      <li className={`flex items-center ${(step === 2 || step === 3 || step === 4) && ('text-blue-600 dark:text-blue-500')}`}>
        <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border ${(step === 2 || step === 3 || step === 4) ? ('border-blue-600 dark:border-blue-500') : ('border-gray-500 dark:border-gray-400')} rounded-full shrink-0`}>
          2
        </span>
        Image
        <svg
          className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 12 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m7 9 4-4-4-4M1 9l4-4-4-4"
          />
        </svg>
      </li>
      <li className={`flex items-center ${(step === 3 | step === 4) && ('text-blue-600 dark:text-blue-500')}`}>
        <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border ${(step === 3 | step === 4) ? ('border-blue-600 dark:border-blue-500') : ('border-gray-500 dark:border-gray-400')} rounded-full shrink-0`}>
          3
        </span>
        Histoire
        <svg
          className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 12 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m7 9 4-4-4-4M1 9l4-4-4-4"
          />
        </svg>
      </li>
      <li className={`flex items-center ${(step === 4) && ('text-blue-600 dark:text-blue-500')}`}>
        <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border ${(step === 4) ? ('border-blue-600 dark:border-blue-500') : ('border-gray-500 dark:border-gray-400')} rounded-full shrink-0`}>
          4
        </span>
        Aperçu
      </li>
    </ol>
  );
}
