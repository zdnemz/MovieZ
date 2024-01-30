import React from "react";
import { MovieSectionType } from "../../../interface";
import { ReviewType } from "../../../interface/reviews";
import { v4 as uuid } from "uuid";
import Alert from "../../elements/Alert";

type InputReviewProps = {
  hook: [
    MovieSectionType,
    React.Dispatch<React.SetStateAction<MovieSectionType>>
  ];
};

const InputReview: React.FC<InputReviewProps> = ({ hook }) => {
  const [datas, setDatas] = hook;
  const [input, setInput] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const review = (text: string) => {
    const result: ReviewType = {
      author: "Guest",
      author_details: {
        avatar_path: null,
        name: "Guest",
        rating: 0,
        username: "Guest",
      },
      content: text,
      created_at: new Date().toISOString(),
      id: uuid().toString(),
      updated_at: new Date().toISOString(),
      url: "",
    };

    return result;
  };

  return (
    <div className="mt-4 p-4 ml-6 mr-9 flex flex-col gap-2 bg-accent-200 dark:bg-primary-200 rounded-lg">
      <p className="text-sm font-semibold">Add Review</p>
      <div className="relative h-fit">
        <textarea
          placeholder="Your Review"
          rows={1}
          className="bg-transparent rounded-md m-0 w-full h-16 resize-none border border-primary-100/50 dark:border-accent-100/50 focus:border-primary-100 dark:focus:border-accent-100 py-[10px] pr-12 outline-none md:py-3.5 md:pr-14 pl-3 md:pl-4 scrollbar-none"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <div>
          <button
            className={`absolute bottom-1/2 right-2 translate-y-1/2 w-8 h-8 flex justify-center items-center rounded-md transition-colors duration-200 ${input === "" ? "bg-accent-300 dark:bg-primary-300" : "bg-secondary-100"}`}
            onClick={() => {
              if (input === "") {
                return;
              }
              setIsOpen(true);
              setInput("");
              setDatas({
                ...datas,
                reviews: [...datas.reviews, review(input)],
              });
            }}
            disabled={input === ""}
          >
            <i className="fa-solid fa-paper-plane text-accent-100" />
          </button>
        </div>
      </div>
      {isOpen && <Alert children={"Review Added"} callback={() => setIsOpen(false)} />}
    </div>
  );
};

export default InputReview;
