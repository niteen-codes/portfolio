export const MOTION_EASE = [0.22, 1, 0.36, 1];

export const MOTION_TIMINGS = Object.freeze({
  fast: 0.35,
  medium: 0.55,
  slow: 0.75,
});

export const VIEWPORT_DEFAULT = Object.freeze({
  once: true,
  amount: 0.2,
  margin: "-12% 0px -12% 0px",
});

export const revealUp = (delay = 0, distance = 28, duration = MOTION_TIMINGS.medium) => ({
  initial: { opacity: 0, y: distance },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { delay, duration, ease: MOTION_EASE },
  },
  viewport: VIEWPORT_DEFAULT,
});

export const revealLeft = (delay = 0, distance = 28, duration = MOTION_TIMINGS.medium) => ({
  initial: { opacity: 0, x: -distance },
  whileInView: {
    opacity: 1,
    x: 0,
    transition: { delay, duration, ease: MOTION_EASE },
  },
  viewport: VIEWPORT_DEFAULT,
});

export const revealRight = (delay = 0, distance = 28, duration = MOTION_TIMINGS.medium) => ({
  initial: { opacity: 0, x: distance },
  whileInView: {
    opacity: 1,
    x: 0,
    transition: { delay, duration, ease: MOTION_EASE },
  },
  viewport: VIEWPORT_DEFAULT,
});

export const revealScale = (
  delay = 0,
  startScale = 0.92,
  duration = MOTION_TIMINGS.medium
) => ({
  initial: { opacity: 0, scale: startScale, y: 16 },
  whileInView: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay, duration, ease: MOTION_EASE },
  },
  viewport: VIEWPORT_DEFAULT,
});

export const staggerContainer = (stagger = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const staggerItem = (distance = 24, duration = MOTION_TIMINGS.medium) => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: MOTION_EASE },
  },
});
