import * as React from "react";

interface BodyProps {
  children: React.ReactNode | React.ReactNode[];
}

const Body: React.FC<BodyProps> = (props) => {
  const { children } = props;
  return (
    <div className="bg-accent-300/50 dark:bg-primary-200/50 rounded-lg mt-24 px-12 py-6 backdrop-blur-sm grid justify-center items-center max-w-[35rem] min-w-[17rem] w-4/5 gap-6 overflow-hidden">
      {children}
    </div>
  );
};

export default Body;
