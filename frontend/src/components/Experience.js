import React from "react";
import { motion } from "framer-motion";
import { SECTION_IDS } from "../constants/sections";
import InteractiveCard from "./animations/InteractiveCard";
import useSectionParallax from "../hooks/useSectionParallax";
import { MOTION_TIMINGS, revealLeft, revealUp } from "../utils/motionPresets";
import "./Experience.css";

const Experience = () => {
  const experiences = [
    {
      role: "Trainee Software Engineer",
      company: "Unnati Digital Solutions Pvt Ltd",
      companyLink: "#",
      location: "Maharashtra",
      duration: "Apr 2025 - Oct 2025",
      highlights: [
        "Designed, developed, tested, and deployed backend modules using Java, Spring Boot, and MySQL based on business requirements.",
        "Participated in requirement analysis, identified technical feasibility, and delivered software aligned with performance expectations.",
        "Performed API testing (JSON/XML) using Postman to enhance API reliability and ensure delivery to quality benchmarks.",
        "Optimized SQL queries and improved execution performance for multiple data-intensive operations.",
        "Developed automation utilities using Java, Excel processing, and Azure DevOps REST APIs, integrating new functionality into existing systems.",
        "Participated in peer code reviews, UAT support, defect replication, debugging, and documentation of resolutions.",
      ],
      technologies: ["Java", "Spring Boot", "MySQL", "Postman", "Azure DevOps", "REST APIs"],
    },
    {
      role: "Freelance Developer",
      company: "Self-Employed",
      companyLink: "#",
      location: "Remote",
      duration: "Jun 2024 - Mar 2025",
      highlights: [
        "Built and deployed scalable applications using Spring Boot and REST APIs, delivering end-to-end solutions from design to implementation.",
        "Developed small-scale Generative AI prototypes on OCI and integrated automation features into client workflows.",
        "Created Azure DevOps automation tools enabling bulk operations, improving efficiency and reducing manual effort.",
        "Managed deployments on Vercel, Render, and GitHub Pages with continuous enhancement and version control best practices.",
      ],
      technologies: ["Spring Boot", "REST APIs", "OCI", "Azure DevOps", "Vercel", "GitHub Pages"],
    },
    {
      role: "Trainee Software Engineer",
      company: "Igmite Solutions Pvt Ltd.",
      companyLink: "https://igmite.in/",
      location: "Maharashtra",
      duration: "Jan 2023 - Jun 2023",
      highlights: [
        "Developed scalable web applications using modern frameworks and tools with seamless backend integration.",
        "Led the development of multiple features while collaborating with cross-functional teams to deliver high-quality solutions on schedule.",
      ],
      technologies: ["Ionic", "Angular", "MySQL", "Bootstrap", "JavaScript", "PHP"],
    },
  ];

  const { sectionRef, sectionStyle } = useSectionParallax(22);

  return (
    <motion.section
      className="experience-section"
      id={SECTION_IDS.EXPERIENCE}
      ref={sectionRef}
      style={sectionStyle}
    >
      <div className="experience-container">
        <motion.div
          className="experience-header"
          {...revealUp(0, 34, MOTION_TIMINGS.slow)}
        >
          <span className="section-tag">{"// where i've worked"}</span>
          <h2 className="section-title gradient-text">Experience</h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            From corporate projects to creative freelance work - a journey of growth and
            innovation
          </p>
        </motion.div>

        <div className="experience-timeline">
          {experiences.map((experience, index) => (
            <motion.div
              key={`${experience.role}-${experience.company}`}
              className="timeline-item"
              {...revealLeft(index * 0.1, 32)}
            >
              <InteractiveCard className="timeline-card" tilt={5} shift={4}>
                <span className="timeline-duration">{`\u{1F4C5} ${experience.duration}`}</span>
                <h3 className="timeline-role">{experience.role}</h3>
                <p className="timeline-company">
                  {"\u{1F3E2} "}
                  {experience.companyLink !== "#" ? (
                    <a href={experience.companyLink} target="_blank" rel="noopener noreferrer">
                      {experience.company} {"\u{2197}"}
                    </a>
                  ) : (
                    <span>{experience.company}</span>
                  )}
                  {experience.location && (
                    <span className="timeline-location">{`\u{1F4CD} ${experience.location}`}</span>
                  )}
                </p>
                <ul className="timeline-highlights">
                  {experience.highlights.map((point, highlightIndex) => (
                    <li key={highlightIndex}>{point}</li>
                  ))}
                </ul>
                <div className="timeline-tech-stack">
                  {experience.technologies.map((technology, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {technology}
                    </span>
                  ))}
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;
