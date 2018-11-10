//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getImages } from 'store/Images/selectors';
import type { Image } from 'store/Images/types';

type Props = {
  images: Image[],
};

const wrapLastShot = (WrappedComponent: any) => {
  class LastShot extends Component<Props> {
    render() {
      const { images } = this.props;

      const image = images.length === 0 ? images[images.length - 1] : null;

      return <WrappedComponent image={image} />;
    }
  }

  const mapStateToProps = state =>
    createStructuredSelector({
      images: getImages,
    })(state);

  return connect(mapStateToProps)(LastShot);
};

export default wrapLastShot;
