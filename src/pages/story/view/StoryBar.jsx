import { initFlowbite } from 'flowbite';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLike, getLike, postLike } from '@/store/likeSlice';
import {
  deleteFavorite,
  getFavorite,
  postFavorite,
} from '@/store/favoriteSlice';
import { deleteStory } from '@/store/storySlice';
import { useNavigate } from 'react-router-dom';

export default function StoryBar({ id, onCommentIconClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.detail);
  const story = useSelector((state) => state.story.detail);
  const totalComment = useSelector((state) => state.comment.totalComment);
  const like = useSelector((state) => state.like.detail);
  const favorite = useSelector((state) => state.favorite.detail);
  const [storyLiked, setStoryLiked] = useState(false);
  const [storyFavorite, setStoryFavorite] = useState(false);

  useEffect(() => {
    dispatch(getLike(user.id, story.id));
    dispatch(getFavorite(user.id, story.id));
  }, [storyLiked, storyFavorite]);

  useEffect(() => {
    initFlowbite();
  });

  const addLike = (userId, storyId) => {
    const data = {
      userId: userId,
      storyId: storyId,
    };
    dispatch(postLike(data));
    setStoryLiked(!storyLiked);
  };

  const removeLike = (likeId) => {
    console.log('favorite id', favorite);
    dispatch(deleteLike(likeId));
    setStoryLiked(!storyLiked);
  };

  const addFavorite = (userId, storyId) => {
    const data = {
      userId: userId,
      storyId: storyId,
    };
    dispatch(postFavorite(data));
    setStoryFavorite(!storyFavorite);
  };

  const removeFavorite = (favoriteId) => {
    console.log('favorite id', favorite);
    dispatch(deleteFavorite(favoriteId));
    setStoryFavorite(!storyFavorite);
  };

  const handleDelete = (storyId) => {
    dispatch(deleteStory(storyId));
    navigate('/');
  };

  const handleReport = () => {};

  return (
    <div className="flex justify-between py-4 px-3 mb-10 border-y dark:border-gray-400">
      <div className="flex gap-5">
        {like.length != 0 ? (
          <button
            onClick={() => removeLike(like[0].id)}
            className="flex gap-1.5"
            data-tooltip-target={`tooltip-likes${id}`}
          >
            <svg
              className="w-5 h-5 text-blue-400 hover:text-blue-500 hover:dark:text-blue-300"
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 15C10.5304 15 11.0391 15.2107 11.4142 15.5858C11.7893 15.9609 12 16.4696 12 17H8C8 16.4696 8.21071 15.9609 8.58579 15.5858C8.96086 15.2107 9.46957 15 10 15Z"
                fill="currentColor"
              />
              <path
                d="M11.815 7H14.5C14.8094 7.00187 15.1149 6.93196 15.3927 6.79576C15.6704 6.65956 15.9128 6.46078 16.1007 6.21505C16.2887 5.96933 16.4171 5.68335 16.4758 5.37962C16.5345 5.07589 16.5219 4.76267 16.4391 4.46461C16.3563 4.16655 16.2055 3.89176 15.9985 3.66185C15.7915 3.43194 15.534 3.25319 15.2462 3.13963C14.9585 3.02608 14.6483 2.98083 14.3401 3.00745C14.0319 3.03406 13.734 3.1318 13.47 3.293C13.4877 3.19627 13.4977 3.0983 13.5 3C13.5017 2.59284 13.3787 2.19493 13.1474 1.85985C12.916 1.52478 12.5876 1.26863 12.2063 1.12591C11.825 0.983182 11.4091 0.960736 11.0146 1.06159C10.6201 1.16245 10.266 1.38176 10 1.69C9.73397 1.38176 9.37988 1.16245 8.98541 1.06159C8.59094 0.960736 8.17504 0.983182 7.79371 1.12591C7.41239 1.26863 7.08396 1.52478 6.85265 1.85985C6.62134 2.19493 6.49827 2.59284 6.5 3C6.50231 3.0983 6.51234 3.19627 6.53 3.293C6.26596 3.1318 5.96812 3.03406 5.65991 3.00745C5.35171 2.98083 5.04152 3.02608 4.75376 3.13963C4.466 3.25319 4.2085 3.43194 4.00151 3.66185C3.79453 3.89176 3.64369 4.16655 3.56088 4.46461C3.47806 4.76267 3.46551 5.07589 3.52423 5.37962C3.58294 5.68335 3.71131 5.96933 3.89925 6.21505C4.08719 6.46078 4.32956 6.65956 4.60732 6.79576C4.88508 6.93196 5.19065 7.00187 5.5 7H8.888M11.815 6.01499V9.24299M8.228 6.99999V9.27999M18.972 9.574C18.8671 9.95502 18.6401 10.2911 18.3258 10.5306C18.0114 10.7702 17.6272 10.8999 17.232 10.9C16.8281 10.9012 16.4345 10.7731 16.1086 10.5346C15.7828 10.296 15.5418 9.95937 15.421 9.574C15.2987 9.95819 15.0574 10.2935 14.7319 10.5315C14.4064 10.7695 14.0137 10.8977 13.6105 10.8977C13.2073 10.8977 12.8146 10.7695 12.4891 10.5315C12.1636 10.2935 11.9223 9.95819 11.8 9.574C11.6955 9.95694 11.4673 10.2946 11.151 10.5344C10.8347 10.7742 10.4479 10.9028 10.051 10.9C9.64027 10.9002 9.23963 10.7727 8.90458 10.5351C8.56954 10.2976 8.31667 9.96167 8.181 9.574C8.08341 9.95546 7.86093 10.2933 7.54902 10.5336C7.23712 10.7739 6.85374 10.9029 6.46 10.9C6.04517 10.8995 5.64039 10.7722 5.29992 10.5352C4.95944 10.2982 4.69953 9.96284 4.555 9.574C4.43288 9.95935 4.19103 10.2957 3.86462 10.5342C3.53821 10.7727 3.14424 10.9008 2.74 10.9C2.3448 10.8999 1.96055 10.7702 1.64623 10.5306C1.3319 10.2911 1.10487 9.95502 1 9.574V10C1 12.3869 1.94821 14.6761 3.63604 16.364C5.32387 18.0518 7.61305 19 10 19C12.3869 19 14.6761 18.0518 16.364 16.364C18.0518 14.6761 19 12.3869 19 10L18.972 9.574Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 14.5C8.05228 14.5 8.5 14.0523 8.5 13.5C8.5 12.9477 8.05228 12.5 7.5 12.5C6.94772 12.5 6.5 12.9477 6.5 13.5C6.5 14.0523 6.94772 14.5 7.5 14.5Z"
                fill="currentColor"
              />
              <path
                d="M12.5 14.5C13.0523 14.5 13.5 14.0523 13.5 13.5C13.5 12.9477 13.0523 12.5 12.5 12.5C11.9477 12.5 11.5 12.9477 11.5 13.5C11.5 14.0523 11.9477 14.5 12.5 14.5Z"
                fill="currentColor"
              />
            </svg>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {story.likes ? story.likes.length + 1 : 1}
            </p>
          </button>
        ) : (
          <button
            onClick={() => addLike(user.id, story.id)}
            className="flex gap-1.5"
            data-tooltip-target={`tooltip-likes${id}`}
          >
            <svg
              className="w-5 h-5 text-gray-400 hover:text-gray-500 hover:dark:text-gray-300"
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 15C10.5304 15 11.0391 15.2107 11.4142 15.5858C11.7893 15.9609 12 16.4696 12 17H8C8 16.4696 8.21071 15.9609 8.58579 15.5858C8.96086 15.2107 9.46957 15 10 15Z"
                fill="currentColor"
              />
              <path
                d="M11.815 7H14.5C14.8094 7.00187 15.1149 6.93196 15.3927 6.79576C15.6704 6.65956 15.9128 6.46078 16.1007 6.21505C16.2887 5.96933 16.4171 5.68335 16.4758 5.37962C16.5345 5.07589 16.5219 4.76267 16.4391 4.46461C16.3563 4.16655 16.2055 3.89176 15.9985 3.66185C15.7915 3.43194 15.534 3.25319 15.2462 3.13963C14.9585 3.02608 14.6483 2.98083 14.3401 3.00745C14.0319 3.03406 13.734 3.1318 13.47 3.293C13.4877 3.19627 13.4977 3.0983 13.5 3C13.5017 2.59284 13.3787 2.19493 13.1474 1.85985C12.916 1.52478 12.5876 1.26863 12.2063 1.12591C11.825 0.983182 11.4091 0.960736 11.0146 1.06159C10.6201 1.16245 10.266 1.38176 10 1.69C9.73397 1.38176 9.37988 1.16245 8.98541 1.06159C8.59094 0.960736 8.17504 0.983182 7.79371 1.12591C7.41239 1.26863 7.08396 1.52478 6.85265 1.85985C6.62134 2.19493 6.49827 2.59284 6.5 3C6.50231 3.0983 6.51234 3.19627 6.53 3.293C6.26596 3.1318 5.96812 3.03406 5.65991 3.00745C5.35171 2.98083 5.04152 3.02608 4.75376 3.13963C4.466 3.25319 4.2085 3.43194 4.00151 3.66185C3.79453 3.89176 3.64369 4.16655 3.56088 4.46461C3.47806 4.76267 3.46551 5.07589 3.52423 5.37962C3.58294 5.68335 3.71131 5.96933 3.89925 6.21505C4.08719 6.46078 4.32956 6.65956 4.60732 6.79576C4.88508 6.93196 5.19065 7.00187 5.5 7H8.888M11.815 6.01499V9.24299M8.228 6.99999V9.27999M18.972 9.574C18.8671 9.95502 18.6401 10.2911 18.3258 10.5306C18.0114 10.7702 17.6272 10.8999 17.232 10.9C16.8281 10.9012 16.4345 10.7731 16.1086 10.5346C15.7828 10.296 15.5418 9.95937 15.421 9.574C15.2987 9.95819 15.0574 10.2935 14.7319 10.5315C14.4064 10.7695 14.0137 10.8977 13.6105 10.8977C13.2073 10.8977 12.8146 10.7695 12.4891 10.5315C12.1636 10.2935 11.9223 9.95819 11.8 9.574C11.6955 9.95694 11.4673 10.2946 11.151 10.5344C10.8347 10.7742 10.4479 10.9028 10.051 10.9C9.64027 10.9002 9.23963 10.7727 8.90458 10.5351C8.56954 10.2976 8.31667 9.96167 8.181 9.574C8.08341 9.95546 7.86093 10.2933 7.54902 10.5336C7.23712 10.7739 6.85374 10.9029 6.46 10.9C6.04517 10.8995 5.64039 10.7722 5.29992 10.5352C4.95944 10.2982 4.69953 9.96284 4.555 9.574C4.43288 9.95935 4.19103 10.2957 3.86462 10.5342C3.53821 10.7727 3.14424 10.9008 2.74 10.9C2.3448 10.8999 1.96055 10.7702 1.64623 10.5306C1.3319 10.2911 1.10487 9.95502 1 9.574V10C1 12.3869 1.94821 14.6761 3.63604 16.364C5.32387 18.0518 7.61305 19 10 19C12.3869 19 14.6761 18.0518 16.364 16.364C18.0518 14.6761 19 12.3869 19 10L18.972 9.574Z"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 14.5C8.05228 14.5 8.5 14.0523 8.5 13.5C8.5 12.9477 8.05228 12.5 7.5 12.5C6.94772 12.5 6.5 12.9477 6.5 13.5C6.5 14.0523 6.94772 14.5 7.5 14.5Z"
                fill="currentColor"
              />
              <path
                d="M12.5 14.5C13.0523 14.5 13.5 14.0523 13.5 13.5C13.5 12.9477 13.0523 12.5 12.5 12.5C11.9477 12.5 11.5 12.9477 11.5 13.5C11.5 14.0523 11.9477 14.5 12.5 14.5Z"
                fill="currentColor"
              />
            </svg>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {story.likes ? story.likes.length : 0}
            </p>
          </button>
        )}
        <div
          id={`tooltip-likes${id}`}
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Bravo
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>

        <button
          onClick={onCommentIconClick}
          className="flex gap-1.5"
          data-tooltip-target={`tooltip-comments${id}`}
        >
          <svg
            className="w-5 h-5 text-gray-400 hover:text-gray-500 hover:dark:text-gray-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M5 5h9M5 9h5m8-8H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4l3.5 4 3.5-4h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
            />
          </svg>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            {totalComment}
          </p>
        </button>
        <div
          id={`tooltip-comments${id}`}
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Commentaires
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>

        <button
          className="flex gap-1.5"
          data-tooltip-target={`tooltip-views${id}`}
        >
          <svg
            className="w-5 h-5 text-gray-400 hover:text-gray-500 hover:dark:text-gray-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 14"
          >
            <g
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
            >
              <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z" />
            </g>
          </svg>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            {story.viewCount ? story.viewCount : 0}
          </p>
        </button>
        <div
          id={`tooltip-views${id}`}
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Vues
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
      <div className="flex gap-5">
        {favorite.length != 0 ? (
          <button
            onClick={() => removeFavorite(favorite[0].id)}
            data-tooltip-target={`tooltip-save${id}`}
          >
            <svg
              className="w-5 h-5 text-blue-400 hover:text-blue-500 hover:dark:text-blue-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m13 19-6-5-6 5V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17Z"
              />
            </svg>
          </button>
        ) : (
          <button
            onClick={() => addFavorite(user.id, story.id)}
            data-tooltip-target={`tooltip-save${id}`}
          >
            <svg
              className="w-5 h-5 text-gray-400 hover:text-gray-500 hover:dark:text-gray-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="m13 19-6-5-6 5V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17Z"
              />
            </svg>
          </button>
        )}
        <div
          id={`tooltip-save${id}`}
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Favoris
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>

        <button data-tooltip-target={`tooltip-share${id}`}>
          <svg
            className="w-5 h-5 text-gray-400 hover:text-gray-500 hover:dark:text-gray-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M1.248 15C.22 11.77 2.275 4.232 9.466 4.232V2.079a1.025 1.025 0 0 1 1.644-.862l5.479 4.307a1.108 1.108 0 0 1 0 1.723l-5.48 4.307a1.026 1.026 0 0 1-1.643-.861V8.539C2.275 9.616 1.248 15 1.248 15Z"
            />
          </svg>
        </button>
        <div
          id={`tooltip-share${id}`}
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Partager
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>

        <button
          id={`storyOptionsButton${id}`}
          data-dropdown-toggle={`storyOptionsDropdown${id}`}
          type="button"
        >
          <svg
            className="w-5 h-4 text-gray-400 hover:text-gray-500 hover:dark:text-gray-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 4 15"
          >
            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          </svg>
        </button>
        <div
          id={`storyOptionsDropdown${id}`}
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby={`storyOptionsButton${id}`}
          >
            {user.id === story.user.id ? (
              <>
                <li>
                  <button
                    type="button"
                    className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Modifier
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-target="story-delete-modal"
                    data-modal-toggle="story-delete-modal"
                  >
                    Supprimer
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button
                  type="button"
                  className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => {
                    handleReport();
                  }}
                >
                  Signaler
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Modale de confirmation pour delete la story */}
      {user.id === story.user.id ? (
      <div
        id="story-delete-modal"
        tabIndex={-1}
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="story-delete-modal"
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
                Êtes-vous sûr de vouloir supprimer l'histoire ?
              </h3>
              <button
                data-modal-hide="story-delete-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                onClick={() => {
                  handleDelete(story.id);
                }}
              >
                Oui, je suis sûr
              </button>
              <button
                data-modal-hide="story-delete-modal"
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
  );
}
