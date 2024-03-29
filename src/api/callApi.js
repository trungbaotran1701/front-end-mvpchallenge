import { API_ROUTE, HEADERS, API_GIT } from "../constants/api_route";

const getListUser = async (data) => {
  try {
    const response = await fetch(`${API_ROUTE}/contributors`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: HEADERS,
    });
    const result = response.json();
    return result;
  } catch (e) {
    alert(e);
  }
};

//call API github
const getUserCommit = async ({ ownerName, repoName, author }) => {
  try {
    const response = await fetch(
      `${API_GIT}/repos/${ownerName}/${repoName}/commits?author=${author}&per_page=1000`,
      {
        method: "GET",
        headers: HEADERS,
      }
    );
    const result = await response.json();
    return result;
  } catch (e) {
    alert(e);
  }
};

export { getListUser, getUserCommit };
