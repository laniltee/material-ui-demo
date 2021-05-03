import { fireEvent, render } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const { container } = render(<App />);
  const wrapTextElement = container.querySelector("#wrapText");
  const summaryElement = container.querySelector("#summary");
  const toggleButton = container.querySelector("#btnToggleWrapText");

  expect(summaryElement.innerHTML).toEqual("Has Overlapped: No, Length: 0");
  expect(wrapTextElement.innerHTML).toEqual("");

  fireEvent.click(toggleButton);
  expect(summaryElement.innerHTML).toEqual("Has Overlapped: No, Length: 574");

  fireEvent.click(toggleButton);
  expect(summaryElement.innerHTML).toEqual("Has Overlapped: No, Length: 99");
});
