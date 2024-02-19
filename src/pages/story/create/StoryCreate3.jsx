import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setCreate } from '../../../store/storySlice';

export default function StoryCreate3({ handlePrev, handleNext }) {
    const dispatch = useDispatch();
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

  const onSubmit = (data) => {
    const newData = {
        title: storyCreate.title,
        synopsis: storyCreate.synopsis,
        themes: storyCreate.themes,
        content: data.content
    }
    dispatch(setCreate(newData));
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
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
            defaultValue={storyCreate.content}
            {...register('content', {
              required: {
                value: true,
                message: 'Un texte est requis.',
              },
              minLength: {
                value: 200,
                message: 'Le texte doit contenir au moins 200 caractères.',
              },
              maxLength: {
                value: 12000,
                message: 'Le texte doit contenir au maximum 12 000 caractères.',
              },
              pattern: {
                // value: /^(?=[A-Za-z0-9 ]*[A-Za-z]){4}[A-Za-z0-9 ]*$/,
                value: /^[a-zA-Z0-9\s.,;!?\'"\-éèàçùëüïôâêîäöûÉÈÀÇÙËÜÏÔÂÊÎÄÖÛ]*$/,
                message:
                'Le texte ne doit contenir que des lettres (200 min. 12000 max.) et des chiffres.',
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
      <div className="w-full mt-12 flex justify-center items-center space-x-4 mt-4">
        <button
          onClick={handlePrev}
          type="button"
          className="text-gray-500 bg-white border border-gray-300 hover:bg-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-gray-400 dark:border-gray-500 dark:bg-gray-900 dark:hover:bg-gray-800"
        >
          Précédent
        </button>

        <button
        //   onClick={handleNext}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Suivant
        </button>
      </div>
    </form>
  );
}
