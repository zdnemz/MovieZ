import * as React from "react";
import { MovieType } from "../interface/movie";
import MainLayout from "../components/layouts/MainLayout";
import Greetings from "../components/elements/Greetings";
import Carousel from "../components/fragments/image/Carousel";
import Alert from "../components/elements/Alert";
import { homeDatas } from "../services/movie/home";
import Loader from "../components/elements/Loading";
import MovieList from "../components/layouts/MovieList";
import Rating from "../components/elements/Rating";
import { Link } from "react-router-dom";
import ImageFooter from "../components/fragments/image/Footer";
import Image from "../components/fragments/image";
import ImageCard from "../components/fragments/image/ImageCard";
import Trendings from "../components/layouts/Trendings";

interface DatasType {
  trendingMoviesWeek: { results: MovieType[] };
  trendingMoviesDay: { results: MovieType[] };
  upcomingMovies: { results: MovieType[] };
  popularMovies: { results: MovieType[] };
  topRatedMovies: { results: MovieType[] };
}

const Home: React.FC = () => {
  const [datas, setDatas] = React.useState<DatasType>({
    trendingMoviesWeek: { results: [] },
    trendingMoviesDay: { results: [] },
    upcomingMovies: { results: [] },
    popularMovies: { results: [] },
    topRatedMovies: { results: [] },
  });
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const homeSessionData: string = sessionStorage.getItem("home") ?? "";
    const homeData: object = homeSessionData
      ? JSON.parse(homeSessionData)
      : null;

    if (homeData) {
      setDatas((prev) => {
        return { ...prev, ...homeData };
      });
      setIsLoading(false);
    } else {
      homeDatas(
        (response: DatasType) => {
          setDatas((prev) => {
            return {
              ...prev,
              ...{
                ...response,
              },
            };
          });

          sessionStorage.setItem(
            "home",
            JSON.stringify({
              popularMovies: response.popularMovies,
              topRatedMovies: response.topRatedMovies,
              trendingMoviesWeek: response.trendingMoviesWeek,
              trendingMoviesDay: response.trendingMoviesDay,
              upcomingMovies: response.upcomingMovies,
            })
          );
        },
        (error: string) => {
          setError(error);
        },
        () => setIsLoading(false)
      );
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {error ? (
            // TODO: handle error
            <MainLayout clearView center simple>
              <h1 className="text-center font-semibold">{error}</h1>
            </MainLayout>
          ) : (
            // Main
            <MainLayout>
              <Greetings classname="mb-2 mt-8" username={"Guest"} />
              <Carousel height="30vw" auto>
                {datas.popularMovies.results.slice(0, 8).map((movie) => (
                  <Image
                    link={`/movie/${movie.id}`}
                    alt={movie.title}
                    title={movie.title}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    description={movie.overview}
                    key={movie.id}
                  />
                ))}
              </Carousel>
              <MovieList title="Top Rated Movies">
                {datas.topRatedMovies.results.map((movie) => (
                  <ImageCard key={movie.id}>
                    <Image
                      loading="lazy"
                      center
                      saturate
                      className="rounded-lg overflow-hidden"
                      link={`/movie/${movie.id}`}
                      alt={movie.title}
                      title={movie.title}
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      key={movie.id}
                    />
                    <ImageFooter>
                      <p className="text-xs text-accent-100">
                        {movie.release_date
                          ? movie.release_date.split("-")[0]
                          : " - "}
                      </p>
                      <Rating value max={10} rating={movie.vote_average} />
                    </ImageFooter>
                  </ImageCard>
                ))}
                <Link
                  to="/movie/top_rated"
                  className="transition-opacity duration-200 bg-accent-300 hover:opacity-70 dark:bg-primary-200 rounded-lg flex justify-center items-center cursor-pointer"
                >
                  <h1 className="font-semibold">More...</h1>
                </Link>
              </MovieList>

              <Trendings
                movies={{
                  week: datas.trendingMoviesWeek.results,
                  day: datas.trendingMoviesDay.results,
                }}
              />

              <div className="relative">
                <div className="absolute w-full h-full inset-0 bg-gradient-to-b from-transparent via-transparent to-accent-100 dark:to-primary-100 z-[1]" />
                <MovieList
                  title="Upcoming Movies"
                  className="overflow-hidden overflow-y-auto max-h-[75vh] !gap-y-6 scrollbar px-6"
                  children={datas.upcomingMovies.results.map((movie) => (
                    <ImageCard key={movie.id}>
                      <Image
                        loading="lazy"
                        center
                        saturate
                        className="rounded-lg overflow-hidden"
                        link={`/movie/${movie.id}`}
                        alt={movie.title}
                        title={movie.title}
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        key={movie.id}
                      />
                      <ImageFooter>
                        <p className="text-xs text-accent-100">
                          {movie.release_date
                            ? movie.release_date.split("-")[0]
                            : " - "}
                        </p>
                      </ImageFooter>
                    </ImageCard>
                  ))}
                />
              </div>

              <Alert>This application is made by ZidaneMZ</Alert>
            </MainLayout>
          )}
        </>
      )}
    </>
  );
};

export default Home;
