import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';

import AboutMe from './AboutMe';

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
  font-size: 1.5rem;
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

  @media screen and (min-width: 576px) {
    padding: 40px;
    padding-bottom: 80px;
  }

  @media screen and (min-width: 769px) {
    display: grid;
    grid-gap: 30px;
    justify-items: center;
    grid-template-columns: repeat(2, 1fr);
  }
`;

S.Column = styled.div`
  margin: 0 auto;

  @media screen and (min-width: 576px) {
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

  @media screen and (min-width: 576px) {
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

      <p>Hey! I'm a <em>front-end web engineer</em> with more than 10 years experience.</p>
    </S.Intro>

    <AboutMe />
  </S.Header>
);

Header.propTypes = propTypes;

export default Header;
