import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';
import axiosBase, { axiosSecu } from '../utils/axios';

// const apiURL = import.meta.env.VITE_API_URL;

export const profilSlice = createSlice({
  name: 'profil',
  initialState: {
    detail: '',
    loaded: false,
    update: {
      quote: '',
      description: '',
      image: ''
    }
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
    setUpdate: (state, action) => {
      state.create = action.payload;
    },
    resetUpdate: (state) => {
      state.create = {
        quote: '',
        description: '',
        image: ''
      }
    },
  },
});

export const { setProfil, resetProfil, setUpdate, resetUpdate } = profilSlice.actions;

export const getProfil = (id) => (dispatch, getState) => {
  axiosBase
    // .get(`${apiURL}/users/${id}`)
    .get(`/users/${id}`)
    .then(response => {
      console.log('response', response.data);
      dispatch(setProfil(response.data));
    })
    .catch(error => console.error('Erreur de chargement', error));
};

export default profilSlice.reducer;