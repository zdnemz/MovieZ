import * as React from "react";

interface InputProps {
  className?: string;
  type?: "password" | "text" | "email";
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
}

const Input: React.FC<InputProps> = (props) => {
  const {
    className,
    value,
    onChange,
    required,
    autoComplete,
    disabled,
    type,
    label,
  } = props;

  const [input, setInput] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  switch (type) {
    case "password":
      return (
        <label className={`relative my-1 ${className}`}>
          <input
            className={`px-4 py-1 bg-transparent border text-primary-100 dark:text-accent-100 dark:border-accent-100/70 border-primary-100/70 outline-none dark:focus:border-accent-100 focus:border-primary-100 ${
              input && "valid-input"
            }`}
            type={showPassword ? "text" : "password"}
            name={label}
            required={required}
            onChange={handleChange}
            value={value}
            disabled={disabled}
            autoComplete={autoComplete || "off"}
            spellCheck={false}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 flex justify-center items-center w-5">
            <i
              className={`fa-solid ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              } text-primary-100/50 dark:text-accent-100/50 cursor-pointer`}
              onClick={() => setShowPassword(!showPassword)}
            />
          </span>
          <span className="ml-2 absolute inset-0 flex items-center px-2 dark:text-accent-100/50 text-primary-100/50 input-animation w-fit transition duration-200 cursor-text">
            {label}
          </span>
        </label>
      );
    case "email":
    case "text":
      return (
        <label
          className={`relative my-1 ${className}`}
        >
          <input
            className={`px-4 py-1 bg-transparent border text-primary-100 dark:text-accent-100 dark:border-accent-100/70 border-primary-100/70 outline-none dark:focus:border-accent-100 focus:border-primary-100 ${
              input && "valid-input"
            }`}
            type={type}
            name={label}
            required={required}
            onChange={handleChange}
            value={value}
            disabled={disabled}
            autoComplete={autoComplete || "off"}
            spellCheck={false}
          />
          <span className="ml-2 absolute inset-0 flex items-center px-2 dark:text-accent-100/50 text-primary-100/50 input-animation w-fit transition duration-200 cursor-text">
            {label}
          </span>
        </label>
      );
  }
};

export default Input;
