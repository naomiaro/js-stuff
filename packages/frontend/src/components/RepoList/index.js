import React from 'react';
import styled from 'styled-components';
import { number, string, shape, arrayOf, func, bool } from 'prop-types';

const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#4372A1',
  PHP: '#515E91',
  Ruby: '#671D1A',
  shell: '#89e051',
};

const List = styled.ul`
  list-style: none;
`;

const Language = styled.div`
  ::before {
    content: '';
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 7.5px;
    background-color: ${props => props.color || '#949494'};
    margin-right: 0.3em;
  }
`;

export const Button = styled.button``;

const RepoList = props => {
  return (
    <section>
      <h1>{props.username} – repos</h1>
      <List>
        {props.data.map(repo => (
          <li key={repo.id}>
            <a href={repo.html_url}>
              <h2>{repo.name}</h2>
            </a>
            <div>{repo.description}</div>
            <Language color={languageColors[repo.language]}>
              {repo.language || 'Unknown'}
            </Language>
          </li>
        ))}
      </List>
      {!props.isLastPage && (
        <Button onClick={props.fetchMore}>Load More</Button>
      )}
    </section>
  );
};

RepoList.propTypes = {
  username: string.isRequired,
  data: arrayOf(
    shape({
      id: number,
      name: string,
      description: string,
      html_url: string,
      language: string,
    }),
  ).isRequired,
  fetchMore: func.isRequired,
  isLastPage: bool.isRequired,
};

export default RepoList;
