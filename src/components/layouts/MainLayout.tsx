import * as React from "react";
import Navbar from "./Navbar";
import DarkMode from "../fragments/darkmode/Button";
import SimpleNav from "../fragments/navbar/SimpleNav";
import Search from "../fragments/search";
import ToTop from "../elements/ToTop";
import Footer from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
  clearView?: boolean;
  simple?: boolean;
  full?: boolean;
  center?: boolean;
  footer?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = (props) => {
  const { children, clearView, simple, full, center, footer } = props;

  const [isOffline, setIsOffline] = React.useState(false);

  React.useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
    };
  }, []);

  if (isOffline) {
    return (
      <>
        <Navbar />
        <DarkMode noview />
        <div
          className={`dark:bg-primary-100 bg-accent-100 text-primary-100 dark:text-accent-100 min-h-screen relative py-0 px-0 flex flex-col justify-center items-center`}
        >
          <h1 className="text-lg font-semibold">{"You're Offline :("}</h1>
          <ToTop />
        </div>
        <Footer />
      </>
    );
  }

  if (clearView) {
    return (
      <>
        {simple && <SimpleNav />}
        <DarkMode noview />
        <div
          className={`dark:bg-primary-100 bg-accent-100 text-primary-100 dark:text-accent-100 min-h-screen py-8 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-40 2xl:px-64 relative ${
            simple && "pt-24"
          } ${full && "py-0 px-0"} ${
            center && "flex flex-col justify-center items-center"
          }`}
        >
          {children}
          <ToTop />
        </div>
        {footer && <Footer />}
      </>
    );
  } else {
    return (
      <>
        {simple ? <SimpleNav /> : <Navbar />}
        <DarkMode noview />
        <div
          className={`dark:bg-primary-100 relative bg-accent-100 text-primary-100 dark:text-accent-100 min-h-screen ${
            full
              ? "py-0 px-0"
              : "py-32 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-40 2xl:px-64"
          } ${center && "flex flex-col justify-center items-center"}`}
        >
          <div className="py-24 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-40 2xl:px-64 absolute inset-0 w-full h-fit">
            <Search />
          </div>
          {children}
          <ToTop />
        </div>
        <Footer />
      </>
    );
  }
};

export default MainLayout;
