import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode';
// import axios from 'axios';
import axiosBase, { axiosSecu } from '@/utils/axios';

// const apiURL = import.meta.env.VITE_API_URL;

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: localStorage.getItem('token'), // Précharge le token à partir du local storage s'il existe
    loaded: false,
    detail: JSON.parse(localStorage.getItem('user')) || null
  },
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem('token', action.payload); // Stocke le token dans le local storage
      state.token = action.payload; // Met à jour le token dans l'état
    },
    setUser: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.detail = action.payload;
      state.loaded = true;
    },
    resetUser: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.token = null;
      state.loaded = false;
      state.detail = null;
    },
  },
})

export const { setToken, setUser, resetUser } = userSlice.actions;

export const login = (token) => async (dispatch) => {
  const decodeToken = await jwtDecode(token);
  dispatch(setToken(token));
  dispatch(setUser(decodeToken));
};

export const logout = () => dispatch => {
  dispatch(resetUser());
};


export default userSlice.reducer;