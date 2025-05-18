import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TrimBar from "../TrimBar";

describe("TrimBar", () => {
  it("renders start and end handles with correct labels", () => {
    const { getByText } = render(
      <TrimBar duration={100} start={10} end={90} onChange={() => {}} />
    );
    expect(getByText(/Start: 10.00s/)).toBeInTheDocument();
    expect(getByText(/End: 90.00s/)).toBeInTheDocument();
  });

  it("calls onChange when dragging start handle", () => {
    const onChange = jest.fn();
    const { container } = render(
      <TrimBar duration={100} start={10} end={90} onChange={onChange} />
    );
    const startHandle = container.querySelector(".trim-handle.start");
    fireEvent.mouseDown(startHandle, { clientX: 100 });
    fireEvent.mouseMove(document, { clientX: 120 });
    fireEvent.mouseUp(document);
    expect(onChange).toHaveBeenCalled();
  });

  it("calls onChange when dragging end handle", () => {
    const onChange = jest.fn();
    const { container } = render(
      <TrimBar duration={100} start={10} end={90} onChange={onChange} />
    );
    const endHandle = container.querySelector(".trim-handle.end");
    fireEvent.mouseDown(endHandle, { clientX: 200 });
    fireEvent.mouseMove(document, { clientX: 220 });
    fireEvent.mouseUp(document);
    expect(onChange).toHaveBeenCalled();
  });
});
