import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './global.css';

import styles from './layout.module.css';

import bunny from '../images/bunny.png';
import carrot from '../images/carrot.svg';

const CHAR_C = 66;
const BUNNY_GAME_ACTIVATION_KEY = CHAR_C;
const CARROT_ROTATE_OFFSET = 20;
const BUNNY_ROTATION_SLOWDOWN_MULTIPLIER = 3.5;

function getScrollPercentage() {
  const h = document.documentElement;
  const b = document.body;
  const st = 'scrollTop';
  const sh = 'scrollHeight';

  return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}

class Layout extends Component {
  constructor(props) {
    super(props);

    this.rotateCarrot = this.rotateCarrot.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    this.state = {
      showBunnyGame: false,
      offsetTop: 0,
      bunnyRotation: 0,
    };
  }

  rotateCarrot() {
    this.setState({
      offsetTop: getScrollPercentage(),
      bunnyRotation: window.pageYOffset / BUNNY_ROTATION_SLOWDOWN_MULTIPLIER,
    });
  }

  onKeyDown({ keyCode }) {
    if (keyCode === BUNNY_GAME_ACTIVATION_KEY) {
      this.setState({
        showBunnyGame: !this.state.showBunnyGame,
      });
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.rotateCarrot);
    document.body.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.rotateCarrot);
    document.body.removeEventListener('keydown', this.onKeyDown);
  }

  renderBunnyGame() {
    var carrotStyles = {};

    if (this.state.showBunnyGame) {
      const scrollAmount = getScrollPercentage();

      carrotStyles.right = '40px';

      if (scrollAmount >= 50) {
        carrotStyles.top = `${this.state.offsetTop}%`;
        carrotStyles.transform = `rotate(${this.state.bunnyRotation + CARROT_ROTATE_OFFSET}deg)`;
      }
    }

    return (
      <React.Fragment>
        {this.state.showBunnyGame ? (
          <img
            className={styles.bunny}
            src={bunny}
            alt="A pink super bunny man"
            style={{
              top: `${this.state.offsetTop}%`,
              transform: `rotate(${this.state.bunnyRotation}deg)`
            }}
          />
        ) : null}

        <img
          className={styles.carrot}
          src={carrot}
          alt="A carrot which rotates as you scroll"
          style={carrotStyles}
        />

        {this.state.showBunnyGame ? (
          <span className={styles.portal} />
        ) : null}
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className={styles.layout}>
        {this.renderBunnyGame()}

        {this.props.header}

        <main className={styles.main}>
          {this.props.children}
        </main>
      </div>
    );
  }
}

Layout.propTypes = {
  header: PropTypes.node,
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  header: null,
};

export default Layout;
