import * as React from "react";
import { VideoType } from "../../../interface/video";

interface Props {
  data: VideoType;
}

const Trailer: React.FC<Props> = ({ data }) => {
  return (
    <>
      <h1 className="font-semibold text-lg mb-4">Movie Trailer</h1>
      {data ? (
        <div className="flex md:justify-start justify-center">
          <iframe
            src={`https://www.youtube.com/embed/${data.key}`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; web-share;"
            allowFullScreen
            className="w-full max-w-[30rem] aspect-video rounded-lg"
            title={data.name}
          />
        </div>
      ) : (
        <div className="w-full aspect-video flex justify-center items-center max-w-[30rem]">
          <h1>No trailer available</h1>
        </div>
      )}
    </>
  );
};

export default Trailer;
