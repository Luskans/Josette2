import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getStories, resetStories } from '@/store/storySlice';
import BotNav from '@/components/BotNav';
import Cta from './Cta';
import StoryCardMax from '@/pages/story/StoryCardMax';
import Carousel from './Carousel';
import Loader from '@/components/Loader';

export default function Home() {
  const dispatch = useDispatch();
  const loaded = useSelector((state) => state.story.loaded);
  const storyList = useSelector((state) => state.story.list);
  const user = useSelector((state) => state.user.detail);
  const nameSearch = useSelector((state) => state.story.nameSearch);

  useEffect(() => {
    dispatch(getStories("order[createdAt]=asc", 1));

    return () => {
      dispatch(resetStories());
    };
  }, []);

  return (
    <>
      {user ? <Carousel /> : <Cta />}
      <section className="bg-white dark:bg-gray-900">
        <div className="py-12 px-4 mx-auto max-w-screen-2xl lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Histoires par {nameSearch}
            </h1>
            <span className="block text-center text-2xl md:text-4xl  mb-8 md:mb-10 text-gray-900 dark:text-white">
              ~
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {loaded
              ? storyList.map(story => (
                <StoryCardMax key={story.id} story={story} />
              ))
              : <Loader />
            }
          </div>
        </div>
      </section>
      <BotNav page={'home'} />
    </>
  );
}
