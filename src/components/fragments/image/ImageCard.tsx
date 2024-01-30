import * as React from "react";

interface ImageCardProps {
  children: React.ReactNode;
}

const ImageCard: React.FC<ImageCardProps> = (props) => {
  const { children } = props;

  return <div className="w-fit relative">{children}</div>;
};

export default ImageCard;
