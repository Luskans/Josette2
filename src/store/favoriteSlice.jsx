import { createSlice } from '@reduxjs/toolkit';
import axiosBase, { axiosSecu } from '@/utils/axios';

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
    resetFavorite: (state) => {
      state.detail = [];
      state.loaded = false;
    },
  },
});

export const { setFavorites, setFavorite, resetFavorite } = favoriteSlice.actions;

export const getFavorite = (userId, storyId) => (dispatch) => {
  axiosBase
    .get(`/favorites?user.id[]=${userId}&story.id[]=${storyId}`)
    .then((response) => {
      dispatch(setFavorite(response.data))
    })
    .catch(error => console.error('Erreur de chargement', error));
};

export const postFavorite = (data) => (dispatch) => {
  axiosSecu
    .post(`/favorites`, data, {
      headers: {
        'Content-Type': 'application/ld+json',
      },
    })
    .then((response) => {
      dispatch(setFavorite(response.data))
    })
    .catch(error => console.error('Erreur de chargement', error));
};

export const deleteFavorite = (favoriteId) => (dispatch) => {
  axiosSecu
    .delete(`/favorites/${favoriteId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      dispatch(setFavorite([]))
    })
    .catch(error => console.error('Erreur de chargement', error));
};

export default favoriteSlice.reducer;