const fetchOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
  },
};

const fetchData = async (
  id: number,
  success: CallableFunction,
  failed: CallableFunction,
  finish: CallableFunction
) => {
  try {
    const [
      detailsResponse,
      recommendationsResponse,
      reviewsResponse,
      videosResponse,
      creditsResponse,
    ] = await Promise.all([
      fetch(
        `${import.meta.env.VITE_API_URL}movie/${id}?language=en-US`,
        fetchOptions
      ).then((response) => response.json()),
      fetch(
        `${
          import.meta.env.VITE_API_URL
        }movie/${id}/recommendations?language=en-US`,
        fetchOptions
      ).then((response) => response.json()),
      fetch(
        `${import.meta.env.VITE_API_URL}movie/${id}/reviews?language=en-US`,
        fetchOptions
      ).then((response) => response.json()),
      fetch(
        `${import.meta.env.VITE_API_URL}/movie/${id}/videos?language=en-US`,
        fetchOptions
      ).then((response) => response.json()),
      fetch(
        `${import.meta.env.VITE_API_URL}/movie/${id}/credits?language=en-US`,
        fetchOptions
      ).then((response) => response.json()),
    ]);

    success({
      datas: detailsResponse,
      recommendations: recommendationsResponse.results,
      reviews: reviewsResponse.results,
      videos: videosResponse.results,
      credits: creditsResponse,
    });
  } catch (err) {
    failed(err);
  } finally {
    finish();
  }
};

export default fetchData;
