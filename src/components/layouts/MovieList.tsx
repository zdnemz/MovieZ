import * as React from "react";

interface MovieListProps {
  children: React.ReactNode[] | React.ReactNode;
  title?: string;
  className?: string;
}

const MovieList: React.FC<MovieListProps> = (props) => {
  const { children, title, className } = props;

  return (
    <div className="py-8">
      <h1 className="font-semibold text-lg pb-4">{title}</h1>
      <div className={`pb-4 grid grid-col-auto gap-4 gap-y-12 w-full ${className}`}>{children}</div>
    </div>
  );
};

export default MovieList;
