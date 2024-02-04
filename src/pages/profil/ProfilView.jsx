import { useDispatch, useSelector } from 'react-redux';
import { getProfil, resetProfil } from '../../store/profilSlice';
import BotNav from '../../components/BotNav';
import StoryCardMin from '../story/StoryCardMin';
import userImage from '../../assets/user_image.webp';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { initFlowbite } from 'flowbite';
import { deleteFollow, getFollow, postFollow, resetFollow } from '../../store/followSlice';
import { getStories, resetStories } from '../../store/storySlice';

export default function ProfilView() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const user = useSelector((state) => state.user.detail);
  const loaded = useSelector((state) => state.profil.loaded);
  const profil = useSelector((state) => state.profil.detail);
  const follow = useSelector((state) => state.follow.detail);
  const stories = useSelector((state) => state.story.list);
  const search = useSelector((state) => state.story.search);
  const [authorFollowed, setAuthorFollowed] = useState(false);

  // useEffect(() => {
  //   dispatch(fetchProfil(id));
    
  //   // Obligé de reset le state car le useEffect ne prend pas en compte l'id en dépendance
  //   return () => {
  //     dispatch(resetProfil());
  //   };
  // }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     await dispatch(getProfil(id));
  //     await dispatch(getFollow(user.id, profil.id));
  //     await dispatch(getStories(`user.id[]=${profil.id}&order[createdAt]=asc`, 1))
  //   }
  //   fetchData();

  //   console.log('follow on profilview', follow);
  //   return () => {
  //     dispatch(resetProfil());
  //     dispatch(resetFollow());
  //     dispatch(resetStories());
  //   };
  // }, [authorFollowed]);

  useEffect(() => {
    dispatch(getProfil(id));
  }, [id]);
  
  useEffect(() => {
    if (profil.id) {
      dispatch(getFollow(user.id, profil.id));
      dispatch(getStories(`user.id[]=${profil.id}&order[createdAt]=asc`, 1));
    }
  }, [profil.id, user.id, authorFollowed]);
  
  useEffect(() => {
    initFlowbite();
  });

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

  const getTotalLike = () => {
    let totalLike = 0;
    profil.stories.forEach(story => {
      totalLike += story.likes.length;
    })
    return totalLike;
  }

  const getTotalView = () => {
    let totalView = 0;
    profil.stories.forEach(story => {
      totalView += story.viewCount;
    })
    return totalView;
  }

  const title = () => {
    if (search === 'order[createdAt]=asc') {
        return "date croissante";
    } else if (search === 'order[createdAt]=desc') {
        return "date décroissante";
    } else if (search === 'byReadingTime=true&order=ASC') {
        return "temps de lecture croissant";
    } else if (search === 'byReadingTime=true&order=DESC') {
        return "temps de lecture décroissant";
    } else if (search === 'byLikes=true&order=ASC') {
        return "nombre de bravos croissant";
    } else if (search === 'byLikes=true&order=DESC') {
        return "nombre de bravos décroissant";
    } else if (search === 'order[viewCount]=asc') {
        return "nombre de vues croissant";
    } else if (search === 'order[viewCount]=desc') {
        return "nombre de vues décroissant";
    } else if (search.startsWith('themeName=')) {
        return `thème ${search.split('=')[1]}`;
    } else if (search.startsWith('title[]=')) {
        return `titre qui contient "${search.split('=')[1]}"`;
    } else {
        return "date croissante";
    }
  }

  return (
    <>
      {loaded && (
        <main className="bg-white dark:bg-gray-900 px-6 pt-10 antialiased">
          <section className="flex flex-col mx-auto items-center border-b max-w-4xl mb-16">
            {(user.id === profil.id) && (
              <button className="self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700">
                Modifier le profil
              </button>
            )}
            <div className="flex flex-col w-full sm:flex-row gap-6 mb-12 items-center text-gray-900 dark:text-white">
              <div className="w-[300px] min-w-[300px]">
                <img className="w-full" src={profil.image ? profil.image.imagePath : userImage} alt={`${profil.name}'s profil picture`} />
              </div>
              <div className="flex flex-col items-center gap-8">
                <div className="w-full gap-4 flex justify-center items-end">
                  {/* <div></div> */}
                  <h2 className="text-2xl md:text-4xl font-extrabold line-clamp-1.5">
                    {profil.name}
                  </h2>
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
                </div>
                <blockquote className="text-xl italic text-justify break-words font-semibold text-gray-500 dark:text-white">
                  <p>{profil.quote ? `"${profil.quote}"` : "Nouvel arrivant ~"}</p>
                </blockquote>
                <p className="text-gray-500 text-justify leading-loose break-words dark:text-gray-400">
                  {profil.description ? profil.description : "Aucune description opour le moment."}
                </p>
              </div>
            </div>
            <div className="grid w-full gap-8 text-gray-900 grid-cols-2 md:grid-cols-3 dark:text-white mb-12">
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  {profil.stories.length}
                </dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">
                  histoires publiées
                </dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  {getTotalView()}
                </dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">
                  total vues
                </dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  {getTotalLike()}
                </dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">
                  total bravos
                </dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  {profil.whoFollowMe.length}
                </dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">
                  {(user.id === profil.id) ? "personnes qui vous suivent" : "personnes qui le suivent"}
                </dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                {profil.imFollowing.length}
                </dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">
                  personnes suivies
                </dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  {profil.comments.length}
                </dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">
                  commentaires publiés
                </dd>
              </div>
            </div>
          </section>

          <section className="pb-16">
            {/* <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"> */}
            <h2 className="flex justify-center text-2xl md:text-4xl font-extrabold line-clamp-1 mb-8 md:mb-10 text-gray-900 dark:text-white">
              Histoires de l'auteur par {title()}
            </h2>
            <div className="flex flex-wrap justify-center gap-5 items-center">
              {/* {profil.stories.map((story) => (
                <StoryCardMin key={story.id} story={story} />
              ))} */}
              {stories.map((story) => (
                <StoryCardMin key={story.id} story={story} />
              ))}
            </div>
          </section>
        </main>
      )}

      <BotNav page={'profil'} />
    </>
  );
}
