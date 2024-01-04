import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    detail: '',
    loaded: false
  },
  reducers: {
    setUser: (state, action) => {
      state.detail = action.payload;
      state.loaded = true;
    },
    resetUser: (state, action) => {
      state.detail = '';
      state.loaded = false;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export const fetchUser = (id) => (dispatch, getState) => {
  const state = getState();
  if (!state.user.loaded) {
    axios
      .get(`${apiURL}/users/${id}`)
      .then(response => {
        console.log('response', response.data);
        dispatch(setUser(response.data));
      })
      .catch(error => console.error('Erreur de chargement', error));
  }
};

export default userSlice.reducer;