import * as React from "react";

interface RatingProps {
  rating: number;
  max: number;
  value?: boolean;
  nostar?: boolean;
  badge?: boolean;
}

const Rating: React.FC<RatingProps> = (props) => {
  const { rating, max, value, nostar, badge } = props;

  const [rateValue, setRateValue] = React.useState(Array(5).fill(false));
  const [newRating, setNewRating] = React.useState(0);

  const setRating = (values: number) => {
    values = Math.min(values, rateValue.length);
    const currentRate = Array(rateValue.length).fill(false);
    for (let i = 0; i < values; i++) {
      currentRate[i] = true;
    }
    setRateValue(currentRate);
  };

  React.useEffect(() => {
    const average = (rating / max) * 5;

    setNewRating(+average.toFixed(2));
    setRating(Math.round(average));
  }, []);

  if (badge) {
    const rate = ((rating / max) * 5).toFixed(2);
    return (
      <div className="flex gap-1 justify-center items-center rounded-md bg-secondary-100 px-1 py-px text-accent-100">
        <i className="fa-solid fa-star text-xs" />
        <span>{rate}</span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-col w-fit h-fit">
      {!nostar && (
        <div>
          {rateValue.map((value, index) => (
            <i
              key={index}
              className={`${
                value ? "fa-solid" : "fa-regular"
              } fa-star text-primary-100 dark:text-accent-100`}
            />
          ))}
        </div>
      )}
      {value && <h1 className="text-opacity">{newRating} of 5</h1>}
    </div>
  );
};

export default Rating;
