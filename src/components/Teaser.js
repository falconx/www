import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, navigate } from 'gatsby';
import Image from 'gatsby-image';

const S = {};

S.Image = styled(Image)`
  display: block;
  margin-bottom: 1em;
  background-color: rgba(255, 255, 255, .05);
  clip-path: polygon(0 0, 100% 0%, 100% calc(100% - 25px), 0% 100%);
  transition: all .25s linear;
`;

S.Project = styled.div`
  cursor: pointer;

  &:active,
  &:hover {
    color: #ffd62e;
  }

  &:hover ${S.Image},
  &:active {
    filter: grayscale(100%);
  }

  @media screen and (min-width: 576px) {
    width: 500px;
  }
`;

S.Link = styled(Link)`
  color: #fff;
  transition: color .15s linear;
`;

S.Title = styled.h2`
  font-size: 1.875rem;
  margin-bottom: 1em;
`;

S.SubTitle = styled.h3`
  margin-bottom: 1em;
  color: #939393;
`;

S.Description = styled.div`
  font-size: 1.25rem;
`;

const propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  thumbnail: PropTypes.object,
  children: PropTypes.node,
};

const Teaser = props => (
  <S.Project onClick={() => navigate(props.path)}>
    <S.Title>
      <S.Link
        to={props.path}
        title="View Allegiant project"
        dangerouslySetInnerHTML={{
          __html: props.title
        }}
      />
    </S.Title>

    {props.thumbnail && (
      <S.Image fluid={props.thumbnail} />
    )}

    {props.subtitle && (
      <S.SubTitle children={props.subtitle} />
    )}

    <S.Description
      dangerouslySetInnerHTML={{
        __html: props.children
      }}
    />
  </S.Project>
);

Teaser.propTypes = propTypes;

export default Teaser;
