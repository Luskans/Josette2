import { useDispatch, useSelector } from 'react-redux';
import { deleteFollow, getFollow, postFollow, resetFollow } from '@/store/followSlice';
import { useEffect, useState } from 'react';

export default function ProfilFollow() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.detail);
  const profil = useSelector((state) => state.profil.detail);
  const follow = useSelector((state) => state.follow.detail);
  const [authorFollowed, setAuthorFollowed] = useState(false);

  useEffect(() => {
    dispatch(getFollow(user.id, profil.id));
    // if (profil.id) {
    //   dispatch(getFollow(user.id, profil.id));
    // }

    return () => {
      dispatch(resetFollow());
    };
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
      {user && user.id !== profil.id && (
        <>
          <p className="text-md md:text-xl">.</p>
          {(follow.length != 0) ? (
            <button
              onClick={() => removeFollow(follow[0].id)}
              className="text-md md:text-xl text-blue-500 hover:text-blue-600 dark:text-blue-400 hover:dark:text-blue-300"
            >
              Suivi
            </button>
          ) : (
            <button
              onClick={() => addFollow(user.id, profil.id)}
              className="text-md md:text-xl text-gray-500 hover:text-gray-600 dark:text-gray-400 hover:dark:text-gray-300"
            >
              Suivre
            </button>
          )}
        </>
      )}
    </>
  )
}
