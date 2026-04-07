import React, { useState } from "react";
import { motion } from "framer-motion";
import { SECTION_IDS } from "../constants/sections";
import InteractiveCard from "./animations/InteractiveCard";
import useSectionParallax from "../hooks/useSectionParallax";
import {
  MOTION_TIMINGS,
  revealScale,
  revealUp,
} from "../utils/motionPresets";
import "./Skills.css";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const skills = [
    {
      name: "Java",
      logo: "https://cdn-icons-png.flaticon.com/512/226/226777.png",
      description: "High-level, object-oriented programming language for enterprise applications.",
      category: "Backend",
    },
    {
      name: "Spring Boot",
      logo: "https://cdn-icons-png.flaticon.com/512/919/919854.png",
      description: "Java-based framework for production-ready applications.",
      category: "Backend",
    },
    {
      name: "Hibernate",
      logo: "https://cdn-icons-png.flaticon.com/512/226/226777.png",
      description: "ORM framework for Java, simplifying database interactions.",
      category: "Backend",
    },
    {
      name: "JDBC",
      logo: "https://cdn-icons-png.flaticon.com/512/2772/2772128.png",
      description: "Java API for connecting and executing queries on databases.",
      category: "Backend",
    },
    {
      name: "J2EE",
      logo: "https://cdn-icons-png.flaticon.com/512/226/226777.png",
      description: "Platform for distributed enterprise applications.",
      category: "Backend",
    },
    {
      name: "JavaScript",
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
      description: "Versatile programming language for interactive web applications.",
      category: "Frontend",
    },
    {
      name: "React",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      description: "JavaScript library for building modern user interfaces.",
      category: "Frontend",
    },
    {
      name: "HTML",
      logo: "https://cdn-icons-png.flaticon.com/512/732/732212.png",
      description: "Standard markup language for structuring web pages.",
      category: "Frontend",
    },
    {
      name: "CSS",
      logo: "https://cdn-icons-png.flaticon.com/512/732/732190.png",
      description: "Stylesheet language for styling and layout of web pages.",
      category: "Frontend",
    },
    {
      name: "Bootstrap",
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968672.png",
      description: "Front-end framework for responsive web development.",
      category: "Frontend",
    },
    {
      name: "SQL",
      logo: "https://cdn-icons-png.flaticon.com/512/2772/2772128.png",
      description: "Language for managing and manipulating relational databases.",
      category: "Database",
    },
    {
      name: "Postman",
      logo: "https://cdn.worldvectorlogo.com/logos/postman.svg",
      description: "API testing and development platform for REST APIs.",
      category: "Tools",
    },
    {
      name: "Git",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      description: "Distributed version control system for tracking code changes.",
      category: "Tools",
    },
    {
      name: "GitHub",
      logo: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
      description: "Cloud-based platform for code hosting and collaboration.",
      category: "Tools",
    },
    {
      name: "Azure DevOps",
      logo: "https://cdn-icons-png.flaticon.com/512/873/873107.png",
      description: "Microsoft's DevOps platform for CI/CD and project management.",
      category: "Tools",
    },
    {
      name: "Docker",
      logo: "https://cdn-icons-png.flaticon.com/512/919/919853.png",
      description: "Containerization platform for building and deploying applications.",
      category: "Tools",
    },
    {
      name: "VS Code",
      logo: "https://cdn-icons-png.flaticon.com/512/906/906324.png",
      description: "Lightweight yet powerful source code editor by Microsoft.",
      category: "Tools",
    },
    {
      name: "Eclipse",
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
      description: "Feature-rich IDE for Java and enterprise development.",
      category: "Tools",
    },
    {
      name: "SDLC",
      logo: "https://cdn-icons-png.flaticon.com/512/1055/1055666.png",
      description: "Software Development Life Cycle methodology.",
      category: "Other",
    },
  ];

  const categories = ["All", "Frontend", "Backend", "Database", "Tools", "Other"];
  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  const { sectionRef, sectionStyle } = useSectionParallax(24);

  return (
    <motion.section
      className="skills-section"
      id={SECTION_IDS.SKILLS}
      ref={sectionRef}
      style={sectionStyle}
    >
      <div className="skills-container">
        <motion.div className="skills-header" {...revealUp(0, 34, MOTION_TIMINGS.slow)}>
          <span className="section-tag">{"// tech stack"}</span>
          <h2 className="section-title gradient-text">Skills & Technologies</h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            The tools and technologies I use to bring products to life
          </p>
        </motion.div>

        <motion.div className="skills-categories" {...revealUp(0.05, 22)}>
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`category-badge ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div className="skills-grid" layout>
          {filteredSkills.map((skill, index) => (
            <InteractiveCard
              key={skill.name}
              className="skill-card-3d"
              {...revealScale(index * 0.04, 0.92, MOTION_TIMINGS.fast)}
              layout
              tilt={6}
              shift={5}
            >
              <div className="skill-card-meta">
                <span className="skill-category-chip">{skill.category}</span>
              </div>
              <div className="skill-logo-wrapper">
                <img src={skill.logo} alt={skill.name} loading="lazy" />
              </div>
              <div className="skill-card-copy">
                <span className="skill-name-3d">{skill.name}</span>
                <span className="skill-desc">{skill.description}</span>
              </div>
            </InteractiveCard>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Skills;
