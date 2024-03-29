import { logo } from '@/assets/logo';
import defaultProfil from '@/assets/defaultProfil.webp';
import defaultProfil2 from '@/assets/defaultProfil2.webp';
import defaultProfil3 from '@/assets/defaultProfil3.webp';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '@/store/userSlice';
import getImageUrl from '@/utils/getImageUrl';

export default function Header() {
  const [isToggled, setIsToggled] = useState(
    localStorage.getItem('theme') === 'light' ? false : true
  );
  const user = useSelector((state) => state.user.detail);
  let prevScroll = window.scrollY;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const scrollHandler = (e) => {
      const currentScroll = window.scrollY;
      const header = document.querySelector('.header');

      prevScroll < currentScroll
        ? header.classList.add('scrollHeader')
        : header.classList.remove('scrollHeader');

      prevScroll = currentScroll;
    };

    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  });

  const handleChange = () => {
    setIsToggled(!isToggled);
    const app = document.querySelector('.app');
    const theme = isToggled ? 'light' : 'dark';
    app.classList.remove('light', 'dark');
    app.classList.add(theme);
    localStorage.setItem('theme', theme);
  };

  const handleClick = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="header transition-all duration-500 bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-6 py-4">
        <Link
          to="/"
          className="flex items-center space-x-2 rtl:space-x-reverse"
        >
          <span className="w-11 h-11 text-gray-800 dark:text-white">
            {logo()}
          </span>
          <span className="brand self-center text-xl sm:text-3xl font-semibold whitespace-nowrap text-gray-800 dark:text-white">
            Bluette
          </span>
        </Link>
        <nav className="flex items-center md:order-2 space-x-3 sm:space-x-5 md:space-x-8 rtl:space-x-reverse">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              onChange={handleChange}
              type="checkbox"
              checked={isToggled}
              value=""
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
          {!user ? (
            <>
              <Link
                to="/login"
                className="hover:underline text-xs sm:text-base text-gray-800 dark:text-gray-200"
              >
                Connexion
              </Link>
              <Link to="/signup">
                <button
                  type="button"
                  className="text-white text-xs bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg sm:text-sm px-2 sm:px-4 py-1 sm:py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Inscription
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/story/create">
                <svg
                  className="w-9 h-9 text-gray-600 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2c.6 0 1-.4 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <button
                type="button"
                className="flex text-sm"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-9 h-9 rounded-full"
                  src={user.image ? getImageUrl(user.image) : defaultProfil2}
                  alt={`${user.name}'s profil picture`}
                />
              </button>
              
              {/* <!-- Dropdown menu --> */}
              <div
                className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {user && user.name}
                  </span>
                  <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                    {user && user.username}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <Link to={`/profil/view/${user.id}`}>
                    <li
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Profil
                    </li>
                  </Link>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Notifications
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Créations
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Suivis
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Paramètres
                    </a>
                  </li>
                  <li onClick={handleClick}>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      onClick={handleClick}
                    >
                      Déconnexion
                    </a>
                  </li>
                </ul>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
