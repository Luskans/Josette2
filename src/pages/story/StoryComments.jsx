import { initFlowbite } from 'flowbite'
import { useEffect } from 'react';
import localDate, { fullLocalDate } from '../../utils/formatDate';
import defaultUserImage from '../../assets/user_image.webp';

export default function StoryComments({ comment }) {

  useEffect(() => {
    initFlowbite();
  }, [])

  return (
    <>
      <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
              <img
                className="mr-2 w-6 h-6 rounded-full"
                src={comment.user.image ? comment.user.image : defaultUserImage}
                alt="Michael Gough"
              />
              {comment.user.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time
                pubdate=""
                dateTime={comment.createdAt}
                title={fullLocalDate(comment.createdAt)}
              >
                {comment.updatedAt ? localDate(comment.updatedAt) : localDate(comment.createdAt)}
              </time>
            </p>
          </div>
          <button
            id={`dropdownComment${comment.id}Button`}
            data-dropdown-toggle={`dropdownComment${comment.id}`}
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
            <span className="sr-only">Options</span>
          </button>
          
          <div
            id={`dropdownComment${comment.id}`}
            className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownMenuIconHorizontalButton"
            >
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Modifier
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Supprimer
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Report
                </a>
              </li>
            </ul>
          </div>
        </footer>
        <p className="text-gray-800 break-words text-justify dark:text-gray-100">
          {comment.content}
        </p>
      </article>
    </>
  );
}
