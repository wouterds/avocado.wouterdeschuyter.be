//@flow
import React from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getAveragedOutImagesBetweenFactory } from 'store/Images/selectors';
import { subDays } from 'date-fns';

const wrapLastWeek = (WrappedComponent: any) => {
  const LastWeek = (props): Node => <WrappedComponent {...props} />;

  const mapStateToProps = state => {
    const getImages = getAveragedOutImagesBetweenFactory(
      subDays(new Date(), 8),
      subDays(new Date(), 7),
    );

    return createStructuredSelector({
      images: getImages,
    })(state);
  };

  return connect(mapStateToProps)(LastWeek);
};

export default wrapLastWeek;
