import Link from "next/link";
import React from "react";

const SpotifyPlayerWrapper = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col space-y-8">
        <div>
          <span className="text-4xl mb-8">How I Stay Inspired</span>
        </div>
        <div className="flex flex-col space-y-8">
          <p>
            I love listening to music while I work. It helps me stay focused and
            inspired. Here's some of my favorites on Spotify.
          </p>
        </div>
        <div className="flex flex-col space-y-8">
          <iframe
            src="https://open.spotify.com/embed/playlist/37i9dQZF1EVHGWrwldPRtj?utm_source=generator&theme=0"
            width="100%"
            height="400"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default SpotifyPlayerWrapper;
