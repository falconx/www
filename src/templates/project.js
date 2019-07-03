import React from 'react';
import { graphql, Link } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';

import styles from './project.module.css';

import Layout from '../components/layout';
import Header from '../components/header';

function ProjectPage({ data: { mdx } }) {
  // const post = props.data.markdownRemark;
  // const { title } = post.frontmatter;

  return (
    <Layout
      header={<Header simple />}
    >
      <div className={styles.project}>
        <Link to="/">Back to projects</Link>

        <div className={styles.content}>
          <h2 className={styles.title}>{mdx.frontmatter.title}</h2>
          <MDXRenderer>{mdx.code.body}</MDXRenderer>
        </div>

        <Link to="/">Back to projects</Link>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ProjectQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
      }
      code {
        body
      }
    }
  }
`;

export default ProjectPage;
