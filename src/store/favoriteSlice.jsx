import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';
import axiosBase, { axiosSecu } from '../utils/axios';

// const apiURL = import.meta.env.VITE_API_URL;
// const token = localStorage.getItem('token');

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    list: [],
    detail: [],
    loaded: false
  },
  reducers: {
    setFavorites: (state, action) => {
      state.list = action.payload;
      state.loaded = true;
    },
    setFavorite: (state, action) => {
      state.detail = action.payload;
      state.loaded = true;
    },
  },
});

export const { setFavorites, setFavorite } = favoriteSlice.actions;

// export const getFavorite = () => (dispatch, getState) => {
//   const state = getState();
//   if (!state.favorite.loaded) {
//     const token = localStorage.getItem('token');
//     // const token = state.auth.token;

//     axios
//       .get(`${apiURL}/favorites`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       })
//       .then(response => {
//         // console.log('response', response.data);
//         dispatch(setFavorites(response.data));
//       })
//       .catch(error => console.error('Erreur de chargement', error));
//   }
// };

export const getFavorite = (userId, storyId) => (dispatch, getState) => {
  axiosSecu
    // .get(`${apiURL}/favorites?user.id[]=${userId}&story.id[]=${storyId}`, {
    .get(`/favorites?user.id[]=${userId}&story.id[]=${storyId}`, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
    })
    .then((response) => {
      console.log('favorites response', response)
      dispatch(setFavorite(response.data))
    })
    .catch((error) => {
      // toast.error("Une erreur est survenue.", { duration: 9000 });
    });
};

export const postFavorite = (data) => (dispatch, getState) => {
  axiosSecu
    // .post(`${apiURL}/favorites`, data, {
    .post(`/favorites`, data, {
      headers: {
        'Content-Type': 'application/ld+json',
        // 'Authorization': `Bearer ${token}`
      },
    })
    .then((response) => {
      console.log('favorites response', response)
      dispatch(setFavorite(response.data))
    })
    .catch((error) => {
      // toast.error("Une erreur est survenue.", { duration: 9000 });
    });
};

export const deleteFavorite = (favoriteId) => (dispatch, getState) => {
  axiosSecu
    // .delete(`${apiURL}/favorites/${favoriteId}`, {
    .delete(`/favorites/${favoriteId}`, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
    })
    .then((response) => {
      console.log('favorites response', response)
      dispatch(setFavorite([]))
    })
    .catch((error) => {
      // toast.error("Une erreur est survenue.", { duration: 9000 });
    });
};

export default favoriteSlice.reducer;