import * as React from "react";
import Menu from "../../elements/Menu";
import List from "../../elements/List";
import DarkMode from "../darkmode/Button";
import Confirm from "../confirm/Confim";

const NavMenu: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {isOpen && (
        <Confirm
          setIsOpen={setIsOpen}
          confirm={() => {
            setIsOpen(false);
            alert("Logout");
          }}
        >
          Are you sure to Logout?
        </Confirm>
      )}
      <Menu className="md:hidden" icon={<i className="fa-solid fa-bars"/>}>
        <List link="/profile" className="flex items-center gap-4">
          <i className="fa-solid fa-user w-4" />
          <p>Profile</p>
        </List>
        <List link="/about" className="flex items-center gap-4">
          <i className="fa-solid fa-circle-info w-4" />
          <p>About</p>
        </List>
        <List link="/" breakline className="flex items-center gap-4">
          <i className="fa-solid fa-house w-4" />
          <p>Home</p>
        </List>
        <DarkMode />
        <List
          className="flex items-center gap-4"
          onClick={() => setIsOpen(true)}
        >
          <i className="fa-solid fa-right-from-bracket w-4" />
          <p>Logout</p>
        </List>
      </Menu>
    </>
  );
};

export default NavMenu;
