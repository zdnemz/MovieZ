import * as React from "react";

interface GreetingsProps {
  username?: string;
  classname?: string;
}

const time = (date: Date) => {
  const hours = date.getHours();
  switch (true) {
    case hours >= 6 && hours < 15:
      return "Morning";
    case hours >= 15 && hours < 19:
      return "Afternoon";
    case hours >= 19 && hours < 22:
      return "Evening";
    case (hours >= 22 && hours <= 23) || (hours >= 0 && hours < 6):
      return "Night";
  }
};

const Greetings: React.FC<GreetingsProps> = (props) => {
  const { username, classname } = props;

  const [greet, setGreet] = React.useState("");

  React.useEffect(() => {
    const date = new Date();
    setGreet(time(date) ?? "");
  }, []);

  return (
    <div className={`${classname}`}>
      <h1 className="text-lg font-semibold">
        Good {greet} {username} !
      </h1>
      <p className="text-sm text-opacity">What Are You Gonna Watch Today?</p>
    </div>
  );
};

export default Greetings;
