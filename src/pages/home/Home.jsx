import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getStories } from '../../store/storySlice';
import BotNav from '../../components/BotNav';
import Notification from './Notification';
import Cta from './Cta';
import StoryCardMax from '../story/StoryCardMax';
import Carousel from './Carousel';

export default function Home() {
  const dispatch = useDispatch();
  const loaded = useSelector((state) => state.story.loaded);
  const storyList = useSelector((state) => state.story.list);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);

  useEffect(() => {
    console.log('test storage on home', localStorage);
    user && console.log('test user on home', user);
    storyList && console.log('test stories on home', storyList);
  }, []);

  return (
    <>
      {user ? <Carousel /> : <Cta />}
      <section className="bg-white dark:bg-gray-900">
        <div className="py-12 px-4 mx-auto max-w-screen-xl lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Histoires par date
            </h2>
          </div>
          {/* <div className="grid gap-8 lg:grid-cols-2"> */}
          <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {/* <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2"> */}
            {loaded &&
              storyList.map(story => (
                <StoryCardMax key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>
      <BotNav />
    </>
  );
}
