// import axios from 'axios';
import axiosBase, { axiosSecu } from '../../utils/axios';
import { useForm } from 'react-hook-form';

import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fullLocalDate } from '../../utils/formatDate';
import defaultUserImage from '../../assets/user_image.webp';

import { getStory, resetLoaded, resetStory } from '../../store/storySlice';
import { getComments, setCurrentPage } from '../../store/commentSlice';

import StoryBar from './StoryBar';
import StoryComment from './StoryComment';
import StoryBarOff from './StoryBarOff';
import toast from 'react-hot-toast';
import { deleteFollow, getFollow, postFollow } from '../../store/followSlice';

export default function StoryView() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const commentsAnchor = useRef(null);

  // const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.detail);
  const story = useSelector((state) => state.story.detail);
  const storyLoaded = useSelector((state) => state.story.loaded);
  const comments = useSelector((state) => state.comment.list);
  const commentsLoaded = useSelector((state) => state.comment.loaded);
  const totalPage = useSelector(state => state.comment.totalPage);
  const currentPage = useSelector(state => state.comment.currentPage);
  const totalComment = useSelector(state => state.comment.totalComment);
  const follow = useSelector((state) => state.follow.detail);
  const [authorFollowed, setAuthorFollowed] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchData() {
      await dispatch(getStory(id));
      if (user && user.id && story && story.user && story.user.id) {
        dispatch(getFollow(user.id, story.user.id));
      }
      dispatch(getComments(id, 1));
    }
    fetchData();

    console.log('follow on storyview', follow);
    return () => {
      dispatch(resetLoaded());
    };
  }, [authorFollowed]);

  const scrollToComments = () => {
    commentsAnchor.current.scrollIntoView({ behavior: 'smooth' });
  };

  const onNewCommentSubmit = (data) => {
    console.log('datas', data);
    axiosSecu
      // .post(`${apiURL}/comments`, data, {
      .post(`comments`, data, {
        headers: {
          'Content-Type': 'application/ld+json',
          // Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success('Commentaire publié !', { duration: 9000 });
      })
      .catch((error) => {
        toast.error('Une erreur est survenue.', { duration: 9000 });
      });
  };

  const handlePrevious = (storyId, currentPage) => {
    if (currentPage > 1) {
      dispatch(getComments(storyId, currentPage - 1));
      dispatch(setCurrentPage(currentPage - 1))
    }
  };

  const handleNext = (storyId, currentPage, totalPage) => {
    if (currentPage < totalPage) {
      dispatch(getComments(storyId, currentPage + 1));
      dispatch(setCurrentPage(currentPage + 1))
    }
  };

  const addFollow = (followerId, followedId) => {
    const data = {
      followerId: followerId,
      followedId: followedId,
    };
    dispatch(postFollow(data));
    setAuthorFollowed(!authorFollowed);
  };

  const removeFollow = (followId) => {
    console.log('follow id', follow);
    dispatch(deleteFollow(followId));
    setAuthorFollowed(!authorFollowed);
  };

  return (
    <>
      {storyLoaded && story && (
        <>
          <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
            <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
              <div className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                <section className="flex items-center mb-6 not-italic">
                  <div className="flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    <Link
                      to={`/profil/view/${story.user.id}`}
                      rel="author"
                      className="text-xl font-bold text-gray-900 dark:text-white"
                    >
                      <img
                        className="mr-4 w-16 h-16 rounded-full"
                        src={
                          story.user.image ? story.user.image : defaultUserImage
                        }
                        alt={`${story.user.name} profil picture`}
                      />
                    </Link>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3">
                        <Link
                          to={`/profil/view/${story.user.id}`}
                          rel="author"
                          className="text-xl font-bold text-gray-900 dark:text-white"
                        >
                          {story.user.name}
                        </Link>
                        {user && story.user.id !== user.id && (
                          <>
                            <p>.</p>
                            {follow.length != 0 ? (
                              <button
                                onClick={() => removeFollow(follow[0].id)}
                                className="leading-10 mt-0.5 text-blue-500 hover:text-blue-600 dark:text-blue-400 hover:dark:text-blue-300"
                              >
                                Suivi
                              </button>
                            ) : (
                              <button
                                onClick={() => addFollow(user.id, story.user.id)}
                                className="leading-10 mt-0.5 text-gray-500 hover:text-gray-600 dark:text-gray-400 hover:dark:text-gray-300"
                              >
                                Suivre
                              </button>
                            )}
                          </>
                        )}
                      </div>
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        <time
                          pubdate=""
                          dateTime="2022-02-08"
                          title="February 8th, 2022"
                        >
                          {story.updatedAt
                            ? fullLocalDate(story.updatedAt)
                            : fullLocalDate(story.createdAt)}
                        </time>
                      </p>
                    </div>
                  </div>
                </section>

                {user ? (
                  <StoryBar
                    id={1}
                    story={story}
                    onCommentIconClick={scrollToComments}
                  />
                ) : (
                  <StoryBarOff
                    id={1}
                    story={story}
                    onCommentIconClick={scrollToComments}
                  />
                )}

                <img
                  src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png"
                  alt=""
                  className="mb-12 lg:mb-14 w-full"
                />

                <h1 className="mb-4 text-3xl font-extrabold leading-tight break-words text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                  {story.title}
                </h1>

                <p className="lead text-gray-900 break-words text-justify leading-loose dark:text-gray-100 mb-10">
                  {story.content}
                </p>

                {user ? (
                  <StoryBar id={2} story={story} />
                ) : (
                  <StoryBarOff id={2} story={story} />
                )}

                <section className="not-format" ref={commentsAnchor}>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                      Commentaires ({totalComment})
                    </h2>
                  </div>
                  <form onSubmit={handleSubmit(onNewCommentSubmit)} className="mb-6">
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                      <label htmlFor="comment" className="sr-only">
                        Écrivez votre commentaire ici ...
                      </label>
                      <textarea
                        id="content"
                        name="content"
                        rows={6}
                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                        placeholder="Écrivez votre commentaire..."
                        required=""
                        defaultValue={''}
                        {...register('content', {
                          required: {
                            value: true,
                            message: 'Un commentaire est requis.',
                          },
                          minLength: {
                            value: 4,
                            message:
                              'Le commentaire doit contenir au moins 4 caractères.',
                          },
                          maxLength: {
                            value: 512,
                            message:
                              'Le commentaire doit contenir au maximum 512 caractères.',
                          },
                          pattern: {
                            value:
                              /^(?=[A-Za-z0-9 ]*[A-Za-z]){4}[A-Za-z0-9 ]*$/,
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
                      name="userId"
                      id="userId"
                      value={user.id}
                      {...register('userId')}
                    />
                    <input
                      type="hidden"
                      name="storyId"
                      id="storyId"
                      value={story.id}
                      {...register('storyId')}
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    >
                      Publier
                    </button>
                  </form>

                  {comments.map(comment => (
                    <StoryComment key={comment.id} comment={comment} />
                  ))}

                  <div className="flex items-center justify-center col-span-2">
                    <div className="flex items-center justify-between w-full text-gray-600 dark:text-gray-400 bg-gray-100 rounded-lg dark:bg-gray-600 max-w-[128px] mx-2">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center h-8 px-1 w-6 bg-gray-100 rounded-s-lg dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-800"
                        onClick={(e) => {
                          e.preventDefault;
                          handlePrevious(id, currentPage);
                        }}
                      >
                        <svg
                          className="w-2 h-2 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 1 1 5l4 4"
                          />
                        </svg>
                        <span className="sr-only">Previous page</span>
                      </button>
                      <span className="flex-shrink-0 mx-1 text-sm font-medium space-x-0.5 rtl:space-x-reverse">
                        {currentPage} of {totalPage}
                      </span>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center h-8 px-1 w-6 bg-gray-100 rounded-e-lg dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-800"
                        onClick={(e) => {
                          e.preventDefault;
                          handleNext(id, currentPage, totalPage);
                        }}
                      >
                        <svg
                          className="w-2 h-2 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                          />
                        </svg>
                        <span className="sr-only">Next page</span>
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
}
