import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';
import axiosBase, { axiosSecu } from '../utils/axios';

// const apiURL = import.meta.env.VITE_API_URL;
// const token = localStorage.getItem('token');

export const followSlice = createSlice({
  name: 'follow',
  initialState: {
    list: [],
    detail: [],
    loaded: false
  },
  reducers: {
    setFollows: (state, action) => {
      state.list = action.payload;
      state.loaded = true;
    },
    setFollow: (state, action) => {
      state.detail = action.payload;
      state.loaded = true;
    },
    resetFollow: (state, action) => {
      state.detail = [];
      state.loaded = false;
    },
  },
});

export const { setFollows, setFollow, resetFollow } = followSlice.actions;

export const getFollow = (followerId, followedId) => (dispatch, getState) => {
  axiosBase
    // .get(`${apiURL}/follows?follower.id[]=${followerId}&followed.id[]=${followedId}`, {
    .get(`/follows?follower.id[]=${followerId}&followed.id[]=${followedId}`)
    .then((response) => {
      // console.log('follow response', response)
      dispatch(setFollow(response.data))
    })
    .catch((error) => {
      // toast.error("Une erreur est survenue.", { duration: 9000 });
    });
};

export const postFollow = (data) => (dispatch, getState) => {
  axiosSecu
    // .post(`${apiURL}/follows`, data, {
    .post(`/follows`, data, {
      headers: {
        'Content-Type': 'application/ld+json',
        // 'Authorization': `Bearer ${token}`
      },
    })
    .then((response) => {
      // console.log('follows response', response)
      dispatch(setFollow(response.data))
    })
    .catch((error) => {
      // toast.error("Une erreur est survenue.", { duration: 9000 });
    });
};

export const deleteFollow = (followId) => (dispatch, getState) => {
  axiosSecu
    // .delete(`${apiURL}/follows/${followId}`, {
    .delete(`/follows/${followId}`, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
    })
    .then((response) => {
      // console.log('follows response', response)
      dispatch(setFollow([]))
    })
    .catch((error) => {
      // toast.error("Une erreur est survenue.", { duration: 9000 });
    });
};

// export const getImFollowing = () => (dispatch, getState) => {
//   const state = getState();
//   if (!state.themes.loaded) {
//     // const token = localStorage.getItem('token');
//     // const token = state.auth.token;

//     axiosBase
//       // .get(`${apiURL}/themes`, {
//       .get(`/themes`)
//       .then(response => {
//         console.log('response', response.data);
//         dispatch(setThemes(response.data));
//       })
//       .catch(error => console.error('Erreur de chargement', error));
//   }
// };

// export const getWhoFollowMe = () => (dispatch, getState) => {
//   const state = getState();
//   if (!state.themes.loaded) {
//     // const token = localStorage.getItem('token');
//     // const token = state.auth.token;

//     axiosBase
//       .get(`${apiURL}/themes`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       })
//       .then(response => {
//         console.log('response', response.data);
//         dispatch(setThemes(response.data));
//       })
//       .catch(error => console.error('Erreur de chargement', error));
//   }
// };

export default followSlice.reducer;