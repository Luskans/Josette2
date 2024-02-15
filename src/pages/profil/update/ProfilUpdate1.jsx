import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdate } from '@/store/profilSlice';

export default function ProfilUpdate1({ handleNext }) {
  const dispatch = useDispatch();
  const loaded = useSelector((state) => state.profil.loaded);
  const profil = useSelector((state) => state.profil.detail);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      themes: [],
    },
  });

  const onSubmit = (data) => {
    console.log('test data en profil update', data);
    const newData = {
      quote: data.quote,
      description: data.description,
      image: ''
    };
    dispatch(setUpdate(newData));
    handleNext();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full items-center gap-8"
      >
        <h2 className="text-2xl md:text-4xl font-extrabold line-clamp-1.5 text-gray-900 dark:text-white">
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
                message: 'La citation doit contenir au moins 2 caractères.',
              },
              maxLength: {
                value: 128,
                message: 'La citation doit contenir au maximum 128 caractères.',
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
                message: 'La description doit contenir au moins 2 caractères.',
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

        <div className="w-full mt-12 flex justify-center items-center space-x-4 mt-4">
            <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
            >
            Suivant
            </button>
        </div>
      </form>
    </>
  );
}
