import { createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";
import { sortTransactionsByDate, groupTransactionsByMonth } from "../utils/dateUtils";

const slice = createSlice({
  name: "transactions",
  initialState: {
    list: {},
    loading: false,
    hasLoaded: false
  },
  reducers: {
    populateList: (state, action) => {
      state.list = action.payload;
      state.hasLoaded = true;
    },
    clearList: (state, action) => {
      state.list = [];
      state.hasLoaded = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setHasLoaded: (state, action) => {
      state.hasLoaded = action.payload;
    }
  }
});

export default slice.reducer;

const { populateList, clearList, setLoading, setHasLoaded } = slice.actions;

export const getTransactions = accountId => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await api.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/accountDetails/${accountId}`);

    sortTransactionsByDate(res.data);
    const groupedTransactions = groupTransactionsByMonth(res.data);

    dispatch(populateList(groupedTransactions));
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setHasLoaded(true));
    dispatch(setLoading(false));
    console.warn(e.message);
  }
}

export const clearTransactions = () => dispatch => {
    dispatch(clearList());
}