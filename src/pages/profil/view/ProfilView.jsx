import { useDispatch, useSelector } from 'react-redux';
import { getProfil, resetProfil } from '@/store/profilSlice';
import BotNav from '@/components/BotNav';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfilDetail from './ProfilDetail';
import ProfilStories from './ProfilStories';
import Loader from '@/components/Loader';

export default function ProfilView() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const profilLoaded = useSelector((state) => state.profil.loaded);

  useEffect(() => {
    dispatch(getProfil(id));

    return () => {
      dispatch(resetProfil());
    };
  }, []);

  return (
    <>
      {profilLoaded
        ? <main className="mx-auto max-w-screen-xl bg-white dark:bg-gray-900 px-6 pt-10">
          <ProfilDetail />
          <ProfilStories />
        </main>
        : <Loader />
      }

      <BotNav page={'profil'} />
    </>
  );
}
