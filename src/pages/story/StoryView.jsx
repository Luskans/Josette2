import { useDispatch, useSelector } from 'react-redux';
import { fetchStory } from '../../store/storySlice';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { resetStory } from '../../store/storySlice';
import localDate, { fullLocalDate } from '../../utils/formatDate';
import StoryComments from './StoryComments';
import StoryBar from './StoryBar';
import defaultUserImage from '../../assets/user_image.webp';
import axios from 'axios';

export default function StoryView() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const loaded = useSelector((state) => state.story.loaded);
  const story = useSelector((state) => state.story.detail);
  const connected = JSON.parse(localStorage.getItem('user'));

  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    dispatch(fetchStory(id));
    console.log('storyview connected', connected.id)
    // Obligé de reset le state car le useEffect ne prend pas en compte l'id en dépendance
    return () => {
        dispatch(resetStory());
    }
  }, []);

  const handleFollow = (storyUserId) => {
    axios
      .post(`${apiURL}/follow`, storyUserId)
      .then((response) => {
        toast.success('Connexion réussie !', { duration: 9000 });
        dispatch(login(response.data.token));

        console.log('redux token', token); // pas affiché la premiere fois car redux asynchrone
        console.log('redux user', user);
      })
      .catch((error) => {
        if (error) {
          toast.error("Problème pour suivre l'auteur.", { duration: 9000 });
        }
      });
  }

  const handleUnfollow = (storyUserId) => {
    
  }

  return (
    <>
      {loaded && (
        <>
          <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
            <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
              <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                <address className="flex items-center mb-6 not-italic">
                  <div className="flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    <Link
                      to={`/profil/view/${story.user.id}`}
                      rel="author"
                      className="text-xl font-bold text-gray-900 dark:text-white"
                    >
                      <img
                        className="mr-4 w-16 h-16 rounded-full"
                        src={(story.user.image) ? story.user.image : defaultUserImage}
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
                        {(story.user.id === connected.id) &&
                        <>
                          <p>.</p>
                          {(connected.imFollowing)
                          ? <button
                              onClick={() => handleFollow(story.user.id)}
                              className="leading-10 mt-0.5 text-gray-500 hover:text-gray-600 dark:text-gray-400 hover:dark:text-gray-300"
                            >
                              Suivre
                            </button>
                          : <button
                              onClick={() => handleUnfollow(story.user.id)}
                              className="leading-10 mt-0.5 text-blue-500 hover:text-blue-600 dark:text-blue-400 hover:dark:text-blue-300"
                            >
                              Suivi
                            </button>
                          }
                        </>
                        }
                      </div>
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        <time
                          pubdate=""
                          dateTime="2022-02-08"
                          title="February 8th, 2022"
                        >
                          {(story.updatedAt) ? fullLocalDate(story.updatedAt) : fullLocalDate(story.createdAt)}
                        </time>
                      </p>
                    </div>
                  </div>
                </address>

                <StoryBar id={1} story={story} />

                <img
                  src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png"
                  alt=""
                  className="mb-12 lg:mb-14"
                />              

                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                  {story.title}
                </h1>
                
                <p className="lead text-gray-900 dark:text-gray-100 mb-10">
                  {story.content}
                </p>

                <StoryBar id={2} story={story} />
                <StoryComments />
              </article>
            </div>
          </main>
        </>
      )}
    </>
  )
}
