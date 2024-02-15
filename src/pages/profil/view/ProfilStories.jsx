import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStories, resetStories } from "../../../store/storySlice";
import StoryCardMin from "../../story/StoryCardMin";

export default function ProfilStories() {
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.story.list);
  const search = useSelector((state) => state.story.search);
  const profil = useSelector((state) => state.profil.detail);


  useEffect(() => {
    dispatch(getStories(`user.id[]=${profil.id}&order[createdAt]=asc`, 1));
    // if (profil.id) {
    //   dispatch(getStories(`user.id[]=${profil.id}&order[createdAt]=asc`, 1));
    // }

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
    <section className="pb-16">
      {/* <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"> */}
      <h2 className="text-center text-2xl md:text-4xl font-extrabold mb-8 md:mb-10 text-gray-900 dark:text-white">
        Histoires de l'auteur par {title()}
      </h2>
      <div className="flex flex-wrap justify-center gap-5 items-center">
        {/* {profil.stories.map((story) => (
          <StoryCardMin key={story.id} story={story} />
        ))} */}
        {stories.map((story) => (
          <StoryCardMin key={story.id} story={story} />
        ))}
      </div>
    </section>
  )
}
