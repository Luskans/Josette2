import { initFlowbite } from 'flowbite';
import { useEffect, useState } from 'react';
import localDate from '@/utils/formatDate';
import defaultUserImage from '@/assets/user_image.webp';
import { useDispatch, useSelector } from 'react-redux';
import { axiosSecu } from '@/utils/axios';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { updateComments } from '@/store/commentSlice';
import getImageUrl from '@/utils/getImageUrl';
import defaultProfil2 from '@/assets/defaultProfil2.webp';

export default function StoryComment({ comment }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.detail);
  const updatedComment = useSelector((state) => state.comment.updated);
  const [formUpdate, setFormUpdate] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
  
  }, [updatedComment])

  useEffect(() => {
    initFlowbite();
  });

  const onUpdateSubmit = (data) => {
    console.log('datas', data);
    axiosSecu
      .patch(`/comments/${comment.id}`, data, {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      })
      .then((response) => {
        toast.success('Commentaire modifié !', { duration: 9000 });
        dispatch(updateComments());
      })
      .catch((error) => {
        toast.error('Une erreur est survenue.', { duration: 9000 });
      });
  };

  const handleDelete = () => {
    axiosSecu
      .delete(`/comments/${comment.id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        toast.success('Commentaire supprimé !', { duration: 9000 });
        dispatch(updateComments());
      })
      .catch((error) => {
        toast.error('Une erreur est survenue.', { duration: 9000 });
      });
  };

  const handleReport = () => {};

  return (
    <>
      <div key={comment.id} className="flex items-start gap-2.5 mb-8">
        <img
          className="w-8 h-8 rounded-full"
          src={comment.user.image ? getImageUrl(comment.user.image.name) : defaultProfil2}
          alt={`${comment.user.name}'s profil picture`}
        />
        <div className="flex flex-col gap-1 w-full ">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="author text-sm font-semibold text-gray-900 dark:text-white">
              {comment.user.name}
            </span>
            <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
              {localDate(comment.createdAt)}{comment.updatedAt ? ' (modifié)' : null}
            </span>
          </div>
          <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
            {user && formUpdate ? (
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
                        // value: /^(?=[A-Za-z0-9 ]*[A-Za-z]){4}[A-Za-z0-9 ]*$/,
                        value: /^[a-zA-Z0-9\s.,;!?\'"\-éèàçùëüïôâêîäöûÉÈÀÇÙËÜÏÔÂÊÎÄÖÛ]*$/,
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
          </div>
        </div>
        {user &&
        <>
          <button
            id={`dropdownComment${comment.id}Button`}
            data-dropdown-toggle={`dropdownComment${comment.id}`}
            data-dropdown-placement="bottom-start"
            className="inline-flex self-center items-center p-2 mt-5 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
            type="button"
          >
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 4 15"
            >
              <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg>
          </button>
          <div
            id={`dropdownComment${comment.id}`}
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownMenuIconButton"
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
                      data-modal-target="comment-delete-modal"
                      data-modal-toggle="comment-delete-modal"
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
        </>
        }

        {/* Modale de confirmation pour delete le commentaire */}
        {user && user.id === comment.user.id ? (
        <div
          id="comment-delete-modal"
          tabIndex={-1}
          className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="comment-delete-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Êtes-vous sûr de vouloir supprimer le commentaire ?
                </h3>
                <button
                  data-modal-hide="comment-delete-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                  onClick={() => {
                    handleDelete(comment.id);
                  }}
                >
                  Oui, je suis sûr
                </button>
                <button
                  data-modal-hide="comment-delete-modal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Non, annuler
                </button>
              </div>
            </div>
          </div>
        </div>
        ) : (
          null
        )}
      </div>
    </>
  );
}
