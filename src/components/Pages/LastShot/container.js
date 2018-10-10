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

      if (images.length === 0) {
        return null;
      }

      const image = images[images.length - 1];

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
