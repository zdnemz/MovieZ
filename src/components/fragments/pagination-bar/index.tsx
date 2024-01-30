import * as React from "react";
import Button from "../../elements/Button";
import { MovieApiResponseType } from "../../../interface/movie";

interface PaginationBarProps {
  datas?: MovieApiResponseType;
}

const PaginationBar: React.FC<PaginationBarProps> = ({ datas }) => {
  const currentPage = datas?.page ?? 1;
  const [inputPage, setInputPage] = React.useState<number | null>(currentPage);
  const queryParams = new URLSearchParams(location.search);

  return (
    <div className="flex justify-center gap-2 items-center">
      <Button
        disabled={currentPage <= 1}
        onClick={() => {
          if (currentPage > 1) {
            queryParams.set("page", (currentPage - 1).toString());
            window.location.href = `${location.pathname}?${queryParams}`;
          }
        }}
        className="text-sm"
      >
        Prev
      </Button>
      <div className="flex justify-center items-center gap-2">
        <p>page</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (inputPage) {
              if (inputPage > (datas?.total_pages || 1)) {
                setInputPage(datas?.total_pages || 1);
                return;
              }
              if (inputPage < 1) {
                setInputPage(1);
                return;
              }
              if (inputPage === currentPage) {
                return;
              }

              queryParams.set("page", inputPage.toString());
              window.location.href = `${location.pathname}?${queryParams}`;
            }
          }}
        >
          <input
            type="number"
            className="w-8 outline-none dark:bg-primary-100 bg-accent-100 text-center"
            value={inputPage || ""}
            onChange={(e) => {
              setInputPage(e.target.value ? Number(e.target.value) : null);
            }}
          />
        </form>
        <p>of</p>
        <p>{datas?.total_pages}</p>
      </div>
      <Button
        disabled={currentPage >= (datas?.total_pages || 1)}
        onClick={() => {
          if (currentPage < (datas?.total_pages || 1)) {
            queryParams.set("page", (currentPage + 1).toString());
            window.location.href = `${location.pathname}?${queryParams}`;
          }
        }}
        className="text-sm"
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationBar;

