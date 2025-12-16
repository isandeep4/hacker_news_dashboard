export const getUserDetails = async (userId: string) => {
  try {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/user/${userId}.json`
    );

    if (!response.ok) {
      throw new Error("Network error");
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.log("Error while fetching user details:", error);
    return null;
  }
};
