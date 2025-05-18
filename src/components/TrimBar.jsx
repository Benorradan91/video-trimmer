import React, { useRef } from "react";
import "../styles/Timeline.css";

const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

const TrimBar = ({ duration, start, end, onChange }) => {
  const barRef = useRef(null);
  const drag = useRef();

  const toPercent = (sec) => (sec / duration) * 100;

  const onHandleDown = (type, e) => {
    e.stopPropagation();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    drag.current = { type, startX: clientX, start, end };

    const move = (ev) => {
      const x = ev.touches ? ev.touches[0].clientX : ev.clientX;
      const rect = barRef.current.parentElement.getBoundingClientRect();
      const dx = x - drag.current.startX;
      const deltaSec = (dx / rect.width) * duration;
      let newStart = drag.current.start,
        newEnd = drag.current.end;
      if (drag.current.type === "start") {
        newStart = clamp(
          drag.current.start + deltaSec,
          0,
          drag.current.end - 0.1
        );
      } else if (drag.current.type === "end") {
        newEnd = clamp(
          drag.current.end + deltaSec,
          drag.current.start + 0.1,
          duration
        );
      } else if (drag.current.type === "bar") {
        const barWidth = drag.current.end - drag.current.start;
        newStart = clamp(drag.current.start + deltaSec, 0, duration - barWidth);
        newEnd = newStart + barWidth;
      }
      onChange({ start: newStart, end: newEnd });
    };

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
      document.removeEventListener("touchmove", move);
      document.removeEventListener("touchend", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
    document.addEventListener("touchmove", move, { passive: false });
    document.addEventListener("touchend", up);
  };

  return (
    <div
      ref={barRef}
      className="trim-bar"
      style={{
        position: "absolute",
        left: `${toPercent(start)}%`,
        width: `${toPercent(end - start)}%`,
        top: 8,
        height: 120,
        display: "flex",
        alignItems: "center",
        pointerEvents: "none",
        background: "rgba(76,175,80,0.10)",
        border: "2px solid #4caf50",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(76,175,80,0.10)",
        zIndex: 3,
        overflow: "visible",
      }}
    >
      <div
        className="trim-handle start"
        style={{
          position: "absolute",
          left: "-8px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 4,
          pointerEvents: "auto",
          background: "#fff",
          border: "2px solid #4caf50",
          borderRadius: 6,
          width: 18,
          height: 80,
          boxShadow: "0 2px 6px rgba(76,175,80,0.08)",
          cursor: "ew-resize",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onMouseDown={(e) => onHandleDown("start", e)}
        onTouchStart={(e) => onHandleDown("start", e)}
      >
        <div
          style={{
            position: "absolute",
            top: -38,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#222",
            color: "#fff",
            fontSize: 13,
            padding: "2px 8px",
            borderRadius: 6,
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            whiteSpace: "nowrap",
            minWidth: 60,
            textAlign: "center",
          }}
        >
          Start: {start.toFixed(2)}s
        </div>
      </div>
      <div
        className="trim-handle end"
        style={{
          position: "absolute",
          right: "-8px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 4,
          pointerEvents: "auto",
          background: "#fff",
          border: "2px solid #4caf50",
          borderRadius: 6,
          width: 18,
          height: 80,
          boxShadow: "0 2px 6px rgba(76,175,80,0.08)",
          cursor: "ew-resize",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onMouseDown={(e) => onHandleDown("end", e)}
        onTouchStart={(e) => onHandleDown("end", e)}
      >
        <div
          style={{
            position: "absolute",
            top: -38,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#222",
            color: "#fff",
            fontSize: 13,
            padding: "2px 8px",
            borderRadius: 6,
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            whiteSpace: "nowrap",
            minWidth: 60,
            textAlign: "center",
          }}
        >
          End: {end.toFixed(2)}s
        </div>
      </div>
    </div>
  );
};

export default TrimBar;
