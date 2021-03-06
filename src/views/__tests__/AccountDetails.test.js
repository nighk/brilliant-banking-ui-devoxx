import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AccountDetails from "../AccountDetails";

describe("AccountDetails.js", () => {
  const defaultTransactionsList = {
    "Aug": [
      {
        accountBalance: 1000,
        amount: 100,
        dateTime: "2020-08-25T12:00:00Z",
        reference: "Aug Transaction Ref",
        title: "Aug Transaction Title",
        type: "out"
      }
    ],
    "Sep": [
      {
        accountBalance: 2000,
        amount: 200,
        dateTime: "2020-09-25T12:00:00Z",
        reference: "Sep Transaction Ref",
        title: "Sep Transaction Title",
        type: "in"
      }
    ]
  };

  const mockStore = configureStore();

  const setup = (transactionsList) => {
     const store = mockStore({
      transactions: {
        list: transactionsList || defaultTransactionsList,
        hasLoaded: true
      }
    });

    render(
      <Provider store={store}>
        <AccountDetails accountId="1" />
      </Provider>
    );
  };

  it("Renders the back button", () => {
    setup();
    expect(screen.queryByTestId("account-details-back-button")).toBeInTheDocument()
  });
});
