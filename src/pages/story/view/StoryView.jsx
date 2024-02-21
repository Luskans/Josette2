import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStory, resetStory } from '@/store/storySlice';
import StoryBar from './StoryBar';
import StoryBarOff from './StoryBarOff';
import StoryHead from './StoryHead';
import StoryBody from './StoryBody';
import StoryComments from './StoryComments';
import Loader from '@/components/Loader';

export default function StoryView() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const commentsAnchor = useRef(null);
  const user = useSelector((state) => state.user.detail);
  const story = useSelector((state) => state.story.detail);
  const storyLoaded = useSelector((state) => state.story.loaded);

  useEffect(() => {
    dispatch(getStory(id));

    return () => {
      dispatch(resetStory());
    }
  }, []);

  const scrollToComments = () => {
    commentsAnchor.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {storyLoaded && story
        ? <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
          <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
            <div className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
              <StoryHead />

              {user ? (
                <StoryBar
                  id={1}
                  onCommentIconClick={scrollToComments}
                />
              ) : (
                <StoryBarOff
                  id={1}
                  onCommentIconClick={scrollToComments}
                />
              )}

              <StoryBody />

              {user ? (
                <StoryBar id={2} />
              ) : (
                <StoryBarOff id={2} />
              )}

              <StoryComments ref={commentsAnchor} />
            </div>
          </div>
        </main>
        : <Loader />
      }
    </>
  );
}
