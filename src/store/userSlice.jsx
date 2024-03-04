import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode';
import axiosBase from '@/utils/axios';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: localStorage.getItem('token'),
    refresh: localStorage.getItem('refresh_token'),
    loaded: false,
    detail: JSON.parse(localStorage.getItem('user')) || null
  },
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem('token', action.payload);
      state.token = action.payload;
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

export const login = (response) => async (dispatch) => {
  const decodeToken = await jwtDecode(response.token);
  await dispatch(setToken(response.token));
  await dispatch(setRefresh(response.refresh_token));
  await dispatch(setUser(decodeToken));
};

export const logout = () => dispatch => {
  dispatch(resetUser());
};

export const refreshToken = () => async (dispatch) => {
  try {
    const response = await axiosBase.post('/token/refresh', {
      refresh_token: localStorage.getItem('refresh_token'),
    });
    const token = response.data.token;
    const refresh = response.data.refresh_token;
    await dispatch(setToken(token));
    await dispatch(setRefresh(refresh));

  } catch (error) {
    dispatch(logout()); // Facultatif: déconnexion de l'utilisateur en cas d'échec du rafraîchissement
  }
};


export default userSlice.reducer;
