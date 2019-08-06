import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { MobileOnly } from './Media';

import shapes from '../images/shapes.png';

const propTypes = {
  rightContent: PropTypes.node,
  children: PropTypes.node,
};

const S = {};

S.Header = styled.header`
  position: relative;
  color: #939393;
  background-color: rgba(8, 8, 8, .75);
  padding: 20px;
  padding-bottom: 60px;
  clip-path: polygon(0 0, 100% 0%, 100% calc(100% - 50px), 0% 100%);
  line-height: 2;

  /* Achieves semi-opaque background image */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    height: 100%;
    width: 100%;
    background-image: url('${shapes}');
    opacity: 0.5;
  }

  em {
    color: #fff;
  }

  a,
  button {
    color: #ffd62e;
  }

  a:active,
  a:hover,
  button:active,
  button:hover {
    color: #fff;
  }

  @media screen and (min-width: 769px) {
    padding: 40px;
    padding-bottom: 80px;
    display: grid;
    grid-gap: 30px;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
  }
`;

S.Column = styled.div`
  margin: 0 auto;

  @media screen and (min-width: 769px) {
    max-width: 600px;
  }
`;

S.Intro = styled(S.Column)`
  margin: 0;
`;

S.Title = styled.h1`
  margin-bottom: 10px;
  color: #ffd62e;
  text-transform: uppercase;
  letter-spacing: 15px;
  font-size: 2rem;
  line-height: 1.25;

  @media screen and (min-width: 769px) {
    font-size: 3.5rem;
  }
`;

// Todo: Obtain content from CMS
const Header = props => (
  <S.Header>
    <S.Intro>
      <S.Title>
        <Link to="/">Matt<wbr />Layton</Link>
      </S.Title>

      <MobileOnly>
        <Link to="#projects">Jump to projects</Link>
      </MobileOnly>

      {props.rightContent}
    </S.Intro>

    {props.children}
  </S.Header>
);

Header.propTypes = propTypes;

export default Header;
