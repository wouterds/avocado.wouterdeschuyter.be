//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import axios from 'axios';
import type { Images } from 'types/Image';
import { API_ENDPOINT } from 'config';
import ImageList from 'components/ImageList';
import styles from './styles.css';

type Props = {};

type State = {
  images: Images,
};

class App extends Component<Props, State> {
  state: State = {
    images: [],
  };

  componentDidMount() {
    this.fetch();
  }

  render(): Node {
    const { images } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Avocado Tracker</h1>

          <p>
            Hi there 👋
            <br />
            Here I try to keep track of the growth and progress of my avocado plant, not much more to see!
          </p>

          <ImageList images={images} />
        </div>
      </div>
    );
  }

  fetch = async () => {
    const response = await axios.get(API_ENDPOINT);

    const images: Images = response.data.map(data => {
      const { name, size } = data;

      const year = name.substr(0, 4);
      const month = name.substr(4, 2);
      const day = name.substr(6, 2);
      const hour = name.substr(8, 2);
      const minute = name.substr(10, 2);
      const time = new Date(`${year}-${month}-${day} ${hour}:${minute} UTC`);

      return { filename: name, size, time };
    });

    this.setState({ images });
  };
}

export default App;
