import parseLinkHeaders from 'parse-link-header';
import Octokit from '@octokit/rest';

export const FETCH_START = '@fetch/start';
export const FETCH_ERROR = '@fetch/error';
export const FETCH_SUCCESS = '@fetch/success';

const octokit = new Octokit();

const fetchStart = () => ({
  type: FETCH_START,
});

const fetchError = error => ({
  type: FETCH_ERROR,
  error,
});

const fetchSuccess = ({ nextPage, data, octoResponse }) => ({
  type: FETCH_SUCCESS,
  nextPage,
  data,
  octoResponse,
});

/**
 * Fetches repositories asyncronously for the given username
 * @param { string } username - username to fetch
 */
export const fetchUserRepos = username => async (dispatch, getState) => {
  dispatch(fetchStart());

  try {
    const { RepoList } = getState();
    let octoResponse;

    if (RepoList.octoResponse) {
      octoResponse = await octokit.getNextPage(RepoList.octoResponse);
    } else {
      octoResponse = await octokit.repos.getForUser({
        username,
        type: 'owner',
        per_page: 5,
      });
    }

    dispatch(
      fetchSuccess({
        octoResponse,
        nextPage: octokit.hasNextPage(octoResponse),
        data: RepoList.data.concat(octoResponse.data),
      }),
    );
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};
