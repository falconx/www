import React from 'react';
import { graphql, Link } from 'gatsby';

import styles from './project.module.css';

import Layout from '../components/layout';
import Header from '../components/header';

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

function ProjectPage(props) {
  const post = props.data.markdownRemark;
  const { title } = post.frontmatter;

  return (
    <Layout
      header={<Header simple />}
    >
      <div className={styles.project}>
        <Link to="/">Back to projects</Link>

        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>

        <Link to="/">Back to projects</Link>
      </div>
    </Layout>
  );
}

export default ProjectPage;
