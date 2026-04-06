import React, { Suspense } from "react";
import ScrollProgress from "./animations/ScrollProgress";

const Background3D = React.lazy(() => import("./Background3D"));

const PortfolioLayout = ({ className = "", children }) => {
  return (
    <div className={className}>
      <Suspense fallback={null}>
        <Background3D />
      </Suspense>
      <ScrollProgress />
      <div className="noise-overlay" aria-hidden="true" />
      {children}
    </div>
  );
};

export default PortfolioLayout;
