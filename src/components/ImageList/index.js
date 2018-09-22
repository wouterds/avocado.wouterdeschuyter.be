//@flow
import React from 'react';
import type { Node } from 'react';
import { IMAGE_LOCATION } from 'config';
import { Context } from '../../context/Images';
import type { Image, Images } from 'types/Image';

type Props = {
  images: Images,
};

const ImageList = (props: Props): Node => {
  const { images } = props;

  if (images.length === 0) {
    return null;
  }

  return (
    <ul>
      {images.map((image: Image, index: number) => (
        <li key={`image-${index}`}>
          <img src={`${IMAGE_LOCATION}/${image.filename}`} />
        </li>
      ))}
    </ul>
  );
};

const EnhancedImageList = (): Node => {
  return (
    <Context.Consumer>
      {images => <ImageList images={images || []} />}
    </Context.Consumer>
  );
};

export default EnhancedImageList;
