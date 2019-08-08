import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import './global.css';
import 'flexboxgrid/css/flexboxgrid.min.css';

import bunny from '../images/bunny.png';
import carrot from '../images/carrot.svg';

const S = {};

S.Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

S.Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px 20px 0;

  @media screen and (min-width: 576px) {
    padding: 60px 40px 0;
  }
`;

S.Bunny = styled.img.attrs({
  src: bunny,
  alt: 'A pink super bunny man',
})`
  position: fixed;
  z-index: 3;
  height: 100px;
  right: 15px;
  margin-top: -110px;
`;

S.Carrot = styled.img.attrs({
  src: carrot,
  alt: 'A carrot which rotates as you scroll',
})`
  position: fixed;
  z-index: 3;
  height: 50px;
  top: 50%;
  right: -50px;
  margin-top: -85px;
  transition: right .5s linear;
`;

S.Portal = styled.div`
  position: absolute;
  z-index: 1;
  height: 100px;
  width: 100px;
  right: 15px;
  bottom: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, .2);
`;

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
          <S.Bunny
            style={{
              top: `${this.state.offsetTop}%`,
              transform: `rotate(${this.state.bunnyRotation}deg)`
            }}
          />
        ) : null}

        <S.Carrot style={carrotStyles} />

        {this.state.showBunnyGame ? (
          <S.Portal />
        ) : null}
      </React.Fragment>
    );
  }

  render() {
    return (
      <S.Layout>
        {this.renderBunnyGame()}

        {this.props.header}

        <S.Main children={this.props.children} />
      </S.Layout>
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
