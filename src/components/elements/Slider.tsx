import React from "react";

interface Props {
  children: React.ReactNode;
  classname?: string;
  title?: string;
}

const Slider: React.FC<Props> = ({ children, classname, title }) => {
  return (
    <>
      <h1 className="self-start text-lg font-semibold">{title}</h1>
      <div
        className={`overflow-x-auto flex gap-4 w-full scroll-smooth scrollbar ${classname}`}
      >
        {children}
      </div>
    </>
  );
};

export default Slider;
