import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";
import { __esModule } from "@testing-library/jest-dom/dist/matchers";

test("username input should be render", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText("Enter your name");
  expect(userInputEl).toBeInTheDocument();
});

test("password input should be render", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText("Enter your password");
  expect(userInputEl).toBeInTheDocument();
});

test("button submit should be render", () => {
  render(<Login />);
  const userInputEl = screen.getByRole("button");
  expect(userInputEl).toBeInTheDocument();
});

test("username input should be empty", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText("Enter your name");
  expect(userInputEl.value).toBe("");
});

test("button submit should be disabled", () => {
  render(<Login />);
  const userInputEl = screen.getByRole("button");
  expect(userInputEl).toBeDisabled();
});

test("Err msg should be visible", () => {
  render(<Login />);
  const userInputEl = screen.getByTestId("error");
  expect(userInputEl).not.toBeVisible();
});

test("username input should change", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText("Enter your name");
  const testValue = "text username";
  fireEvent.change(userInputEl, { target: { value: testValue } });
  expect(userInputEl.value).toBe(testValue);
});

test("password input should change", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText("Enter your password");
  const testValue = "text username";
  fireEvent.change(userInputEl, { target: { value: testValue } });
  expect(userInputEl.value).toBe(testValue);
});

test("button should be not disabled when inputs exist", () => {
  render(<Login />);
  const butonEl = screen.getByRole("button");

  const userNameInputEl = screen.getByPlaceholderText("Enter your name");
  const userPwdInputEl = screen.getByPlaceholderText("Enter your password");
  const testValue = "text username";
  fireEvent.change(userPwdInputEl, { target: { value: testValue } });
  fireEvent.change(userNameInputEl, { target: { value: testValue } });
  expect(butonEl).not.toBeDisabled();
});

test("loading should be render when click", () => {
  render(<Login />);
  const butonEl = screen.getByRole("button");

  const userNameInputEl = screen.getByPlaceholderText("Enter your name");
  const userPwdInputEl = screen.getByPlaceholderText("Enter your password");
  const testValue = "text username";
  fireEvent.change(userPwdInputEl, { target: { value: testValue } });
  fireEvent.change(userNameInputEl, { target: { value: testValue } });
  fireEvent.click(butonEl);
  expect(butonEl).toHaveTextContent("please wait");
});

test("loading should not be render when fetching", async () => {
  render(<Login />);
  const butonEl = screen.getByRole("button");

  const userNameInputEl = screen.getByPlaceholderText("Enter your name");
  const userPwdInputEl = screen.getByPlaceholderText("Enter your password");
  const testValue = "text username";
  fireEvent.change(userPwdInputEl, { target: { value: testValue } });
  fireEvent.change(userNameInputEl, { target: { value: testValue } });
  fireEvent.click(butonEl);
  //async because , the button will call to backend
  await waitFor(() => {
    return expect(butonEl).not.toHaveTextContent("please wait");
  });
});

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: () => ({
      data: { id: 1, name: "join" },
    }),
  },
}));
