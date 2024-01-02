import { useDispatch, useSelector } from 'react-redux';
import { fetchStory } from '../../store/storySlice';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { resetStory } from '../../store/storySlice';

export default function StoryView() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const loaded = useSelector((state) => state.story.loaded);
  const story = useSelector((state) => state.story.detail);

  useEffect(() => {
    dispatch(fetchStory(id));

    // Obligé de reset le state car le useEffect ne prend pas en compte l'id en dépendance
    return () => {
        dispatch(resetStory());
      }
  }, []);

  return (
    <>
      {loaded && (
        <>
          <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
            <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
              <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                <header className="mb-4 lg:mb-6 not-format">
                  <address className="flex items-center mb-6 not-italic">
                    <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                      <img
                        className="mr-4 w-16 h-16 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                        alt="Jese Leos"
                      />
                      <div>
                        <a
                          href="#"
                          rel="author"
                          className="text-xl font-bold text-gray-900 dark:text-white"
                        >
                          {story.user.name}
                        </a>
                        <p className="text-base text-gray-500 dark:text-gray-400">
                          Graphic Designer, educator &amp; CEO Flowbite
                        </p>
                        <p className="text-base text-gray-500 dark:text-gray-400">
                          <time
                            pubdate=""
                            dateTime="2022-02-08"
                            title="February 8th, 2022"
                          >
                            Feb. 8, 2022
                          </time>
                        </p>
                      </div>
                    </div>
                  </address>
                  <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                    {story.title}
                  </h1>
                </header>
                <p className="lead text-gray-900 dark:text-gray-100">
                  {story.content}
                </p>
                <figure>
                  <img
                    src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png"
                    alt=""
                  />
                  <figcaption>Digital art by Anonymous</figcaption>
                </figure>
              </article>
            </div>
          </main>
        </>
      )}
    </>
  );
}
