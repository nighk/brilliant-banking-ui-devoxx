import { render, screen, fireEvent } from "@testing-library/react";
import AccountCard from "../AccountCard";

describe("AccountCard.js", () => {
  let mockHandleClick = jest.fn();

  beforeEach(() => {
    render(
      <AccountCard
        handleClick={mockHandleClick}
        name="Main Account"
        balance={1000}
        type="Current Account"
        interestRate={0.5}
      />
    );
  });

  it("Renders an Account Card with the correct information", () => {
    expect(screen.getByTestId("account-name")).toHaveTextContent("Main Account");
    expect(screen.getByTestId("account-balance")).toHaveTextContent("£1,000");
    expect(screen.getByTestId("account-type")).toHaveTextContent("Current Account");
    expect(screen.getByTestId("account-interest")).toHaveTextContent("0.5% APR");
  });

  it("Runs handle click when the card is clicked", () => {
    fireEvent(
      screen.getByTestId("account-name"),
      new MouseEvent('click', {
        bubbles: true
      })
    );

    expect(mockHandleClick.mock.calls.length).toBe(1);
  });
});
