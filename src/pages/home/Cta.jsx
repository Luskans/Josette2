import ctaImage from '../../assets/cta.webp';
import styled from 'styled-components';

// const AsideContainer = styled.aside`
//    display: flex;
//    flex-direction: column;
//    justify-content: center;
//    align-items: center;
//    gap: 10px;
//    border: 2px solid teal;
//    border-radius: 10px;
//    padding: 10px 20px;
//    margin: 10px;
// `

// const AsideContainer = styled.aside`
//   //  background-color: blue;
//    padding: 20px 11%;
// `

export default function Cta() {
  return (
    // FLOWBITE
    <section className="bg-blue-700 dark:bg-blue-100">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-6 lg:px-6">
            <img className="md:w-full w-2/3 m-auto rounded-2xl" src={ctaImage} alt="cta image of a boy writing" />
            <div className="mt-4 md:mt-0">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold dark:text-gray-900 text-white">Des petites histoires, sans prétentions.</h2>
                <p className="mb-6 font-light dark:text-gray-700 md:text-lg text-gray-300">Laisse libre cours à ton imagination en partageant tes textes ou en suivant ceux de la communauté.</p>
                <button className="inline-flex items-center text-gray-900 dark:text-white bg-blue-200 dark:bg-blue-700 hover:bg-blue-100 dark:hover:bg-blue-800 focus:ring-4 focus:ring-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800">
                    Rejoindre
                    <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>
        </div>
    </section>

    // NEXTUI
    // <AsideContainer className='bg-blue-800 dark:bg-blue-100 pt-5'>
    //   <div className='flex justify-center gap-8'>
    //     <div className='flex flex-col justify-center gap-8 w-3/5'>
    //       <h3 className='text-white dark:text-gray-800 text-6xl'>Des petites histoires, sans prétentions.</h3>
    //       <p className='text-white dark:text-gray-800'>Laisse libre cours à ton imagination en partageant tes textes ou en suivant ceux de la communauté.</p>
    //       <Button className='w-32'>Nous rejoindre</Button>
    //     </div>
    //     <Image src={ctaImage} alt='A boy writting' className='w-2/5' />
    //   </div>
    // </AsideContainer>

    // BASIC
    // <AsideContainer>
    //   <p>Tu as des petites histoires que tu aimerais partager ?</p>
    //   <p>Tu veux t'entrainer à écrire et recevoir des retours ?</p>
    //   <p>Tu veux suivre tes auteurs préférés de la communauté ?</p>
    //   <p>Alors n'hésite plus et rejoins dès maintenant Bluette !</p>
    //   <a><button>Rejoindre</button></a>
    //   <p>Bluette, des petites histoires, sans prétention.</p>
    // </AsideContainer>
  )
}
