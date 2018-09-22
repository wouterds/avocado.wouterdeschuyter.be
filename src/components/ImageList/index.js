//@flow
import React from 'react';
import type { Node } from 'react';
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
          <img src={`https://avocado.wouterdeschuyter.be/images/${image.filename}`} />
        </li>
      ))}
    </ul>
  );
};

export default ImageList;
