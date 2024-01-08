import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchStories } from '../../store/storiesSlice';
import BotNav from '../../components/BotNav';
import Notification from './Notification';
import Cta from './Cta';
import StoryCardMax from '../story/StoryCardMax';
import Carousel from './Carousel';

const MainContainer = styled.main`
  padding: 0 10%;
`;

export default function Home() {
  const dispatch = useDispatch();
  const loaded = useSelector((state) => state.stories.loaded);
  const storiesList = useSelector((state) => state.stories.list);
  const connected = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    // connected && dispatch(fetchStories());
    dispatch(fetchStories());
  }, [dispatch]);

  useEffect(() => {
    console.log('test storage on home', localStorage);
    user && console.log('test user on home', user);
    storiesList && console.log('test stories on home', storiesList);
  }, []);

  return (
    <>
      {connected ? <Carousel /> : <Cta />}
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
              storiesList.map(story => (
                <StoryCardMax key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>
      <BotNav />
    </>
  );
}
