// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import axios from 'axios';
import type { Image } from 'store/Images/types';
import { API_ENDPOINT, IMAGE_LOCATION } from 'config';

type Props = {
  children: Node,
};

type State = {
  images: Image[],
};

export const Context = React.createContext();

class ImagesContext extends Component<Props, State> {
  state: State = {
    images: [],
  };

  componentDidMount() {
    this.fetch();
  }

  render() {
    const { images } = this.state;

    return (
      <Context.Provider value={images}>{this.props.children}</Context.Provider>
    );
  }

  fetch = async () => {
    const response = await axios.get(API_ENDPOINT);

    let images: Image[] = response.data.map(data => {
      const { name: filename, size } = data;

      const year = filename.substr(0, 4);
      const month = filename.substr(4, 2);
      const day = filename.substr(6, 2);
      const hour = filename.substr(8, 2);
      const minute = filename.substr(10, 2);
      const time = new Date(`${year}-${month}-${day} ${hour}:${minute} UTC`);

      const url = `${IMAGE_LOCATION}/${filename}`;

      return { filename, url, size, time };
    });

    // Average image size
    const averageSize =
      images.reduce((total: number, image: Image) => total + image.size, 0) /
      images.length;

    // Filter out images below average "quality"
    images = images.filter((image: Image) => image.size > averageSize);

    this.setState({ images });
  };
}

export default ImagesContext;
