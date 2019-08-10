import React from 'react';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';

import Layout from '../components/Layout';
import ProjectList from '../components/ProjectList';

const LAYOUT_FULL_WIDTH = 'WordPressAcf_full_width';
const LAYOUT_HALF_HALF = 'WordPressAcf_half_half';
const LAYOUT_TWO_THIRDS_ONE_THIRD = 'WordPressAcf_two_thirds_one_third';
const LAYOUT_GRID = 'WordPressAcf_grid';

const S = {};

S.Title = styled.h1`
  font-size: 2rem;
  line-height: 1;
  margin-top: 20px;

  @media screen and (min-width: 576px) {
    font-size: 3.5rem;
  }
`;

S.Project = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto 40px;
`;

S.Content = styled.div`
  line-height: 1.5;

  [class^="col-"] {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  a {
    word-break: break-all;
  }

  p + p {
    margin-top: 1em;
  }
`;

S.Column = styled.div`
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 30px;
  }
`;

// "Ignore" hack added as a workaround to https://github.com/gatsbyjs/gatsby/issues/15707
export const query = graphql`
  query($id: String!) {
    allWordpressTag {
      edges {
        node {
          name
        }
      }
    }
    wordpressPost(id: { eq: $id }) {
      title
      acf {
        subtitle
        layout_post {
          ... on WordPressAcf_grid {
            columns
            column_components {
              text
              heading
              svg {
                url {
                  source_url
                }
              }
              image {
                localFile {
                  publicURL
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
            internal {
              type
            }
          }
          ... on WordPressAcf_half_half {
            column_1_components {
              text
              heading
              svg {
                url {
                  source_url
                }
              }
              image {
                localFile {
                  publicURL
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
            column_2_components {
              text
              heading
              svg {
                url {
                  source_url
                }
              }
              image {
                localFile {
                  publicURL
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
            internal {
              type
            }
          }
          ... on WordPressAcf_two_thirds_one_third {
            column_2_components {
              text
              heading
              svg {
                url {
                  source_url
                }
              }
              image {
                localFile {
                  publicURL
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
            column_1_components {
              text
              heading
              svg {
                url {
                  source_url
                }
              }
              image {
                localFile {
                  publicURL
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
            internal {
              type
            }
          }
          ... on WordPressAcf_full_width {
            column_components {
              text
              heading
              svg {
                url {
                  source_url
                }
              }
              image {
                localFile {
                  publicURL
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
            internal {
              type
            }
          }
        }
      }
    }
  }
`;

const ProjectPage = props => {
  const post = props.data.wordpressPost;
  const content = post.acf.layout_post || [];

  const renderColumn = ({ heading, text, image, svg }) => {
    if (heading) {
      return (
        <h2>{heading}</h2>
      );
    }

    if (text) {
      return (
        <div dangerouslySetInnerHTML={{
          __html: text
        }} />
      );
    }

    if (image && image.localFile) {
      return (
        <a
          href={image.localFile.publicURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image fluid={image.localFile.childImageSharp.fluid} />
        </a>
      );
    }

    if (svg) {
      return (
        <img
          src={svg.url.source_url}
          alt={svg.url.alt_text}
        />
      );
    }
  };

  const renderColumns = (components = []) => {
    return components.map((component, index) => (
      <React.Fragment key={index}>
        {renderColumn(component)}
      </React.Fragment>
    ));
  };

  const renderGridColumns = (columnCount, components = []) => {
    const COLUMNS = 12;

    const getClassNames = columnIndex => {
      let columns = COLUMNS / columnCount;

      let classNames = [
        'col-xs-6',
      ];

      if (COLUMNS % columnCount !== 0) {
        classNames.push(`col-md-${Math.round(columns)}`);

        if (columnIndex === 0) {
          classNames.push(`col-md-offset-${Math.round((COLUMNS / columnCount) / 2)}`);
        }
      } else {
        classNames.push(`col-md-${columns}`);
      }

      return classNames.join(' ');
    };

    return components.map((component, index) => {
      return (
        <div
          key={index}
          className={getClassNames(index)}
        >
          <S.Column>
            {renderColumn(component)}
          </S.Column>
        </div>
      );
    });
  };

  return (
    <Layout>
      <S.Project>
        <S.Content>
          <Link to="/">Back to homepage</Link>

          <S.Title dangerouslySetInnerHTML={{
            __html: post.title
          }} />

          {content.map((row, index) => (
            <React.Fragment key={index}>
              {(() => {
                switch (row.internal.type) {
                  case LAYOUT_FULL_WIDTH:
                    return (
                      <div className="row">
                        <div className="col-xs-12">
                          <S.Column>
                            {renderColumns(row.column_components)}
                          </S.Column>
                        </div>
                      </div>
                    );

                  case LAYOUT_HALF_HALF:
                    return (
                      <div className="row">
                        <div className="col-xs-12 col-md-6">
                          <S.Column>
                            {renderColumns(row.column_1_components)}
                          </S.Column>
                        </div>
                        <div className="col-xs-12 col-md-6">
                          <S.Column>
                            {renderColumns(row.column_2_components)}
                          </S.Column>
                        </div>
                      </div>
                    );

                  case LAYOUT_TWO_THIRDS_ONE_THIRD:
                    return (
                      <div className="row">
                        <div className="col-xs-12 col-md-8">
                          <S.Column>
                            {renderColumns(row.column_1_components)}
                          </S.Column>
                        </div>
                        <div className="col-xs-12 col-md-4">
                          <S.Column>
                            {renderColumns(row.column_2_components)}
                          </S.Column>
                        </div>
                      </div>
                    );

                  case LAYOUT_GRID:
                    return (
                      <div className="row">
                        {renderGridColumns(row.columns, row.column_components)}
                      </div>
                    );

                  default:
                    return null;
                };
              })()}
            </React.Fragment>
          ))}
        </S.Content>
      </S.Project>

      <ProjectList withBackground />
    </Layout>
  );
}

export default ProjectPage;
