import * as React from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/elements/Loading";
import MainLayout from "../../components/layouts/MainLayout";
import Head from "../../components/fragments/movie-section/Head";
import Body from "../../components/fragments/movie-section/Body";
import Header from "../../components/fragments/movie-section/Header";
import Paragraf from "../../components/fragments/movie-section/Paragraf";
import Slider from "../../components/elements/Slider";
import fetchData from "../../services/movie";
import Image from "../../components/fragments/image";
import Reviews from "../../components/fragments/movie-section/Reviews";
import Alert from "../../components/elements/Alert";
import ImageCard from "../../components/fragments/image/ImageCard";
import ImageFooter from "../../components/fragments/image/Footer";
import Trailer from "../../components/fragments/movie-section/Trailer";
import Cast from "../../components/fragments/movie-section/Cast";
import InputReview from "../../components/fragments/movie-section/InputReview";
import { MovieSectionType } from "../../interface";

const Movie: React.FC = () => {
  const params = useParams();
  const { id } = params;

  const [datas, setDatas] = React.useState<MovieSectionType>({
    datas: null,
    recommendations: [],
    reviews: [],
    videos: [],
    credits: null,
  });

  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    fetchData(
      Number(id),
      (data: MovieSectionType) => {
        setDatas(data);
      },
      (err: string) => {
        setError(err);
      },
      () => {
        setIsLoading(false);
      }
    );
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        // TODO: handle error
        <MainLayout clearView center simple>
          <h1 className="text-center font-semibold">{error}</h1>
        </MainLayout>
      ) : (
        // TODO: handle success
        <MainLayout>
          <div className="flex flex-col items-center pt-8 gap-4 relative">
            <Head src={`${datas.datas?.backdrop_path}`} />
            <Body>
              <Header setMessage={setMessage} datas={datas.datas} />
              <div className="flex flex-col gap-2">
                {datas.datas?.tagline && (
                  <p className="italic text-sm text-center">
                    "{datas.datas?.tagline}"
                  </p>
                )}
                <div>
                  <p className="text-sm font-semibold">Overview</p>
                  <Paragraf>{datas.datas?.overview}</Paragraf>
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {
                      datas.credits?.crew.filter((c) => c.job === "Director")[0]
                        ?.name
                    }
                  </p>
                  <p className="text-xs text-opacity">Director</p>
                </div>
              </div>
            </Body>

            {/* Genres */}
            <Slider classname="!w-4/5 justify-center">
              <div className="flex gap-4 overflow-auto scrollbar py-4">
                {datas.datas?.genres.map((genre) => {
                  return (
                    <Link
                      to={`/genre/${genre.id}`}
                      className="flex flex-shrink-0 justify-center items-center bg-secondary-200 hover:bg-secondary-400 text-accent-100 p-2 rounded-lg text-sm cursor-pointer transition-colors duration-300 font-semibold"
                      key={genre.id}
                    >
                      {genre.name}
                    </Link>
                  );
                })}
              </div>
            </Slider>

            <div className="flex flex-col gap-4 md:gap-8 md:flex-row w-full md:justify-between">
              {/* Trailer */}
              <div className="w-full md:w-1/2 self-start">
                <Trailer
                  data={
                    datas.videos?.filter(
                      (video) => video.type === "Trailer"
                    )[0] || null
                  }
                />
              </div>
              <div className="md:w-1/2 grid gap-4">
                <Cast datas={datas.credits?.cast.slice(0, 7) || []} />
              </div>
            </div>

            {/* Recommendations */}
            {datas.recommendations?.length > 0 && (
              <Slider classname="justify-center" title="Recommendations">
                <div className="flex gap-4 overflow-auto scrollbar pb-4">
                  {datas.recommendations
                    ?.filter((recommendation) => recommendation.poster_path)
                    .map((recommendation) => (
                      <ImageCard key={recommendation.id}>
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${recommendation.poster_path}`}
                          className="rounded-lg overflow-hidden min-w-[8rem] max-w-[10rem] w-[20vw]"
                          saturate
                          title={recommendation.title}
                          center
                          link={`/movie/${recommendation.id}`}
                          alt={recommendation.title}
                        />
                        <ImageFooter>
                          <p className="text-sm text-accent-100 -translate-y-1">
                            ( {recommendation.release_date.split("-")[0]} )
                          </p>
                        </ImageFooter>
                      </ImageCard>
                    ))}
                </div>
              </Slider>
            )}

            <div>
              <Reviews datas={datas.reviews} />
              <InputReview hook={[datas, setDatas]} />
            </div>
          </div>
          {message && <Alert callback={() => setMessage("")}>{message}</Alert>}
        </MainLayout>
      )}
    </>
  );
};

export default Movie;
