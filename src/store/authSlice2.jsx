import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;

export const authSlice = createSlice({
  name: 'auth2',
  initialState: {
    user: false,
    loaded: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loaded = true;
    },
  },
})

// Actions générées par slice
export const { setUser } = authSlice.actions;

// Thunks
export const fetchConnectedUser = () => (dispatch, getState) => {
  const state = getState();
  if (!state.auth2.loaded) {
    axios
      .get(`${apiURL}/connected`, {
        withCredentials: true
      })
      .then(response => response.json())
      .then(data => {
        setUser(data);
      })
      .catch(error => console.error('Erreur de chargement', error));
  }
};

export default authSlice.reducer;

// CONNEXION N UTILISANT QUE COOKIES SANS MANIPULER JWT