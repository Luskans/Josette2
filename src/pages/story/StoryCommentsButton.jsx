import { useDispatch, useSelector } from 'react-redux';
import { getComments, setCurrentPage } from '@/store/commentSlice';

export default function StoryCommentsButton() {
  const dispatch = useDispatch();
  const story = useSelector((state) => state.story.detail);
  const totalPage = useSelector((state) => state.comment.totalPage);
  const currentPage = useSelector((state) => state.comment.currentPage);

  const handlePrevious = (storyId, currentPage) => {
    if (currentPage > 1) {
      dispatch(getComments(storyId, currentPage - 1));
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNext = (storyId, currentPage, totalPage) => {
    if (currentPage < totalPage) {
      dispatch(getComments(storyId, currentPage + 1));
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  return (
    <div className="flex items-center justify-center col-span-2">
      <div className="flex items-center justify-between w-full text-gray-600 dark:text-gray-400 bg-gray-100 rounded-lg dark:bg-gray-600 max-w-[128px] mx-2">
        <button
          type="button"
          className="inline-flex items-center justify-center h-8 px-1 w-6 bg-gray-100 rounded-s-lg dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-800"
          onClick={(e) => {
            e.preventDefault;
            handlePrevious(story.id, currentPage);
          }}
        >
          <svg
            className="w-2 h-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous page</span>
        </button>
        <span className="flex-shrink-0 mx-1 text-sm font-medium space-x-0.5 rtl:space-x-reverse">
          {currentPage} of {totalPage}
        </span>
        <button
          type="button"
          className="inline-flex items-center justify-center h-8 px-1 w-6 bg-gray-100 rounded-e-lg dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-800"
          onClick={(e) => {
            e.preventDefault;
            handleNext(story.id, currentPage, totalPage);
          }}
        >
          <svg
            className="w-2 h-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next page</span>
        </button>
      </div>
    </div>
  );
}
