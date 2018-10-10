//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import type { Image } from 'store/Images/types';
import Header from 'components/Header';
import Clip from 'components/Clip';
import wrapFullHistory from './container';
import styles from './styles.css';

type Props = {
  images: Image[],
};

class FullHistory extends Component<Props> {
  render(): Node {
    const { images } = this.props;

    return (
      <div className={styles.container}>
        <Header />

        <div className={styles.content}>
          <Clip images={images} />
        </div>
      </div>
    );
  }
}

export default wrapFullHistory(FullHistory);
