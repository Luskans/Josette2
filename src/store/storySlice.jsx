import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;

export const storySlice = createSlice({
  name: 'story',
  initialState: {
    detail: '',
    loaded: false
  },
  reducers: {
    setStory: (state, action) => {
      state.detail = action.payload;
      state.loaded = true;
    },
    resetStory: (state, action) => {
      state.detail = '';
      state.loaded = false;
    },
  },
});

export const { setStory, resetStory } = storySlice.actions;

export const fetchStory = (id) => (dispatch, getState) => {
  const state = getState();
  if (!state.story.loaded) {
    axios
      .get(`${apiURL}/stories/${id}`)
      .then(response => {
        console.log('response', response.data);
        dispatch(setStory(response.data));
      })
      .catch(error => console.error('Erreur de chargement', error));
  }
};

export default storySlice.reducer;