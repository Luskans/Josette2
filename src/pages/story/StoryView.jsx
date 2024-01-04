import { useDispatch, useSelector } from 'react-redux';
import { fetchStory } from '../../store/storySlice';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { resetStory } from '../../store/storySlice';
import localDate, { fullLocalDate } from '../../utils/formatDate';
import StoryComments from './StoryComments';
import StoryBar from './StoryBar';

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
    // <>
    //   {loaded && (
    //     <>
    //       <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
    //         <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
    //           <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
    //             <header className="mb-4 lg:mb-6 not-format">
    //               <address className="flex items-center mb-6 not-italic">
    //                 <div className="flex items-center mr-3 text-sm text-gray-900 dark:text-white">
    //                   <img
    //                     className="mr-4 w-16 h-16 rounded-full"
    //                     src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
    //                     alt="Jese Leos"
    //                   />
    //                   <div className="flex flex-col">
    //                     <div className="flex items-center gap-3">
    //                       <a
    //                         href="#"
    //                         rel="author"
    //                         className="text-xl font-bold text-gray-900 dark:text-white"
    //                       >
    //                         {story.user.name}
    //                       </a>
    //                       <p>.</p>
    //                       <a
    //                         href="#"
    //                         className="leading-10 text-gray-500 dark:text-gray-400"
    //                       >
    //                         Follow
    //                       </a>
    //                     </div>
    //                     <p className="text-base text-gray-500 dark:text-gray-400">
    //                       <time
    //                         pubdate=""
    //                         dateTime="2022-02-08"
    //                         title="February 8th, 2022"
    //                       >
    //                         {(story.updatedAt) ? fullLocalDate(story.updatedAt) : fullLocalDate(story.createdAt)}
    //                       </time>
    //                     </p>
    //                   </div>
    //                 </div>
    //               </address>

    //               <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
    //                 {story.title}
    //               </h1>
    //             </header>
    //             <p className="lead text-gray-900 dark:text-gray-100">
    //               {story.content}
    //             </p>
    //             <figure>
    //               <img
    //                 src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png"
    //                 alt=""
    //               />
    //               <figcaption>Digital art by Anonymous</figcaption>
    //             </figure>
    //           </article>
    //         </div>
    //       </main>
    //     </>
    //   )}
    // </>

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
                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                        alt="Jese Leos"
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
                        <p>.</p>
                        <a
                          href="#"
                          className="leading-10 text-gray-500 hover:text-gray-600 dark:text-gray-400 hover:dark:text-gray-300"
                        >
                          Follow
                        </a>
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

                <StoryBar id={1}/>

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

                <StoryBar id={2}/>
                <StoryComments />
              </article>
            </div>
          </main>
        </>
      )}
    </>
  )
}
