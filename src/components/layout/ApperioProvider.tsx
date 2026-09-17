"use client";

import { useEffect } from "react";
import { getLogger } from "@/lib/apperio";

export function ApperioProvider() {
  useEffect(() => {
    const logger = getLogger();
    if (!logger) return;

    logger.info("Page loaded", { url: window.location.href });

    return () => {
      logger.flush();
    };
  }, []);

  return null;
}
