import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode';
// import axios from 'axios';
import axiosBase, { axiosSecu } from '@/utils/axios';

// const apiURL = import.meta.env.VITE_API_URL;

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: localStorage.getItem('token'), // Précharge le token à partir du local storage s'il existe
    refresh: localStorage.getItem('refresh_token'),
    loaded: false,
    // detail: JSON.parse(localStorage.getItem('user')) || null
    detail: JSON.parse(localStorage.getItem('user')) || null
  },
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem('token', action.payload); // Stocke le token dans le local storage
      state.token = action.payload; // Met à jour le token dans l'état
    },
    setRefresh: (state, action) => {
      localStorage.setItem('refresh_token', action.payload);
      state.refresh = action.payload;
    },
    setUser: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.detail = action.payload;
      state.loaded = true;
    },
    resetUser: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      state.token = null;
      state.refresh = null;
      state.loaded = false;
      state.detail = null;
    },
  },
})

export const { setToken, setUser, resetUser, setRefresh } = userSlice.actions;

// export const login = (response) => async (dispatch) => {
//   const decodeToken = await jwtDecode(response.token);
//   dispatch(setToken(response.token));
//   dispatch(setRefresh(response.refresh_token));
//   dispatch(setUser(decodeToken));
// };

export const login = (response) => async (dispatch) => {
  const decodeToken = await jwtDecode(response.token);
  await dispatch(setToken(response.token));
  await dispatch(setRefresh(response.refresh_token));
  await dispatch(setUser(decodeToken));
};

export const logout = () => dispatch => {
  dispatch(resetUser());
};

export const refreshToken = () => async (dispatch, getState) => {
  try {
    const response = await axiosBase.post('/token/refresh', {
      refresh_token: localStorage.getItem('refresh_token'),
    });
    const token = response.data.token;
    const refresh = response.data.refresh_token;
    console.log('token avant', localStorage.getItem('token'))
    await dispatch(setToken(token));
    console.log('token après', localStorage.getItem('token'))
    await dispatch(setRefresh(refresh));

  } catch (error) {
    console.error('Échec du rafraîchissement du token', error);
    dispatch(logout()); // Facultatif: déconnexion de l'utilisateur en cas d'échec du rafraîchissement
  }
};


export default userSlice.reducer;
