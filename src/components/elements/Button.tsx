import * as React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = (props) => {
  const { children, onClick, className, disabled } = props;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`hover:bg-secondary-300 duration-150font-bold py-1 px-4 rounded-md ${className} ${
        disabled
          ? "bg-accent-200 dark:bg-primary-200 text-opacity"
          : "bg-secondary-100 text-accent-100 "
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
