import React from "react";
import { motion } from "framer-motion";
import Travel from "../assets/Travel.jpg";
import Fashion from "../assets/fashion.jpeg";
import Sellwell from "../assets/SellWell.png";
import MobiChikitsa from "../assets/MobiChikitsa.png";
import Pathways from "../assets/Pathways.png";
import { SECTION_IDS } from "../constants/sections";
import InteractiveCard from "./animations/InteractiveCard";
import useSectionParallax from "../hooks/useSectionParallax";
import {
  MOTION_TIMINGS,
  revealScale,
  revealUp,
} from "../utils/motionPresets";
import "./Projects.css";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "MobiChikitsa Healthcare Platform",
      category: "Healthcare SaaS",
      year: "2025",
      description:
        "A comprehensive healthcare platform enabling role-based access for patients, doctors, and administrators. Features automated backend workflows, secure REST API integrations with JSON/XML support, and seamless deployment with modular architecture.",
      image: MobiChikitsa,
      link: "https://mobichikitsa.com/japi",
      techStack: ["Java", "Spring Boot", "Hibernate", "MySQL", "Bootstrap", "Postman", "REST APIs"],
    },
    {
      id: 2,
      title: "Pathways Career Guidance System",
      category: "EdTech Platform",
      year: "2025",
      description:
        "An intelligent career guidance platform with a recommendation engine that helps students discover personalized career pathways. Includes optimized backend queries, performance-tuned APIs, and robust deployment pipelines with collaborative code review workflows.",
      image: Pathways,
      link: "https://user.pathways.net.in/login",
      techStack: ["Java", "Spring Boot", "Hibernate", "MySQL", "REST APIs"],
    },
    {
      id: 3,
      title: "Tourist Destination",
      category: "Travel Experience",
      year: "2024",
      description:
        "An initiative aimed at showcasing and promoting specific locations as prime tourist attractions. Highlights unique features, cultural significance, and natural beauty of selected destinations worldwide.",
      image: Travel,
      link: "#",
      techStack: ["React", "JavaScript", "CSS", "Java", "SQL", "Bootstrap", "Hibernate"],
    },
    {
      id: 4,
      title: "Fashion Factory",
      category: "E-commerce",
      year: "2024",
      description:
        "A sleek online platform offering a curated collection of stylish clothing, accessories, and fashion products. Explore the latest trends, premium items, and exclusive designs.",
      image: Fashion,
      link: "#",
      techStack: ["React", "SQL", "Spring Boot", "Hibernate", "JavaScript", "HTML", "Tailwind"],
    },
    {
      id: 5,
      title: "SellWell",
      category: "Retail Platform",
      year: "2024",
      description:
        "An e-commerce platform designed to offer a seamless shopping experience for customers seeking high-quality crockery goods - from elegant dinnerware and tea sets to kitchen essentials.",
      image: Sellwell,
      link: "#",
      techStack: ["Java", "Spring Boot", "SQL", "CSS", "Bootstrap", "CORS"],
    },
  ];

  const { sectionRef, sectionStyle } = useSectionParallax(24);

  return (
    <motion.section
      className="projects-section"
      id={SECTION_IDS.PROJECTS}
      ref={sectionRef}
      style={sectionStyle}
    >
      <div className="projects-container">
        <motion.div className="projects-header" {...revealUp(0, 34, MOTION_TIMINGS.slow)}>
          <span className="section-tag">{"// things i've built"}</span>
          <h2 className="section-title gradient-text">Projects</h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Leveraging cutting-edge technologies to build real-world solutions and digital
            experiences
          </p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <InteractiveCard
              key={project.id}
              className="project-card-3d"
              {...revealScale(index * 0.09, 0.94)}
              tilt={6}
              shift={6}
            >
              <div className="project-image-wrapper">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="project-image-overlay" />
                <span className="project-number">{String(project.id).padStart(2, "0")}</span>
                {project.link !== "#" && (
                  <span className="project-live-badge">
                    <span className="live-dot" /> Live
                  </span>
                )}
              </div>
              <div className="project-info-3d">
                <div className="project-meta">
                  <span className="project-category">{project.category}</span>
                  <span className="project-year">{project.year}</span>
                </div>
                <h3>{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tech-tags">
                  {project.techStack.map((tech, techIndex) => (
                    <span key={techIndex} className="project-tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <motion.a
                    href={project.link}
                    className={`project-link-btn ${project.link !== "#" ? "project-link-live" : ""}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {project.link !== "#" ? "\u{1F310} View Live" : "\u{1F517} View Project"}
                  </motion.a>
                </div>
              </div>
            </InteractiveCard>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
