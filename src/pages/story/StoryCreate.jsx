import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { fetchThemes } from '../../store/themesSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initFlowbite } from 'flowbite';
import ImgCrop from '../../components/Crop/ImgCrop';

export default function StoryCreate() {
  const dispatch = useDispatch();
  const apiURL = import.meta.env.VITE_API_URL;
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const token = localStorage.getItem('token');
  const loaded = useSelector((state) => state.themes.loaded);
  const themesList = useSelector((state) => state.themes.list);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cropData, setCropData] = useState(null); // Ici tu stockeras les données du crop

  console.log('user storycreate', userId);
  console.log('themes storycreate', themesList);
  console.log('token storycreate', token);

  const {
    handleSubmit,
    register,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      themes: []
    }
  });

  const selectedThemes = watch("themes");
  const validateThemes = (selectedThemes) => {
    return selectedThemes.length > 0 && selectedThemes.length <= 2 || "Vous devez sélectionner au moins 1 à 2 thèmes";
  }

  useEffect(() => {
    dispatch(fetchThemes());
  }, [dispatch]);

  useEffect(() => {
    initFlowbite();
  });

  const handleThemeChange = (themeId) => {
    if (selectedThemes.includes(themeId)) {
      // Si le thème est déjà sélectionné, on le retire
      setValue("themes", selectedThemes.filter(id => id !== themeId));
    } else {
      // Si le thème n'est pas sélectionné, et qu'il y a moins de deux thèmes sélectionnés, on l'ajoute
      if (selectedThemes.length < 2) {
        setValue("themes", [...selectedThemes, themeId]);
      }
    }
  };

  const onSubmit = (data) => {
    console.log('datas', data);
    axios
      .post(`${apiURL}/stories`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      .then((response) => {
        toast.success('Nouvelle histoire publiée !', { duration: 9000 });
        navigate('/');
      })
      .catch((error) => {
        if (error.response.data.detail === 'Title already used.') {
          toast.error("Nom d'histoire déjà utilisé.", { duration: 9000 });
        } else {
          toast.error('Une erreur est survenue.', { duration: 9000 });
        }
      });
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Crée ta petite histoire !
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Titre
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Titre de ton histoire"
                  required=""
                  {...register('title', {
                    required: {
                      value: true,
                      message: 'Un titre est requis.',
                    },
                    minLength: {
                      value: 4,
                      message: 'Le title doit contenir au moins 4 caractères.',
                    },
                    maxLength: {
                      value: 64,
                      message:
                        'Le title doit contenir au maximum 64 caractères.',
                    },
                    pattern: {
                      value: /^(?=[A-Za-z0-9 ]*[A-Za-z]){4}[A-Za-z0-9 ]*$/,
                      message:
                        'Le titre ne doit contenir que des lettres (4 min. 64 max.) et des chiffres.',
                    },
                  })}
                />
                {errors.title ? (
                  <p className="mb-2 text-sm font-medium text-red-600 dark:text-red-400">
                    {errors.title.message}
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-400">
                    4 à 64 caractères.
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="synopsis"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Synopsis
                </label>
                <input
                  type="text"
                  name="synopsis"
                  id="synopsis"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Synopsis de ton histoire"
                  required=""
                  {...register('synopsis', {
                    required: {
                      value: true,
                      message: 'Un synopsis est requis.',
                    },
                    minLength: {
                      value: 16,
                      message:
                        'Le synopsis doit contenir au moins 16 caractères.',
                    },
                    maxLength: {
                      value: 200,
                      message:
                        'Le synopsis doit contenir au maximum 200 caractères.',
                    },
                    pattern: {
                      value: /^(?=[A-Za-z0-9 ]*[A-Za-z]){4}[A-Za-z0-9 ]*$/,
                      message:
                        'Le synopsis ne doit contenir que des lettres (4 min. 200 max.) et des chiffres.',
                    },
                  })}
                />
                {errors.synopsis ? (
                  <p className="mb-2 text-sm font-medium text-red-600 dark:text-red-400">
                    {errors.synopsis.message}
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-400">
                    16 à 200 caractères.
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label id="themesList" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Thème(s)
                </label>
                <div>
                  {loaded &&
                    <ul
                      className="columns-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="themesList"
                    >
                      {themesList.map((theme) => (
                        <Controller
                        name="themes"
                        control={control}
                        rules={{ validate: validateThemes }}
                        render={({ field }) => (
                          <li key={theme.id} className="flex items-center pl-3 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input
                              {...field}
                              type="checkbox"
                              id={theme.id}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                              value={theme.id}
                              checked={selectedThemes.includes(theme.id)}
                              onChange={() => handleThemeChange(theme.id)}
                              disabled={selectedThemes.length === 2 && !selectedThemes.includes(theme.id)}
                            />
                            <label
                              htmlFor={theme.id}
                              className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                            >
                              {theme.name}
                            </label>
                          </li>
                        )}
                        />
                      ))}
                    </ul>
                  }
                </div>
                {errors.themes ? (
                  <p className="mb-2 text-sm font-medium text-red-600 dark:text-red-400">
                    {errors.themes && errors.themes.message}
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-400">
                    1 à 2 thèmes.
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image <span className="text-gray-400">(optionnel)</span>
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  id="image"
                  type="file"
                />
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px).
                </p>
              </div>
              {/* <ImgCrop
                image={selectedImage}
                onImageLoaded={setImage}
                onCropComplete={(cropData) => setCropData(cropData)}
              /> */}
              <div className="sm:col-span-2">
                <ImgCrop />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="content"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Texte
                </label>
                <textarea
                  id="content"
                  rows={8}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Votre petite histoire ici"
                  defaultValue={''}
                  {...register('content', {
                    required: {
                      value: true,
                      message: 'Un texte est requis.',
                    },
                    minLength: {
                      value: 200,
                      message:
                        'Le texte doit contenir au moins 200 caractères.',
                    },
                    maxLength: {
                      value: 12000,
                      message:
                        'Le texte doit contenir au maximum 12 000 caractères.',
                    },
                  })}
                />
                {errors.content ? (
                  <p className="mb-2 text-sm font-medium text-red-600 dark:text-red-400">
                    {errors.content.message}
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-400">
                    200 à 12 000 caractères.
                  </p>
                )}
              </div>
            </div>
            <input
              type="hidden"
              name="userId"
              id="userId"
              value={userId}
              {...register('userId')}
            />
            <div className="flex items-center space-x-4 mt-4">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Publier
              </button>
              <button
                type="button"
                className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                <svg
                  className="w-5 h-5 mr-1 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Delete
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
