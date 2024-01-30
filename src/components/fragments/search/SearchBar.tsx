import * as React from "react";
import { MovieApiResponseType } from "../../../interface/movie";

interface Props {
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const SearchBar: React.FC<Props> = ({ open }) => {
  const parsedHistory = JSON.parse(
    localStorage.getItem("search-historyData") || "[]"
  ) as string[];

  const [historyData, sethistoryData] = React.useState<string[]>(parsedHistory);
  const [recommend, setRecommend] = React.useState<string[]>([]);

  const [isOpen, setIsOpen] = open;

  React.useEffect(() => {
    const recommendedDatas: { trendingMoviesWeek: MovieApiResponseType } =
      JSON.parse(sessionStorage.getItem("home") || "{}");

    const recommendDatas = recommendedDatas.trendingMoviesWeek.results
      .slice(0, 5)
      .map((data) => data.title);
    if (recommendDatas) {
      setRecommend(recommendDatas);
    }
    if (parsedHistory) {
      sethistoryData(parsedHistory);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("search-historyData", JSON.stringify(historyData));
  }, [historyData]);

  return (
    isOpen && (
      <div onFocus={() => setIsOpen(true)} onBlur={() => setIsOpen(false)}>
        <div
          className="w-full h-full fixed inset-0 z-20"
          onClick={() => setIsOpen(false)}
        />
        <div className="translate-y-1 w-full bg-accent-200/70 dark:bg-primary-200/70 absolute rounded-lg backdrop-blur-sm z-30 px-6 py-3 drop-shadow grid gap-1">
          {historyData.length > 0 && (
            <>
              <h1>History</h1>
              {historyData
                .map((_, index, array) => {
                  return array[array.length - 1 - index];
                })
                .slice(0, 5)
                .map((data, index) => (
                  <div
                    className={`flex justify-between text-sm text-opacity border-primary-100/10 dark:border-accent-100/10 ${
                      historyData.length - 1 === index
                        ? "border-y py-1"
                        : "border-t pt-1"
                    }`}
                    key={index}
                  >
                    <p
                      className="line-clamp-1 cursor-pointer"
                      onClick={() => {
                        localStorage.setItem(
                          "search-historyData",
                          JSON.stringify([
                            ...(historyData || []).filter((x: string) => x !== data),
                            data,
                          ])
                        );
                        window.location.href = `/search?q=${data}`;
                      }}
                    >
                      {data}
                    </p>
                    <i
                      className="fa-solid fa-xmark flex items-center cursor-pointer"
                      onClick={() =>
                        sethistoryData((prev) => [
                          ...prev.filter((value) => value !== data),
                        ])
                      }
                    />
                  </div>
                ))}
            </>
          )}
          {recommend.length > 0 && (
            <>
              <h1>On trending</h1>
              {recommend.map((data, index) => (
                <div
                  className="flex justify-between text-sm text-opacity border-t border-primary-100/10 dark:border-accent-100/10 pt-1"
                  key={index}
                >
                  <p
                    className="line-clamp-1 cursor-pointer"
                    onClick={() => {
                      localStorage.setItem(
                        "search-historyData",
                        JSON.stringify([
                          ...(historyData || []).filter(
                            (x: string) => x !== data
                          ),
                          data,
                        ])
                      );
                      window.location.href = `/search?q=${data}`;
                    }}
                  >
                    {data}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    )
  );
};

export default SearchBar;
