import * as React from "react";
import { CreditsType } from "../../interface/credits";
import { creditsMovie } from "../../services/movie/movies";
import { useParams } from "react-router-dom";
import MainLayout from "../../components/layouts/MainLayout";
import Loader from "../../components/elements/Loading";

const Credits: React.FC = () => {
  const { id } = useParams();
  const [datas, setDatas] = React.useState<CreditsType | null>(null);
  const [error, setError] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    creditsMovie(
      Number(id),
      (data: CreditsType) => {
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

  return isLoading ? (
    <Loader />
  ) : error ? (
    <MainLayout clearView center simple>
      <h1 className="text-center font-semibold">{error}</h1>
    </MainLayout>
  ) : (
    <MainLayout clearView footer simple>
      <div>
        {/* Cast */}
        <div className="py-6">
          <h1 className="my-2 text-lg font-semibold">
            Cast{" "}
            <span className="font-normal text-opacity">
              ({datas?.crew.length})
            </span>
          </h1>
          <div className="w-full">
            <div className="grid grid-col-auto gap-6 w-full">
              {datas?.cast.map((cast) => (
                <div
                  key={cast.id}
                  className="bg-accent-200 dark:bg-primary-200 rounded-lg w-28"
                >
                  <div className="w-28 h-32 rounded-t-lg overflow-hidden">
                    <img
                      src={
                        cast.profile_path
                          ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                          : "/user-profile.jpg"
                      }
                      alt={cast.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="px-4 py-1">
                    <h1 className="text-sm font-semibold">{cast.name}</h1>
                    <p className="text-xs text-opacity">{cast.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-primary-100" />

        {/* Crew */}
        <div className="py-6">
          <h1 className="my-2 text-lg font-semibold">
            Crew{" "}
            <span className="font-normal text-opacity">
              ({datas?.crew.length})
            </span>
          </h1>
          <div className="grid grid-col-auto gap-6 w-full">
            {datas?.crew.map((crew) => (
              <div
                key={crew.id}
                className="bg-accent-200 dark:bg-primary-200 rounded-lg w-28"
              >
                <div className="w-28 h-32 rounded-t-lg overflow-hidden">
                  <img
                    src={
                      crew.profile_path
                        ? `https://image.tmdb.org/t/p/w500${crew.profile_path}`
                        : "/user-profile.jpg"
                    }
                    alt={crew.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="px-4 py-1">
                  <h1 className="text-sm font-semibold">{crew.name}</h1>
                  <p className="text-xs text-opacity">{crew.job}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Credits;
