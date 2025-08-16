import React, { useState, SyntheticEvent } from "react";
import Video from "next-video";
import tanitim from "../../../public/videos/tanitim.mp4.json";

const VideoPlayer = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = (error: SyntheticEvent<HTMLVideoElement>) => {
    console.warn("Video oynatım hatası:", error);
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <div className="w-full max-w-4xl mx-auto my-8">
        <div className="bg-gray-100 rounded-lg shadow-lg p-8 text-center">
          <div className="text-gray-600 mb-4">
            <svg
              className="mx-auto h-12 w-12 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Video Yüklenemedi
          </h3>
          <p className="text-gray-600 mb-4">
            Video şu anda yüklenemiyor. Lütfen internet bağlantınızı kontrol
            edin ve sayfayı yenileyin.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Sayfayı Yenile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      {isLoading && (
        <div className="bg-gray-100 rounded-lg shadow-lg p-8 text-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Video yükleniyor...</p>
        </div>
      )}
      <Video
        src={tanitim as any}
        className="w-full rounded-lg shadow-lg"
        controls
        autoPlay={false}
        muted
        onError={handleError}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onLoadedData={handleCanPlay}
        // HLS hatalarını minimize etmek için ek ayarlar
        preload="metadata"
        playsInline
      />
    </div>
  );
};

export default VideoPlayer;
