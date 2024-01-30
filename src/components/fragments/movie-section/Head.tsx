import * as React from "react";

interface HeadProps {
  src: string;
}

const Head: React.FC<HeadProps> = (props) => {
  const { src } = props;
  return (
    <div className="absolute w-full h-44 rounded-lg overflow-hidden group">
      <div className="w-full h-full relative">
        <div className="w-full h-full absolute inset-0 bg-primary-100/50 group-hover:bg-primary-100/40 transition-opacity duration-300" />
        <img
          src={`https://image.tmdb.org/t/p/w500${src}`}
          className="w-full h-full object-cover object-center saturate-0 group-hover:saturate-100 transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default Head;
