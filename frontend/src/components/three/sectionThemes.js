import { SECTION_ORDER } from "../../constants/sections";

export const SECTION_THEMES = Object.freeze([
  {
    id: SECTION_ORDER[0],
    primary: "#6c63ff",
    secondary: "#00d4ff",
    accent: "#ff6b9d",
    intensity: 1,
  },
  {
    id: SECTION_ORDER[1],
    primary: "#5f7cff",
    secondary: "#29b6ff",
    accent: "#9be7ff",
    intensity: 0.95,
  },
  {
    id: SECTION_ORDER[2],
    primary: "#00d4ff",
    secondary: "#6c63ff",
    accent: "#8be9ff",
    intensity: 0.92,
  },
  {
    id: SECTION_ORDER[3],
    primary: "#7c5cff",
    secondary: "#57d7ff",
    accent: "#ffd166",
    intensity: 1,
  },
  {
    id: SECTION_ORDER[4],
    primary: "#00d4ff",
    secondary: "#7d8cff",
    accent: "#7fffd4",
    intensity: 0.94,
  },
  {
    id: SECTION_ORDER[5],
    primary: "#ff6b9d",
    secondary: "#6c63ff",
    accent: "#00d4ff",
    intensity: 0.9,
  },
]);

export const getSectionTheme = (index = 0) => {
  const safeIndex = ((index % SECTION_THEMES.length) + SECTION_THEMES.length) % SECTION_THEMES.length;
  return SECTION_THEMES[safeIndex];
};
