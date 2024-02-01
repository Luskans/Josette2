import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';
import axiosBase, { axiosSecu } from '../utils/axios';

// const apiURL = import.meta.env.VITE_API_URL;

export const profilSlice = createSlice({
  name: 'profil',
  initialState: {
    detail: '',
    loaded: false
  },
  reducers: {
    setProfil: (state, action) => {
      state.detail = action.payload;
      state.loaded = true;
    },
    resetProfil: (state) => {
      state.detail = '';
      state.loaded = false;
    },
  },
});

export const { setProfil, resetProfil } = profilSlice.actions;

export const fetchProfil = (id) => (dispatch, getState) => {
  const state = getState();
  if (!state.profil.loaded) {
    axiosBase
      // .get(`${apiURL}/users/${id}`)
      .get(`/users/${id}`)
      .then(response => {
        console.log('response', response.data);
        dispatch(setProfil(response.data));
      })
      .catch(error => console.error('Erreur de chargement', error));
  }
};

export default profilSlice.reducer;