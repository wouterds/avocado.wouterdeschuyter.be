//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import { fetch } from 'store/Images/actions';

type Props = {
  fetch: Function,
};

const wrapApp = (WrappedComponent: any) => {
  class App extends Component<Props> {
    componentDidMount() {
      this.fetch();
    }

    render(): Node {
      return <WrappedComponent {...this.props} />;
    }

    fetch = () => {
      const { fetch } = this.props;

      // Fetch data
      fetch();

      // Fetch again in 5 minutes
      setInterval(this.fetch, 1000 * 60 * 5);
    };
  }

  const mapDispatchToProps = {
    fetch,
  };

  return connect(
    null,
    mapDispatchToProps,
  )(App);
};

export default wrapApp;
