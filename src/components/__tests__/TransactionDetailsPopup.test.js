import { render, screen } from "@testing-library/react";
import TransactionDetailsPopup from "../TransactionDetailsPopup";

describe("TransactionDetailsPopup.js", () => {
  let mockHandleClose = jest.fn();

  const setup = (type) => {
    render(
      <TransactionDetailsPopup
        handleClose={mockHandleClose}
        title="A Transaction"
        accountBalance={1000}
        amount={100}
        type={type || "in"}
        dateTime="2020-10-25T12:00:00Z"
        reference="Transaction Reference"
      />
    );
  };

  it("Renders a popup with the correct information", () => {
    setup();
    expect(screen.getByTestId("transaction-title")).toHaveTextContent("A Transaction");
    expect(screen.getByTestId("transaction-reference")).toHaveTextContent("Transaction Reference");
    expect(screen.getByTestId("transaction-amount")).toHaveTextContent("£100");
    expect(screen.getByTestId("transaction-amount").firstChild.className).toContain("moneyIn");
    expect(screen.getByTestId("transaction-date-time")).toHaveTextContent("25 Oct 2020 @ 12:00");
    expect(screen.getByTestId("transaction-balance")).toHaveTextContent("£1,000");
  });

  it("Renders the transaction amount with the moneyOut class", () => {
    setup("out");
    expect(screen.getByTestId("transaction-amount").firstChild.className).toContain("moneyOut");
  });
});
