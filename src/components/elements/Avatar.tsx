import * as React from "react";

interface AvatarProps {
  children?: React.ReactNode;
  src?: string;
  size?: string;
  rounded?: boolean;
  onClick?: () => void;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const { src, size, rounded, children, onClick, className } = props;

  return (
    <div
      className={`${rounded && "rounded-full"}`}
      style={{ width: size || "2.25rem", height: size || "2.25rem" }}
      onClick={onClick}
    >
      {children}
      <img
        src={src}
        className={`h-full w-full object-cover ${rounded && "rounded-full"} ${
          className && className
        }`}
      />
    </div>
  );
};

export default Avatar;
