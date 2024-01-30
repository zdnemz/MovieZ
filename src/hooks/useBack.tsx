import { useNavigate } from "react-router-dom";

const useBack = () => {
  const navigate = useNavigate();

  return () => navigate(-1);
}

export default useBack