import React, { Component } from 'react';
import { number, string, func, shape, bool, arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserRepos } from '../../actions';
import RepoList from '../../components/RepoList';
import LoadingSpinner from '../../components/LoadingSpinner';

class RepoListContainer extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUserRepos(this.props.username));
  }

  fetchMore = () => {
    this.props.dispatch(fetchUserRepos(this.props.username));
  };

  render() {
    const { loading, error, data, username, ...rest } = this.props;

    if (error) {
      return <div>{error}</div>;
    }

    return [
      loading && <LoadingSpinner key="loading" />,
      data.length > 0 && (
        <RepoList
          data={data}
          username={username}
          fetchMore={this.fetchMore}
          {...rest}
          key="RepoList"
        />
      ),
    ];
  }
}

RepoListContainer.propTypes = {
  dispatch: func.isRequired,
  username: string.isRequired,
  loading: bool.isRequired,
  error: string,
  data: arrayOf(
    shape({
      id: number,
      name: string,
      html_url: string,
      language: string,
    }),
  ),
};

RepoListContainer.defaultProps = {
  error: null,
  data: null,
};

const mapStateToProps = state => {
  return {
    loading: state.RepoList.loading,
    error: state.RepoList.error,
    data: state.RepoList.data,
    nextPage: state.RepoList.nextPage,
    isLastPage: state.RepoList.isLastPage,
  };
};

export default connect(mapStateToProps)(RepoListContainer);
