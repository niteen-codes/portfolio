import React from "react";
import { motion } from "framer-motion";
import { SECTION_IDS } from "../constants/sections";
import InteractiveCard from "./animations/InteractiveCard";
import useSectionParallax from "../hooks/useSectionParallax";
import {
  MOTION_TIMINGS,
  revealScale,
  revealUp,
  staggerContainer,
  staggerItem,
} from "../utils/motionPresets";
import "./Hero.css";

const Hero = () => {
  const services = [
    {
      icon: "\u{1F680}",
      title: "Fullstack Development",
      items: [
        "Building responsive website front-end using React, HTML, CSS, Bootstrap",
        "Developing custom and interactive web applications",
        "Creating application backend in Java, JavaScript, and Python",
        "Managing data with PostgreSQL, MongoDB, and OracleDB",
      ],
    },
    {
      icon: "\u{1F3A8}",
      title: "UI/UX Design",
      items: [
        "Designing attractive and responsive user interfaces",
        "Customizing logos, cards, and visual branding",
        "Optimizing application flow for best user experience",
      ],
    },
    {
      icon: "\u{1F4F1}",
      title: "App Development",
      items: [
        "Creating wireframes, prototypes, and UI/UX designs",
        "Building visually appealing and user-friendly apps",
        "Collaborating with teams to deliver high-quality products",
      ],
    },
    {
      icon: "\u{1F5C4}",
      title: "Database Management",
      items: [
        "Designing and implementing database schemas",
        "Writing and optimizing SQL queries and procedures",
        "Integrating databases with applications and APIs",
      ],
    },
  ];

  const containerVariants = staggerContainer(0.08);
  const itemVariants = staggerItem(28, MOTION_TIMINGS.medium);
  const { sectionRef: servicesRef, sectionStyle: servicesStyle } = useSectionParallax(16);

  return (
    <>
      <section className="hero-section" id={SECTION_IDS.HOME}>
        <motion.div
          className="hero-content-wrapper"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-badge" variants={itemVariants}>
            <span className="badge-dot"></span>
            Available for opportunities
          </motion.div>

          <motion.p className="hero-greeting" variants={itemVariants}>
            Hello, I&apos;m
          </motion.p>

          <motion.h1 className="hero-name gradient-text" variants={itemVariants}>
            Niteen Jha
          </motion.h1>

          <motion.h2 className="hero-title" variants={itemVariants}>
            <span className="title-highlight">Full-Stack Developer</span>
          </motion.h2>

          <motion.p className="hero-description" variants={itemVariants}>
            A passionate developer specializing in building modern, responsive, and user-friendly
            web applications. Turning ideas into elegant digital experiences with clean code and
            creative solutions.
          </motion.p>

          <motion.div className="hero-buttons" variants={itemVariants}>
            <motion.button
              className="glow-btn glow-btn-primary"
              onClick={() =>
                document
                  .getElementById(SECTION_IDS.PROJECTS)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View My Work
            </motion.button>
            <motion.button
              className="glow-btn glow-btn-outline"
              onClick={() =>
                document
                  .getElementById(SECTION_IDS.CONTACT)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Me
            </motion.button>
          </motion.div>

          <motion.div className="hero-stats" variants={itemVariants}>
            <div className="hero-stat">
              <div className="hero-stat-value">1+</div>
              <div className="hero-stat-label">Years Exp.</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">3+</div>
              <div className="hero-stat-label">Projects</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">10+</div>
              <div className="hero-stat-label">Technologies</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          onClick={() =>
            document
              .getElementById(SECTION_IDS.EXPERIENCE)
              ?.scrollIntoView({ behavior: "smooth" })
          }
          whileHover={{ y: -2, opacity: 1 }}
        >
          <div className="scroll-indicator-mouse"></div>
          <span className="scroll-indicator-text">Scroll</span>
        </motion.div>
      </section>

      <motion.section className="services-section" ref={servicesRef} style={servicesStyle}>
        <motion.div className="services-header" {...revealUp(0, 30, MOTION_TIMINGS.slow)}>
          <span className="section-tag">{"// what i do"}</span>
          <h2 className="section-title gradient-text">What I Do</h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Crafting digital experiences across the full stack - from stunning frontends to robust
            backends
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <InteractiveCard
              key={service.title}
              className="service-card-3d"
              {...revealScale(index * 0.08, 0.93)}
              tilt={6}
              shift={5}
            >
              <div className="service-card-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <ul>
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </InteractiveCard>
          ))}
        </div>
      </motion.section>
    </>
  );
};

export default Hero;
