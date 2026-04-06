import React from "react";
import { motion } from "framer-motion";
import useCursorTilt from "../../hooks/useCursorTilt";
import "./InteractiveCard.css";

const InteractiveCard = ({
  className = "",
  children,
  tilt = 7,
  shift = 6,
  style,
  ...rest
}) => {
  const { isInteractive, motionStyle, onPointerMove, onPointerLeave } = useCursorTilt({
    maxTilt: tilt,
    maxShift: shift,
  });

  return (
    <motion.div
      className={`${className} ${isInteractive ? "interactive-card" : ""}`.trim()}
      style={{ ...motionStyle, ...style }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      {...rest}
    >
      {isInteractive && <span className="interactive-card-glow" aria-hidden="true" />}
      {children}
    </motion.div>
  );
};

export default InteractiveCard;
