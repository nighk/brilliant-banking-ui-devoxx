import { createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";

const slice = createSlice({
  name: "accounts",
  initialState: {
    list: {},
    loading: false,
    hasLoaded: false,
    error: null
  },
  reducers: {
    populateList: (state, action) => {
      state.list = action.payload;
      state.hasLoaded = true;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state, action) => {
      state.error = null;
    }
  },
});

export default slice.reducer;

const { populateList, setLoading, setError, clearError } = slice.actions;

export const getAccounts = () => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await api.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/accounts`);
    dispatch(populateList(res.data));
    dispatch(clearError());
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setError(e.response.data));
    dispatch(setLoading(false));
    console.warn(e.message);
  }
}