export default defineEventHandler(async () => {
  try {
    const response = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );
    const json = await response.json();
    const promises = json
      .slice(0, 10)
      .map((id: any) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
          (response) => response.json()
        )
      );
    const result = await Promise.all(promises);
    return result;
  } catch (error) {
    console.log(error);
  }
});
