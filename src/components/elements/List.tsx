import * as React from "react";
import { Link } from "react-router-dom";

interface ListProps {
  children: React.ReactNode;
  link?: string;
  onClick?: () => void;
  breakline?: boolean;
  className?: string;
}

const List: React.FC<ListProps> = (props) => {
  const { children, link, onClick, breakline, className } = props;

  return (
    <>
      <Link to={link || ""}>
        <li
          className={`py-1 px-2 hover:bg-accent-200 hover:text-primary-100 dark:hover:bg-primary-100 dark:hover:text-accent-100 duration-150 cursor-pointer rounded-md ${className}`}
          onClick={onClick}
        >
          {children}
        </li>
      </Link>
      {breakline && <hr className="w-full border-primary-100" />}
    </>
  );
};

export default List;
