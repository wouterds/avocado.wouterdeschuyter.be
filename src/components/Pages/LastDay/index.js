//@flow
import React from 'react';
import type { Node } from 'react';
import type { Image } from 'store/Images/types';
import BasePage from 'components/Pages/Base';
import withContainer from './container';

type Props = {
  image: ?Image,
};

const LastDay = (props: Props): Node => {
  const { image } = props;

  if (!image) {
    return (
      <BasePage>
        <p>Not enough data yet.</p>
      </BasePage>
    );
  }

  return (
    <BasePage>
      <img src={image.url} alt={image.filename} />
    </BasePage>
  );
};

export default withContainer(LastDay);
