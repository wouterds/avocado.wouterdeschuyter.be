//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import type { Image } from 'store/Images/types';
import Header from 'components/Header';
import { Context } from 'context/Images';
import styles from './styles.css';

type Props = {
  images: Image[],
};

class LastShot extends Component<Props> {
  render(): Node {
    const { images } = this.props;

    if (images.length === 0) {
      return null;
    }

    const image = images[images.length - 1];

    return (
      <div className={styles.container}>
        <Header />

        <div className={styles.content}>
          <img src={image.url} />;
        </div>
      </div>
    );
  }
}

const EnhancedLastShot = (): Node => {
  return (
    <Context.Consumer>
      {images => <LastShot images={images || []} />}
    </Context.Consumer>
  );
};

export default EnhancedLastShot;
