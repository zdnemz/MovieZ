import { MovieApiResponseType } from "../../interface/movie.ts";

type ApiRequestOptions = {
  method: "GET" | "POST" | "DELETE";
  headers: {
    accept: string;
    Authorization: string;
  };
};

const getApiRequestOptions = (
  method: "GET" | "POST" | "DELETE"
): ApiRequestOptions => {
  return {
    method,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
    },
  };
};

const makeMovieRequest = (
  endpoint: string,
  method: "GET" | "POST" | "DELETE",
  success: CallableFunction,
  failed: CallableFunction,
  finish: CallableFunction,
  page?: number
) => {
  fetch(
    `${import.meta.env.VITE_API_URL}${endpoint}?language=en-US${
      page ? `&page=${page}` : ""
    }`,
    getApiRequestOptions(method)
  )
    .then((response) => response.json())
    .then((response: MovieApiResponseType) => success(response))
    .catch((err: string) => failed(err))
    .finally(() => finish());
};

const trendingMovie = (
  success: CallableFunction,
  failed: CallableFunction,
  finish: CallableFunction
) => {
  makeMovieRequest("trending/movie/day", "GET", success, failed, finish);
};

const popularMovie = (
  success: CallableFunction,
  failed: CallableFunction,
  finish: CallableFunction,
  page?: number
) => {
  makeMovieRequest("movie/popular", "GET", success, failed, finish, page);
};

const upcomingMovie = (
  success: CallableFunction,
  failed: CallableFunction,
  finish: CallableFunction,
  page?: number
) => {
  makeMovieRequest("movie/upcoming", "GET", success, failed, finish, page);
};

const topRatedMovie = (
  success: CallableFunction,
  failed: CallableFunction,
  finish: CallableFunction,
  page?: number
) => {
  makeMovieRequest("movie/top_rated", "GET", success, failed, finish, page);
};

const searchMovie = (
  query: string,
  success: CallableFunction,
  failed: CallableFunction,
  finish: CallableFunction,
  page?: number
) => {
  makeMovieRequest(
    `search/movie?query=${query}&include_adult=false&`,
    "GET",
    success,
    failed,
    finish,
    page
  );
};

const ratingMovie = (
  id: number,
  success: CallableFunction,
  failed: CallableFunction,
  finish: CallableFunction,
  method: "POST" | "DELETE"
) => {
  makeMovieRequest(`movie/${id}/rating`, method, success, failed, finish);
};

const creditsMovie = (
  id: number,
  success: CallableFunction,
  failed: CallableFunction,
  finish: CallableFunction
) => {
  makeMovieRequest(`movie/${id}/credits`, "GET", success, failed, finish);
};

export {
  trendingMovie,
  popularMovie,
  upcomingMovie,
  topRatedMovie,
  searchMovie,
  ratingMovie,
  creditsMovie,
};
