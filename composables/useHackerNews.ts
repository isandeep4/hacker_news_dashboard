export const useHackerNews = () => {
  const { data, pending, error, refresh } = useAsyncData("hackerNews", () =>
    $fetch("/api/news")
  );
  return {
    hackerNews: data,
    pending,
    error,
    refresh,
  };
};
