import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axiosBase, { axiosSecu } from '@/utils/axios';

export const storySlice = createSlice({
  name: 'story',
  initialState: {
    detail: '',
    list: [],
    loaded: false,
    updated: false,
    currentPage: 1,
    totalPage: 1,
    search: 'order[createdAt]=asc',
    nameSearch: "date croissante",
    create: {
      title: '',
      synopsis: '',
      themes: [],
      image: '',
      content: ''
    }
  },
  reducers: {
    setStory: (state, action) => {
      state.detail = action.payload;
      state.loaded = true;
    },
    resetStory: (state) => {
      state.detail = '';
      state.loaded = false;
      state.updated = false;
    },
    setStories: (state, action) => {
      state.list = action.payload;
      state.loaded = true;
    },
    resetStories: (state) => {
      state.list = [];
      state.loaded = false;
      state.updated = false;
      state.currentPage = 1;
      state.totalPage = 1;
      state.search = 'order[createdAt]=asc';
      state.nameSearch = 'date croissante'
    },
    updateStory: (state) => {
      state.updated = !state.updated;
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
    setNameSearch: (state, action) => {
      state.nameSearch = action.payload;
    },
    setCreate: (state, action) => {
      state.create = action.payload;
    },
    resetCreate: (state) => {
      state.create = {
        title: '',
        synopsis: '',
        themes: [],
        image: '',
        content: ''
      }
    },
  },
});

export const { setStory, resetStory, setStories, resetStories, updateStory, setCurrentPage, setTotalPage, setSearch, setNameSearch, setCreate, resetCreate } = storySlice.actions;

export const getStory = (id) => (dispatch, getState) => {
  axiosBase
    .get(`/stories/${id}`)
    .then(response => {
      dispatch(setStory(response.data));

      // Incrémenter viewCount après avoir récupéré la story
      const viewCount = response.data.viewCount + 1;
      const data = {
        viewCount: viewCount
      }
    
      return axiosBase.patch(`/stories/${id}`, data, {
        headers: {'Content-Type': 'application/merge-patch+json'}
      });
    })
    .catch(error => console.error('Erreur de chargement', error));
};

export const deleteStory = (storyId) => (dispatch, getState) => {
  axiosSecu
    .delete(`/stories/${storyId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      toast.success('Histoire supprimée !', { duration: 9000 });
      // dispatch(resetStory());
    })
    .catch((error) => {
      toast.error("Une erreur est survenue.", { duration: 9000 });
    });
};

export const getStories = (parameters, page) => (dispatch) => {
  axiosBase
    .get(`/stories?${parameters}&page=${page}`, {
      headers: {'Accept': 'application/ld+json'}
    })
    .then(response => {
      dispatch(setStories(response.data['hydra:member']));
      const totalPage = Math.ceil(response.data['hydra:totalItems'] / 20);
      dispatch(setTotalPage(totalPage))
    })
    .catch(error => console.error('Erreur de chargement', error));
};

export default storySlice.reducer;