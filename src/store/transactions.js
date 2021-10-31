import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import api from "../utils/api";

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

    // TODO: 
    // You need to pull the transactions from the server, the URL you need is: ${process.env.REACT_APP_SERVER_HOSTNAME}/accountDetails/${accountId}
    // Then sort them by date using the sortTransactionsByDate function from ../utils/dateUtils.js 
    // Then group them by month using the groupTransactionsByMonth also from dateUtils.js 
    let groupedTransactions = {};

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