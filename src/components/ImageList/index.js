//@flow
import React from 'react';
import type { Node } from 'react';
import { IMAGE_LOCATION } from 'config';
import type { Image, Images } from 'types/Image';

const ImageList = (props: { images: Images }): Node => {
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

export default ImageList;
