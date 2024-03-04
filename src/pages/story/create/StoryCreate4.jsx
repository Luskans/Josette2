import defaultUserImage from '@/assets/user_image.webp';
import defaultStoryImage from '@/assets/story_image.jpg';
import { useSelector } from 'react-redux';
import { fullLocalDate } from '@/utils/formatDate';
import { axiosSecu } from '@/utils/axios';
import toast from 'react-hot-toast';
import getImageUrl from '@/utils/getImageUrl';
import { useNavigate } from 'react-router-dom';

export default function StoryCreate4({ handlePrev, blob }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.detail);
  const storyCreate = useSelector((state) => state.story.create);
  const imageUrl = blob && URL.createObjectURL(blob); 

  const blobToFile = (blob) => {
    if (!blob) {
        return;
    }
    
    const file = new File([blob], "image.webp", {
        type: "image/webp",
    });
    return file;
  }

  const handlePublish = (blob, storyCreate) => {
    const image = blobToFile(blob);
    const formData = new FormData();
    formData.append('title', storyCreate.title);
    formData.append('synopsis', storyCreate.synopsis);
    formData.append('theme1', storyCreate.themes[0]);
    if (storyCreate.themes[1]) {
        formData.append('theme2', storyCreate.themes[1]);
    }
    if (image) {
        formData.append('image', image);
    }
    formData.append('content', storyCreate.content);
    formData.append('userId', user.id)
    console.log('formdata final', formData);

    axiosSecu
    .post(`/stories`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
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
  }

  return (
    <>
      <header className="flex items-center mb-8 not-italic">
        <div className="flex items-center mr-3 text-sm text-gray-900 dark:text-white">
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            <img
              className="mr-4 w-16 h-16 rounded-full"
              src={user.image ? getImageUrl(user.image) : defaultUserImage}
              alt={`${user.name} profil picture`}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </p>
            </div>
            <p className="text-base text-gray-500 dark:text-gray-400">
              {fullLocalDate(new Date())}
            </p>
          </div>
        </div>
      </header>

      <main>
        {blob
          ? <img 
            className="mb-12 lg:mb-14 w-full" 
            src={imageUrl} 
            alt={`${storyCreate.title}'s cover picture`} 
          />
          : <img
            className="mb-12 lg:mb-14 w-full"
            src={defaultStoryImage}
            alt={`${storyCreate.title}'s cover picture`}
          />
        }

        <h1 className="mb-6 text-3xl font-extrabold leading-tight break-words text-gray-900 lg:text-4xl dark:text-white">
          {storyCreate.title}
        </h1>

        <p className="lead text-gray-900 break-words text-justify leading-loose dark:text-gray-100 mb-10">
            {storyCreate.content}
        </p>
      </main>

      <div className="w-full mt-12 flex justify-center items-center space-x-4 mt-4">
        <button
          onClick={handlePrev}
          type="button"
          className="text-gray-500 bg-white border border-gray-300 hover:bg-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-gray-400 dark:border-gray-500 dark:bg-gray-900 dark:hover:bg-gray-800"
        >
          Précédent
        </button>

        <button
          onClick={() => handlePublish(blob, storyCreate)}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Publier
        </button>
      </div>
    </>
  );
}
