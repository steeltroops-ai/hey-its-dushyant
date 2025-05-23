"use client";

import { useEffect, useState, useRef } from "react";

interface VideoDebugProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export default function VideoDebug({ videoRef }: VideoDebugProps) {
  const [videoInfo, setVideoInfo] = useState({
    currentTime: 0,
    duration: 0,
    buffered: 0,
    paused: true,
    ended: false,
    readyState: 0,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateVideoInfo = () => {
      try {
        const bufferedEnd =
          video.buffered.length > 0
            ? video.buffered.end(video.buffered.length - 1)
            : 0;

        setVideoInfo({
          currentTime: video.currentTime,
          duration: video.duration || 0,
          buffered: bufferedEnd,
          paused: video.paused,
          ended: video.ended,
          readyState: video.readyState,
        });
      } catch (e) {
        console.error("Error updating video info:", e);
      }
    };

    // Update every 250ms
    const interval = setInterval(updateVideoInfo, 250);

    // Also update on specific events
    const events = [
      "play",
      "pause",
      "timeupdate",
      "progress",
      "ended",
      "loadedmetadata",
    ];
    events.forEach((event) => {
      video.addEventListener(event, updateVideoInfo);
    });

    return () => {
      clearInterval(interval);
      events.forEach((event) => {
        video.removeEventListener(event, updateVideoInfo);
      });
    };
  }, [videoRef]);

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 10,
        right: 10,
        backgroundColor: "rgba(0,0,0,0.7)",
        color: "white",
        padding: 10,
        borderRadius: 5,
        fontSize: 12,
        fontFamily: "monospace",
        zIndex: 9999,
        maxWidth: 300,
      }}
    >
      <div>
        <strong>Video Debug:</strong>
      </div>
      <div>
        Time: {videoInfo.currentTime.toFixed(1)}s /{" "}
        {videoInfo.duration.toFixed(1)}s
      </div>
      <div>
        Buffered: {videoInfo.buffered.toFixed(1)}s (
        {Math.round((videoInfo.buffered / videoInfo.duration) * 100)}%)
      </div>
      <div>
        Status: {videoInfo.paused ? "Paused" : "Playing"}{" "}
        {videoInfo.ended ? "(Ended)" : ""}
      </div>
      <div>Ready State: {videoInfo.readyState}</div>
      <div>
        <progress
          value={videoInfo.currentTime}
          max={videoInfo.duration}
          style={{ width: "100%", height: 10 }}
        />
      </div>
    </div>
  );
}
