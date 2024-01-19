import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;

export const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    list: [],
    loaded: false
  },
  reducers: {
    setComments: (state, action) => {
      state.list = action.payload;
      state.loaded = true;
    },
  },
});

export const { setComments } = commentSlice.actions;

export const getComments = (storyId) => (dispatch, getState) => {
  const state = getState();
  if (!state.comment.loaded) {
    axios
      .get(`${apiURL}/comments/${storyId}`)
      .then(response => {
        // console.log('response', response.data);
        dispatch(setComments(response.data));
      })
      .catch(error => console.error('Erreur de chargement', error));
  }
};

export default commentSlice.reducer;