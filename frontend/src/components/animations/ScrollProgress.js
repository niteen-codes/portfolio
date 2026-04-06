import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import "./ScrollProgress.css";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.7,
  });

  return <motion.div className="scroll-progress-bar" style={{ scaleX }} aria-hidden="true" />;
};

export default ScrollProgress;
