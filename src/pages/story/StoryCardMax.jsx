import localDate from '@/utils/formatDate';
import readingTime from '@/utils/getReadingTime';
import { Link } from 'react-router-dom';
import getColorByTheme from '@/utils/getColorByTheme';
import getImageUrl from '@/utils/getImageUrl';
import defaultProfil2 from '@/assets/defaultProfil2.webp';
import defaultStory from '@/assets/defaultStory.webp';
import { useState } from 'react';

export default function StoryCardMax({ story }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article 
    className="p-4 flex w-[300px] h-[350px] flex-col bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:mb-2 hover:-mt-2 hover:shadow-xl transition-all duration-300"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
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
      <div className="h-full min-h-[184px]">
        <h3 className="calli mb-2 text-lg line-clamp-2 min-h-14 break-words font-bold tracking-tight text-gray-900 dark:text-white">
          <Link to={`/story/view/${story.id}`}>{story.title}</Link>
        </h3>
        <Link to={`/story/view/${story.id}`}>
          {isHovered
          ? <p 
          className="mb-5 text-sm line-clamp-7 break-words text-justify font-light text-gray-500 dark:text-gray-400"
          >
            {story.synopsis}
          </p>
          : <img 
            className="mb-5 w-[266px] h-[150px]"
            src={story.image ? getImageUrl(story.image.name) : defaultStory}
            alt={`${story.title}'s story cover picture`}
            />
          }
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Link to={`/profil/view/${story.user.id}`}>
            <img
              className="w-10 h-10 rounded-full"
              src={story.user.image ? getImageUrl(story.user.image.name) : defaultProfil2}
              alt={`${story.user.name}'s profile picture`}
            />
          </Link>
          <div className="flex flex-col">
            <Link to={`/profil/view/${story.user.id}`}>
              <span className="author font-medium text-sm line-clamp-1 dark:text-white">{story.user.name}</span>
            </Link>
            <span className="font-light text-sm text-gray-500 dark:text-gray-400">{localDate(story.createdAt)}</span>
          </div>
        </div>
        <div className="flex flex-col justify-end items-end h-full gap-1.5 ml-0.5">
          <div className="flex gap-2.5">
            <p className="text-xs text-gray-500 dark:text-gray-300">{story.likes.length}</p>
            <svg
              className="w-4 h-4 text-gray-500 hover:text-gray-600 dark:text-gray-300 hover:dark:text-gray-200"
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 15C10.5304 15 11.0391 15.2107 11.4142 15.5858C11.7893 15.9609 12 16.4696 12 17H8C8 16.4696 8.21071 15.9609 8.58579 15.5858C8.96086 15.2107 9.46957 15 10 15Z"
                fill="currentColor"
              />
              <path
                d="M11.815 7H14.5C14.8094 7.00187 15.1149 6.93196 15.3927 6.79576C15.6704 6.65956 15.9128 6.46078 16.1007 6.21505C16.2887 5.96933 16.4171 5.68335 16.4758 5.37962C16.5345 5.07589 16.5219 4.76267 16.4391 4.46461C16.3563 4.16655 16.2055 3.89176 15.9985 3.66185C15.7915 3.43194 15.534 3.25319 15.2462 3.13963C14.9585 3.02608 14.6483 2.98083 14.3401 3.00745C14.0319 3.03406 13.734 3.1318 13.47 3.293C13.4877 3.19627 13.4977 3.0983 13.5 3C13.5017 2.59284 13.3787 2.19493 13.1474 1.85985C12.916 1.52478 12.5876 1.26863 12.2063 1.12591C11.825 0.983182 11.4091 0.960736 11.0146 1.06159C10.6201 1.16245 10.266 1.38176 10 1.69C9.73397 1.38176 9.37988 1.16245 8.98541 1.06159C8.59094 0.960736 8.17504 0.983182 7.79371 1.12591C7.41239 1.26863 7.08396 1.52478 6.85265 1.85985C6.62134 2.19493 6.49827 2.59284 6.5 3C6.50231 3.0983 6.51234 3.19627 6.53 3.293C6.26596 3.1318 5.96812 3.03406 5.65991 3.00745C5.35171 2.98083 5.04152 3.02608 4.75376 3.13963C4.466 3.25319 4.2085 3.43194 4.00151 3.66185C3.79453 3.89176 3.64369 4.16655 3.56088 4.46461C3.47806 4.76267 3.46551 5.07589 3.52423 5.37962C3.58294 5.68335 3.71131 5.96933 3.89925 6.21505C4.08719 6.46078 4.32956 6.65956 4.60732 6.79576C4.88508 6.93196 5.19065 7.00187 5.5 7H8.888M11.815 6.01499V9.24299M8.228 6.99999V9.27999M18.972 9.574C18.8671 9.95502 18.6401 10.2911 18.3258 10.5306C18.0114 10.7702 17.6272 10.8999 17.232 10.9C16.8281 10.9012 16.4345 10.7731 16.1086 10.5346C15.7828 10.296 15.5418 9.95937 15.421 9.574C15.2987 9.95819 15.0574 10.2935 14.7319 10.5315C14.4064 10.7695 14.0137 10.8977 13.6105 10.8977C13.2073 10.8977 12.8146 10.7695 12.4891 10.5315C12.1636 10.2935 11.9223 9.95819 11.8 9.574C11.6955 9.95694 11.4673 10.2946 11.151 10.5344C10.8347 10.7742 10.4479 10.9028 10.051 10.9C9.64027 10.9002 9.23963 10.7727 8.90458 10.5351C8.56954 10.2976 8.31667 9.96167 8.181 9.574C8.08341 9.95546 7.86093 10.2933 7.54902 10.5336C7.23712 10.7739 6.85374 10.9029 6.46 10.9C6.04517 10.8995 5.64039 10.7722 5.29992 10.5352C4.95944 10.2982 4.69953 9.96284 4.555 9.574C4.43288 9.95935 4.19103 10.2957 3.86462 10.5342C3.53821 10.7727 3.14424 10.9008 2.74 10.9C2.3448 10.8999 1.96055 10.7702 1.64623 10.5306C1.3319 10.2911 1.10487 9.95502 1 9.574V10C1 12.3869 1.94821 14.6761 3.63604 16.364C5.32387 18.0518 7.61305 19 10 19C12.3869 19 14.6761 18.0518 16.364 16.364C18.0518 14.6761 19 12.3869 19 10L18.972 9.574Z"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 14.5C8.05228 14.5 8.5 14.0523 8.5 13.5C8.5 12.9477 8.05228 12.5 7.5 12.5C6.94772 12.5 6.5 12.9477 6.5 13.5C6.5 14.0523 6.94772 14.5 7.5 14.5Z"
                fill="currentColor"
              />
              <path
                d="M12.5 14.5C13.0523 14.5 13.5 14.0523 13.5 13.5C13.5 12.9477 13.0523 12.5 12.5 12.5C11.9477 12.5 11.5 12.9477 11.5 13.5C11.5 14.0523 11.9477 14.5 12.5 14.5Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="flex gap-2.5">
            <p className="text-xs text-gray-500 dark:text-gray-300">{story.viewCount ? story.viewCount : 0}</p>
            <svg
              className="w-4 h-4 text-gray-500 hover:text-gray-600 dark:text-gray-300 hover:dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 14"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
              >
                <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
}
