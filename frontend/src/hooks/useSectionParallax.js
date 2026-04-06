import { useRef } from "react";
import { useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

const SPRING_CONFIG = {
  stiffness: 85,
  damping: 22,
  mass: 0.8,
};

export const useSectionParallax = (distance = 26) => {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yBase = useTransform(scrollYProgress, [0, 0.5, 1], [distance, 0, -distance]);
  const opacityBase = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.92, 1, 1, 0.92]);

  const y = useSpring(yBase, SPRING_CONFIG);
  const opacity = useSpring(opacityBase, SPRING_CONFIG);

  return {
    sectionRef,
    sectionStyle: prefersReducedMotion ? undefined : { y, opacity },
  };
};

export default useSectionParallax;
