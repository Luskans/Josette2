import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;

export const storiesSlice = createSlice({
  name: 'stories',
  initialState: {
    list: [],
    loaded: false
  },
  reducers: {
    setStories: (state, action) => {
      state.list = action.payload;
      state.loaded = true;
    },
  },
});

export const { setStories } = storiesSlice.actions;

// stories avec authorisation
// export const fetchStories = () => (dispatch, getState) => {
//   const state = getState();
//   if (!state.stories.loaded) {
//     const token = state.auth.token;
//     axios
//       .get(`${apiURL}/stories`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })
//       .then(response => {
//         console.log('response', response.data);
//         dispatch(setStories(response.data));
//       })
//       .catch(error => console.error('Erreur de chargement', error));
//   }
// };

export const fetchStories = () => (dispatch, getState) => {
  const state = getState();
  if (!state.stories.loaded) {
    axios
      .get(`${apiURL}/stories`)
      .then(response => {
        console.log('response', response.data);
        dispatch(setStories(response.data));
      })
      .catch(error => console.error('Erreur de chargement', error));
  }
};

export default storiesSlice.reducer;