import { pactWith } from "jest-pact";
import { configureStore } from "@reduxjs/toolkit";
import transactions, { getTransactions } from "../store/transactions";
import transactionResults from "./testData/transactionResults.json";

pactWith({ 
  consumer: "Brilliant Banking UI Devoxx", 
  provider: "Brilliant Banking Server Devoxx" 
}, 
provider => {

  let store;
  const accountNumber = "0001";

  const transactionRequest = {
    "path": `/accountDetails/${accountNumber}`,
    "method": "GET",
    "headers": { 
      "Accept": "application/json"
    }
  };

  const transactionResponse = {
    status: 200,
    headers: {
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Content-Type": "application/json; charset=utf-8"
    },
    body: transactionResults
  };

  beforeEach(() => {
    process.env.REACT_APP_SERVER_HOSTNAME = provider.mockService.baseUrl;
    store = configureStore({
      reducer: {
        transactions
      }
    });
  });

  describe("Get transactions pact test", () => {
    beforeEach(() =>
      provider.addInteraction({
        state: "several transactions exist for an account",
        uponReceiving: "a request for transactions",
        withRequest: transactionRequest,
        willRespondWith: transactionResponse
      })
    );

    it("Retrieves Transactions", async () => {
      await store.dispatch(getTransactions(accountNumber));
      expect(store.getState().transactions.list.Aug).toHaveLength(6);
      expect(store.getState().transactions.list.Sep).toHaveLength(7);
      expect(store.getState().transactions.list.Oct).toHaveLength(7);
    });
  });

});