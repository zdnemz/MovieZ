import * as React from "react";
import MainLayout from "../layouts/MainLayout";

const Loader: React.FC = () => {
  return (
    <MainLayout full clearView center>
      <div className="flex items-center gap-px opacity-80">
        <div
          className="loading-animation"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="loading-animation"
          style={{ animationDelay: "0.1s" }}
        />
        <div
          className="loading-animation"
          style={{ animationDelay: "0.2s" }}
        />
        <div
          className="loading-animation"
          style={{ animationDelay: "0.3s" }}
        />
        <div
          className="loading-animation"
          style={{ animationDelay: "0.4s" }}
        />
      </div>
    </MainLayout>
  );
};

export default Loader;
