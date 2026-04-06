import { useCallback, useEffect, useRef, useState } from "react";
import { SECTION_ORDER } from "../../constants/sections";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const getSectionState = () => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return { index: 0, progress: 0 };
  }

  const anchorY = window.innerHeight * 0.45;
  let activeIndex = 0;
  let progress = 0;
  let found = false;

  for (let index = 0; index < SECTION_ORDER.length; index += 1) {
    const sectionId = SECTION_ORDER[index];
    const section = document.getElementById(sectionId);
    if (!section) {
      continue;
    }

    const rect = section.getBoundingClientRect();
    if (rect.top <= anchorY) {
      activeIndex = index;
    }

    if (rect.top <= anchorY && rect.bottom >= anchorY) {
      found = true;
      activeIndex = index;
      const range = Math.max(rect.height, 1);
      progress = clamp((anchorY - rect.top) / range, 0, 1);
      break;
    }
  }

  if (!found && activeIndex === SECTION_ORDER.length - 1) {
    progress = 1;
  }

  return { index: activeIndex, progress };
};

export const useScrollSectionState = () => {
  const [sectionState, setSectionState] = useState(() => getSectionState());
  const rafRef = useRef(null);

  const updateSectionState = useCallback(() => {
    const next = getSectionState();
    setSectionState((previous) => {
      if (previous.index === next.index && Math.abs(previous.progress - next.progress) < 0.015) {
        return previous;
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const scheduleUpdate = () => {
      if (rafRef.current !== null) {
        return;
      }
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        updateSectionState();
      });
    };

    updateSectionState();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateSectionState]);

  return sectionState;
};

export default useScrollSectionState;
