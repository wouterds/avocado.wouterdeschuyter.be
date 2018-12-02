//@flow
import React from 'react';
import type { Node } from 'react';
import type { Image } from 'store/Images/types';
import BasePage from 'components/Pages/Base';
import withContainer from './container';

type Props = {
  images: Image[],
};

const LastShot = (props: Props): Node => {
  const { images } = props;

  if (images.length === 0) {
    return (
      <BasePage>
        <p>Not enough data yet.</p>
      </BasePage>
    );
  }

  const image = images[0];

  return (
    <BasePage>
      <img src={image.url} alt={image.filename} />
    </BasePage>
  );
};

export default withContainer(LastShot);
