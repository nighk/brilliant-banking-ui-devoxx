import { configureStore } from "@reduxjs/toolkit";
import accounts from "./accounts";
import transactions from "./transactions";
import user from "./user";

const store = configureStore({
  reducer: {
    accounts,
    transactions,
    user
  }
});

export default store;