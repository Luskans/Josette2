import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';
import toast from 'react-hot-toast';
import axiosBase, { axiosSecu } from '../utils/axios';


// const apiURL = import.meta.env.VITE_API_URL;
// const token = localStorage.getItem('token');

export const storySlice = createSlice({
  name: 'story',
  initialState: {
    detail: '',
    list: [],
    loaded: false,
    currentPage: 1,
    totalPage: '',
    search: 'order[createdAt]=asc',
  },
  reducers: {
    setStory: (state, action) => {
      state.detail = action.payload;
      state.loaded = true;
    },
    resetStory: (state) => {
      state.detail = '';
      state.loaded = false;
    },
    resetLoaded: (state) => {
      state.loaded = false;
    },
    setStories: (state, action) => {
      state.list = action.payload;
      state.loaded = true;
    },
    resetStories: (state, action) => {
      state.list = [];
      state.loaded = false;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setStory, resetStory, resetLoaded, setStories, resetStories, setCurrentPage, setTotalPage, setSearch } = storySlice.actions;

export const getStory = (id) => (dispatch, getState) => {
  axiosBase
    // .get(`${apiURL}/stories/${id}`)
    .get(`/stories/${id}`)
    .then(response => {
      // console.log('response', response.data);
      dispatch(setStory(response.data));

      // Incrémenter viewCount après avoir récupéré la story
      const viewCount = response.data.viewCount + 1;
      const data = {
        viewCount: viewCount
      }
      // return axios.patch(`${apiURL}/stories/${id}`, data, {
      return axiosBase.patch(`/stories/${id}`, data, {
        headers: {'Content-Type': 'application/merge-patch+json'}
      });
    })
    .catch(error => console.error('Erreur de chargement', error));
};

// export const postStory = (data) => {
//   axios
//     .post(`${apiURL}/stories`, data, {
//       headers: {
//         'Content-Type': 'application/merge-patch+json',
//         'Authorization': `Bearer ${token}`
//       },
//     })
//     .then((response) => {
//       toast.success('Nouvelle histoire publiée !', { duration: 9000 });
//       Navigate('/');
//     })
//     .catch((error) => {
//       if (error.response.data.detail === 'Title already used.') {
//         toast.error("Nom d'histoire déjà utilisé.", { duration: 9000 });
//       } else {
//         toast.error('Une erreur est survenue.', { duration: 9000 });
//       }
//     });
// };

export const deleteStory = (storyId) => (dispatch, getState) => {
  axiosSecu
    // .delete(`${apiURL}/stories/${storyId}`, {
    .delete(`/stories/${storyId}`, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
    })
    .then(response => {
      toast.success('Histoire supprimée !', { duration: 9000 });
      dispatch(resetStory());
    })
    .catch((error) => {
      toast.error("Une erreur est survenue.", { duration: 9000 });
    });
};

export const getStories = (parameters, page) => (dispatch, getState) => {
  const state = getState();
  axiosBase
    // .get(`${apiURL}/stories?${parameters}&page=${page}`, {
    .get(`/stories?${parameters}&page=${page}`, {
      headers: {'Accept': 'application/ld+json'}
    })
    .then(response => {
      // console.log('response', response);
      dispatch(setStories(response.data['hydra:member']));
      const totalPage = Math.ceil(response.data['hydra:totalItems'] / 20);
      dispatch(setTotalPage(totalPage))
    })
    .catch(error => console.error('Erreur de chargement', error));
};

export default storySlice.reducer;