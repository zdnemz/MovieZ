import React from "react";

interface Props {
  children?: React.ReactNode;
}

const Paragraf: React.FC<Props> = (props) => {
  const { children } = props;
  return (
    <div className="grid text-opacity text-sm self-start">
      <p>{children}</p>
    </div>
  );
};

export default Paragraf;
