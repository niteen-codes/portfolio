import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { SECTION_IDS } from "../constants/sections";
import InteractiveCard from "./animations/InteractiveCard";
import SubmitAnimation from "./SubmitAnimation";
import useSectionParallax from "../hooks/useSectionParallax";
import { MOTION_TIMINGS, revealScale, revealUp } from "../utils/motionPresets";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationType, setAnimationType] = useState("success");

  const API_URL = process.env.REACT_APP_API_URL || "https://portfolio-1-dfm8.onrender.com";
  const { sectionRef, sectionStyle } = useSectionParallax(22);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleAnimationComplete = useCallback(() => {
    setShowAnimation(false);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile || !formData.message) {
      setStatus({ type: "error", text: "Please fill in all fields." });
      return;
    }

    setLoading(true);
    setStatus(null);
    try {
      const response = await fetch(`${API_URL}/contact/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setAnimationType("success");
        setShowAnimation(true);
        setStatus({ type: "success", text: "Message sent successfully. I will get back to you soon." });
        setFormData({ name: "", email: "", mobile: "", message: "" });
      } else {
        setAnimationType("error");
        setShowAnimation(true);
        setStatus({ type: "error", text: "Failed to send message. Please try again." });
      }
    } catch (error) {
      setAnimationType("error");
      setShowAnimation(true);
      setStatus({ type: "error", text: "An error occurred. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      className="contact-section"
      id={SECTION_IDS.CONTACT}
      ref={sectionRef}
      style={sectionStyle}
    >
      <SubmitAnimation show={showAnimation} type={animationType} onComplete={handleAnimationComplete} />

      <div className="contact-container">
        <motion.div className="contact-header" {...revealUp(0, 34, MOTION_TIMINGS.slow)}>
          <span className="section-tag">{"// get in touch"}</span>
          <h2 className="section-title gradient-text">Contact Me</h2>
          <p className="contact-subtitle">
            Have a project in mind or want to collaborate? Drop me a message and let&apos;s create
            something amazing together.
          </p>
        </motion.div>

        <motion.form
          className="contact-form-3d"
          onSubmit={handleSubmit}
          {...revealUp(0.08, 28, MOTION_TIMINGS.medium)}
          whileHover={{ y: -2 }}
        >
          <div className="form-row">
            <div className="form-group-3d">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="form-input-3d"
                placeholder="Your name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group-3d">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-input-3d"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group-3d">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="tel"
              id="mobile"
              className="form-input-3d"
              placeholder="Your mobile number"
              pattern="[0-9]{10}"
              title="Enter a valid 10-digit mobile number"
              value={formData.mobile}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group-3d">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              className="form-input-3d"
              placeholder="Tell me about your project..."
              rows="5"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <motion.button
            type="submit"
            className={`submit-btn-3d ${loading ? "submitting" : ""}`}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.01 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? (
              <span className="btn-loading">
                <span className="btn-spinner" />
                Sending...
              </span>
            ) : (
              "\u{1F680} Send Message"
            )}
          </motion.button>

          {status && !showAnimation && (
            <motion.div
              className={`status-message ${status.type}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: MOTION_TIMINGS.fast }}
            >
              {status.text}
            </motion.div>
          )}
        </motion.form>

        <motion.div
          className="contact-info-cards"
          {...revealUp(0.15, 24, MOTION_TIMINGS.medium)}
        >
          {[
            {
              icon: "\u{1F4E7}",
              label: "Email",
              href: "mailto:touristdestiantion@gmail.com",
              text: "Get in touch",
              detail: "touristdestiantion@gmail.com",
            },
            {
              icon: "\u{1F4BC}",
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/niteen-jha-35a594264",
              text: "Connect",
              detail: "Professional profile",
            },
            {
              icon: "\u{1F419}",
              label: "GitHub",
              href: "https://github.com/niteen-codes",
              text: "Follow",
              detail: "Open-source and projects",
            },
          ].map((item, index) => (
            <InteractiveCard
              key={item.label}
              className="contact-info-card"
              {...revealScale(index * 0.08, 0.95, MOTION_TIMINGS.fast)}
              tilt={5}
              shift={4}
            >
              <div className="contact-info-icon">{item.icon}</div>
              <div className="contact-info-label">{item.label}</div>
              <div className="contact-info-value">
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.text}
                </a>
              </div>
              <p className="contact-info-detail">{item.detail}</p>
            </InteractiveCard>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
