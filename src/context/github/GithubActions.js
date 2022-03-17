import axios from 'axios';
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// After refactor:
// clean-up of header declaration for each http call
const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});

// After refactor:
// setLoading() and dispatch actions will both be called from component

// search multiple users with form query
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  // No longer need to await data as response.json()
  // Axios always returns JSONified Object w/ data as key
  const response = await github.get(`/search/users?${params}`);

  return response.data.items;
};

// After refactor:
// Combine getUser() && getUserRepos() into one Axios call
// Combining 2 requests -> /user/login && /user/login/repos
// Can pass in an arr[requests]

// Get user and repos
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);

  return { user: user.data, repos: repos.data };
};

/*
  Get initial users
  We want to search for specific users, not the first GitHub users ever (though their profiles are quite something)
  Legacy way of writing f()s before refactor...
  For learning purposes only!
*/

const fetchUsers = async () => {
  // setLoading();
  const response = await fetch(`${GITHUB_URL}/users`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });
  const data = await response.json();

  // dispatch action to reducer
  // payload is data gotten from API call

  // dispatch({
  //   type: 'GET_USERS',
  //   payload: data,
  // });
};
