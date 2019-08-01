import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import Teaser from '../components/Teaser';
import ConditionalWrap from '../components/ConditionalWrap';

const STORAGE_FILTER_BY = 'filterBy';

const propTypes = {
  withBackground: PropTypes.bool,
};

const S = {};

S.Filter = styled.div`
  text-align: center;
  line-height: 2;
`;

S.Select = styled.select`
  margin: 0 10px;
`;

S.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  background-color: rgba(8, 8, 8, .75);
  clip-path: polygon(0 50px, 100% 0, 100% 100%, 0 100%);
`;

S.FullWidth = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: -20px;
  margin-right: -20px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 20px;
  }

  &-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, .25);
  }

  &::-webkit-scrollbar-thumb {
    background-color: #939393;
  }

  @media screen and (min-width: 769px) {
    margin-left: -40px;
    margin-right: -40px;
  }
`;

S.ProjectList = styled.ul`
  width: 100%;
  max-width: 500px;
  margin: 40px auto 20px;
  padding: 0 20px;

  @media screen and (min-width: 769px) {
    display: flex;
    width: auto;
    max-width: none;
    margin-top: 100px;
    padding-left: 40px;
    padding-right: 40px;
    margin-bottom: 100px;
  }
`;

S.Project = styled.li`
  & + & {
    margin-top: 40px;
  }

  @media screen and (min-width: 769px) {
    & + & {
      margin-top: 0;
      margin-left: 20px;
    }
  }
`;

const ProjectList = props => {
  const [filterBy, setFilterBy] = React.useState(window.localStorage.getItem(STORAGE_FILTER_BY));

  const storeFilterBy = value => {
    window.localStorage.setItem(STORAGE_FILTER_BY, value);
  };

  // "Ignore" hack added as a workaround to https://github.com/gatsbyjs/gatsby/issues/15707
  return (
    <StaticQuery
      query={graphql`
        query ProjectsQuery {
          allWordpressTag {
            edges {
              node {
                name
              }
            }
          }
          allWordpressPost(sort: {fields: date, order: DESC}, filter: {title: {ne: "Ignore"}}) {
            edges {
              node {
                id
                title
                excerpt
                date
                slug
                acf {
                  subtitle
                  tags {
                    name
                  }
                  thumbnail {
                    localFile {
                      childImageSharp {
                        fluid {
                          ...GatsbyImageSharpFluid
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        const posts = data.allWordpressPost;
        const tags = data.allWordpressTag.edges.map(edge => {
          return edge.node && edge.node.name.toLowerCase();
        });

        return (
          <S.FullWidth>
            <ConditionalWrap
              condition={props.withBackground}
              wrap={children => <S.Wrapper children={children} />}
              children={
                <React.Fragment>
                  <S.Filter>
                    Show me <S.Select defaultValue={filterBy} onChange={({ target: { value }}) => {
                      setFilterBy(value);
                      storeFilterBy(value);
                  }}>
                      <option value="">all the things</option>

                      {tags.map((tag, index) => (
                        <option
                          key={index}
                          value={tag}
                          children={tag}
                        />
                      ))}
                    </S.Select>
                  </S.Filter>

                  <S.ProjectList>
                    {posts.edges.map(({ node }) => {
                      // filter by tag
                      if (filterBy && !node.acf.tags.map(tag => tag.name.toLowerCase()).includes(filterBy)) {
                        return null;
                      }

                      return (
                        <S.Project key={node.id}>
                          <Teaser
                            path={node.slug}
                            title={node.title}
                            subtitle={node.acf.subtitle}
                            thumbnail={node.acf.thumbnail.localFile.childImageSharp.fluid}
                            children={node.excerpt}
                          />
                        </S.Project>
                      );
                    })}
                  </S.ProjectList>
                </React.Fragment>
              }
            />
          </S.FullWidth>
        );
      }}
    />
  );
};

ProjectList.propTypes = propTypes;

export default ProjectList;