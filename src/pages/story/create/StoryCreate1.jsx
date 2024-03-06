import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchThemes } from '@/store/themeSlice';
import { setCreate } from '@/store/storySlice';

export default function StoryCreate1({ handleNext }) {
  const dispatch = useDispatch();
  const loaded = useSelector((state) => state.theme.loaded);
  const themeList = useSelector((state) => state.theme.list);
  const storyCreate = useSelector((state) => state.story.create);
  const {
    handleSubmit,
    register,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      themes: [],
    },
  });

  const selectedThemes = watch('themes');
  const validateThemes = (selectedThemes) => {
    return (
      (selectedThemes.length > 0 && selectedThemes.length <= 2) ||
      'Vous devez sélectionner au moins 1 à 2 thèmes'
    );
  };

  useEffect(() => {
    dispatch(fetchThemes());
  }, [dispatch]);

  const handleThemeChange = (themeId) => {
    if (selectedThemes.includes(themeId)) {
      // Si le thème est déjà sélectionné, on le retire
      setValue(
        'themes',
        selectedThemes.filter((id) => id !== themeId)
      );
    } else {
      // Si le thème n'est pas sélectionné, et qu'il y a moins de deux thèmes sélectionnés, on l'ajoute
      if (selectedThemes.length < 2) {
        setValue('themes', [...selectedThemes, themeId]);
      }
    }
  };

  const onSubmit = (data) => {
    const newData = {
      title: data.title,
      synopsis: data.synopsis,
      themes: data.themes,
      image: '',
      content: '',
    };
    dispatch(setCreate(newData));
    handleNext();
  };

  return (
    <>
      <h1 className="mb-8 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
        Crée ta petite histoire !
      </h1>
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
              defaultValue={storyCreate.title}
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
                  message: 'Le title doit contenir au maximum 64 caractères.',
                },
                pattern: {
                  value:
                    /^[a-zA-Z0-9\s.,;!?\'"\-éèàçùëüïôâêîäöûÉÈÀÇÙËÜÏÔÂÊÎÄÖÛ]*$/,
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
            <textarea
              rows={4}
              name="synopsis"
              id="synopsis"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={storyCreate.synopsis}
              placeholder="Courte introduction de ton histoire"
              required=""
              {...register('synopsis', {
                required: {
                  value: true,
                  message: 'Un synopsis est requis.',
                },
                minLength: {
                  value: 16,
                  message: 'Le synopsis doit contenir au moins 16 caractères.',
                },
                maxLength: {
                  value: 200,
                  message:
                    'Le synopsis doit contenir au maximum 200 caractères.',
                },
                pattern: {
                  value:
                    /^[a-zA-Z0-9\s.,;!?\'"\-éèàçùëüïôâêîäöûÉÈÀÇÙËÜÏÔÂÊÎÄÖÛ]*$/,
                  message:
                    'Le synopsis ne doit contenir que des lettres (16 min. 200 max.) et des chiffres.',
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
            <label
              id="themesList"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Thème(s)
            </label>
            <div>
              {loaded && (
                <ul
                  className="columns-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="themesList"
                >
                  {themeList.map((theme) => (
                    <Controller
                      key={theme.id}
                      name="themes"
                      control={control}
                      rules={{ validate: validateThemes }}
                      render={({ field }) => (
                        <li className="flex items-center pl-3 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                          <input
                            {...field}
                            type="checkbox"
                            id={theme.id}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            value={theme.id}
                            checked={selectedThemes.includes(theme.id)}
                            onChange={() => handleThemeChange(theme.id)}
                            disabled={
                              selectedThemes.length === 2 &&
                              !selectedThemes.includes(theme.id)
                            }
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
              )}
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
