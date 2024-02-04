import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { initFlowbite } from 'flowbite'
import { useDispatch, useSelector } from 'react-redux';
import { getStories, setCurrentPage, setSearch } from '../store/storySlice';

const NavContainer = styled.nav`
  transition: all 0.5s ease-in-out;
`;

export default function BotNav({ page }) {
    let prevScroll = window.scrollY;
    const dispatch = useDispatch();
    const themeList = useSelector((state) => state.theme.list);
    const totalPage = useSelector((state) => state.story.totalPage);
    const currentPage = useSelector((state) => state.story.currentPage);
    const search = useSelector((state) => state.story.search);
    const profil = useSelector((state) => state.profil.detail);

    useEffect(() => {
      const scrollHandler = (e) => {
        const currentScroll = window.scrollY;
        const botNav = document.querySelector('.botNav');

        (prevScroll > currentScroll)
          ? botNav.classList.add('scrollNav')
          : botNav.classList.remove('scrollNav');

        prevScroll = currentScroll;
      };

      window.addEventListener('scroll', scrollHandler);
      return () => window.removeEventListener('scroll', scrollHandler);
    });

    useEffect(() => {
      initFlowbite();
    }, []);

    const handleSearch = (parameters) => {
      dispatch(setCurrentPage(1));
      dispatch(setSearch(parameters));
      dispatch(getStories(parameters, 1));
    };

    const handlePrevious = (search, currentPage) => {
      if (currentPage > 1) {
        dispatch(getStories(search, currentPage - 1));
        dispatch(setCurrentPage(currentPage - 1))
      }
    };
  
    const handleNext = (search, currentPage, totalPage) => {
      if (currentPage < totalPage) {
        dispatch(getStories(search, currentPage + 1));
        dispatch(setCurrentPage(currentPage + 1))
      }
    };

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
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target)
            const title = formData.get('title')
            {page === 'home'
            ? handleSearch(`title[]=${title}`)
            : handleSearch(`user.id[]=${profil.id}&title[]=${title}`)
            }
          }}>
            <div className="flex">
              <div className="relative w-full">
                <input
                  type="search"
                  name="title"
                  id="search-dropdown"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Par titre..."
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
            {themeList.map((theme) => (
              <li key={theme.name}>
                <button
                  type="button"
                  className="w-full flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => {
                    (page === 'home')
                    ? handleSearch(`themeName=${theme.name}`)
                    : handleSearch(`user.id[]=${profil.id}&themeName=${theme.name}`)
                  }}
                >
                  {theme.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* BOUTON 3 */}
        <div className="flex items-center justify-center col-span-2">
          <div className="flex items-center justify-between w-full text-gray-600 dark:text-gray-400 bg-gray-100 rounded-lg dark:bg-gray-600 max-w-[128px] mx-2">
            <button
              type="button"
              className="inline-flex items-center justify-center h-8 px-1 w-6 bg-gray-100 rounded-s-lg dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-800"
              onClick={(e) => {
                e.preventDefault;
                handlePrevious(search, currentPage)
              }}
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
              onClick={(e) => {
                e.preventDefault;
                handleNext(search, currentPage, totalPage)
              }}
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
              <button
                type="button"
                className="w-full flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  (page === 'home')
                  ? handleSearch("order[createdAt]=asc")
                  : handleSearch(`user.id[]=${profil.id}&order[createdAt]=asc`)
                }}
              >
                Date
                <svg
                  className="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v13m0-13 4 4m-4-4-4 4"
                  />
                </svg>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="w-full flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  (page === 'home')
                  ? handleSearch("order[createdAt]=desc")
                  : handleSearch(`user.id[]=${profil.id}&order[createdAt]=desc`)
                }}
              >
                Date
                <svg
                  className="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19V5m0 14-4-4m4 4 4-4"
                  />
                </svg>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="w-full flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  (page === 'home')
                  ? handleSearch("byReadingTime=true&order=ASC")
                  : handleSearch(`user.id[]=${profil.id}&byReadingTime=true&order=ASC`)
                }}
              >
                Temps lecture
                <svg
                  className="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v13m0-13 4 4m-4-4-4 4"
                  />
                </svg>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="w-full flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  (page === 'home')
                  ? handleSearch("byReadingTime=true&order=DESC")
                  : handleSearch(`user.id[]=${profil.id}&byReadingTime=true&order=DESC`)
                }}
              >
                Temps lecture
                <svg
                  className="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19V5m0 14-4-4m4 4 4-4"
                  />
                </svg>
              </button>
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
            className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M22 11.5a.5.5 0 0 0-1 0 1.4 1.4 0 0 1-1.4 1 1.5 1.5 0 0 1-1.4-1 .5.5 0 0 0-1 0 1.5 1.5 0 0 1-2.7 0v-2h2.2a2.6 2.6 0 0 0 2.7-2.7 2.7 2.7 0 0 0-2.7-2.6h-.5l-.1-.3a2.6 2.6 0 0 0-3.8-1.4l-.3.1-.3-.1a2.6 2.6 0 0 0-2.8 0c-.4.4-.8.8-1 1.4V4h-.6a2.7 2.7 0 0 0-2.7 2.6 2.6 2.6 0 0 0 2.7 2.7h2.3v2a1.3 1.3 0 0 1-1.3 1 1.6 1.6 0 0 1-1.5-1 .5.5 0 0 0-1 0 1.5 1.5 0 0 1-1.4 1 1.4 1.4 0 0 1-1.4-1 .5.5 0 0 0-.5-.4.5.5 0 0 0-.5.6v.4a10 10 0 1 0 20 0v-.5ZM8.3 15.7a1 1 0 1 1 2.1 0 1 1 0 0 1-2 0Zm1.6 3.7a2.1 2.1 0 0 1 4.2 0H10Zm4.7-2.7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Bravo</span>
        </button>
        <div
          id="tooltip-like"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Bravo
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
              <button
                type="button"
                className="w-full flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  (page === 'home')
                  ? handleSearch("byLikes=true&order=ASC")
                  : handleSearch(`user.id[]=${profil.id}&byLikes=true&order=ASC`)
                }}
              >
                Bravo
                <svg
                  className="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v13m0-13 4 4m-4-4-4 4"
                  />
                </svg>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="w-full flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  (page === 'home')
                  ? handleSearch("byLikes=true&order=DESC")
                  : handleSearch(`user.id[]=${profil.id}&byLikes=true&order=DESC`)
                }}
              >
                Bravo
                <svg
                  className="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19V5m0 14-4-4m4 4 4-4"
                  />
                </svg>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="w-full flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  (page === 'home')
                  ? handleSearch("order[viewCount]=asc")
                  : handleSearch(`user.id[]=${profil.id}&order[viewCount]=asc`)
                }}
              >
                Vue
                <svg
                className="w-5 h-5 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v13m0-13 4 4m-4-4-4 4"
                />
              </svg>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="w-full flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  (page === 'home')
                  ? handleSearch("order[viewCount]=desc")
                  : handleSearch(`user.id[]=${profil.id}&order[viewCount]=desc`)
                }}
              >
                Vue
                <svg
                  className="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19V5m0 14-4-4m4 4 4-4"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </NavContainer>
  );
}
