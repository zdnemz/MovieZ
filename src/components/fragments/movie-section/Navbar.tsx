import * as React from "react";

type AddProps = {
  [key: string]: boolean;
};

type NavbarProps = {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const Navbar: React.FC<NavbarProps> = ({ setMessage }) => {
  const [add, setAdd] = React.useState<AddProps>({
    watchlist: false,
    favorites: false,
    rate: false,
    share: false,
  });

  const navlist = [
    {
      name: "watchlist",
      desc: { add: "Add to watchlist", remove: "Remove from watchlist" },
      alert: {
        add: "Successfully added to watchlist",
        remove: "Successfully removed from watchlist",
      },
      icon: "fa-bookmark",
      handleClick: () => {
        return;
      },
    },
    {
      name: "favorites",
      desc: { add: "Add to favorites", remove: "Remove from favorites" },
      alert: {
        add: "Successfully added to favorites",
        remove: "Successfully removed from favorites",
      },
      icon: "fa-heart",
      handleClick: () => {
        return;
      },
    },
    {
      name: "rate",
      desc: { add: "Add rating", remove: "Remove rating" },
      alert: {
        add: "Successfully added rating",
        remove: "Successfully removed rating",
      },
      icon: "fa-star",
      handleClick: () => {},
    },
  ];

  return (
    <div className="flex gap-4 justify-center">
      {navlist.map((item) => (
        <div key={item.name} className="relative group w-4 h-4 cursor-pointer">
          <i
            className={`fa-${add[item.name] ? "solid" : "regular"} ${
              item.icon
            } text-sm`}
            onClick={() => {
              setAdd({ ...add, [item.name]: !add[item.name] });
              setMessage(add[item.name] ? item.alert.remove : item.alert.add);
              item.handleClick();
            }}
          />
          <span className="absolute text-sm top-0 right-1/2 translate-x-1/2 translate-y-8 px-2 py-1 rounded w-fit h-fit text-accent-100 bg-primary-100/20 dark:bg-accent-200/20 self-center items-center hidden group-hover:flex transition-opacity duration-300">
            {add[item.name] ? item.desc.remove : item.desc.add}
          </span>
        </div>
      ))}

      {/* Share */}
      <div className="relative group w-4 h-4 cursor-pointer">
        <i className="fa-solid fa-share text-sm" />
        <span className="absolute text-sm top-0 right-1/2 translate-x-1/2 translate-y-8 px-2 py-1 rounded w-fit h-fit text-accent-100 bg-primary-100/20 dark:bg-accent-200/20 self-center items-center hidden group-hover:flex transition-opacity duration-300">
          Share
        </span>
      </div>
    </div>
  );
};

export default Navbar;
