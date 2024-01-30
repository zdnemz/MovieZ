import * as React from "react";
import NavList from "../fragments/navbar/NavList";
import NavMenu from "../fragments/navbar/NavMenu";

const Navbar: React.FC = () => {
  const [isScroll, setIsScroll] = React.useState(0);

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
        isScroll &&
        "dark:backdrop-blur-sm backdrop-blur-sm dark:bg-opacity-80 bg-opacity-80 dark:drop-shadow-lg drop-shadow-lg"
      }`}
    >
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">
          Movie
          <span className="text-accent-100 dark:text-primary-100 bg-primary-100 dark:bg-accent-100 px-px">
            Z
          </span>
        </h1>
        {/* md hidden */}
        <NavMenu />
        {/* md flex */}
        <NavList />
      </div>
    </nav>
  );
};

export default Navbar;
