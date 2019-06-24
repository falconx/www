// https://www.gatsbyjs.org/docs/node-apis/

const path = require('path');
const { createFilePath, createFileNode } = require('gatsby-source-filesystem');

const gqlProjects = `
  {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
        }
      }
    }
  }
`;

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    resolve(graphql(gqlProjects).then(result => {
      if (result.errors) {
        console.log(result.errors);

        return reject(result.errors);
      }

      const template = path.resolve('./src/templates/project.js');

      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: template,
          context: {
            slug: node.fields.slug,
          },
        });
      });
    }));
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({
      node,
      getNode,
      basePath: 'pages',
    });

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};
