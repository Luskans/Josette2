import { Link } from 'react-router-dom';
import ProfilFollow from './ProfilFollow';
import { useSelector } from 'react-redux';
import defaultProfil2 from '@/assets/defaultProfil2.webp';
import getImageUrl from '@/utils/getImageUrl';

export default function ProfilDetail() {
  const user = useSelector((state) => state.user.detail);
  const profil = useSelector((state) => state.profil.detail);

  const getTotalLike = () => {
    let totalLike = 0;
    profil.stories.forEach((story) => {
      totalLike += story.likes.length;
    });
    return totalLike;
  };

  const getTotalView = () => {
    let totalView = 0;
    profil.stories.forEach((story) => {
      totalView += story.viewCount;
    });
    return totalView;
  };

  return (
    <section className="flex flex-col mx-auto items-center border-b mb-16">
      {user && user.id === profil.id && (
        <Link to={`/profil/update/${profil.id}`} className="self-end">
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700">
            Modifier le profil
          </button>
        </Link>
      )}
      <div className="flex flex-col w-full md:flex-row gap-6 md:gap-16 mb-12 items-center md:justify-center text-gray-900 dark:text-white">
        <div className="w-[300px] min-w-[300px] mb-6 sm:mb-0">
          <img
            className="w-full rounded-[50%]"
            src={profil.image ? getImageUrl(profil.image.name) : defaultProfil2}
            alt={`${profil.name}'s profil picture`}
          />
        </div>
        <div className="flex flex-col items-center gap-8 md:max-w-lg">
          <div className="w-full gap-4 flex justify-center items-end">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold line-clamp-1.5">
              {profil.name}
            </h2>
            {user &&
                <ProfilFollow />
            }
          </div>
          <blockquote className="calli text-md lg:text-xl italic text-justify break-words font-semibold text-gray-500 dark:text-gray-300">
            <p>{profil.quote ? `"${profil.quote}"` : 'Nouvel arrivant ~'}</p>
          </blockquote>
          <p className="text-gray-500 text-justify leading-loose break-words dark:text-gray-400">
            {profil.description
              ? profil.description
              : 'Aucune description opour le moment.'}
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
            {user && user.id === profil.id
              ? 'personnes qui vous suivent'
              : 'personnes qui le suivent'}
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
  );
}
