import * as React from "react";
import useBack from "../../../hooks/useBack";

const SimpleNav: React.FC = () => {
  const [isScroll, setIsScroll] = React.useState(0);
  const back = useBack();

  React.useEffect(() => {
    const handleScroll = () => {
      const windowScrolled: number = window.scrollY;
      setIsScroll(windowScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <nav
      className={`z-50 fixed top-0 w-full bg-accent-100 dark:bg-primary-100 text-primary-100 dark:text-accent-100 py-4 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 ${
        isScroll && "backdrop-blur-sm bg-opacity-80 drop-shadow-lg"
      }`}
    >
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg cursor-pointer" onClick={back}>
          Back
        </h1>
        <h1 className="font-bold text-xl">
          Movie
          <span className="text-accent-100 dark:text-primary-100 bg-primary-100 dark:bg-accent-100 px-px">
            Z
          </span>
        </h1>
      </div>
    </nav>
  );
};

export default SimpleNav;
