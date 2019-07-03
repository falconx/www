import React, { Component } from 'react';
import PropTypes from 'prop-types';

const PhotoGrid = props => {
  console.log(React.Children.toArray(props.children));
  return (
    <ul>
      {React.Children.map(props.children, (child, index) => (
        <li key={index}>
          {child}
        </li>
      ))}
    </ul>
  );
};

export default PhotoGrid;