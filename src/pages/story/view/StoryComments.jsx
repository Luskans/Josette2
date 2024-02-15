import { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosSecu } from '@/utils/axios';
import toast from 'react-hot-toast';
import { getComments } from "@/store/commentSlice";
import Loader from "@/components/Loader";
import StoryComment from "./StoryComment";
import StoryCommentsButton from "./StoryCommentsButton";
import { resetComments } from "@/store/commentSlice";
import { useForm } from "react-hook-form";
import { updateComments } from "../../../store/commentSlice";
import { Link } from "react-router-dom";

const StoryComments = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.detail);
  const story = useSelector((state) => state.story.detail);
  const comments = useSelector((state) => state.comment.list);
  const commentsLoaded = useSelector((state) => state.comment.loaded);
  const totalComment = useSelector(state => state.comment.totalComment);
  const updatedComments = useSelector((state) => state.comment.updated);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (story.user && story.user.id) {
      dispatch(getComments(story.id, 1))
    }

    return () => {
      dispatch(resetComments());
    }
  }, [updatedComments])

  const onNewCommentSubmit = (data) => {
    console.log('datas', data);
    axiosSecu
      .post(`comments`, data, {
        headers: {
          'Content-Type': 'application/ld+json',
        },
      })
      .then((response) => {
        toast.success('Commentaire publié !', { duration: 9000 });
        dispatch(updateComments());
      })
      .catch((error) => {
        toast.error('Une erreur est survenue.', { duration: 9000 });
      });
  };

  return (
    <section className="not-format" ref={ref}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
          Commentaires ({totalComment})
        </h2>
      </div>
      {user ? (
        <form onSubmit={handleSubmit(onNewCommentSubmit)} className="mb-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Écrivez votre commentaire ici ...
            </label>
            <textarea
              id="content"
              name="content"
              rows={6}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Écrivez votre commentaire..."
              required=""
              defaultValue={''}
              {...register('content', {
                required: {
                  value: true,
                  message: 'Un commentaire est requis.',
                },
                minLength: {
                  value: 4,
                  message: 'Le commentaire doit contenir au moins 4 caractères.',
                },
                maxLength: {
                  value: 512,
                  message:
                    'Le commentaire doit contenir au maximum 512 caractères.',
                },
                pattern: {
                  value: /^(?=[A-Za-z0-9 ]*[A-Za-z]){4}[A-Za-z0-9 ]*$/,
                  message:
                    'Le commentaire ne doit contenir que des lettres (4 min. 512 max.) et des chiffres.',
                },
              })}
            />
            {errors.content ? (
              <p className="mb-2 text-sm font-medium text-red-600 dark:text-red-400">
                {errors.content.message}
              </p>
            ) : (
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-400">
                4 à 512 caractères.
              </p>
            )}
          </div>
          <input
            type="hidden"
            name="userId"
            id="userId"
            value={user.id}
            {...register('userId')}
          />
          <input
            type="hidden"
            name="storyId"
            id="storyId"
            value={story.id}
            {...register('storyId')}
          />
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Publier
          </button>
        </form>
        ) : (
          <p className="text-sm text-center italic text-gray-500 dark:text-gray-300 mb-10"><Link to="/login" className="text-blue-500 font-semibold">Connectez</Link>-vous pour pouvoir laisser un message, ou bien <Link to ="/signup" className="text-blue-500 font-semibold">inscrivez</Link>-vous si vous n'avez pas de compte !</p>
        ) 
      }

      {/* {!commentsLoaded ? ( */}
        <>
          {comments.map((comment) => (
            <StoryComment key={comment.id} comment={comment} />
          ))}
        </>
      {/* ) : (
          <Loader />
      )} */}

      {(comments.length != 0) ? (
        <StoryCommentsButton />
      ) : (
        null
      )}
    </section>
  );
});

export default StoryComments;