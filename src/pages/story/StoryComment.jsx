import { initFlowbite } from 'flowbite'
import { useEffect, useState } from 'react';
import localDate, { fullLocalDate } from '../../utils/formatDate';
import defaultUserImage from '../../assets/user_image.webp';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

export default function StoryComments({ comment }) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.detail);
  const token = useSelector(state => state.user.token);
  const [formUpdate, setFormUpdate] = useState(false);

  const apiURL = import.meta.env.VITE_API_URL;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    initFlowbite();
  })

  const onUpdateSubmit = (data) => {
    console.log('datas', data);
    axios
      .patch(`${apiURL}/comments/${comment.id}`, data, {
        headers: {
          'Content-Type': 'application/merge-patch+json',
          'Authorization': `Bearer ${token}`
        },
      })
      .then((response) => {
        toast.success('Commentaire modifié !', { duration: 9000 });
        refresh();
      })
      .catch((error) => {
        toast.error("Une erreur est survenue.", { duration: 9000 });
      });
  };

  const handleDelete = () => {
    axios
      .delete(`${apiURL}/comments/${comment.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      .then((response) => {
        toast.success('Commentaire supprimé !', { duration: 9000 });
        // refresh();
      })
      .catch((error) => {
        toast.error("Une erreur est survenue.", { duration: 9000 });
      });
  };

  const handleReport = () => {
    
  };

  return (
    <>
      <article key={comment.id} className="p-6 text-base bg-white rounded-lg dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <header className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 font-semibold text-md text-gray-900 dark:text-white">
              <img
                className="mr-2 w-6 h-6 rounded-full"
                src={comment.user.image ? comment.user.image : defaultUserImage}
                alt="Michael Gough"
              />
              {comment.user.name}
            </p>
            <p className="text-xs mt-0.5 text-gray-600 dark:text-gray-400">
              <time
                pubdate=""
                dateTime={comment.createdAt}
                title={fullLocalDate(comment.createdAt)}
              >
                {localDate(comment.createdAt)}{comment.updatedAt ? ' (modifié)' : null}
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
              {(user.id === comment.user.id) ? (
              <>
                <li>
                  <button
                    type="button"
                    className="w-full py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setFormUpdate(!formUpdate)}
                  >
                    Modifier
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="w-full py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => {handleDelete()}}
                  >
                    Supprimer
                  </button>
                </li>
              </>
              ) : (
              <li>
                <button
                  type="button"
                  className="w-full py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => {handleReport()}}
                >
                  Report
                </button>
              </li>)
              }
            </ul>
          </div>
        </header>

        {formUpdate ? (
          <form onSubmit={handleSubmit(onUpdateSubmit)}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <textarea 
                type="text"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                name="content"
                defaultValue={comment.content}
                {...register('content', {
                  required: {
                    value: true,
                    message: 'Un commentaire est requis.',
                  },
                  minLength: {
                    value: 4,
                    message: 'Le commentaire doit contenir au moins 4 caractères.',
                  },
                  maxLength: {
                    value: 512,
                    message:
                      'Le commentaire doit contenir au maximum 512 caractères.',
                  },
                  pattern: {
                    value: /^(?=[A-Za-z0-9 ]*[A-Za-z]){4}[A-Za-z0-9 ]*$/,
                    message:
                      'Le commentaire ne doit contenir que des lettres (4 min. 512 max.) et des chiffres.',
                  },
                })}
              />
              {errors.content ? (
                <p className="mb-2 text-sm font-medium text-red-600 dark:text-red-400">
                  {errors.content.message}
                </p>
              ) : (
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-400">
                  4 à 512 caractères.
                </p>
              )}
            </div>
            <input
              type="hidden"
              name="updatedAt"
              id="updatedAt"
              // value={new Date().toISOString().replace('T', ' ').substring(0, 19)}
              value={new Date().toISOString()}
              {...register('updatedAt')}
            />
            <div className="flex gap-3">
              <button
                type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              >
                Modifier
              </button>
              <button
                type="button"
                onClick={() => setFormUpdate(!formUpdate)}
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Annuler
              </button>
            </div>
          </form>
        ) : (
          <p className="text-sm text-gray-800 break-words text-justify dark:text-gray-100">
            {comment.content}
          </p>
        )}
      </article>
    </>
  );
}
