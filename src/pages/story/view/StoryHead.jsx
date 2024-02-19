import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import defaultUserImage from "@/assets/user_image.webp"
import StoryFollow from "./StoryFollow";
import { fullLocalDate } from "@/utils/formatDate";
import getImageUrl from '@/utils/getImageUrl';
import defaultProfil2 from '@/assets/defaultProfil2.webp';

export default function StoryHead() {
  const user = useSelector((state) => state.user.detail);
  const story = useSelector((state) => state.story.detail);

  return (
    <>
      <header className="flex items-center mb-6 not-italic">
        <div className="flex items-center mr-3 text-sm text-gray-900 dark:text-white">
          <Link
            to={`/profil/view/${story.user.id}`}
            rel="author"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            <img
              className="mr-4 w-16 h-16 rounded-full"
              src={story.user.image ? getImageUrl(story.user.image.name) : defaultProfil2}
              alt={`${story.user.name} profil picture`}
            />
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <Link
                to={`/profil/view/${story.user.id}`}
                rel="author"
                className="author text-2xl font-bold text-gray-900 dark:text-white"
              >
                {story.user.name}
              </Link>
              {user &&
                <StoryFollow />
              }
            </div>
            <p className="text-base text-gray-500 dark:text-gray-400">
              {story.updatedAt
                ? fullLocalDate(story.updatedAt)
                : fullLocalDate(story.createdAt)}
            </p>
          </div>
        </div>
      </header>
    </>
  );
}
