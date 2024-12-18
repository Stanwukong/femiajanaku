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
            inspired. Here&apos;s what I&apos;m jamming to right now.
          </p>
        </div>
        <div className="flex space-y-8">
          <iframe
            src="https://open.spotify.com/embed/track/0GWX9HNUu2qZT16FAoBENM?utm_source=generator"
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default SpotifyPlayerWrapper;
