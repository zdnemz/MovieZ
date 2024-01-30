import * as React from "react";
import { ReviewType } from "../../../interface/reviews";
import Avatar from "../../elements/Avatar";
import Rating from "../../elements/Rating";

interface Props {
  datas: [ReviewType] | ReviewType[] | [];
}

interface OpenStateType {
  [key: string]: boolean;
}

type ElementResultType = {
  [key: string]: boolean;
};

type TextRefType = {
  [key: string]: React.RefObject<HTMLParagraphElement>;
};

const Reviews: React.FC<Props> = (props) => {
  const { datas } = props;
  const [open, setOpen] = React.useState<OpenStateType>({});

  const [hasMore, setHasMore] = React.useState<OpenStateType>({});

  const textRef = React.useRef<TextRefType>({});

  React.useEffect(() => {
    if (!datas) {
      return;
    }

    const elements: ElementResultType = datas.reduce(
      (result: ElementResultType, data) => {
        const element = textRef.current[data.id]?.current;

        if (element) {
          result[data.id] = element.scrollHeight > element.offsetHeight;
        }

        return result;
      },
      {}
    );

    setHasMore(elements);
  }, []);

  return (
    datas.length > 0 && (
      <div className="flex flex-col w-full">
        <h1 className="text-lg font-semibold my-4">User Reviews</h1>
        <div className="py-4 px-6 flex flex-col gap-4 max-h-screen overflow-y-auto scrollbar shadow-inner rounded-lg w-full">
          {datas.length > 0 &&
            datas.map((review) => {
              (textRef.current as TextRefType)[review.id] = React.createRef();
              return (
                <div
                  key={review.id}
                  className="flex flex-col gap-2 px-6 py-4 bg-accent-200 dark:bg-primary-200 rounded-lg max-w-[75vw]"
                >
                  <div className="flex gap-4 items-center">
                    <div>
                      <Avatar
                        src={
                          review.author_details.avatar_path
                            ? `https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`
                            : "/user-profile.jpg"
                        }
                        size="3rem"
                        className="overflow-hidden w-4 h-4"
                        rounded
                      />
                    </div>
                    <div className="text-xs">
                      <div className="text-xs flex flex-wrap gap-2 items-center">
                        <h1 className="font-semibold text-base">
                          {review.author}
                        </h1>
                        <Rating
                          rating={review.author_details.rating}
                          max={10}
                          badge
                        />
                      </div>
                      <p className="text-sm text-opacity">
                        Written by
                        <span className="font-semibold text-primary-100 dark:text-accent-100">
                          {" "}
                          {review.author_details.username}{" "}
                        </span>
                        on {review.created_at.split("T")[0]}
                      </p>
                    </div>
                  </div>
                  <p
                    ref={review.id ? textRef.current[review.id] : null}
                    className={`${
                      open[review.id] ? "" : "line-clamp-4"
                    } text-opacity max-w-full break-words`}
                  >
                    {review.content}
                  </p>
                  {hasMore[review.id] && (
                    <p
                      className="text-sm self-end cursor-pointer hover:underline"
                      onClick={(el) => {
                        el.preventDefault();
                        setOpen({ ...open, [review.id]: !open[review.id] });
                      }}
                    >
                      {open[review.id] ? "Less" : "More..."}
                    </p>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    )
  );
};

export default Reviews;
