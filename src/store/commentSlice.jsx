import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;

export const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    list: [],
    loaded: false,
    currentPage: 1,
    totalPage: 0,
    totalComment: 0
  },
  reducers: {
    setComments: (state, action) => {
      state.list = action.payload;
      state.loaded = true;
    },
    resetLoaded: (state) => {
      state.loaded = false;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
    setTotalComment: (state, action) => {
      state.totalComment = action.payload;
    },
  },
});

export const { setComments, resetLoaded, setCurrentPage, setTotalPage, setTotalComment } = commentSlice.actions;

export const getComments = (storyId, page) => (dispatch, getState) => {
  const state = getState();
  axios
    .get(`${apiURL}/comments/?story.id=${storyId}&page=${page}`, {
      headers: {'Accept': 'application/ld+json'}
    })
    .then(response => {
      // console.log('response', response.data);
      dispatch(setComments(response.data['hydra:member']));
      const totalPage = Math.ceil(response.data['hydra:totalItems'] / 10);
      dispatch(setTotalPage(totalPage));
      const totalComment = response.data['hydra:totalItems'];
      dispatch(setTotalComment(totalComment));
    })
    .catch(error => console.error('Erreur de chargement', error));
  
};

export default commentSlice.reducer;