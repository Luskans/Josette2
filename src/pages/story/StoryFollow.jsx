import { useDispatch, useSelector } from 'react-redux';
import { deleteFollow, getFollow, postFollow, resetFollow } from '@/store/followSlice';
import { useEffect, useState } from 'react';

export default function StoryFollow() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.detail);
  const story = useSelector((state) => state.story.detail);
  const follow = useSelector((state) => state.follow.detail);
  const [authorFollowed, setAuthorFollowed] = useState(false);

  useEffect(() => {
    dispatch(getFollow(user.id, story.user.id));

    // if (user.id && story.user && story.user.id) {
    //   dispatch(getFollow(user.id, story.user.id));
    // }

    return () => {
      dispatch(resetFollow());
    }
  }, [authorFollowed])

  const addFollow = (followerId, followedId) => {
    const data = {
      followerId: followerId,
      followedId: followedId,
    };
    dispatch(postFollow(data));
    setAuthorFollowed(!authorFollowed);
  };

  const removeFollow = (followId) => {
    console.log('follow id', follow);
    dispatch(deleteFollow(followId));
    setAuthorFollowed(!authorFollowed);
  };

  return (
    <>
      {user && story.user.id !== user.id && (
        <>
          <p>.</p>
          {(follow.length != 0) ? (
            <button
              onClick={() => removeFollow(follow[0].id)}
              className="leading-10 mt-0.5 text-blue-500 hover:text-blue-600 dark:text-blue-400 hover:dark:text-blue-300"
            >
              Suivi
            </button>
          ) : (
            <button
              onClick={() => addFollow(user.id, story.user.id)}
              className="leading-10 mt-0.5 text-gray-500 hover:text-gray-600 dark:text-gray-400 hover:dark:text-gray-300"
            >
              Suivre
            </button>
          )}
        </>
      )}
    </>
  )
}
