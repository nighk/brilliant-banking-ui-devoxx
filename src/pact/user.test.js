import { pactWith } from "jest-pact";
import { configureStore } from "@reduxjs/toolkit";
import user, { checkLogin } from "../store/user";

pactWith({ 
  consumer: "Brilliant Banking UI Devoxx", 
  provider: "Brilliant Banking Server Devoxx" 
}, 
provider => {

  let store;

  const checkLoginRequest = {
    "path": `/user`,
    "method": "GET",
    "headers": { 
      "Accept": "application/json"
    }
  };

  const checkLoginResponse = {
    status: 200,
    headers: {
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Content-Type": "application/json; charset=utf-8"
    },
    body: { username: "Pact Test" }
  };

  beforeEach(() => {
    process.env.REACT_APP_SERVER_HOSTNAME = provider.mockService.baseUrl;
    store = configureStore({
      reducer: {
        user
      }
    });
  });

  describe("Check logged in user pact test", () => {
    beforeEach(() =>
      provider.addInteraction({
        state: "a user is logged in",
        uponReceiving: "a request to check the login status of the user",
        withRequest: checkLoginRequest,
        willRespondWith: checkLoginResponse
      })
    );

    it("Retrieves the logged in users information", async () => {
      await store.dispatch(checkLogin());
      expect(store.getState().user.username).toEqual(checkLoginResponse.body.username);
    });
  });
});