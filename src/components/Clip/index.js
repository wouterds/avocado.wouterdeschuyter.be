//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import type { Image } from 'store/Images/types';

type Props = {
  images: Image[],
  fps: 30 | 45 | 60,
};

type State = {
  image: ?Image,
};

class Clip extends Component<Props, State> {
  timeoutId: ?TimeoutID;
  state: State = {
    image: null,
  };

  componentDidMount() {
    this.next();
  }

  componentWillUnmount() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
    }
  }

  next = () => {
    const { images, fps } = this.props;
    const { image } = this.state;

    const index = images.indexOf(image) + 1;

    if (images.length === 0) {
      this.timeoutId = setTimeout(this.next, 250);
      return;
    }

    if (index === images.length) {
      return;
    }

    this.timeoutId = setTimeout(() => {
      this.setState({ image: images[index] });
    }, (1 / fps) * 1000);
  };

  render(): Node {
    const { image } = this.state;

    if (!image) {
      return null;
    }

    return <img src={image.url} onLoad={() => this.next()} />;
  }
}

export default Clip;
