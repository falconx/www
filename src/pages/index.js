import React, { Component } from 'react';
import { graphql } from 'gatsby';

import styles from './index.module.css';

import Layout from '../components/layout';
import Header from '../components/header';
import Teaser from '../components/teaser';

// https://codeburst.io/build-a-blog-using-gatsby-js-react-8561bfe8fc91

class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.updateFilter = this.updateFilter.bind(this);

    this.state = {
      filterBy: null,
    };
  }

  updateFilter({ target: { value }}) {
    this.setState({
      filterBy: value,
    });
  };

  render() {
    const entries = this.props.data.allMdx;

    return (
      <Layout
        header={<Header />}
      >
        <div className={styles.filter}>
          Show me <select onChange={this.updateFilter}>
            <option value="">all the things</option>
            <option value="logo">logo designs</option>
            <option value="website">just websites</option>
          </select>
        </div>

        <div className={styles.fullWidth}>
          <ul className={styles.projects}>
            {entries.edges.map(({ node }) => {
              // const tags = node.frontmatter.tags || [];
              // const thumbnail = node.frontmatter.thumbnail && node.frontmatter.thumbnail.childImageSharp.fluid;

              // if (this.state.filterBy && !tags.includes(this.state.filterBy)) {
              //   return null;
              // }

              return (
                <li
                  key={node.frontmatter.title}
                  className={styles.project}
                >
                  <Teaser
                    path={node.fields.slug}
                    title={node.frontmatter.title}
                    subtitle={node.frontmatter.subtitle}
                    // thumbnail={thumbnail}
                    // children={node.excerpt}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query SiteTitleQuery {
    allMdx {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            subtitle
          }
        }
      }
    }
  }
`;

export default IndexPage;
