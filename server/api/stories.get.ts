import { getUserDetails, UserResponse } from "../services/getUserDetails";
export interface StoryResponse {
  id: number;
  by: string;
  title: string;
  url?: string;
  score: number;
  time: number;
  [key: string]: any;
}

export default defineEventHandler(async () => {
  try {
    const response = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );
    if (!response.ok) {
      throw new Error("Failed with netwrok error");
    }
    const allStoryIds: number[] = await response.json();
    const selectedIds = new Set<number>();
    const totalIdsToBeSelected = 10;
    while (selectedIds.size < totalIdsToBeSelected) {
      const randomIndex = Math.floor(Math.random() * allStoryIds.length);
      const storyId = allStoryIds[randomIndex];
      if (storyId) {
        selectedIds.add(storyId);
      }
    }

    const getTenRandomStoryids = Array.from(selectedIds);
    const promises = getTenRandomStoryids.map(async (id: any) => {
      try {
        const res = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        if (!res.ok) throw new Error(`Failed to fetch story ${id}`);
        return res.json() as Promise<StoryResponse>;
      } catch (error) {
        console.error(`Error fetching story ${id}:`, error);
        return null;
      }
    });
    const storyList = (await Promise.all(promises)) as StoryResponse[];

    const modifiedStories = await Promise.all(
      storyList.map(async (story) => {
        try {
          const userDetails = (await getUserDetails(story.by)) as UserResponse;
          return {
            ...story,
            time: new Date(story.time * 1000).toLocaleString(),
            karma: userDetails.karma,
            image: "/images/image_1.jpg",
          };
        } catch (error) {
          console.error(`Failed to get user details for ${story.by}`, error);
          return {
            ...story,
            time: new Date(story.time * 1000).toLocaleString(),
            karma: 0,
            image: "/images/image_1.jpg",
          };
        }
      })
    );
    const sortedStories = modifiedStories.sort((a, b) => b.score - a.score);
    return sortedStories;
  } catch (error) {
    console.log("Failed to fetch top stories:", error);
    return [];
  }
});
