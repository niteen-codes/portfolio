import React from "react";
import { motion } from "framer-motion";
import { SECTION_IDS } from "../constants/sections";
import InteractiveCard from "./animations/InteractiveCard";
import useSectionParallax from "../hooks/useSectionParallax";
import {
  MOTION_TIMINGS,
  revealLeft,
  revealScale,
  revealUp,
} from "../utils/motionPresets";
import "./Education.css";

const Education = () => {
  const educationData = [
    {
      degree: "Master of Computer Applications",
      institution: "ASM's Institute of Management & Computer Studies, Thane",
      university: "University of Mumbai",
      year: "2021 - 2023",
      description:
        "MCA is a postgraduate degree focused on computer science and application development. Gained expertise in advanced programming, database management, software engineering, and modern development practices.",
    },
    {
      degree: "Bachelor of Science in Information Technology",
      institution:
        "G.R. Patil College of Arts, Science, Commerce and B.M.S, Dombivli",
      university: "University of Mumbai",
      year: "2016 - 2019",
      description:
        "B.Sc. IT degree program focused on software, databases, networking, and information systems. Built a strong foundation in programming fundamentals and web technologies.",
    },
  ];

  const certificationsData = [
    {
      icon: "\u{1F916}",
      title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
      institution: "Oracle",
      duration: "Valid until Sep 2027",
      description:
        "Professional certification for Software Developers and ML/AI Engineers covering Large Language Models (LLMs), OCI Generative AI Service, Retrieval-Augmented Generation (RAG), Semantic Search, Vector databases, and LangChain for building, tracing, evaluating, and deploying LLM applications.",
      skills: [
        "Large Language Models (LLMs)",
        "OCI Generative AI Service",
        "RAG-based Chatbots",
      ],
    },
    {
      icon: "\u{2615}",
      title: "Java Full Stack Development",
      institution: "JSpiders, Thane",
      duration: "Aug 2023 - May 2024",
      description:
        "Comprehensive program covering Java, Spring Boot, Hibernate, REST APIs, frontend technologies (React.js), and database management.",
      skills: [
        "Java and Spring Boot",
        "Hibernate and REST APIs",
        "React.js",
        "Database Management",
      ],
    },
    {
      icon: "\u{2601}",
      title: "Cloud Computing",
      institution: "NPTEL (National Programme on Technology Enhanced Learning)",
      duration: "Mar 2023 - May 2023",
      description:
        "Cloud computing technology enabling users to access computing resources like servers, storage, and software over the internet.",
      skills: ["Cloud Architecture", "Virtualization", "Cloud Storage and Networking"],
    },
  ];

  const { sectionRef, sectionStyle } = useSectionParallax(24);

  return (
    <motion.section
      className="education-section"
      id={SECTION_IDS.EDUCATION}
      ref={sectionRef}
      style={sectionStyle}
    >
      <div className="education-container">
        <motion.div className="education-header" {...revealUp(0, 34, MOTION_TIMINGS.slow)}>
          <span className="section-tag">{"// academic journey"}</span>
          <h2 className="section-title gradient-text">Education</h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            A journey of continuous learning - building skills, solving problems, and shaping the
            future
          </p>
        </motion.div>

        <div className="education-grid">
          {educationData.map((education, index) => (
            <motion.div key={education.degree} {...revealLeft(index * 0.1, 30)}>
              <InteractiveCard className="edu-card" tilt={5} shift={4}>
                <div className="edu-card-top">
                  <div>
                    <p className="edu-kicker">Academic Program</p>
                    <h3 className="edu-degree">{education.degree}</h3>
                    <p className="edu-institution">{education.institution}</p>
                    <p className="edu-university">{education.university}</p>
                  </div>
                  <span className="edu-year">{education.year}</span>
                </div>
                <p className="edu-description">{education.description}</p>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>

        <motion.div className="cert-header" {...revealUp(0.08, 24, MOTION_TIMINGS.medium)}>
          <h2 className="cert-title gradient-text-alt">Certifications</h2>
        </motion.div>

        <div className="cert-grid">
          {certificationsData.map((certification, index) => (
            <InteractiveCard
              key={certification.title}
              className="cert-card"
              {...revealScale(index * 0.1, 0.94)}
              tilt={6}
              shift={5}
            >
              <div className="cert-card-head">
                <div className="cert-card-icon">{certification.icon}</div>
                <div>
                  <h3>{certification.title}</h3>
                  <p className="cert-institution">{certification.institution}</p>
                </div>
              </div>
              <p className="cert-duration">{`\u{1F4C5} ${certification.duration}`}</p>
              <p className="cert-description">{certification.description}</p>
              {certification.skills && (
                <div className="cert-skills">
                  {certification.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="cert-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </InteractiveCard>
          ))}
        </div>

        <motion.div
          className="cert-header"
          {...revealUp(0.06, 24)}
          style={{ marginTop: "5rem" }}
        >
          <h2 className="cert-title gradient-text">Research & Publications</h2>
        </motion.div>

        <motion.div {...revealUp(0.08, 26)}>
          <InteractiveCard className="publication-card" tilt={4} shift={3}>
            <div className="publication-icon">{`\u{1F4C4}`}</div>
            <div className="publication-content">
              <h3 className="publication-title">
                Robot Induced Harm: Exploring Criminal Liability in the Age of Automation
              </h3>
              <div className="publication-meta">
                <p className="publication-journal">
                  Published in <strong>IRJMETS</strong> (International Research Journal of
                  Modernization in Engineering Technology and Science)
                </p>
                <p className="publication-date">{`\u{1F4C5} June 2023`}</p>
              </div>
              <p className="publication-abstract">
                An interdisciplinary research paper exploring the legal and ethical dimensions of
                criminal liability when autonomous robots cause harm. It examines current legal
                frameworks, proposes adaptive policies for AI-driven automation, and analyzes
                real-world case studies at the intersection of technology and law.
              </p>
              <div className="publication-topics">
                <span className="publication-topic">AI Ethics</span>
                <span className="publication-topic">Autonomous Robotics</span>
                <span className="publication-topic">Criminal Liability</span>
                <span className="publication-topic">Legal Frameworks</span>
              </div>
              <a
                href="https://www.irjmets.com/uploadedfiles/paper/issue_6_june_2023/42107/final/fin_irjmets1686833009.pdf"
                className="publication-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {"\u{1F4D1} Read Full Paper \u{2197}"}
              </a>
            </div>
          </InteractiveCard>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Education;
