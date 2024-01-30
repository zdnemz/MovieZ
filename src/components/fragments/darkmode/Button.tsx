import * as React from "react";

interface ButtonProps {
  noview?: boolean;
}

const DarkMode: React.FC<ButtonProps> = ({noview}) => {
  const options = [
    {
      name: "light",
      icon: "fa-solid fa-sun",
    },
    {
      name: "dark",
      icon: "fa-solid fa-moon",
    },
    {
      name: "system",
      icon: "fa-solid fa-desktop",
    },
  ];

  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );

  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const onWindowMatch = () => {
    if (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && darkQuery.matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  onWindowMatch();

  React.useEffect(() => {
    switch (theme) {
      case "light":
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;

      case "dark":
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;

      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme]);

  React.useEffect(() => {
    darkQuery.addEventListener("change", onWindowMatch);
    return () => {
      darkQuery.removeEventListener("change", onWindowMatch);
    };
  });

  if (noview) {
    return null;
  }

  return (
    <div className="dark:bg-primary-300 bg-accent-300 flex overflow-hidden translate-y-[2px] w-fit self-center rounded-lg">
      {options.map((option) => (
        <button
          key={option.name}
          onClick={() => setTheme(option.name)}
          className={`w-8 h-7 flex justify-center items-center hover:bg-accent-400 dark:hover:bg-primary-200 text-accent-100 hover:text-accent-500 dark:hover:text-sky-800 ${
            theme === option.name
              ? "bg-accent-400 text-yellow-400 dark:bg-primary-200 dark:text-sky-800"
              : ""
          }`}
        >
          <i className={`${option.icon}`}></i>
        </button>
      ))}
    </div>
  );
};

export default DarkMode;
