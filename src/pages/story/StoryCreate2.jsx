import ImgCrop from '@/components/Crop/ImgCrop';
import { useForm } from 'react-hook-form';


export default function StoryCreate2({ handlePrev, handleNext, handleBlob }) {
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

    const onSubmit = (data) => {

    }

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <ImgCrop handlePrev={handlePrev} handleNext={handleNext} handleBlob={handleBlob} />
            </div>
          </div>
          {/* <div className="w-full mt-12 flex justify-center items-center space-x-4 mt-4">
            <button
              onClick={handlePrev}
              type="button"
              className="text-gray-500 bg-white border border-gray-300 hover:bg-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-gray-400 dark:border-gray-500 dark:bg-gray-900 dark:hover:bg-gray-800"
            >
              Précédent
            </button>

            <button
              onClick={handleNext}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Suivant
            </button>
          </div> */}
        </form>
    </>
  );
}
