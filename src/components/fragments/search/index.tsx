import * as React from "react";
import useSessionData from "../../../hooks/useSession";
import SearchBar from "./SearchBar";

const Search: React.FC = () => {
  const [searchHolder, setSearchHolder] = React.useState("Search for movies");
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "/") {
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement | HTMLInputElement>
  ): void => {
    if (inputValue === "") {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    const history: string[] = JSON.parse(
      localStorage.getItem("search-historyData") || "[]"
    );

    localStorage.setItem(
      "search-historyData",
      JSON.stringify([
        ...history.filter((data) => data !== inputValue),
        inputValue,
      ])
    );
    window.location.href = `/search?q=${inputValue}`;
  };

  useSessionData((data: string) => setSearchHolder(data));

  return (
    <div className="relative w-full">
      <form
        action="search"
        onSubmit={handleSubmit}
        className="w-full flex rounded-lg overflow-hidden relative shadow-md z-30"
        onFocus={() => setIsOpen(true)}
      >
        <input
          className="flex-grow bg-accent-200 dark:bg-primary-200 dark:text-accent-100 text-primary-100 text-sm px-5 py-1 sm:pl-10 md:pl-16 rounded-l-lg dark:outline-accent-100 outline-primary-100 search-input"
          ref={inputRef}
          type="text"
          placeholder={searchHolder}
          value={inputValue}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Tab") {
              e.preventDefault();
              setInputValue(searchHolder);
            }
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
        />
        <i className="fa-solid fa-magnifying-glass inset-0 absolute sm:w-10 md:w-12 h-full items-center justify-center hidden sm:flex" />
        <div className="absolute hidden sm:flex right-20 opacity-30 inset-y-0 w-fit h-full items-center justify-center">
          <h1>[ctrl+/]</h1>
        </div>
        <input
          type="button"
          className="bg-secondary-100 py-1 px-3 cursor-pointer text-accent-100 z-30"
          value={"search"}
          onClick={handleSubmit}
        />
      </form>
      <SearchBar
        open={[isOpen, setIsOpen]}
      />
    </div>
  );
};

export default Search;
