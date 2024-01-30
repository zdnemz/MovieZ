const resultValidation = (query: URLSearchParams, next: CallableFunction) => {
  if (!query.size) {
    next("/");
  }

  if (!query.get("q")) {
    next("/");
  }

  if (!query.get("page")) {
    next(`/search?q=${query.get("q")}&page=1`);
  }
  return;
};

export default resultValidation;