import { useDispatch, useSelector } from 'react-redux';
import { getProfil, resetProfil } from '@/store/profilSlice';
import userImage from '@/assets/user_image.webp';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { initFlowbite } from 'flowbite';
import ProfilFollow from '@/pages/profil/view/ProfilFollow';
import axiosBase, { axiosSecu } from '@/utils/axios';
import toast from 'react-hot-toast';
import { Controller, useForm } from 'react-hook-form';
import ImgCrop from '@/components/Crop/ImgCrop';

export default function ProfilUpdate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  const user = useSelector((state) => state.user.detail);
  const loaded = useSelector((state) => state.profil.loaded);
  const profil = useSelector((state) => state.profil.detail);

  const {
    handleSubmit,
    register,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getProfil(id));
    if (user.id !== profil.id) {
      navigate('/');
    }

    return () => {
      dispatch(resetProfil());
    };
  }, []);

  useEffect(() => {
    initFlowbite();
  });

  const onSubmit = (data) => {
    console.log('datas', data);
    axiosSecu
    // .post(`${apiURL}/stories`, data, {
    .patch(`/users/${id}`, data, {
      headers: {
        'Content-Type': 'application/merge-patch+json',
        // 'Authorization': `Bearer ${token}`
      },
    })
    .then((response) => {
      toast.success('Profil modifé !', { duration: 9000 });
      navigate(`/profil/view/${id}`);
    })
    .catch((error) => {
      toast.error('Une erreur est survenue.', { duration: 9000 });
      // if (error.response.data.detail === 'Title already used.') {
      //   toast.error("Nom d'histoire déjà utilisé.", { duration: 9000 });
      // } else {
      //   toast.error('Une erreur est survenue.', { duration: 9000 });
      // }
    });
  };

  return (
    <>
      {loaded && (
        <main className="bg-white dark:bg-gray-900 px-6 pt-10 antialiased">
          <section className="flex flex-col w-full max-w-3xl mx-auto gap-6 items-center text-gray-900 dark:text-white">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full items-center gap-8">
              <h2 className="text-2xl md:text-4xl font-extrabold line-clamp-1.5">
                {profil.name}
              </h2>

              <div className="w-full">
                <label
                  htmlFor="quote"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Citation
                </label>
                <textarea
                  rows={4}
                  name="quote"
                  id="quote"
                  className="text-xl italic font-semibold bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={
                    profil.quote ? `"${profil.quote}"` : 'Nouvel arrivant ~'
                  }
                  {...register('quote', {
                    // required: {
                    //   value: true,
                    //   message: 'Un synopsis est requis.',
                    // },
                    minLength: {
                      value: 2,
                      message:
                        'La citation doit contenir au moins 2 caractères.',
                    },
                    maxLength: {
                      value: 128,
                      message:
                        'La citation doit contenir au maximum 128 caractères.',
                    },
                    pattern: {
                      value: /^(?=[A-Za-z0-9 ]*[A-Za-z]){4}[A-Za-z0-9 ]*$/,
                      message:
                        'La citation ne doit contenir que des lettres (2 min. 128 max.) et des chiffres.',
                    },
                  })}
                />
                {errors.quote ? (
                  <p className="mb-2 text-sm font-medium text-red-600 dark:text-red-400">
                    {errors.quote.message}
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-400">
                    2 à 128 caractères.
                  </p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  rows={8}
                  name="description"
                  id="description"
                  className="text-gray-500 text-justify leading-loose break-words dark:text-gray-400 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={
                    profil.description
                      ? profil.description
                      : 'Aucune description pour le moment.'
                  }
                  {...register('description', {
                    // required: {
                    //   value: true,
                    //   message: 'Un synopsis est requis.',
                    // },
                    minLength: {
                      value: 2,
                      message:
                        'La description doit contenir au moins 2 caractères.',
                    },
                    maxLength: {
                      value: 512,
                      message:
                        'La description doit contenir au maximum 512 caractères.',
                    },
                    pattern: {
                      value: /^(?=[A-Za-z0-9 ]*[A-Za-z]){4}[A-Za-z0-9 ]*$/,
                      message:
                        'La description ne doit contenir que des lettres (2 min. 512 max.) et des chiffres.',
                    },
                  })}
                />
                {errors.description ? (
                  <p className="mb-2 text-sm font-medium text-red-600 dark:text-red-400">
                    {errors.description.message}
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-400">
                    2 à 512 caractères.
                  </p>
                )}
              </div>

              <div className="w-[300px] min-w-[300px]">
                <img
                  className="w-full"
                  src={profil.image ? profil.image.imagePath : userImage}
                  alt={`${profil.name}'s profil picture`}
                />
              </div>
              <div className="flex flex-col items-center">
                <ImgCrop target='profil' />
              </div>

              <div className="flex items-center space-x-4 mt-4 mb-16">
                <button
                  type="button"
                  className="text-gray-500 bg-white border border-gray-300 hover:bg-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-gray-400 dark:border-gray-500 dark:bg-gray-900 dark:hover:bg-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Modifier
                </button>
              </div>
            </form>
          </section>
        </main>
      )}
    </>
  );
}
