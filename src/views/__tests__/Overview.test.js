import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Overview from "../Overview";

describe("Overview.js", () => {
  const defaultAccountsList = {
    "0001": {
      "name": "Main Account",
      "type": "Current Account",
      "balance": 1000,
      "interestRate": 0.01
    }
  };

  const mockStore = configureStore();

  const setup = (accountsList) => {
    const store = mockStore({
      accounts: {
        list: accountsList || defaultAccountsList,
        hasLoaded: true
      }
    });

    render(
      <Provider store={store}>
        <Overview accountId={1} />
      </Provider>
    );
  };

  it("Renders the list of accounts", () => {
    setup();

    const accountTitle = screen.getByText(/Main Account/i);
    expect(accountTitle).toBeInTheDocument();

    expect(screen.queryByTestId("no-accounts")).not.toBeInTheDocument()
  });

  it("Renders a no accounts message", () => {
    setup({});
    expect(screen.queryByTestId("no-accounts")).toBeInTheDocument();
  });
});
