import React from "react";
import { CastType } from "../../../interface/credits";
import Slider from "../../elements/Slider";
import { Link } from "react-router-dom";

type Props = {
  datas: CastType[] | [];
};

const Cast: React.FC<Props> = ({ datas }) => {
  if (datas.length === 0) {
    return null;
  }

  return (
    <Slider classname="pb-4" title="Top Cast">
      {datas.map((cast) => (
        <div
          key={cast.id}
          className="bg-accent-200 dark:bg-primary-200 w-auto h-full rounded-lg"
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
      <Link to={`${location.pathname}/credits`}>
        <div className="bg-accent-200 dark:bg-primary-200 w-auto h-full rounded-lg">
          <div className="w-28 h-full rounded-t-lg overflow-hidden flex justify-center items-center">
            <h1>View More</h1>
          </div>
        </div>
      </Link>
    </Slider>
  );
};

export default Cast;
