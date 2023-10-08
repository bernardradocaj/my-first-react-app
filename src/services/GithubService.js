import axios from "axios";

export const gitHubBaseURL = "https://api.github.com/users/";

export const getUserByName = async (name) => {
  const response = await axios.get(`${gitHubBaseURL}${name}`);
  return response.data;
};

export const getUserRepos = async (name) => {
  const response = await axios.get(`${gitHubBaseURL}${name}/repos`);
  return response.data;
};
