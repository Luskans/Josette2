import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;

export const storySlice = createSlice({
  name: 'story',
  initialState: {
    detail: '',
    list: [],
    loaded: false,
    currentPage: 1,
    totalPage: '',
    search: 'order[createdAt]=asc',
  },
  reducers: {
    setStory: (state, action) => {
      state.detail = action.payload;
      state.loaded = true;
    },
    resetStory: (state) => {
      state.detail = '';
      state.loaded = false;
    },
    resetLoaded: (state) => {
      state.loaded = false;
    },
    setStories: (state, action) => {
      state.list = action.payload;
      state.loaded = true;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setStory, resetStory, resetLoaded, setStories, setCurrentPage, setTotalPage, setSearch } = storySlice.actions;

export const getStory = (id) => (dispatch, getState) => {
  const state = getState();
  if (!state.story.loaded) {
    axios
      .get(`${apiURL}/stories/${id}`)
      .then(response => {
        // console.log('response', response.data);
        dispatch(setStory(response.data));
      })
      .catch(error => console.error('Erreur de chargement', error));
  }
};

export const getStories = (parameters, page) => (dispatch, getState) => {
  const state = getState();
  axios
    .get(`${apiURL}/stories?${parameters}&page=${page}`, {
      headers: {'Accept': 'application/ld+json'}
    })
    .then(response => {
      // console.log('response', response);
      dispatch(setStories(response.data['hydra:member']));
      const totalPage = Math.ceil(response.data['hydra:totalItems'] / 20);
      dispatch(setTotalPage(totalPage))
    })
    .catch(error => console.error('Erreur de chargement', error));
};



// export const getStoriesByDateAsc = () => (dispatch, getState) => {
//   const state = getState();
//   if (!state.story.loaded) {
//     axios
//       .get(`${apiURL}/stories?page=1&order[createdAt]=asc`, {
//         headers: {'Accept': 'application/ld+json'}
//       })
//       .then(response => {
//         // console.log('response', response);
//         dispatch(setStories(response.data['hydra:member']));
//       })
//       .catch(error => console.error('Erreur de chargement', error));
//   }
// };

// export const getStoriesByDateDesc = () => (dispatch, getState) => {
//   const state = getState();
//   if (!state.story.loaded) {
//     axios
//       .get(`${apiURL}/stories?page=1&order[createdAt]=desc`)
//       .then(response => {
//         // console.log('response', response.data);
//         dispatch(setStories(response.data));
//       })
//       .catch(error => console.error('Erreur de chargement', error));
//   }
// };

// export const getStoriesByViewCountAsc = () => (dispatch, getState) => {
//   const state = getState();
//   if (!state.story.loaded) {
//     axios
//       .get(`${apiURL}/stories?page=1&order[viewCount]=asc`)
//       .then(response => {
//         // console.log('response', response.data);
//         dispatch(setStories(response.data));
//       })
//       .catch(error => console.error('Erreur de chargement', error));
//   }
// };

// export const getStoriesByViewCountDesc = () => (dispatch, getState) => {
//   const state = getState();
//   if (!state.story.loaded) {
//     axios
//       .get(`${apiURL}/stories?page=1&order[viewCount]=desc`)
//       .then(response => {
//         // console.log('response', response.data);
//         dispatch(setStories(response.data));
//       })
//       .catch(error => console.error('Erreur de chargement', error));
//   }
// };

// export const getStoriesByTitle = (title) => (dispatch, getState) => {
//   const state = getState();
//   if (!state.story.loaded) {
//     axios
//       .get(`${apiURL}/stories?page=1&title=title`)
//       .then(response => {
//         // console.log('response', response.data);
//         dispatch(setStories(response.data));
//       })
//       .catch(error => console.error('Erreur de chargement', error));
//   }
// };

// export const getStoriesByTheme = (theme) => (dispatch, getState) => {
//   const state = getState();
//   if (!state.story.loaded) {
//     axios
//       .get(`${apiURL}/stories?page=1&theme.name=theme`)
//       .then(response => {
//         // console.log('response', response.data);
//         dispatch(setStories(response.data));
//       })
//       .catch(error => console.error('Erreur de chargement', error));
//   }
// };

export default storySlice.reducer;