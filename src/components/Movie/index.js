//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import { IMAGE_LOCATION } from 'config';
import { Context } from '../../context/Images';
import type { Image, Images } from 'types/Image';

type Props = {
  images: Images,
};

type State = {
  image: ?Image,
};

class Movie extends Component<Props, State> {
  state: State = {
    image: null,
  };

  componentDidUpdate() {
    const { images } = this.props;
    const { image } = this.state;

    if (images.length === 0 || image !== null) {
      return;
    }

    this.next();
  }

  next() {
    const { images } = this.props;
    const { image } = this.state;

    const index = images.indexOf(image) + 1;

    if (index === images.length) {
      return;
    }

    setTimeout(() => {
      this.setState({ image: images[index] });
    }, 25);
  }

  render(): Node {
    const { image } = this.state;

    if (!image || image === null) {
      return null;
    }

    return <img src={image.url} onLoad={() => this.next()} />;
  }
}

const EnhancedMovie = (): Node => {
  return (
    <Context.Consumer>
      {images => <Movie images={images || []} />}
    </Context.Consumer>
  );
};

export default EnhancedMovie;
