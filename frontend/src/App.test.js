import { SECTION_IDS, SECTION_ORDER } from "./constants/sections";

test("defines the expected page sections in order", () => {
  expect(SECTION_ORDER).toEqual([
    SECTION_IDS.HOME,
    SECTION_IDS.EXPERIENCE,
    SECTION_IDS.EDUCATION,
    SECTION_IDS.PROJECTS,
    SECTION_IDS.SKILLS,
    SECTION_IDS.CONTACT,
  ]);
});
