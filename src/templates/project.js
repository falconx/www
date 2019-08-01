import React from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';

import Layout from '../components/Layout';
import ProjectList from '../components/ProjectList';

const LAYOUT_FULL_WIDTH = 'WordPressAcf_full_width';
const LAYOUT_HALF_HALF = 'WordPressAcf_half_half';
const LAYOUT_TWO_THIRDS_ONE_THIRD = 'WordPressAcf_two_thirds_one_third';

const S = {};

S.Project = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto 40px;
`;

S.Content = styled.div`
  line-height: 1.5;

  [class^="col-"] {
    margin: 30px 0;
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
          ... on WordPressAcf_half_half {
            column_1_components {
              text
              heading
              image {
                localFile {
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
              image {
                localFile {
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
              image {
                localFile {
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
              image {
                localFile {
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
              image {
                localFile {
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

  const renderColumn = (components = []) => {
    return components.map(({ text, image, heading }, index) => (
      <React.Fragment key={index}>
        {heading && (
          <h2>{heading}</h2>
        )}

        {text && (
          <div dangerouslySetInnerHTML={{
            __html: text
          }} />
        )}

        {image && (
          <Image fluid={image.localFile.childImageSharp.fluid} />
        )}
      </React.Fragment>
    ));
  };

  return (
    <Layout>
      <S.Project>
        <S.Content>
          <a href="/">Back to homepage</a>

          <h1 dangerouslySetInnerHTML={{
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
                            {renderColumn(row.column_components)}
                          </S.Column>
                        </div>
                      </div>
                    );

                  case LAYOUT_HALF_HALF:
                    return (
                      <div className="row">
                        <div className="col-xs-12 col-md-6">
                          <S.Column>
                            {renderColumn(row.column_1_components)}
                          </S.Column>
                        </div>
                        <div className="col-xs-12 col-md-6">
                          <S.Column>
                            {renderColumn(row.column_2_components)}
                          </S.Column>
                        </div>
                      </div>
                    );

                  case LAYOUT_TWO_THIRDS_ONE_THIRD:
                    return (
                      <div className="row">
                        <div className="col-xs-12 col-md-8">
                          <S.Column>
                            {renderColumn(row.column_1_components)}
                          </S.Column>
                        </div>
                        <div className="col-xs-12 col-md-4">
                          <S.Column>
                            {renderColumn(row.column_2_components)}
                          </S.Column>
                        </div>
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
