import { Link } from 'react-router-dom';
import ctaImage from '@/assets/cta.webp';

export default function Cta() {
  return (
    <section className="bg-blue-700 dark:bg-blue-200">
        <div className="flex flex-col sm:flex-row gap-8 items-center py-8 px-4 mx-auto max-w-3xl xl:gap-16 sm:py-6 lg:px-6">
            <img className=" w-3/5 rounded-2xl" src={ctaImage} alt="cta image of a boy writing" />
            <div className="mt-4 md:mt-0">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold dark:text-gray-900 text-white">Des petites histoires, sans prétention.</h2>
                <p className="mb-6 font-light dark:text-gray-800 md:text-lg text-gray-100">Laisse libre cours à ton imagination en partageant tes textes ou en suivant ceux de la communauté.</p>
                <Link to="/signup">
                  <button className="animate-bounce inline-flex items-center text-gray-900 dark:text-white bg-white blue-200 dark:bg-blue-700 hover:bg-blue-100 dark:hover:bg-blue-800 focus:ring-4 focus:ring-blue-400 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800">
                    Rejoindre
                    <svg className="ml-2 mt-1 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  </button>
                </Link>
            </div>
        </div>
    </section>
  )
}
