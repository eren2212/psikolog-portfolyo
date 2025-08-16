import React from "react";
import Video from "next-video";
import tanitim from "../../../public/videos/tanitim.mp4.json";

const VideoPlayer = () => {
  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <Video
        src={tanitim}
        className="w-full rounded-lg shadow-lg"
        controls
        autoPlay={false}
        muted
      />
    </div>
  );
};

export default VideoPlayer;
