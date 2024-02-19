import defaultStory from '@/assets/defaultStory.webp';
import { useSelector } from 'react-redux';
import getImageUrl from '@/utils/getImageUrl';

export default function StoryBody() {
    const story = useSelector((state) => state.story.detail);

  return (
    <main>
        <img
            src={story.image ? getImageUrl(story.image.name) : defaultStory}
            alt={`${story.title}'s cover picture`}
            className="mb-16 w-full"
        />

        <h1 className="calli mb-10 text-3xl font-extrabold leading-tight break-words text-gray-900 lg:mb-10 lg:text-4xl dark:text-white">
            {story.title}
        </h1>

        <p className="lead text-gray-900 break-words text-justify leading-loose dark:text-gray-100 mb-10">
            {story.content}
        </p>
    </main>
  )
}
