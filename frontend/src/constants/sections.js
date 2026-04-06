export const SECTION_IDS = Object.freeze({
  HOME: "home",
  EXPERIENCE: "experience",
  EDUCATION: "education",
  PROJECTS: "projects",
  SKILLS: "skills",
  CONTACT: "contact",
});

export const SECTION_ORDER = Object.freeze([
  SECTION_IDS.HOME,
  SECTION_IDS.EXPERIENCE,
  SECTION_IDS.EDUCATION,
  SECTION_IDS.PROJECTS,
  SECTION_IDS.SKILLS,
  SECTION_IDS.CONTACT,
]);

export const PRIMARY_NAV_ITEMS = Object.freeze([
  { id: SECTION_IDS.HOME, label: "Home" },
  { id: SECTION_IDS.EXPERIENCE, label: "Experience" },
  { id: SECTION_IDS.EDUCATION, label: "Education" },
  { id: SECTION_IDS.PROJECTS, label: "Projects" },
  { id: SECTION_IDS.SKILLS, label: "Skills" },
]);
