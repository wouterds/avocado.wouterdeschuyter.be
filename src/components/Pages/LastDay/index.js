//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import cx from 'classnames';
import type { Image } from 'store/Images/types';
import Header from 'components/Header';
import PreLoader from 'components/PreLoader';
import Clip from 'components/Clip';
import wrapLastDay from './container';
import styles from './styles.css';

type Props = {
  images: Image[],
};

type State = {
  isLoaded: boolean,
};

class LastDay extends Component<Props, State> {
  state: State = {
    isLoaded: false,
  };

  render(): Node {
    const { isLoaded } = this.state;
    const { images } = this.props;

    return (
      <div className={cx(styles.container, { [styles.loading]: !isLoaded })}>
        <Header />

        <div className={styles.content}>
          {!isLoaded && (
            <PreLoader
              images={images}
              onDone={() => this.setState({ isLoaded: true })}
            />
          )}

          {isLoaded && <Clip images={images} />}
        </div>
      </div>
    );
  }
}

export default wrapLastDay(LastDay);
