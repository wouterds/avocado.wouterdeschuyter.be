//@flow
import React from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getAveragedOutImagesBetweenFactory } from 'store/Images/selectors';
import { subDays } from 'date-fns';

const wrapLastDay = (WrappedComponent: any) => {
  const LastDay = (props): Node => <WrappedComponent {...props} />;

  const mapStateToProps = state => {
    const getImages = getAveragedOutImagesBetweenFactory(
      subDays(new Date(), 2),
      subDays(new Date(), 1),
    );

    return createStructuredSelector({
      images: getImages,
    })(state);
  };

  return connect(mapStateToProps)(LastDay);
};

export default wrapLastDay;
