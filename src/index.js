import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { LocationProvider } from "@reach/router";

import store from "./store"
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <LocationProvider>
        <App />
      </LocationProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);