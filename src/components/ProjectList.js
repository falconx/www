import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Select from 'react-select';

import Teaser from '../components/Teaser';
import ConditionalWrap from '../components/ConditionalWrap';

const STORAGE_FILTER_BY = 'filterBy';

const propTypes = {
  withBackground: PropTypes.bool,
};

const selectStyles = {
  container: provided => ({
    ...provided,
    display: 'inline-block',
    width: 250,
    marginLeft: 20,
  }),
  control: (provided, state) => {
    let styles = {
      display: 'flex',
      border: '4px solid',
      borderColor: 'rgba(255, 255, 255, .1)',
      borderRadius: 50,
      cursor: 'pointer',
      padding: '10px 20px',
      transition: 'all .25s linear',
    };

    if (state.isFocused || state.isSelected) {
      styles.borderColor = '#fff';
    }

    return styles;
  },
  menu: provided => ({
    ...provided,
    margin: 0,
    boxShadow: 'none',
    backgroundColor: 'transparent',
  }),
  menuList: provided => ({
    ...provided,
    padding: 0,
    maxHeight: 'none',
  }),
  option: (provided, state) => {
    let styles = {
      color: '#000',
      backgroundColor: '#fff',
      borderRadius: 25,
      textAlign: 'left',
      width: 'auto',
      float: 'left',
      clear: 'left',
      marginTop: 10,
      padding: '5px 20px',
      cursor: 'pointer',
      transition: 'all .15s linear',
    };

    if (state.isFocused) {
      styles.color = '#fff';
      styles.backgroundColor = '#000';
    }

    return styles;
  },
  placeholder: (provided, state) => {
    let styles = {
      ...provided,
      margin: 0,
      transition: 'all .25s linear',
    };

    if (state.isFocused) {
      styles.color = '#fff';
    }

    return styles;
  },
  singleValue: provided => ({
    ...provided,
    color: '#fff',
  }),
  input: provided => ({
    ...provided,
    margin: 0,
    padding: 0,
  }),
};

const S = {};

S.Filter = styled.div`
  text-align: center;
  line-height: 2;
`;

S.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 100px;
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
    margin-top: 60px;
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
          allWordpressPost(sort: {fields: modified, order: DESC}, filter: {title: {ne: "Ignore"}}) {
            edges {
              node {
                id
                title
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

        const selectOptions = [{
          value: '',
          label: 'all of the things',
        }].concat(tags.map(tag => ({
          value: tag,
          label: tag,
        })));

        return (
          <S.FullWidth>
            <ConditionalWrap
              condition={props.withBackground}
              wrap={children => <S.Wrapper children={children} />}
              children={
                <React.Fragment>
                  <S.Filter>
                    Show me
                    <Select
                      styles={selectStyles}
                      value={{
                        value: filterBy,
                        label: filterBy || 'all the things',
                      }}
                      options={selectOptions}
                      components={{
                        IndicatorSeparator: null,
                        DropdownIndicator: null,
                      }}
                      onChange={({ value, label }) => {
                        setFilterBy(value);
                        storeFilterBy(value);
                      }}
                    />
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