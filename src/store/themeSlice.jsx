import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';
import axiosBase, { axiosSecu } from '../utils/axios';

// const apiURL = import.meta.env.VITE_API_URL;

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    list: [],
    loaded: false
  },
  reducers: {
    setThemes: (state, action) => {
      state.list = action.payload;
      state.loaded = true;
    },
  },
});

export const { setThemes } = themeSlice.actions;

// export const fetchThemes = () => (dispatch, getState) => {
//   const state = getState();
//   if (!state.theme.loaded) {
//     axios
//       .get(`${apiURL}/themes`, {
//         headers: {'Accept': 'application/ld+json'}
//       })
//       .then(response => {
//         // console.log('response theme', response.data['hydra:member']);
//         dispatch(setThemes(response.data['hydra:member']));
//       })
//       .catch(error => console.error('Erreur de chargement', error));
//   }
// };

export const fetchThemes = () => (dispatch, getState) => {
  const state = getState();
  if (!state.theme.loaded) {
    axiosBase
      // .get(`${apiURL}/themes`)
      .get(`/themes`)
      .then(response => {
        // console.log('response theme', response.data['hydra:member']);
        dispatch(setThemes(response.data));
      })
      .catch(error => console.error('Erreur de chargement', error));
  }
};

export default themeSlice.reducer;