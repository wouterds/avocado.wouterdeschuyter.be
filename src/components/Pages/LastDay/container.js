//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { differenceInHours, endOfToday } from 'date-fns';
import { getImages } from 'store/Images/selectors';
import type { Image } from 'store/Images/types';

type Props = {
  images: Image[],
};

const wrapLastDay = (WrappedComponent: any) => {
  class LastDay extends Component<Props> {
    render() {
      let { images } = this.props;

      images = images.filter(
        image => differenceInHours(endOfToday(), image.time) <= 24,
      );

      return <WrappedComponent images={images} />;
    }
  }

  const mapStateToProps = state =>
    createStructuredSelector({
      images: getImages,
    })(state);

  return connect(mapStateToProps)(LastDay);
};

export default wrapLastDay;
