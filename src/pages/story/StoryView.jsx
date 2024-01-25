import axios from 'axios';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fullLocalDate } from '../../utils/formatDate';
import defaultUserImage from '../../assets/user_image.webp';

import { addFollow } from '../../store/userSlice';
import { getStory, resetLoaded, resetStory } from '../../store/storySlice';
import { getFollow } from '../../store/followSlice';
import { getComments } from '../../store/commentSlice';
import { getLike } from '../../store/likeSlice';
import { getFavorite } from '../../store/favoriteSlice';

import StoryBar from './StoryBar';
import StoryComments from './StoryComments';
import StoryBarOff from './StoryBarOff';

export default function StoryView() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const commentsAnchor = useRef(null);

  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.detail);
  const story = useSelector((state) => state.story.detail);
  const loaded = useSelector((state) => state.story.loaded);

  const apiURL = import.meta.env.VITE_API_URL;

  console.log('test1')
  useEffect(() => {
    console.log('test2')
    // dispatch(resetStory());
    dispatch(getStory(id));
    console.log('test3')
    // dispatch(getComments());
    // dispatch(getFollow());
    // dispatch(getLike());
    // dispatch(getFavorite());
    // user && console.log('storyview connected', user.id);
    // user && console.log('user avant dispatch', user);
    // story && console.log('story dans storyview', story);
    // Obligé de reset le state car le useEffect ne prend pas en compte l'id en dépendance
    return () => {
      dispatch(resetStory());
      // dispatch(resetLoaded());
    };
  }, []);

  useEffect(() => {
    user && console.log('storyview connected', user.id);
    user && console.log('user avant dispatch', user);
    story && console.log('story dans storyview', story);
  });

  // const handleFollow = (storyUserId) => {
  //   const data = {
  //     follower: user.id,
  //     followed: storyUserId,
  //   };
  //   axios
  //     .post(`${apiURL}/follows`, data, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       // console.log('follow action', response)
  //       dispatch(addFollow(storyUserId));
  //     })
  //     .then(() => {
  //       console.log('user apres dispatch', user);
  //     })
  //     .catch((error) => {
  //       error && console.log('follow action erreur');
  //     });
  // };

  // const handleUnfollow = (storyUserId) => {};

  const scrollToComments = () => {
    commentsAnchor.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      {loaded && (
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
                        {(user && (story.user.id !== user.id)) && (
                          <>
                            <p>.</p>
                            {user.imFollowing ? (
                              <button
                                onClick={() => handleFollow(story.user.id)}
                                className="leading-10 mt-0.5 text-gray-500 hover:text-gray-600 dark:text-gray-400 hover:dark:text-gray-300"
                              >
                                Suivre
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUnfollow(story.user.id)}
                                className="leading-10 mt-0.5 text-blue-500 hover:text-blue-600 dark:text-blue-400 hover:dark:text-blue-300"
                              >
                                Suivi
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

                {user
                ? <StoryBar id={1} story={story} onCommentIconClick={scrollToComments} />
                : <StoryBarOff id={1} story={story} onCommentIconClick={scrollToComments} />
                }

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

                {user
                ? <StoryBar id={2} story={story} />
                : <StoryBarOff id={2} story={story} />
                }

                <section className="not-format" ref={commentsAnchor}>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                      Commentaires ({story.comments.length})
                    </h2>
                  </div>
                  <form className="mb-6">
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                      <label htmlFor="comment" className="sr-only">
                        Écrivez vôtre commentaire ici ...
                      </label>
                      <textarea
                        id="comment"
                        rows={6}
                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                        placeholder="Write a comment..."
                        required=""
                        defaultValue={''}
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    >
                      Publier
                    </button>
                  </form>
                  {story.comments.map(comment => (
                    <StoryComments key={comment.id} comment={comment} />
                  ))}
                </section>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
}
