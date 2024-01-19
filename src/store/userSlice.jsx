import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;

export const userSlice = createSlice({
  name: 'user',
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
    setUser: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.user = action.payload;
      state.loaded = true;
    },
    resetUser: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.token = null;
      state.loaded = false;
      state.user = null;
    },
    addFollow: (state, action) => {
      if (!state.user.imFollowing.includes(action.payload)) {
        const updatedUser = {
          ...state.user,
          imFollowing: [...state.user.imFollowing, action.payload]
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        state.user = updatedUser;
      }
    },
    removeFollow: (state, action) => {
      const updatedUser = {
        ...state.user,
        imFollowing: state.user.imFollowing.filter(id => id !== action.payload)
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      state.user = updatedUser;
    },
  },
})

// Actions générées par slice
export const { setToken, setUser, resetUser, addFollow, removeFollow } = userSlice.actions;

// Thunks
export const login = (token) => dispatch => {
  const decodeToken = jwtDecode(token);
  dispatch(setToken(token));
  dispatch(setUser(decodeToken));
};

export const logout = () => dispatch => {
  dispatch(resetUser());
};

export const follow = (profilId) => (dispatch, getState) => {
  const state = getState();
  if (state.token && state.user) {
    const data = {
      follower: state.user.id,
      followed: profilId
    }
    axios
      .post(`${apiURL}/follows`, data, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      })
      .then((response) => {
        if (!state.user.imFollowing.find(profil => profil.id === profilId)) {
          const newImFollowing = [...user.imFollowing, response.data.follow];
          const newUser = { ...user, imFollowing: newImFollowing };
          dispatch(setUser(newUser));
          localStorage.setItem('user', JSON.stringify(newUser));
        }
      })
      .catch((error) => {
        console.error('Erreur pour follow le profil', error);
      });
  }
}

export const unfollow = (profilId) => (dispatch, getState) => {
  const state = getState();
  if (state.token && state.user) {
    axios
      .delete(`${apiURL}/follows/${profilId}`, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      })
      .then((response) => {
        const newImFollowing = user.imFollowing.filter(profile => profile.id !== userIdToUnfollow);
        const newUser = { ...user, imFollowing: newImFollowing };
        dispatch(setUser(newUser)); // met à jour le state avec le nouvel utilisateur suivant
        localStorage.setItem('user', JSON.stringify(newUser)); // met à jour le localStorage
      })
      .catch((error) => {
        console.error('Erreur d\'annulation de suivi', error);
      });
  }
}


export default userSlice.reducer;