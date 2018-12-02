//@flow
import React from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getBiggestImageBetweenFactory } from 'store/Images/selectors';
import { subDays } from 'date-fns';

const wrapLastWeek = (WrappedComponent: any) => {
  const LastWeek = (props): Node => <WrappedComponent {...props} />;

  const mapStateToProps = state => {
    const getBiggestImageBetween = getBiggestImageBetweenFactory(
      subDays(new Date(), 8),
      subDays(new Date(), 7),
    );

    return createStructuredSelector({
      image: getBiggestImageBetween,
    })(state);
  };

  return connect(mapStateToProps)(LastWeek);
};

export default wrapLastWeek;
