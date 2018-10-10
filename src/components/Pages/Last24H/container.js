//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import differenceInHours from 'date-fns/difference_in_hours';
import { getImages } from 'store/Images/selectors';
import type { Image } from 'store/Images/types';

type Props = {
  images: Image[],
};

const wrapLast24H = (WrappedComponent: any) => {
  class Last24H extends Component<Props> {
    render() {
      let { images } = this.props;

      images = images.filter(
        image => differenceInHours(new Date(), image.time) <= 24,
      );

      return <WrappedComponent images={images} />;
    }
  }

  const mapStateToProps = state =>
    createStructuredSelector({
      images: getImages,
    })(state);

  return connect(mapStateToProps)(Last24H);
};

export default wrapLast24H;
