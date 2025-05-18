import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Timeline from "../Timeline";

function mockVideoRef() {
  return {
    current: {
      currentTime: 0,
      duration: 100,
      play: jest.fn(),
      pause: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      readyState: 4,
    },
  };
}

describe("Timeline", () => {
  it("renders timeline and trim bar", () => {
    const { container } = render(
      <Timeline
        currentTime={0}
        duration={100}
        videoRef={mockVideoRef()}
        trim={{ start: 10, end: 90 }}
        onTrimChange={() => {}}
      />
    );
    expect(container.querySelector(".timeline")).toBeInTheDocument();
    expect(container.querySelector(".trim-bar")).toBeInTheDocument();
  });

  it("does not seek outside trim range", () => {
    const videoRef = mockVideoRef();
    const { container } = render(
      <Timeline
        currentTime={0}
        duration={100}
        videoRef={videoRef}
        trim={{ start: 10, end: 90 }}
        onTrimChange={() => {}}
      />
    );
    const timeline = container.querySelector(".timeline-container");
    fireEvent.click(timeline, { clientX: 0 }); // Should be outside trim
    expect(videoRef.current.currentTime).toBe(0);
  });
});
