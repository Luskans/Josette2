import defaultUserImage from '@/assets/user_image.webp';
import { useSelector } from 'react-redux';
import { axiosSecu } from '@/utils/axios';
import toast from 'react-hot-toast';
import getImageUrl from '@/utils/getImageUrl';
import { useNavigate } from 'react-router-dom';

export default function ProfilUpdate3({ handlePrev, blob }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.detail);
  const profil = useSelector((state) => state.profil.detail);
  const profilUpdate = useSelector((state) => state.profil.update);
  const imageUrl = blob && URL.createObjectURL(blob); 

  const blobToFile = (blob) => {
    if (!blob) {
      return;
    }

    const file = new File([blob], 'image.webp', {
      type: 'image/webp',
    });
    return file;
  };

  const handlePublish = (blob, profilUpdate) => {
    const image = blobToFile(blob);
    const formData = new FormData();
    formData.append('quote', profilUpdate.quote);
    formData.append('description', profilUpdate.description);
    formData.append('profilId', profil.id);
    if (image) {
      formData.append('image', image);
    }

    axiosSecu
        .post(`/users/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        toast.success('Profil mis à jour !', { duration: 9000 });
        navigate(`/profil/view/${profil.id}`);
      })
      .catch((error) => {
          toast.error("Une erreur est survenue.", { duration: 9000 });
      });
  };

  console.log('state redux', profilUpdate)

  return (
    <>
      <section className="flex flex-col w-full mx-auto items-center border-b max-w-4xl mb-16">
        <div className="flex flex-col w-full sm:flex-row gap-6 mb-12 items-center justify-between text-gray-900 dark:text-white">
          <div className="w-[300px] min-w-[300px]">
            {blob
            ? <img 
              src={imageUrl} 
              alt={`${profil.name}'s profil picture`} 
              className="w-full rounded-[50%]" 
            />
            : <img
              className="w-full rounded-[50%]"
              src={profil.image ? getImageUrl(profil.image.name) : defaultUserImage}
              alt={`${profil.name}'s profil picture`}
            />
            }
          </div>
          <div className="flex flex-col items-center gap-8">
            <div className="w-full gap-4 flex justify-center items-end">
              <h1 className="text-2xl md:text-4xl font-extrabold line-clamp-1.5">
                {profil.name}
              </h1>
            </div>
            <blockquote className="calli text-xl italic text-justify break-words font-semibold text-gray-500 dark:text-gray-300">
              <p>{profilUpdate.quote}</p>
            </blockquote>
            <p className="text-gray-500 text-justify leading-loose break-words dark:text-gray-400">
              {profilUpdate.description}
            </p>
          </div>
        </div>
      </section>
      <div className="w-full mt-12 flex justify-center items-center space-x-4 mt-4">
        <button
          onClick={handlePrev}
          type="button"
          className="text-gray-500 bg-white border border-gray-300 hover:bg-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-gray-400 dark:border-gray-500 dark:bg-gray-900 dark:hover:bg-gray-800"
        >
          Précédent
        </button>

        <button
          onClick={() => handlePublish(blob, profilUpdate)}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Publier
        </button>
      </div>
    </>
  );
}
