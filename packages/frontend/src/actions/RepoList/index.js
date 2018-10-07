import parseLinkHeaders from 'parse-link-header';
import 'isomorphic-fetch';

export const FETCH_START = '@fetch/start';
export const FETCH_ERROR = '@fetch/error';
export const FETCH_SUCCESS = '@fetch/success';

const fetchStart = () => ({
  type: FETCH_START,
});

const fetchError = error => ({
  type: FETCH_ERROR,
  error,
});

const fetchSuccess = ({ nextPage, data }) => ({
  type: FETCH_SUCCESS,
  nextPage,
  data,
});

/**
 * Fetches repositories asyncronously for the given username
 * @param { string } username - username to fetch
 */
export const fetchUserRepos = username => async (dispatch, getState) => {
  dispatch(fetchStart());

  try {
    const { RepoList } = getState();
    const url =
      RepoList.nextPage ||
      `https://api.github.com/users/${username}/repos?type=owner&per_page=5`;

    const response = await fetch(url);
    const links = parseLinkHeaders(response.headers.get('Link'));
    const data = await response.json();

    dispatch(
      fetchSuccess({
        data,
        nextPage: links.next ? links.next.url : null,
      }),
    );
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};
