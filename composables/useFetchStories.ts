import type { StoryResponse } from "~/server/api/stories.get";

export const useFetchStories = () => {
  const { data, pending, error, refresh } = useAsyncData<StoryResponse[]>(
    "stories",
    () => $fetch<StoryResponse[]>("/api/stories")
  );
  return {
    stories: data as Ref<StoryResponse[] | undefined>,
    pending,
    error,
    refresh,
  };
};
