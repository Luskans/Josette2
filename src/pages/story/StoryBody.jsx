import defaultStoryImage from '@/assets/story_image.jpg';
import { useSelector } from 'react-redux';

export default function StoryBody() {
    const story = useSelector((state) => state.story.detail);

  return (
    <main>
        <img
            src={story.image ? story.image.imagePath : defaultStoryImage}
            alt={`${story.name}'s cover picture`}
            className="mb-12 lg:mb-14 w-full"
        />

        <h1 className="mb-6 text-3xl font-extrabold leading-tight break-words text-gray-900 lg:mb-10 lg:text-4xl dark:text-white">
            {story.title}
        </h1>

        <p className="lead text-gray-900 break-words text-justify leading-loose dark:text-gray-100 mb-10">
            {story.content}
        </p>
    </main>
  )
}
