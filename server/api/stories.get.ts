import { getUserDetails } from "../services/getUserDetails";

export default defineEventHandler(async () => {
  try {
    const response = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );
    if (!response.ok) {
      throw new Error("Failed with netwrok error");
    }
    const allStoryIds = await response.json();
    const selectedIds = new Set();
    const totalIdsToBeSelected = 10;
    while (selectedIds.size < totalIdsToBeSelected) {
      const randomIndex = Math.floor(Math.random() * allStoryIds.length);
      const storyId = allStoryIds[randomIndex];

      if (storyId) {
        selectedIds.add(storyId);
      }
    }

    const getTenRandomStoryids = Array.from(selectedIds);
    const promises = getTenRandomStoryids.map((id: any) =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
        (response) => response.json()
      )
    );
    const storyList = await Promise.all(promises);
    const modifiedStories = await Promise.all(
      storyList.map(async (story) => {
        const userDetails = await getUserDetails(story.by);
        return {
          ...story,
          karma: userDetails.karma,
          image: "/images/image_1.jpg",
        };
      })
    );

    return modifiedStories;
  } catch (error) {
    console.log(error);
  }
});
