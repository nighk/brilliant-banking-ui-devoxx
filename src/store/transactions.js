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

    // TODO: 
    // You need to use the result from the api call above, the transactions are under res.data
    // Take a look at the console.log within the browser console to see the structure
    // Then sort the transactions by date using the sortTransactionsByDate function from ../utils/dateUtils.js 
    // Then group them by month using the groupTransactionsByMonth also from dateUtils.js
    // The functions you need are already imported at the top of the file
    console.log(res.data);
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