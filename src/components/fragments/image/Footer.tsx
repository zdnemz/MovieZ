import * as React from "react";

interface ImagePropertiesProps {
  children: React.ReactNode;
}

const ImageFooter: React.FC<ImagePropertiesProps> = (props) => {
  const { children } = props;

  return (
    <div className="absolute w-full -translate-y-5 flex justify-end items-center gap-3 flex-col text-xs">
      {children}
    </div>
  );
};

export default ImageFooter;
