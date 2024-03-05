import { createSlice } from '@reduxjs/toolkit';
import axiosBase from '@/utils/axios';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    list: [],
    loaded: false
  },
  reducers: {
    setThemes: (state, action) => {
      state.list = action.payload;
      state.loaded = true;
    },
  },
});

export const { setThemes } = themeSlice.actions;

export const fetchThemes = () => (dispatch, getState) => {
  const state = getState();
  if (!state.theme.loaded) {
    axiosBase
      .get(`/themes`)
      .then(response => {
        dispatch(setThemes(response.data));
      })
      .catch(error => console.error('Erreur de chargement', error));
  }
};

export default themeSlice.reducer;