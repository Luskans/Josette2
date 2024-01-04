import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../store/userSlice';
import BotNav from '../../components/BotNav';
import StoryCardMin from '../story/StoryCardMin';
import userImage from '../../assets/user_image.webp';
import { useEffect } from 'react';
import { resetUser } from '../../store/userSlice';
import { Link, useParams } from 'react-router-dom';
import { initFlowbite } from 'flowbite';

export default function ProfilView() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const loaded = useSelector((state) => state.user.loaded);
  const user = useSelector((state) => state.user.detail);

  
  useEffect(() => {
    dispatch(fetchUser(id));
    
    // Obligé de reset le state car le useEffect ne prend pas en compte l'id en dépendance
    return () => {
      dispatch(resetUser());
    };
  }, []);
  
  useEffect(() => {
    initFlowbite();
  });

  return (
    <>
      {loaded && (
        <main className="bg-white dark:bg-gray-900 px-6 pt-10 antialiased">
          <section className="flex flex-col mx-auto items-center border-b max-w-4xl mb-16">
            <div className="flex flex-col w-full sm:flex-row gap-6 mb-12 items-center text-gray-900 dark:text-white">
              <div className="w-[300px] min-w-[300px]">
                <img className="w-full" src={userImage} alt="" />
              </div>
              <div className="flex flex-col items-center gap-5">
                <div className="w-full flex justify-between items-center">
                  <div></div>
                  <h2 className="text-3xl md:text-4xl font-extrabold">
                    {user.name}
                  </h2>
                  <div>
                    <button
                      id="addUserButton"
                      data-tooltip-target="tooltip-addUser"
                      type="button"
                      className="inline-flex flex-col items-center justify-center mt-3"
                    >
                      <svg
                        className="w-6 h-6 text-blue-600 dark:text-blue-300 hover:text-blue-700 hover:dark:text-blue-200"
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
                          d="M13 8h6m-3 3V5m-6-.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM5 11h3a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"
                        />
                      </svg>
                    </button>
                    <div
                      id="tooltip-addUser"
                      role="tooltip"
                      className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                    >
                      Suivre l'auteur
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  </div>
                </div>
                <blockquote className="text-xl italic font-semibold text-gray-500 dark:text-white">
                  <p>
                    "Flowbite is just awesome. It contains tons of predesigned
                    components and pages starting from login screen."
                  </p>
                </blockquote>
                <p className="text-gray-500 dark:text-gray-400">
                  {user.description}
                  Track work across the enterprise through an open,
                  collaborative platform. Link issues across Jira and ingest
                  data from other software development tools, so your IT support
                  and operations teams have richer contextual information to
                  rapidly respond to requests, incidents, and changes.
                </p>
              </div>
            </div>
            <div className="grid w-full gap-8 text-gray-900 grid-cols-3 dark:text-white mb-12">
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  73M+
                </dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">
                  histoires
                </dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  1B+
                </dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">
                  total vues
                </dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  4M+
                </dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">
                  total likes
                </dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  73M+
                </dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">
                  followers
                </dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  1B+
                </dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">
                  personnes suivies
                </dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  4M+
                </dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">
                  organizations
                </dd>
              </div>
            </div>
          </section>

          <section className="pb-16">
            <div className="flex flex-wrap justify-center gap-4 items-center">
              {user.stories.map((story) => (
                <StoryCardMin key={story.id} story={story} />
              ))}
            </div>
          </section>
        </main>
      )}

      <BotNav />
    </>
  );
}
