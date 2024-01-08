import storyThumbnail from '../../assets/story_thumbnail2.webp';
import styled from 'styled-components';
import localDate from '../../utils/formatDate';
import readingTime from '../../utils/getReadingTime';
import { Link } from 'react-router-dom';
import getColorByTheme from '../../utils/getColorByTheme';

export default function StoryCardMax({ story }) {

  return (
    // SANS IMAGE
    <article className="p-6 flex flex-col justify-between bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-between mb-5 text-gray-500">
        <div className="flex gap-2">
          {story.themes.map(theme => (
            <span key={theme.name} className={`${getColorByTheme(theme.name)} text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded`}>
              {theme.name}
            </span>
          ))}
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">{readingTime(story.content.length)}</span>
      </div>
      <h2 className="mb-2 text-xl line-clamp-2 font-bold tracking-tight text-gray-900 dark:text-white">
        <Link to={`/story/view/${story.id}`}>{story.title}</Link>
      </h2>
      <p className="mb-5 text-sm line-clamp-7 font-light text-gray-500 dark:text-gray-400">
        <Link to={`/story/view/${story.id}`}>{story.synopsis}</Link>
      </p>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Link to={`/profil/view/${story.user.id}`}>
            <img
              className="w-10 h-10 rounded-full"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
              alt="Jese Leos avatar"
            />
          </Link>
          <div className="flex flex-col">
            <Link to={`/profil/view/${story.user.id}`}>
              <span className="font-medium line-clamp-1 dark:text-white">{story.user.name}</span>
            </Link>
            <span className="font-light text-sm text-gray-500 dark:text-gray-400">{localDate(story.createdAt)}</span>
          </div>
        </div>
        <a
          href="#"
          className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Plus
          <svg
            className="ml-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
    </article>
  );
}
