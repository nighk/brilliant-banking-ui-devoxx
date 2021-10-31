import { render, screen, fireEvent, prettyDOM } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Login from "../Login";
import { login } from "../../store/user";

describe("Login.js", () => {
  const mockStore = configureStore();
  let store;

  const setup = (errorMessage) => {
    store = mockStore({
      user: {
        errorMessage: errorMessage || null
      }
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Login accountId={1} />
      </Provider>
    );
  };

  it("Renders the expected elements", () => {
    setup();
    expect(screen.queryByTestId("login-username")).toBeInTheDocument();
    expect(screen.queryByTestId("login-password")).toBeInTheDocument();
    expect(screen.queryByTestId("login-button")).toBeInTheDocument();
    expect(screen.queryByTestId("login-error")).not.toBeInTheDocument();
  });

  it("Renders an error message", () => {
    const errorMessage = "Error Message";
    setup(errorMessage);

    const loginError = screen.queryByTestId("login-error");
    expect(loginError).toBeInTheDocument();
    expect(loginError).toHaveTextContent(errorMessage);
  });

  it("Submits the login form", () => {
    setup();

    const usernameField = screen.queryByTestId("login-username").querySelector("input");
    const username = "username"
    fireEvent.change(usernameField, {target: {value: username}});

    const passwordField = screen.queryByTestId("login-password").querySelector("input");
    const password = "password";
    fireEvent.change(passwordField, {target: {value: password}});
    
    fireEvent(
      screen.getByTestId("login-button"),
      new MouseEvent('click', {
        bubbles: true
      })
    );

    expect(store.dispatch.mock.calls).toHaveLength(1);
  });
});
