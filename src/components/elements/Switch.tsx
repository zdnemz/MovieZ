import * as React from "react";

interface SwitchProps {
  state?: boolean;
  setState?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Switch: React.FC<SwitchProps> = (props) => {
  const { state, setState } = props;

  return (
    <div
      className="flex items-center w-8 bg-accent-400 rounded-full cursor-pointer"
      onClick={() => setState && setState(!state)}
    >
      <div
        className={`h-4 w-4 bg-accent-100 rounded-full transition-transform duration-200 ${
          !state ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </div>
  );
};

export default Switch;
