import { MovieApiResponseType } from "../../interface/movie";

const fetchData = async (
  endpoint: string,
  more?: string
): Promise<MovieApiResponseType> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${endpoint}?language=en-US&${more}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
      },
    }
  );
  return response.json();
};

export const homeDatas = async (
  success: CallableFunction,
  failed: CallableFunction,
  finish: CallableFunction
) => {
  try {
    const response = await Promise.all([
      await fetchData("trending/movie/week"),
      await fetchData("trending/movie/day"),
      await fetchData("movie/upcoming"),
      await fetchData("movie/popular"),
      await fetchData("movie/top_rated"),
    ]);

    const [
      trendingMoviesWeek,
      trendingMoviesDay,
      upcomingMovies,
      popularMovies,
      topRatedMovies,
    ] = response;

    success({
      trendingMoviesWeek,
      trendingMoviesDay,
      upcomingMovies,
      popularMovies,
      topRatedMovies,
    });
  } catch (err) {
    failed("Something went wrong, please try again");
  } finally {
    finish();
  }
};
