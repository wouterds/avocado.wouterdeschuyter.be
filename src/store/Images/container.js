//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetch } from './actions';
import { getIsLoading, getHasError, getHasData } from './selectors';

type Props = {
  fetch: Function,
  isLoading: boolean,
  hasError: boolean,
  hasData: boolean,
};

const wrapImages = (WrappedComponent: any) => {
  class Images extends Component<Props> {
    componentDidMount() {
      this.fetch();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }

    fetch = () => {
      const { fetch, hasData } = this.props;

      if (hasData) {
        return;
      }

      fetch();
    };
  }

  const mapStateToProps = state =>
    createStructuredSelector({
      isLoading: getIsLoading,
      hasError: getHasError,
      hasData: getHasData,
    })(state);

  const mapDispatchToProps = {
    fetch,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Images);
};

export default wrapImages;
