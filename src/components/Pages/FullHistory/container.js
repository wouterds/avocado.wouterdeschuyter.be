//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getAveragedOutImages } from 'store/Images/selectors';
import type { Image } from 'store/Images/types';

type Props = {
  images: Image[],
};

const wrapFullHistory = (WrappedComponent: any) => {
  class FullHistory extends Component<Props> {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state =>
    createStructuredSelector({
      images: getAveragedOutImages,
    })(state);

  return connect(mapStateToProps)(FullHistory);
};

export default wrapFullHistory;
