import * as React from "react";

interface ImageProps {
  title?: string;
  description?: string;
  src: string;
  alt?: string;
  className?: string;
  link?: string;
  center?: boolean;
  saturate?: boolean;
  loading?: "lazy" | "eager" | undefined;
}

const Image: React.FC<ImageProps> = (props) => {
  const {
    title,
    description,
    src,
    alt,
    className,
    link,
    center,
    saturate,
    loading,
  } = props;

  return (
    <div className={`${className} w-full h-full relative group`}>
      <a href={link} className="w-full h-full">
        <div
          className={`absolute w-full h-full inset-0 flex overflow-hidden bg-primary-100/50 group-hover:bg-primary-100/40 transition-colors duration-200 z-[5] ${
            center
              ? "justify-center text-center items-end pb-4 px-4"
              : "justify-end py-5 px-12 flex-col"
          }`}
        >
          <h1 className="line-clamp-2 text-md font-semibold text-accent-100">
            {title}
          </h1>
          <p className="text-xs sm:text-sm sm:line-clamp-2 line-clamp-1 text-accent-100/50">
            {description}
          </p>
        </div>
        <img
          loading={loading}
          src={src}
          alt={alt}
          className={`${
            !saturate && "saturate-0 group-hover:saturate-[80%]"
          } w-full h-full object-cover object-center transition-all duration-200 min-w-[7rem]`}
        />
      </a>
    </div>
  );
};

export default Image;
