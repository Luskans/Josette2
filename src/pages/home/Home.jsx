import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getStories, resetStories } from '../../store/storySlice';
import BotNav from '../../components/BotNav';
import Notification from './Notification';
import Cta from './Cta';
import StoryCardMax from '../story/StoryCardMax';
import Carousel from './Carousel';

export default function Home() {
  const dispatch = useDispatch();
  const loaded = useSelector((state) => state.story.loaded);
  const storyList = useSelector((state) => state.story.list);
  const user = useSelector((state) => state.user.detail);
  const search = useSelector((state) => state.story.search);

  console.log('user sur home', user)

  useEffect(() => {
    dispatch(getStories("order[createdAt]=asc", 1));

    return () => {
      dispatch(resetStories());
    };
  }, []);

  const title = () => {
    if (search === 'order[createdAt]=asc') {
        return "date croissante";
    } else if (search === 'order[createdAt]=desc') {
        return "date décroissante";
    } else if (search === 'byReadingTime=true&order=ASC') {
        return "temps de lecture croissant";
    } else if (search === 'byReadingTime=true&order=DESC') {
        return "temps de lecture décroissant";
    } else if (search === 'byLikes=true&order=ASC') {
        return "nombre de bravos croissant";
    } else if (search === 'byLikes=true&order=DESC') {
        return "nombre de bravos décroissant";
    } else if (search === 'order[viewCount]=asc') {
        return "nombre de vues croissant";
    } else if (search === 'order[viewCount]=desc') {
        return "nombre de vues décroissant";
    } else if (search.startsWith('themeName=')) {
        return `thème ${search.split('=')[1]}`;
    } else if (search.startsWith('title[]=')) {
        return `titre qui contient "${search.split('=')[1]}"`;
    } else {
        return "date croissante";
    }
  }

  return (
    <>
      {user ? <Carousel /> : <Cta />}
      <section className="bg-white dark:bg-gray-900">
        <div className="py-12 px-4 mx-auto max-w-screen-xl lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h1 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Histoires par {title()}
            </h1>
          </div>
          <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            {loaded &&
              storyList.map(story => (
                <StoryCardMax key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>
      <BotNav page={'home'} />
    </>
  );
}
