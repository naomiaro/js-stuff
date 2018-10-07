import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import reset from 'styled-reset';
import { number, string, shape, arrayOf, func, bool } from 'prop-types';

injectGlobal`
  ${reset}
`;

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

export const Header = styled.h1`
  font-size: 25px;
  font-weight: bold;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ListItem = styled.li`
  margin-top: 20px;
`;

export const Link = styled.a``;

export const Name = styled.h2`
  font-size: 20px;
`;

export const Description = styled.div`
  margin: 10px 0;
`;

export const Language = styled.div`
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

export const Button = styled.button`
  margin: 30px 0;
  font-size: 20px;
  padding: 5px;
  cursor: pointer;
`;

export const Listing = styled.section`
  margin-left: 40px;
`;

const RepoList = props => {
  return (
    <Listing>
      <Header>{props.username} – repos</Header>
      <List>
        {props.data.map(repo => (
          <ListItem key={repo.id}>
            <Link href={repo.html_url}>
              <Name>{repo.name}</Name>
            </Link>
            <Description>{repo.description}</Description>
            <Language color={languageColors[repo.language]}>
              {repo.language || 'Unknown'}
            </Language>
          </ListItem>
        ))}
      </List>
      {!props.isLastPage && (
        <Button onClick={props.fetchMore}>Load More</Button>
      )}
    </Listing>
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
