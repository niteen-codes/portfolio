import { useEffect, useMemo, useState } from "react";
import { useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

const SPRING_CONFIG = {
  stiffness: 180,
  damping: 20,
  mass: 0.55,
};

export const useCursorTilt = ({ maxTilt = 7, maxShift = 7 } = {}) => {
  const prefersReducedMotion = useReducedMotion();
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const inputX = useMotionValue(0);
  const inputY = useMotionValue(0);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    const syncPointerType = () => setIsCoarsePointer(pointerQuery.matches);
    syncPointerType();

    if (typeof pointerQuery.addEventListener === "function") {
      pointerQuery.addEventListener("change", syncPointerType);
    } else {
      pointerQuery.addListener(syncPointerType);
    }

    return () => {
      if (typeof pointerQuery.removeEventListener === "function") {
        pointerQuery.removeEventListener("change", syncPointerType);
      } else {
        pointerQuery.removeListener(syncPointerType);
      }
    };
  }, []);

  const disabled = prefersReducedMotion || isCoarsePointer;

  const rotateX = useSpring(
    useTransform(inputY, [-0.5, 0.5], [maxTilt, -maxTilt]),
    SPRING_CONFIG
  );
  const rotateY = useSpring(
    useTransform(inputX, [-0.5, 0.5], [-maxTilt, maxTilt]),
    SPRING_CONFIG
  );
  const shiftX = useSpring(
    useTransform(inputX, [-0.5, 0.5], [-maxShift, maxShift]),
    SPRING_CONFIG
  );
  const shiftY = useSpring(
    useTransform(inputY, [-0.5, 0.5], [-maxShift, maxShift]),
    SPRING_CONFIG
  );

  const motionStyle = useMemo(
    () =>
      disabled
        ? undefined
        : {
            rotateX,
            rotateY,
            x: shiftX,
            y: shiftY,
            transformPerspective: 1100,
            willChange: "transform",
          },
    [disabled, rotateX, rotateY, shiftX, shiftY]
  );

  const onPointerMove = (event) => {
    if (disabled) return;
    const node = event.currentTarget;
    const rect = node.getBoundingClientRect();
    const localX = (event.clientX - rect.left) / rect.width;
    const localY = (event.clientY - rect.top) / rect.height;

    inputX.set(localX - 0.5);
    inputY.set(localY - 0.5);

    node.style.setProperty("--cursor-x", `${Math.round(localX * 100)}%`);
    node.style.setProperty("--cursor-y", `${Math.round(localY * 100)}%`);
  };

  const onPointerLeave = (event) => {
    if (disabled) return;
    inputX.set(0);
    inputY.set(0);
    event.currentTarget.style.setProperty("--cursor-x", "50%");
    event.currentTarget.style.setProperty("--cursor-y", "50%");
  };

  return {
    isInteractive: !disabled,
    motionStyle,
    onPointerMove,
    onPointerLeave,
  };
};

export default useCursorTilt;
