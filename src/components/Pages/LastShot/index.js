//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import type { Image } from 'store/Images/types';
import Header from 'components/Header';
import wrapLastShot from './container';
import styles from './styles.css';

type Props = {
  image: Image,
};

class LastShot extends Component<Props> {
  render(): Node {
    const { image } = this.props;

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

export default wrapLastShot(LastShot);
