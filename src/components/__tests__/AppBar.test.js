import { render, screen, fireEvent } from "@testing-library/react";
import AppBar from "../AppBar";

describe("AppBar.js", () => {
  let mockHandleLogout = jest.fn();

  beforeEach(() => {
    render(
      <AppBar 
        handleLogout={mockHandleLogout} 
      />
    );
  });

  it("Renders the AppBar", () => {
    const titleText = screen.getByText(/Brilliant Banking/i);
    expect(titleText).toBeInTheDocument();
  });

  it("Runs handle click when the card is clicked", () => {
    fireEvent(
      screen.getByTestId("logout-button"),
      new MouseEvent('click', {
        bubbles: true
      })
    );

    expect(mockHandleLogout.mock.calls.length).toBe(1);
  });
});
