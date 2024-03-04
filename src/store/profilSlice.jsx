import { createSlice } from '@reduxjs/toolkit';
import axiosBase from '@/utils/axios';

export const profilSlice = createSlice({
  name: 'profil',
  initialState: {
    detail: '',
    loaded: false,
    update: null
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
      state.update = action.payload;
    },
    resetUpdate: (state) => {
      state.update = null
    },
  },
});

export const { setProfil, resetProfil, setUpdate, resetUpdate } = profilSlice.actions;

export const getProfil = (id) => (dispatch) => {
  axiosBase
    .get(`/users/${id}`)
    .then(response => {
      dispatch(setProfil(response.data));
    })
    .catch(error => console.error('Erreur de chargement', error));
};

export default profilSlice.reducer;