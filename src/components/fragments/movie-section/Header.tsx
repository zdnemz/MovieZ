import * as React from "react";
import { MovieByIdType } from "../../../interface/movie";
import Image from "../image";
import Rating from "../../elements/Rating";
import Navbar from "./Navbar";

interface Props {
  datas: MovieByIdType | null;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<Props> = (props) => {
  const { datas, setMessage } = props;
  return (
    <div className="flex gap-3 justify-evenly items-center">
      <Image
        saturate
        className="rounded-lg overflow-hidden min-w-[8rem] max-w-[10rem] w-[20vw]"
        src={`https://image.tmdb.org/t/p/w500${datas?.poster_path}` || ""}
      />
      <div className="text-center grid">
        <h1 className="mb-1 font-semibold text-md">
          {datas?.title}{" "}
          <span className="text-opacity">
            ({datas?.release_date.split("-")[0]})
          </span>
        </h1>
        <div className="flex justify-center text-sm">
          <Rating max={10} rating={datas?.vote_average || 0} value />
        </div>
        <p className="mb-1 text-sm">
          {datas?.vote_count.toLocaleString()} Voters
        </p>
        <Navbar setMessage={setMessage} />
      </div>
    </div>
  );
};

export default Header;
