"use client";
import { useState, useEffect, useCallback } from "react";

type FullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void>;
};

type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void>;
};

function getFullscreenElement(): Element | null {
  if (typeof document === "undefined") return null;
  const doc = document as FullscreenDocument;
  return doc.fullscreenElement ?? doc.webkitFullscreenElement ?? null;
}

/**
 * Tracks and controls the browser's Fullscreen API.
 * Note: this is element fullscreen, which is the closest JS can get to the
 * native F11 chrome-less view — the real F11 is a browser shortcut we can
 * only invite, never trigger.
 */
export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const el = document.documentElement as FullscreenElement;
    setIsSupported(
      typeof el.requestFullscreen === "function" ||
        typeof el.webkitRequestFullscreen === "function"
    );
    setIsFullscreen(Boolean(getFullscreenElement()));

    const onChange = () => setIsFullscreen(Boolean(getFullscreenElement()));
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
    };
  }, []);

  const enter = useCallback(async () => {
    const el = document.documentElement as FullscreenElement;
    try {
      if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
    } catch {
      /* user gesture required or denied — fail quietly */
    }
  }, []);

  const exit = useCallback(async () => {
    const doc = document as FullscreenDocument;
    try {
      if (doc.exitFullscreen) await doc.exitFullscreen();
      else if (doc.webkitExitFullscreen) await doc.webkitExitFullscreen();
    } catch {
      /* fail quietly */
    }
  }, []);

  const toggle = useCallback(
    () => (getFullscreenElement() ? exit() : enter()),
    [enter, exit]
  );

  return { isFullscreen, isSupported, enter, exit, toggle };
}
