import * as React from "react";

interface AlertProps {
  children?: React.ReactNode;
  time?: number;
  callback?: () => void;
}

const Alert: React.FC<AlertProps> = (props) => {
  const { children, time, callback } = props;

  const [isOpen, setIsOpen] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsOpen(false);
      callback && callback();
    }, time || 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isOpen]);

  return (
    isOpen && (
      <div className="fixed h-screen w-full z-50 inset-0 flex justify-center">
        <div
          className="w-full h-full absolute inset-0"
          onClick={() => {
            setIsOpen(false);
            callback && callback();
          }}
        />
        <div
          className="w-fit max-w-[80vw] h-fit py-1 px-6 flex justify-center items-center text-center rounded-xl opacity-80 bg-primary-100 text-accent-100 dark:bg-accent-100 dark:text-primary-100 transition-transform"
          style={{
            animationName: "alert",
            animationDuration: time ? `${time}ms` : "5000ms",
          }}
        >
          {children || "Something went wrong, please try again"}
        </div>
      </div>
    )
  );
};

export default Alert;
