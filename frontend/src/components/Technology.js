import React from "react";
import { useParams } from "react-router-dom";

const Technology = () => {
  const { name } = useParams(); // Get the technology name from the URL

  // Fetch or define technology details based on the name
  const technologyDetails = {
    java: {
      name: "Java",
      description: "Java is a high-level, class-based, object-oriented programming language.",
      logo: "https://cdn-icons-png.flaticon.com/512/226/226777.png",
    },
    j2ee: {
      name: "J2EE",
      description: "Java 2 Platform, Enterprise Edition (J2EE) for building enterprise applications.",
      logo: "https://cdn-icons-png.flaticon.com/512/226/226777.png",
    },
    // Add details for other technologies
  };

  const technology = technologyDetails[name];

  return (
    <div className="technology-page">
      <h1>{technology.name}</h1>
      <img src={technology.logo} alt={technology.name} />
      <p>{technology.description}</p>
    </div>
  );
};

export default Technology;