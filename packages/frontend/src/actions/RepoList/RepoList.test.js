import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { FETCH_START, fetchUserRepos } from './';
import mockData from './__mocks__/data';

const mockStore = configureMockStore([thunk]);
const username = 'naomiaro';

fetchMock.get(
  `https://api.github.com/users/${username}/repos?type=owner&per_page=5`,
  {
    body: mockData,
    status: 200,
    headers: {
      Link:
        '<https://api.github.com/user/35253/repos?type=owner&per_page=5&page=2>; rel="next", <https://api.github.com/user/35253/repos?type=owner&per_page=5&page=6>; rel="last"',
    },
  },
);

const store = mockStore({
  RepoList: {
    nextPage: null,
  },
});

it('fetches repos for the user and sets them as action data', async () => {
  await store.dispatch(fetchUserRepos(username));
  expect(store.getActions().pop().data).toEqual(mockData);
});

test('fetching repos first sets state to loading', async () => {
  await store.dispatch(fetchUserRepos(username));
  expect(store.getActions()[0].type).toEqual(FETCH_START);
});

test('successful fetch sets nextPage to Link header value', async () => {
  await store.dispatch(fetchUserRepos(username));
  expect(store.getActions().pop().nextPage).toEqual(
    'https://api.github.com/user/35253/repos?type=owner&per_page=5&page=2',
  );
});
