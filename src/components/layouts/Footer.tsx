import * as React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <div className="bg-accent-100 dark:bg-primary-100 text-primary-100 dark:text-accent-100 pb-8 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24">
      <hr className="mb-8 border-primary-100/50 dark:border-accent-100/50" />
      <div className="sm:flex">
        <div className="text-center mx-auto sm:w-1/2">
          <p>&copy; 2024 MovieZ All Rights Reserved</p>
          <p>Made with ❤️ By ZidaneMZ</p>
          <p className="text-sm text-opacity">Powered by React.js and TMDB</p>
        </div>
        <div className="mt-4 sm:mt-0 gap-4 flex justify-between text-sm w-4/5 max-w-[20rem] sm:w-1/2 mx-auto">
          <div>
            <h1 className="text-base">Follow Us</h1>
            <div className="flex flex-col gap-1 text-opacity">
              <Link
                to={"https://github.com/zdnemz"}
                className="flex gap-2 justify-center items-center group"
              >
                <i className="fa-brands fa-github"></i>
                <span className="group-hover:underline">zdnemz</span>
              </Link>
              <Link
                to={"https://instagram.com/zdnemz"}
                className="flex gap-2 justify-center items-center group"
              >
                <i className="fa-brands fa-instagram"></i>
                <span className="group-hover:underline">zdnemz</span>
              </Link>
              <Link
                to={"https://www.linkedin.com/in/zdnemz"}
                className="flex gap-2 justify-center items-center group"
              >
                <i className="fa-brands fa-linkedin"></i>
                <span className="group-hover:underline">zdnemz</span>
              </Link>
            </div>
          </div>
          <div className="flex gap-1 flex-col text-opacity">
            <Link to={"/"}>Privacy Policy</Link>
            <Link to={"/"}>Terms of Service</Link>
            <Link to={"/"}>Contact Us</Link>
            <Link to={"/"}>Help</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
