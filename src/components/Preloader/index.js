//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import type { Image, Images } from 'types/Image';
import { Context } from '../../context/Images';
import styles from './styles.css';

type Props = {
  images?: Images,
  onDone: Function,
};

type State = {
  images: Images,
};

class Preloader extends Component<Props, State> {
  state: State = {
    images: [],
  };

  get percentage() {
    const { images = [] } = this.props;
    const { images: loadedImages = [] } = this.state;

    if (images.length === 0) {
      return 0;
    }

    return (loadedImages.length / images.length) * 100;
  }

  componentDidUpdate() {
    const { images = [], onDone } = this.props;
    const { images: loadedImages = [] } = this.state;

    if (images.length !== loadedImages.length) {
      return;
    }

    setTimeout(onDone, 500);
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

const EnhancedPreloader = (props: Props): Node => {
  return (
    <Context.Consumer>
      {images => <Preloader {...props} images={images || []} />}
    </Context.Consumer>
  );
};

export default EnhancedPreloader;
