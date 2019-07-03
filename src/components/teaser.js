import { Link, navigate } from 'gatsby';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Image from 'gatsby-image';

import styles from './teaser.module.css';

class Teaser extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    // thumbnail: PropTypes.shape({
    //   src: PropTypes.string.isRequired,
    // }),
    // children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div
        className={styles.project}
        onClick={() => navigate(this.props.path)}
      >
        <h2 className={styles.title}>
          <Link
            to={this.props.path}
            title="View Allegiant project"
            className={styles.link}
          >{this.props.title}</Link>
        </h2>

        {/*this.props.thumbnail && (
          <Image className={styles.image} fluid={this.props.thumbnail} />
        )*/}

        {this.props.subtitle && (
          <h3 className={styles.subtitle}>{this.props.subtitle}</h3>
        )}

        <div className={styles.description}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Teaser;
