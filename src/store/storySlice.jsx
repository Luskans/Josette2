import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;

export const storySlice = createSlice({
  name: 'story',
  initialState: {
    detail: '',
    list: [],
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
    setStories: (state, action) => {
      state.list = action.payload;
      state.loaded = true;
    },
  },
});

export const { setStory, resetStory, setStories } = storySlice.actions;

export const getStory = (id) => (dispatch, getState) => {
  const state = getState();
  if (!state.story.loaded) {
    axios
      .get(`${apiURL}/stories/${id}`)
      .then(response => {
        // console.log('response', response.data);
        dispatch(setStory(response.data));
      })
      .catch(error => console.error('Erreur de chargement', error));
  }
};

export const getStories = () => (dispatch, getState) => {
  const state = getState();
  if (!state.story.loaded) {
    axios
      .get(`${apiURL}/stories`)
      .then(response => {
        // console.log('response', response.data);
        dispatch(setStories(response.data));
      })
      .catch(error => console.error('Erreur de chargement', error));
  }
};

export default storySlice.reducer;