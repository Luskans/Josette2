import logoBluette from '../assets/logoV2.png';
import userImage from '../assets/user_image.webp';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NavContainer = styled.nav`
  transition: all 0.5s ease-in-out;
`;

const LogoBrand = styled.img`
  width: 50px;
  margin-right: 5px;
`;

export default function Header() {
  const [isToggled, setIsToggled] = useState(false);
  const connected = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  let prevScroll = window.scrollY;
  // console.log('header', prevScroll)

  useEffect(() => {
     const scrollHandler = (e) => {
        const currentScroll = window.scrollY;
        const mobileHeader = document.querySelector('.header');

        (prevScroll < currentScroll)
           ? mobileHeader.classList.add('scrollHeader')
           : mobileHeader.classList.remove('scrollHeader')

        prevScroll = currentScroll;
     };

     window.addEventListener('scroll', scrollHandler);
     return () => window.removeEventListener('scroll', scrollHandler);
  });

  const handleChange = () => {
   setIsToggled(!isToggled);
   console.log('darkmode : ', isToggled);

   // if set via local storage previously
   if (localStorage.getItem('theme')) {
      if (localStorage.getItem('theme') === 'light') {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
      } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
      }

  // if NOT set via local storage previously
  } else {
      if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
      } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
      }
  }
  }

  return (
    <NavContainer className="header bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logoBluette} className="h-8" alt="Bluette Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Bluette
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-5 rtl:space-x-reverse">
          <label class="relative inline-flex items-center cursor-pointer">
            <input onChange={handleChange} type="checkbox" value="" class="sr-only peer" />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            {/* <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Toggle me
            </span> */}
          </label>
          {!connected ? (
            <>
              <Link to="/login" className="hover:underline text-gray-600 dark:text-gray-400">
                Login
              </Link>
              <Link to="/signup">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign up
                </button>
              </Link>
            </>
          ) : (
            <>
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={userImage}
                  alt="user photo"
                />
              </button>
            </>
          )}
          {/* <!-- Dropdown menu --> */}
          <div
            className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                Bonnie Green
              </span>
              <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                name@flowbite.com
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </NavContainer>

    // NEXTUI
    // <Navbar shouldHideOnScroll aria-label="Navigation">
    //    <NavbarBrand  as={Link} href="/">
    //       <LogoBrand src={logoBluette} alt='Brand logo' />
    //       <p className="font-bold text-inherit">BLUETTE</p>
    //    </NavbarBrand>
    //    <NavbarContent className="hidden sm:flex gap-4" justify="center">
    //    <NavbarItem>
    //       <Link color="foreground" href="#">
    //          Features
    //       </Link>
    //    </NavbarItem>
    //    <NavbarItem isActive>
    //       <Link href="#" aria-current="page">
    //          Customers
    //       </Link>
    //    </NavbarItem>
    //    <NavbarItem>
    //       <Link color="foreground" href="#">
    //          Integrations
    //       </Link>
    //    </NavbarItem>
    //    </NavbarContent>
    //    <NavbarContent justify="end">
    //    <NavbarItem className="hidden lg:flex">
    //       <Link href="/login">Login</Link>
    //    </NavbarItem>
    //    <NavbarItem>
    //       <Button as={Link} href="/signup" color="primary" variant="flat">
    //          Sign Up
    //       </Button>
    //    </NavbarItem>
    //    </NavbarContent>
    // </Navbar>

    //BASIC
    // <HeaderContainer className="mobileHeader">
    //    <Link to="/">
    //       <LogoBrand src={logoBluette} alt="Logo de Bluette" />
    //    </Link>

    //    <NavContainer>
    //       {!connected ? (
    //          <>
    //             <Link to="/login">
    //                <Button colorScheme="teal" variant="outline">
    //                   Connexion
    //                </Button>
    //             </Link>
    //             <Link to="/signin">
    //                <Button colorScheme="teal" variant="solid">
    //                   Inscription
    //                </Button>
    //             </Link>
    //          </>
    //       ) : (
    //          <>
    //             <Link to="/story/create">
    //                <Button colorScheme="teal" variant="outline">
    //                   <i className="fa-solid fa-plus fa-2xl"></i>
    //                </Button>
    //             </Link>
    //             <Link to="/profil">
    //                <Button colorScheme="teal" variant="solid">
    //                   <i className="fa-regular fa-user fa-2xl"></i>
    //                </Button>
    //             </Link>
    //             <p>Bienvenue {(user.name)}</p>
    //          </>
    //       )}
    //    </NavContainer>
    // </HeaderContainer>
  );
}
