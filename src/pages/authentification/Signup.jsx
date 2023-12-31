import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const MainContainer = styled.main`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
`

const FormContainer = styled.form`
   display: flex;
   flex-direction: column;
   gap: 30px;
   width: 400px;
   border: 1px solid;
   border-radius: 10px;
   padding: 20px;
`

export default function Signup() {
   const {
      handleSubmit,
      register,
      watch,
      formState: { errors, isSubmitting },
   } = useForm();
   
   const apiURL = import.meta.env.VITE_API_URL;

   const toast= useToast();
   
   const [showPassword, setShowPassword] = useState(false);
   const handleClickPassword = () => setShowPassword(!showPassword);

   const [showPasswordBis, setShowPasswordBis] = useState(false);
   const handleClickPasswordBis = () => setShowPasswordBis(!showPasswordBis);

   const onSubmit = (data) => {
      axios
         .post(`${apiURL}/signin`, data, {
            headers: {
               'Content-Type': 'application/json',
            },
         })
         .then(response => {
            toast({
               title: 'Votre compte a bien été créé !',
               description: "We've created your account for you.",
               status: 'success',
               duration: 9000,
               isClosable: true,
            });
         })
         .catch(error => {
            if (error.response.data.detail === "Email already used.") {
               toast({
                  title: 'Email déjà utilisée.',
                  description: "Email already used.",
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
               });

            } else if (error.response.data.detail === "Name already taken.") {
               toast({
                  title: 'Nom déjà utilisé.',
                  description: "Name already taken.",
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
               });

            } else {
               toast({
                  title: 'Une erreur est survenue.',
                  description: "An error occured.",
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
               });
            }
         });
}    


   return (
      <></>
      // <MainContainer>
      //    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      //       <FormControl isInvalid={errors.name}>
      //          <FormLabel htmlFor="pseudo">Nom</FormLabel>
      //          <Input
      //             id="name"
      //             placeholder="Entrez un nom"
      //             required
      //             {...register('name', {
      //                required: 'Un nom est requis.',
      //                minLength: {
      //                   value: 4,
      //                   message:
      //                      'Le nom doit contenir au moins 4 caractères.',
      //                },
      //             })}
      //          />
      //          <FormErrorMessage>
      //             {errors.name && errors.name.message}
      //          </FormErrorMessage>
      //       </FormControl>

      //       <FormControl isInvalid={errors.email}>
      //          <FormLabel htmlFor="email">Email</FormLabel>
      //          <Input
      //             id="email"
      //             placeholder="Entrez votre email"
      //             required
      //             // type="email"
      //             {...register('email', {
      //                required: 'Un email est requis.',
      //                pattern: {
      //                   value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      //                   message: 'Veuillez entrer un email valide;',
      //                },
      //             })}
      //          />
      //          <FormErrorMessage>
      //             {errors.email && errors.email.message}
      //          </FormErrorMessage>
      //       </FormControl>

      //       <FormControl isInvalid={errors.password}>
      //          <FormLabel htmlFor="password">Mot de passe</FormLabel>
      //          <InputGroup size="md">
      //             <Input
      //                pr="4.5rem"
      //                type={showPassword ? 'text' : 'password'}
      //                placeholder="Entrez un mot de passe"
      //                required
      //                {...register('password', {
      //                   required: {
      //                      value: true,
      //                      message: 'Un mot de passe est requis.',
      //                   },
      //                   minLength: {
      //                      value: 6,
      //                      message:
      //                         'Le mot de passe doit contenir au moins 6 caractères.',
      //                   },
      //                })}
      //             />
      //             <InputRightElement width="4.5rem">
      //                <Button
      //                   h="1.75rem"
      //                   size="sm"
      //                   onClick={handleClickPassword}
      //                >
      //                   {showPassword ? 'Hide' : 'Show'}
      //                </Button>
      //             </InputRightElement>
      //          </InputGroup>
      //          <FormErrorMessage>
      //             {errors.password && errors.password.message}
      //          </FormErrorMessage>
      //       </FormControl>

      //       <FormControl isInvalid={errors.passwordBis}>
      //          <FormLabel htmlFor="passwordBis">
      //             Confirmation mot de passe
      //          </FormLabel>
      //          <InputGroup size="md">
      //             <Input
      //                pr="4.5rem"
      //                type={showPasswordBis ? 'text' : 'password'}
      //                placeholder="Confirmez votre mot de passe"
      //                {...register('passwordBis', {
      //                   required: {
      //                      value: true,
      //                      message: 'Veuillez confirmer votre mot de passe.',
      //                   },
      //                   validate: (value) => {
      //                      if (watch('password') !== value) {
      //                         return 'Vos mots de passe doivent correspondre.';
      //                      }
      //                   },
      //                })}
      //             />
      //             <InputRightElement width="4.5rem">
      //                <Button
      //                   h="1.75rem"
      //                   size="sm"
      //                   onClick={handleClickPasswordBis}
      //                >
      //                   {showPasswordBis ? 'Hide' : 'Show'}
      //                </Button>
      //             </InputRightElement>
      //          </InputGroup>
      //          <FormErrorMessage>
      //             {errors.passwordBis && errors.passwordBis.message}
      //          </FormErrorMessage>
      //       </FormControl>

      //       <FormControl isInvalid={errors.checkbox}>
      //          {/* <FormLabel htmlFor="checkbox">J'accepte les CGU.</FormLabel> */}
      //          <Checkbox
      //             defaultChecked
      //             required
      //             {...register('checkbox', {
      //                required: {
      //                   value: true,
      //                   message:
      //                      'Vous devez accepter les CGU pour vous inscrire.',
      //                },
      //             })}
      //          >
      //             J'accepte les CGU.
      //          </Checkbox>
      //          <FormErrorMessage>
      //             {errors.checkbox && errors.checkbox.message}
      //          </FormErrorMessage>
      //       </FormControl>

      //       <Button
      //          mt={4}
      //          colorScheme="teal"
      //          isLoading={isSubmitting}
      //          type="submit"
      //       >
      //          Créer un compte
      //       </Button>
      //    </FormContainer>
      // </MainContainer>
   );
}
