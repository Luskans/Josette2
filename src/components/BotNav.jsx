import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { initFlowbite } from 'flowbite'
import { useSelector } from 'react-redux';


const NavContainer = styled.nav`
  transition: all 0.5s ease-in-out;
`;

export default function BotNav({ totalPage, currentPage, search, handlePrevious, handleNext, handleSearch }) {
    let prevScroll = window.scrollY;
    const themes = useSelector((state) => state.theme.list);

    useEffect(() => {
      const scrollHandler = (e) => {
        const currentScroll = window.scrollY;
        const botNav = document.querySelector('.botNav');

        (prevScroll > currentScroll)
          ? botNav.classList.add('scrollNav')
          : botNav.classList.remove('scrollNav');

        prevScroll = currentScroll;
      };

      console.log('themes en botnav', themes)
      window.addEventListener('scroll', scrollHandler);
      return () => window.removeEventListener('scroll', scrollHandler);
    });

    useEffect(() => {
      initFlowbite();
    }, []);

  return (
    <NavContainer className="botNav fixed bottom-0 left-0 z-20 w-full h-16  bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-6 mx-auto">

        {/* BOUTON 1 */}
        <button
          id="searchOptionsButton"
          data-dropdown-toggle="searchOptionsDropdown"
          data-tooltip-target="tooltip-search"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <svg
            className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M8 15.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Zm11.707 2.793-4-4a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414-1.414Z" />
          </svg>
          <span className="sr-only">Rechercher</span>
        </button>
        <div
          id="tooltip-search"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Rechercher
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <div
          id="searchOptionsDropdown"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <form onSubmit={() => {handleSearch(`title[]=${data.value}`)}}>
            <div className="flex">
              <div className="relative w-full">
                <input
                  type="search"
                  id="search-dropdown"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Par titre..."
                  required=""
                />
                <button
                  type="submit"
                  className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* BOUTON 2 */}
        <button
          id="themeOptionsButton"
          data-dropdown-toggle="themeOptionsDropdown"
          data-tooltip-target="tooltip-theme"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <svg
            className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 18"
          >
            <path d="M17 11h-2.722L8 17.278a5.512 5.512 0 0 1-.9.722H17a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1ZM6 0H1a1 1 0 0 0-1 1v13.5a3.5 3.5 0 1 0 7 0V1a1 1 0 0 0-1-1ZM3.5 15.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM16.132 4.9 12.6 1.368a1 1 0 0 0-1.414 0L9 3.55v9.9l7.132-7.132a1 1 0 0 0 0-1.418Z" />
          </svg>
          <span className="sr-only">Thème</span>
        </button>
        <div
          id="tooltip-theme"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Thème
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <div
          id="themeOptionsDropdown"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="moreOptionsDropdownButton"
          >
            {themes.forEach(theme => {
              <li key={theme}>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => {handleSearch(`themeName=${theme.name}`)}}
                >
                  {theme.name}
                </a>
              </li>
            })}
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Par thèmes
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Par favoris
              </a>
            </li>
          </ul>
        </div>

        {/* BOUTON 3 */}
        <div className="flex items-center justify-center col-span-2">
          <div className="flex items-center justify-between w-full text-gray-600 dark:text-gray-400 bg-gray-100 rounded-lg dark:bg-gray-600 max-w-[128px] mx-2">
            <button
              type="button"
              className="inline-flex items-center justify-center h-8 px-1 w-6 bg-gray-100 rounded-s-lg dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-800"
              onClick={handlePrevious}
            >
              <svg
                className="w-2 h-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous page</span>
            </button>
            <span className="flex-shrink-0 mx-1 text-sm font-medium space-x-0.5 rtl:space-x-reverse">
              {currentPage} of {totalPage}
            </span>
            <button
              type="button"
              className="inline-flex items-center justify-center h-8 px-1 w-6 bg-gray-100 rounded-e-lg dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-800"
              onClick={handleNext}
            >
              <svg
                className="w-2 h-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next page</span>
            </button>
          </div>
        </div>

        {/* BOUTON 4 */}
        <button
          id="dateOptionsButton"
          data-dropdown-toggle="dateOptionsDropdown"
          data-tooltip-target="tooltip-date"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <svg
            className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
          </svg>
          <span className="sr-only">Date</span>
        </button>
        <div
          id="tooltip-date"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Date
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <div
          id="dateOptionsDropdown"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="moreOptionsDropdownButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {handleSearch("order['createdAt']=asc")}}
              >
                Par date asc
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {handleSearch("order['createdAt']=desc")}}
              >
                Par date desc
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {handleSearch("byReadingTime=true&order=ASC")}}
              >
                Par temps lecture asc
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {handleSearch("byReadingTime=true&order=DESC")}}
              >
                Par temps lecture desc
              </a>
            </li>
          </ul>
        </div>

        {/* BOUTON 5 */}
        <button
          id="likeOptionsButton"
          data-dropdown-toggle="likeOptionsDropdown"
          data-tooltip-target="tooltip-like"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <svg
            className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 18"
          >
            <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
          </svg>
          <span className="sr-only">Like</span>
        </button>
        <div
          id="tooltip-like"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Like
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <div
          id="likeOptionsDropdown"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="moreOptionsDropdownButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {handleSearch("byLikes=true&order=ASC")}}
              >
                Par likes asc
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {handleSearch("byLikes=true&order=DESC")}}
              >
                Par likes desc
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {handleSearch("order['viewCount']=asc")}}
              >
                Par vues asc
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {handleSearch("order['viewCount']=desc")}}
              >
                Par vues desc
              </a>
            </li>
          </ul>
        </div>
      </div>
    </NavContainer>

    // BASIC
    // <>
    //    {activated && <SubMobileNav type={tab} />}
    //    <NavContainer className="mobileNav">
    //       <i
    //          className="fa-solid fa-magnifying-glass"
    //          onClick={() => {
    //             handleClick();
    //             handleSearchClick();
    //          }}
    //       ></i>
    //       <p
    //          onClick={() => {
    //             handleClick();
    //             handleThemeClick();
    //          }}
    //       >Thèmes</p>
    //       <p>Date</p>
    //       <p>Vues</p>
    //       <p>Note</p>
    //    </NavContainer>
    // </>
  );
}
