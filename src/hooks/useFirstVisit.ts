"use client";
import { useState, useEffect } from "react";

export function useFirstVisit(): boolean {
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    const visited = sessionStorage.getItem("portfolio-visited");
    if (visited) {
      setIsFirstVisit(false);
    } else {
      sessionStorage.setItem("portfolio-visited", "true");
    }
  }, []);

  return isFirstVisit;
}
