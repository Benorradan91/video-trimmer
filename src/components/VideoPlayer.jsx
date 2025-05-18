import React, { useRef, useState, useEffect } from 'react';
import Timeline from './Timeline';
import '../styles/VideoPlayer.css';

const VideoPlayer = ({ videoFile }) => {
    const videoRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [trim, setTrim] = useState({ start: 0, end: 0 });
    const [playing, setPlaying] = useState(false);
    const [showVolume, setShowVolume] = useState(false);
    const [volume, setVolume] = useState(1);

    // default video if not provided or not found
    const [src, setSrc] = useState(videoFile || "puppy.mp4");

    useEffect(() => {
        if (!videoFile) return;
        // Try to check if the file exists
        fetch(videoFile, { method: "HEAD" })
            .then(res => {
                if (res.ok) setSrc(videoFile);
                else setSrc("puppy.mp4");
            })
            .catch(() => setSrc("puppy.mp4"));
    }, [videoFile]);

    useEffect(() => {
        if (!videoRef.current) return;
        if (currentTime < trim.start) videoRef.current.currentTime = trim.start;
        if (currentTime > trim.end) videoRef.current.currentTime = trim.end;
    }, [trim.start, trim.end, currentTime]);

    const handleLoadedMetadata = () => {
        const dur = videoRef.current.duration || 0;
        setDuration(dur);
        setTrim({ start: 0, end: dur });
    };

    const handleTimeUpdate = () => {
        const time = videoRef.current.currentTime;
        setCurrentTime(time);
        if (time > trim.end) {
            videoRef.current.pause();
            videoRef.current.currentTime = trim.start;
            setPlaying(false);
        } else if (time < trim.start) {
            videoRef.current.currentTime = trim.start;
        }
    };

    const handlePlayPause = () => {
        if (!videoRef.current) return;
        playing ? videoRef.current.pause() : videoRef.current.play();
        setPlaying(!playing);
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const onPlay = () => setPlaying(true);
        const onPause = () => setPlaying(false);
        video.addEventListener("play", onPlay);
        video.addEventListener("pause", onPause);
        return () => {
            video.removeEventListener("play", onPlay);
            video.removeEventListener("pause", onPause);
        };
    }, []);

    return (
        <div className="video-player" style={{ width: 900, margin: '0 auto', padding: 0 }}>
            <div style={{ width: 800, margin: '0 auto' }}>
                <video
                    ref={videoRef}
                    width="800"
                    height="450"
                    controls={false}
                    onLoadedMetadata={handleLoadedMetadata}
                    onTimeUpdate={handleTimeUpdate}
                    style={{ display: 'block', margin: '0 auto', borderRadius: 20, width: 800, height: 450 }}
                    volume={volume}
                >
                    <source src={src} type="video/mp4" />
                </video>
                <div className="custom-controls"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        width: 800,
                        margin: '0 auto',
                        marginTop: 4,
                        justifyContent: 'center',
                        position: 'relative',
                        background: "transparent"
                    }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        height: 48,
                        position: "absolute",
                        left: 0,
                        background: "transparent",
                        zIndex: 2
                    }}>
                        <svg width="22" height="22" viewBox="0 0 22 22" style={{ marginRight: 2, cursor: "pointer", color: "#222", fill: "#222" }}
                            onClick={() => setShowVolume(v => !v)}>
                            <path d="M4 9v4h4l5 5V4l-5 5H4z" fill="#222" />
                        </svg>
                        {showVolume &&
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.01}
                                value={volume}
                                onChange={e => {
                                    const v = Number(e.target.value);
                                    setVolume(v);
                                    if (videoRef.current) videoRef.current.volume = v;
                                }}
                                style={{
                                    writingMode: "bt-lr",
                                    WebkitAppearance: "slider-vertical",
                                    width: 22,
                                    height: 48,
                                    marginLeft: 0,
                                    marginRight: 0,
                                    background: "transparent"
                                }}
                            />
                        }
                    </div>
                    <button
                        onClick={handlePlayPause}
                        style={{
                            fontSize: 22,
                            padding: 0,
                            margin: "0 auto",
                            border: "none",
                            borderRadius: "50%",
                            background: "none",
                            color: "#43a047",
                            boxShadow: "none",
                            outline: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 56,
                            height: 56
                        }}
                        className="play-pause-btn"
                    >
                        {playing ? (
                            <svg width="40" height="40" viewBox="0 0 22 22">
                                <rect x="4" y="4" width="4" height="14" rx="2" fill="#43a047" />
                                <rect x="14" y="4" width="4" height="14" rx="2" fill="#43a047" />
                            </svg>
                        ) : (
                            <svg width="40" height="40" viewBox="0 0 22 22">
                                <polygon points="6,4 18,11 6,18" fill="#43a047" />
                            </svg>
                        )}
                    </button>
                    <span style={{
                        fontSize: 16,
                        position: "absolute",
                        right: 0,
                        minWidth: 80,
                        textAlign: "right"
                    }}>
                        {duration
                            ? `${new Date(currentTime * 1000).toISOString().substr(14, 5)} / ${new Date(duration * 1000).toISOString().substr(14, 5)}`
                            : "00:00 / 00:00"}
                    </span>
                </div>
            </div>
            <Timeline
                currentTime={currentTime}
                duration={duration}
                videoRef={videoRef}
                trim={trim}
                onTrimChange={setTrim}
            />
        </div>
    );
};

export default VideoPlayer;
