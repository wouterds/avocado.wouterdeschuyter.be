//@flow
import React from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getBiggestImageBetweenFactory } from 'store/Images/selectors';
import { subDays, endOfYesterday } from 'date-fns';

const wrapLastDay = (WrappedComponent: any) => {
  const LastDay = (props): Node => <WrappedComponent {...props} />;

  const mapStateToProps = state => {
    const getBiggestImageBetween = getBiggestImageBetweenFactory(
      subDays(endOfYesterday(), 1),
      endOfYesterday(),
    );

    return createStructuredSelector({
      image: getBiggestImageBetween,
    })(state);
  };

  return connect(mapStateToProps)(LastDay);
};

export default wrapLastDay;
