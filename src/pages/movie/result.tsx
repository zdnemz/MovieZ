import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchMovie } from "../../services/movie/movies";
import { MovieApiResponseType } from "../../interface/movie";
import Loader from "../../components/elements/Loading";
import MainLayout from "../../components/layouts/MainLayout";
import MovieList from "../../components/layouts/MovieList";
import Image from "../../components/fragments/image";
import ImageCard from "../../components/fragments/image/ImageCard";
import ImageFooter from "../../components/fragments/image/Footer";
import Rating from "../../components/elements/Rating";
import PaginationBar from "../../components/fragments/pagination-bar";
import resultValidation from "../../services/validation/result-validation";

const Result: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const [datas, setDatas] = React.useState<MovieApiResponseType>();
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  const result = queryParams.get("q") || "";
  const page = Number(queryParams.get("page")) || 1;

  React.useEffect(() => {
    resultValidation(queryParams, navigate);
  }, []);

  React.useEffect(() => {
    searchMovie(
      result,
      (data: MovieApiResponseType) => {
        if (data) {
          setDatas(data);
        }
      },
      (err: string) => {
        setError(err);
      },
      () => {
        setIsLoading(false);
      },
      page
    );
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <MainLayout clearView center simple>
          <h1 className="text-center font-semibold">{error}</h1>
        </MainLayout>
      ) : (
        <MainLayout>
          <MovieList title={`${datas?.total_results} Results For "${result}"`}>
            {datas?.results
              .filter((movie) => movie.poster_path)
              .map((movie) => (
                <ImageCard key={movie.id}>
                  <Image
                    className="rounded-lg overflow-hidden min-w-[5rem] max-w-[7.5rem] w-[50vw]"
                    saturate
                    center
                    key={movie.id}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    title={movie.title}
                    link={`/movie/${movie.id}`}
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
          </MovieList>
          <PaginationBar datas={datas} />
        </MainLayout>
      )}
    </>
  );
};

export default Result;
