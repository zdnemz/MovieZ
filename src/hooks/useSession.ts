import { useEffect } from "react";
import { MovieApiResponseType } from "../interface/movie";

const useSessionData = (
  callback: CallableFunction,
  duration: number = 7000
) => {
  useEffect(() => {
    const data: [MovieApiResponseType] = JSON.parse(
      sessionStorage.getItem("home") || "{}"
    );
    if (!data) {
      return;
    }

    const combinedDatas = Object.values(data)
      .map((e) => e.results.map((e) => e.title))
      .flat();

    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * combinedDatas.length);
      callback(combinedDatas[random]);
    }, duration);

    return () => {
      clearInterval(interval);
    };
  }, [callback, duration]);
};

export default useSessionData;
