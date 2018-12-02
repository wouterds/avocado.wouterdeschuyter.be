//@flow
import React from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getAveragedOutImages } from 'store/Images/selectors';

const wrapLastShot = (WrappedComponent: any) => {
  const LastShot = (props): Node => <WrappedComponent {...props} />;

  const mapStateToProps = state =>
    createStructuredSelector({
      images: getAveragedOutImages,
    })(state);

  return connect(mapStateToProps)(LastShot);
};

export default wrapLastShot;
