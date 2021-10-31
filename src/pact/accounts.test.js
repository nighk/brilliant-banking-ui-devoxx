import { pactWith } from "jest-pact";
import { configureStore } from "@reduxjs/toolkit";
import accounts, { getAccounts } from "../store/accounts";
import accountResults from "./testData/accountResults.json";

pactWith({ 
  consumer: "Brilliant Banking UI Devoxx", 
  provider: "Brilliant Banking Server Devoxx" 
}, 
provider => {

  let store;

  const accountRequest = {
    "path": `/accounts`,
    "method": "GET",
    "headers": { 
      "Accept": "application/json"
    }
  };

  const accountResponse = {
    status: 200,
    headers: {
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Content-Type": "application/json; charset=utf-8"
    },
    body: accountResults
  };

  beforeEach(() => {
    process.env.REACT_APP_SERVER_HOSTNAME = provider.mockService.baseUrl;
    store = configureStore({
      reducer: {
        accounts
      }
    });
  });

  describe("Get accounts pact test", () => {
    beforeEach(() =>
      provider.addInteraction({
        state: "several accounts exist",
        uponReceiving: "a request for all accounts",
        withRequest: accountRequest,
        willRespondWith: accountResponse
      })
    );

    it("Retrieves Accounts", async () => {
      await store.dispatch(getAccounts());
      expect(Object.keys(store.getState().accounts.list)).toHaveLength(3);
    });
  });

});