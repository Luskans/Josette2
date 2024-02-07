import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
// import axios from 'axios';
import axiosBase, { axiosSecu } from '../../utils/axios';
import styled from 'styled-components';
import logoBluette from '../../assets/logoV2.png';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Signup() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  // const apiURL = import.meta.env.VITE_API_URL;

  const [showPassword, setShowPassword] = useState(false);
  const handleClickPassword = () => setShowPassword(!showPassword);

  const [showPasswordBis, setShowPasswordBis] = useState(false);
  const handleClickPasswordBis = () => setShowPasswordBis(!showPasswordBis);

  const onSubmit = (data) => {
    axiosBase
      // .post(`${apiURL}/signup`, data, {
      .post(`/signup`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        toast.success('Votre compte a bien été créé !', { duration: 9000 });
        navigate('/');
      })
      .catch((error) => {
        if (error.response.data.detail === 'Email already used.') {
          toast.error('Email déjà utilisée.', { duration: 9000 });

        } else if (error.response.data.detail === 'Name already taken.') {
          toast.error('Nom déjà utilisé.', { duration: 9000 });
          
        } else {
          toast.error('Une erreur est survenue.', { duration: 9000 });
        }
      });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-8 h-8 mr-2" src={logoBluette} alt="logo Bluette" />
          Bluette
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Créer un compte
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Votre nom
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name"
                  required=""
                  {...register('name', {
                    required: {
                      value: true,
                      message: 'Un nom est requis.',
                    },
                    minLength: {
                      value: 4,
                      message:
                        'Le nom doit contenir au moins 4 caractères.',
                    },
                    pattern: {
                      value: /^(?=[A-Za-z0-9]*[A-Za-z]){4}[A-Za-z0-9]*$/,
                      message: 'Le nom ne doit contenir que des lettres (4 min.) et des chiffres.',
                    },
                  })}
                />
                <p className="mb-2 text-sm font-medium text-red-600 dark:text-red-400">
                  {errors.name && errors.name.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Votre email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  {...register('email', {
                    required: 'Un email est requis.',
                    pattern: {
                      value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: 'Veuillez entrer un email valide.',
                    },
                  })}
                />
                <p className="mb-2 text-sm font-medium text-red-600 dark:text-red-400">
                  {errors.email && errors.email.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mot de passe
                </label>
                <div className="relative mb-1">
                  <div className="absolute inset-y-0 end-0 flex items-center pr-3.5 ">
                    <button type="button" onClick={handleClickPassword}>
                      {showPassword ? (
                        <svg
                          className="w-4 h-4 text-gray-400 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="m2 13.587 3.055-3.055A4.913 4.913 0 0 1 5 10a5.006 5.006 0 0 1 5-5c.178.008.356.026.532.054l1.744-1.744A8.973 8.973 0 0 0 10 3C4.612 3 0 8.336 0 10a6.49 6.49 0 0 0 2 3.587Z" />
                          <path d="m12.7 8.714 6.007-6.007a1 1 0 1 0-1.414-1.414L11.286 7.3a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.401.211.59l-6.007 6.007a1 1 0 1 0 1.414 1.414L8.714 12.7c.189.091.386.162.59.211.011 0 .021.007.033.01a2.981 2.981 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z" />
                          <path d="M17.821 6.593 14.964 9.45a4.952 4.952 0 0 1-5.514 5.514L7.665 16.75c.767.165 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 text-gray-400 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 14"
                        >
                          <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    {...register('password', {
                      required: {
                        value: true,
                        message: 'Un mot de passe est requis.',
                      },
                      minLength: {
                        value: 6,
                        message:
                          'Le mot de passe doit contenir au moins 6 caractères.',
                      },
                    })}
                  />
                </div>
                <p className="mb-2 text-sm font-medium text-red-600 dark:text-red-400">
                  {errors.password && errors.password.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor="passwordBis"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirmation mot de passe
                </label>
                <div className="relative mb-1">
                  <div className="absolute inset-y-0 end-0 flex items-center pr-3.5 ">
                    <button type="button" onClick={handleClickPasswordBis}>
                      {showPasswordBis ? (
                        <svg
                          className="w-4 h-4 text-gray-400 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="m2 13.587 3.055-3.055A4.913 4.913 0 0 1 5 10a5.006 5.006 0 0 1 5-5c.178.008.356.026.532.054l1.744-1.744A8.973 8.973 0 0 0 10 3C4.612 3 0 8.336 0 10a6.49 6.49 0 0 0 2 3.587Z" />
                          <path d="m12.7 8.714 6.007-6.007a1 1 0 1 0-1.414-1.414L11.286 7.3a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.401.211.59l-6.007 6.007a1 1 0 1 0 1.414 1.414L8.714 12.7c.189.091.386.162.59.211.011 0 .021.007.033.01a2.981 2.981 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z" />
                          <path d="M17.821 6.593 14.964 9.45a4.952 4.952 0 0 1-5.514 5.514L7.665 16.75c.767.165 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 text-gray-400 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 14"
                        >
                          <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <input
                    type={showPasswordBis ? 'text' : 'password'}
                    name="passwordBis"
                    id="passwordBis"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    {...register('passwordBis', {
                      required: {
                          value: true,
                          message: 'Veuillez confirmer votre mot de passe.',
                      },
                      validate: (value) => {
                          if (watch('password') !== value) {
                            return 'Vos mots de passe doivent correspondre.';
                          }
                      },
                    })}
                  />
                </div>
                <p className="mb-2 text-sm font-medium text-red-600 dark:text-red-400">
                  {errors.passwordBis && errors.passwordBis.message}
                </p>
              </div>
              <div className='flex flex-col'>
                <div className="flex items-start mb-1">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      required=""
                      {...register('terms', {
                          required: {
                            value: true,
                            message:
                                'Vous devez accepter les CGU pour vous inscrire.',
                          },
                      })}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      J'accepte les{' '}
                      <a
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        href="#"
                      >
                        Termes et Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <p className="mb-2 text-sm font-medium text-red-600 dark:text-red-400">
                  {errors.terms && errors.terms.message}
                </p>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Créer un compte
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Déjà un compte ?{' '}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Se connecter
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
