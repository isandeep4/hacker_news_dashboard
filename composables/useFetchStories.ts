export const useFetchStories = () => {
  const { data, pending, error, refresh } = useAsyncData("stories", () =>
    $fetch("/api/stories")
  );
  return {
    stories: data,
    pending,
    error,
    refresh,
  };
};
