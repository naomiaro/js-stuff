import React from 'react';
import { mount } from 'enzyme';
import RepoList, { Button, Header } from './';

/**
 * These tests are pretty naive on purpose
 */
const data = [
  {
    id: 1,
    name: 'Test',
    html_url: 'https://github.com/motleyagency/test',
    language: 'JavaScript',
  },
  {
    id: 2,
    name: 'Test 2',
    html_url: 'https://github.com/motleyagency/test2',
    language: 'Ocaml',
  },
];

let Elem = null;

beforeEach(() => {
  Elem = mount(
    <RepoList
      data={data}
      username="petetnt"
      fetchMore={jest.fn()}
      isLastPage={false}
    />,
  );
});

it('renders a title', () => {
  const title = Elem.find(Header);

  expect(title.text()).toEqual('petetnt – repos');
});

it('renders a repo names', () => {
  const names = Elem.find('h2');
  expect(names.length).toEqual(2);
  expect(names.at(0).text()).toEqual('Test');
  expect(names.at(1).text()).toEqual('Test 2');
});

it('renders repo names as a link', () => {
  const nameLinks = Elem.find('a');
  expect(nameLinks.length).toEqual(2);
  expect(nameLinks.at(0).text()).toEqual('Test');
  expect(nameLinks.at(0).prop('href')).toEqual(
    'https://github.com/motleyagency/test',
  );
  expect(nameLinks.at(1).text()).toEqual('Test 2');
  expect(nameLinks.at(1).prop('href')).toEqual(
    'https://github.com/motleyagency/test2',
  );
});

describe('When isLastPage false', () => {
  beforeEach(() => {
    Elem = mount(
      <RepoList
        data={data}
        username="petetnt"
        fetchMore={jest.fn()}
        isLastPage={false}
      />,
    );
  });

  it('renders the load more button', () => {
    const button = Elem.find(Button);

    expect(button.length).toEqual(1);
  });
});

describe('When isLastPage true', () => {
  let Elem = null;

  beforeEach(() => {
    Elem = mount(
      <RepoList
        data={data}
        username="petetnt"
        fetchMore={jest.fn()}
        isLastPage={true}
      />,
    );
  });

  it('does not render the load more button', () => {
    const button = Elem.find(Button);

    expect(button.length).toEqual(0);
  });
});
