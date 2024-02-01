import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode';
// import axios from 'axios';
import axiosBase, { axiosSecu } from '../utils/axios';

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
    // addFollow: (state, action) => {
    //   if (!state.user.imFollowing.includes(action.payload)) {
    //     const updatedUser = {
    //       ...state.detail,
    //       imFollowing: [...state.user.imFollowing, action.payload]
    //     };
    //     localStorage.setItem('user', JSON.stringify(updatedUser));
    //     state.detail = updatedUser;
    //   }
    // },
    // removeFollow: (state, action) => {
    //   const updatedUser = {
    //     ...state.detail,
    //     imFollowing: state.detail.imFollowing.filter(id => id !== action.payload)
    //   };
      
    //   localStorage.setItem('user', JSON.stringify(updatedUser));
    //   state.detail = updatedUser;
    // },
  },
})

// Actions générées par slice
export const { setToken, setUser, resetUser } = userSlice.actions;

// Thunks
export const login = (token) => dispatch => {
  const decodeToken = jwtDecode(token);
  dispatch(setToken(token));
  dispatch(setUser(decodeToken));
};

export const logout = () => dispatch => {
  dispatch(resetUser());
};

// export const follow = (profilId) => (dispatch, getState) => {
//   const state = getState();
//   if (state.token && state.detail) {
//     const data = {
//       follower: state.detail.id,
//       followed: profilId
//     }
//     axios
//       .post(`${apiURL}/follows`, data, {
//         headers: {
//           Authorization: `Bearer ${state.token}`
//         }
//       })
//       .then((response) => {
//         if (!state.detail.imFollowing.find(profil => profil.id === profilId)) {
//           const newImFollowing = [...detail.imFollowing, response.data.follow];
//           const newUser = { ...detail, imFollowing: newImFollowing };
//           dispatch(setUser(newUser));
//           localStorage.setItem('user', JSON.stringify(newUser));
//         }
//       })
//       .catch((error) => {
//         console.error('Erreur pour follow le profil', error);
//       });
//   }
// }

// export const unfollow = (profilId) => (dispatch, getState) => {
//   const state = getState();
//   if (state.token && state.detail) {
//     axios
//       .delete(`${apiURL}/follows/${profilId}`, {
//         headers: {
//           Authorization: `Bearer ${state.token}`
//         }
//       })
//       .then((response) => {
//         const newImFollowing = detail.imFollowing.filter(profile => profile.id !== userIdToUnfollow);
//         const newUser = { ...detail, imFollowing: newImFollowing };
//         dispatch(setUser(newUser)); // met à jour le state avec le nouvel utilisateur suivant
//         localStorage.setItem('user', JSON.stringify(newUser)); // met à jour le localStorage
//       })
//       .catch((error) => {
//         console.error('Erreur d\'annulation de suivi', error);
//       });
//   }
// }


export default userSlice.reducer;