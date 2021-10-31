import { render, screen, fireEvent } from "@testing-library/react";
import TransactionCard from "../TransactionCard";

describe("TransactionCard.js", () => {
  let mockHandleClick = jest.fn();

  const setup = (type) => {
    render(
      <TransactionCard
        handleClick={mockHandleClick}
        title="A Transaction"
        accountBalance={1000}
        amount={100}
        type={type || "in"}
        dateTime="2020-10-25T12:00:00Z"
      />
    );
  };

  it("Renders a card with the correct information", () => {
    setup();
    expect(screen.getByTestId("transaction-title")).toHaveTextContent("A Transaction");
    expect(screen.getByTestId("transaction-amount")).toHaveTextContent("£100");
    expect(screen.getByTestId("transaction-amount").firstChild.className).toContain("moneyIn");
    expect(screen.getByTestId("transaction-date-time")).toHaveTextContent("25 Oct 2020 @ 12:00");
    expect(screen.getByTestId("transaction-balance")).toHaveTextContent("£1,000");
  });

  it("Renders the transaction amount with the moneyOut class", () => {
    setup("out");
    expect(screen.getByTestId("transaction-amount").firstChild.className).toContain("moneyOut");
  });

  it("Runs handle click when the card is clicked", () => {
    setup();

    fireEvent(
      screen.getByTestId("transaction-title"),
      new MouseEvent('click', {
        bubbles: true
      })
    );

    expect(mockHandleClick.mock.calls.length).toBe(1);
  });
});
