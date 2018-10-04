//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import { Context } from '../../context/Images';
import type { Image } from 'store/Images/types';

type Props = {
  images: Image[],
};

type State = {
  image: ?Image,
};

class Movie extends Component<Props, State> {
  state: State = {
    image: null,
  };

  componentDidMount() {
    this.next();
  }

  next = () => {
    const { images } = this.props;
    const { image } = this.state;

    const index = images.indexOf(image) + 1;

    if (images.length === 0) {
      setTimeout(this.next, 250);
      return;
    }

    if (index === images.length) {
      return;
    }

    setTimeout(() => {
      this.setState({ image: images[index] });
    }, 25);
  };

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
