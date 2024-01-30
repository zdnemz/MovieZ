import * as React from "react";
import MainLayout from "../layouts/MainLayout";

const NoPage: React.FC = () => {
  return (
    <MainLayout full>
      <div className="min-h-screen min-w-full flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Opss.. Something went wrong!</h1>
          <p className="text-opacity">{"404 Not Found :("}</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default NoPage;
