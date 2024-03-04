import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStories, resetStories } from "@/store/storySlice";
import StoryCardMin from "@/pages/story/StoryCardMin";
import Loader from "@/components/Loader";

export default function ProfilStories() {
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.story.list);
  const storiesLoaded = useSelector((state) => state.story.loaded);
  const nameSearch = useSelector((state) => state.story.nameSearch);
  const profil = useSelector((state) => state.profil.detail);

  useEffect(() => {
    dispatch(getStories(`user.id[]=${profil.id}&order[createdAt]=asc`, 1));

    return () => {
      dispatch(resetStories());
    };
  }, []);

  return (
    <section className="pb-16">
      <h2 className="text-center text-2xl md:text-4xl font-extrabold mb-8 md:mb-10 text-gray-900 dark:text-white">
        Histoires de l'auteur par {nameSearch}
      </h2>
      <span className="block text-center text-2xl md:text-4xl mb-8 md:mb-10 text-gray-900 dark:text-white">
        ~
      </span>
      <div className="flex flex-wrap justify-center gap-5 items-center">
        {storiesLoaded
          ? <>
            {stories.map((story) => (
              <StoryCardMin key={story.id} story={story} />
            ))}
          </>
          : <Loader />
        }
      </div>
    </section>
  )
}
