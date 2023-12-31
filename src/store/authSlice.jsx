import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'), // Précharge le token à partir du local storage s'il existe
    loaded: false,
    user: JSON.parse(localStorage.getItem('user')) || null
  },
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem('token', action.payload); // Stocke le token dans le local storage
      state.token = action.payload; // Met à jour le token dans l'état
    },
    clearAuth: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.token = null;
      state.loaded = false;
      state.user = null;
    },
    setUser: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.user = action.payload;
      state.loaded = true;
    },
  },
})

// Actions générées par slice
export const { setToken, clearAuth, setUser } = authSlice.actions;

// Thunks
export const login = (token) => dispatch => {
  const decodeToken = jwtDecode(token);
  // const test = decodeToken.name
  dispatch(setToken(token));
  dispatch(setUser(decodeToken));
};

export const logout = () => dispatch => {
  dispatch(clearAuth());
};

// export const fetchUserConnected = () => (dispatch, getState) => {
//   const state = getState();
//   if (!state.auth.loaded) {
//     const token = state.auth.token;
//     const log = state.auth.log.username;

//     axios
//       .get(`${apiURL}/users?email=${log}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })
//       .then(response => {
//         console.log('response', response.data);
//         dispatch(setUser(response.data));
//       })
//       .catch(error => console.error('Erreur de chargement', error));
//   }
// };

export default authSlice.reducer;