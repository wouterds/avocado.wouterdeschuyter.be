//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import type { Image } from 'store/Images/types';
import styles from './styles.css';

type Props = {
  images?: Image[],
  onDone: Function,
};

type State = {
  images: Image[],
};

class Preloader extends Component<Props, State> {
  timeoutId: ?TimeoutID = null;
  state: State = {
    images: [],
  };

  get percentage() {
    const { images = [] } = this.props;
    const { images: loadedImages = [] } = this.state;

    if (images.length === 0) {
      return 0;
    }

    return ((loadedImages.length / images.length) * 100).toFixed();
  }

  componentDidUpdate() {
    this.start();
  }

  start = () => {
    const { images = [], onDone } = this.props;
    const { images: loadedImages = [] } = this.state;

    // No images provided, wait
    if (images.length === 0) {
      this.timeoutId = setTimeout(this.start, 250);
      return;
    }

    if (images.length !== loadedImages.length) {
      return;
    }

    this.timeoutId = setTimeout(onDone, 250);
  };

  componentWillUnmount() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
    }
  }

  render(): Node {
    const { images = [] } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.loaderContainer}>
          <div
            className={styles.loader}
            style={{ height: `${this.percentage}%` }}
          />
        </div>

        {images.map((image: Image, index: number) => {
          return (
            <img
              key={`image-${index}`}
              src={image.url}
              className={styles.loadingImage}
              onLoad={() => this.loaded(image)}
            />
          );
        })}
      </div>
    );
  }

  loaded = (image: Image) => {
    const { images } = this.state;

    this.setState({
      images: [...images, image],
    });
  };
}

export default Preloader;
