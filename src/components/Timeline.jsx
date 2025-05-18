import React, { useRef, useEffect, useState } from "react";
import "../styles/Timeline.css";
import TrimBar from './TrimBar';

const Timeline = ({ currentTime, duration, videoRef, trim, onTrimChange }) => {
  const timelineRef = useRef(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!videoRef?.current || !duration) return;
    const video = videoRef.current;
    let cancelled = false;
    const generateThumbnails = async () => {
      setLoading(true);
      const numberOfThumbnails = 32;
      const thumbWidth = 160;
      const thumbHeight = 90;
      const interval = duration / numberOfThumbnails;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const thumbs = [];
      if (video.readyState < 2) {
        await new Promise(resolve => {
          const onLoaded = () => {
            video.removeEventListener('loadeddata', onLoaded);
            resolve();
          };
          video.addEventListener('loadeddata', onLoaded);
        });
      }
      for (let i = 0; i < numberOfThumbnails; i++) {
        if (cancelled) break;
        const time = i * interval;
        await new Promise(resolve => {
          video.currentTime = time;
          video.onseeked = () => resolve();
        });
        canvas.width = thumbWidth;
        canvas.height = thumbHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        thumbs.push(canvas.toDataURL("image/jpeg", 0.85));
      }
      if (!cancelled) setThumbnails(thumbs);
      setLoading(false);
      if (!cancelled) video.currentTime = 0;
    };
    generateThumbnails();
    return () => { cancelled = true; };
  }, [videoRef, duration]);

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  const handleTimelineSeek = (e) => {
    if (!timelineRef.current || !videoRef.current || !duration) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    let percent = (x - rect.left) / rect.width;
    percent = Math.max(0, Math.min(1, percent));
    const seekTime = percent * duration;
    if (seekTime >= trim.start && seekTime <= trim.end) {
      videoRef.current.currentTime = seekTime;
    }
  };

  return (
    <div style={{ width: 800, margin: "0 auto" }}>
      <div
        className="timeline-container"
        ref={timelineRef}
        style={{
          width: 800,
          minWidth: 800,
          maxWidth: 800,
          position: "relative",
          height: 140,
          margin: "0 auto",
          cursor: "pointer"
        }}
        onClick={handleTimelineSeek}
        onTouchStart={handleTimelineSeek}
      >
        <div
          className="timeline"
          style={{
            width: "100%",
            minWidth: 800,
            maxWidth: 800,
            left: 0,
            right: 0,
            display: "flex",
            overflow: "hidden",
            position: "absolute",
            top: 8,
            zIndex: 1,
            height: 120,
            background: "#222",
            borderRadius: 8,
          }}
          onClick={handleTimelineSeek}
          onTouchStart={handleTimelineSeek}
        >
          {loading ? (
            <div style={{
              width: "100%",
              textAlign: "center",
              color: "#aaa",
              fontSize: 18,
              lineHeight: "120px"
            }}>Generating thumbnails...</div>
          ) : (
            thumbnails.map((thumb, idx) => (
              <div key={idx} style={{
                flex: "1 0 auto",
                minWidth: `${800 / thumbnails.length}px`,
                height: "120px",
                background: "#111",
                borderRadius: "0",
                overflow: "hidden",
                border: "1px solid #444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <img src={thumb} alt={`thumb-${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))
          )}
        </div>
        <div
          className="timeline-progress"
          style={{
            width: `${progressPercent}%`,
            minWidth: 0,
            maxWidth: 800 * (thumbnails.length ? thumbnails.length / 8 : 1),
            left: 0,
            right: 0,
            position: "absolute",
            top: 8,
            height: 120,
            background: "rgba(33,150,243,0.18)",
            borderRadius: 8,
            zIndex: 2,
            pointerEvents: "none",
            transition: "width 0.1s linear",
          }}
          onClick={handleTimelineSeek}
          onTouchStart={handleTimelineSeek}
        />
        <TrimBar
          duration={duration}
          start={trim.start}
          end={trim.end}
          onChange={onTrimChange}
        />
      </div>
      <div style={{ height: 8 }} />
    </div>
  );
};

export default Timeline;
