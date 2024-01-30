import React, { useState } from "react";
import { MovieType } from "../../interface/movie";
import Slider from "../elements/Slider";
import Image from "../fragments/image";

type Props = {
  movies: {
    day: MovieType[];
    week: MovieType[];
  };
};

const Trendings: React.FC<Props> = ({ movies }) => {
  const [isDay, setIsDay] = useState(false);

  return (
    <div className="py-8 mt-6 px-6 rounded-xl shadow-inner">
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">On Trending 🔥</h1>
        <div className="flex relative overflow-hidden rounded-lg">
          <div
            className={`${
              isDay ? "translate-x-0" : "translate-x-full"
            } absolute inset-0 h-full w-[calc(50%+0.5rem)] duration-200 bg-secondary-100 z-[1]`}
          />
          <div className="absolute inset-0 h-full w-full bg-accent-200 dark:bg-primary-200" />
          <div
            className={`${
              isDay ? "text-accent-100" : "text-primary-100 dark:text-accent-100"
            } text-center px-3 py-px font-semibold cursor-pointer z-[2]`}
            onClick={() => setIsDay(true)}
          >
            Week
          </div>
          <div
            className={`${
              !isDay ? "text-accent-100" : "text-primary-100 dark:text-accent-100"
            } text-center px-3 py-px font-semibold cursor-pointer z-[2]`}
            onClick={() => setIsDay(false)}
          >
            Day
          </div>
        </div>
      </div>
      <Slider classname="py-4">
        {isDay
          ? movies.day
              .filter((movie) => movie.poster_path)
              .map((movie) => (
                <div key={movie.id}>
                  <Image
                    link={`/movie/${movie.id}`}
                    alt={movie.title}
                    title={movie.title}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    center
                    key={movie.id}
                    saturate
                  />
                </div>
              ))
          : movies.week
              .filter((movie) => movie.poster_path)
              .map((movie) => (
                <div key={movie.id}>
                  <Image
                    link={`/movie/${movie.id}`}
                    alt={movie.title}
                    title={movie.title}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    center
                    key={movie.id}
                    saturate
                  />
                </div>
              ))}
      </Slider>
    </div>
  );
};

export default Trendings;
