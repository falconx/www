import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PhotoGrid extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    images: [],
  };

  render() {
    return (
      <ul>
        {this.props.images.map(image => (
          <li>{image}</li>
        ))}
      </ul>
    );
  }
}

export default PhotoGrid;