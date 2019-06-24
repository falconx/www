const path = require('path');
const { createFilePath, createFileNode } = require('gatsby-source-filesystem');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  // "Ignore" hack added as a workaround to https://github.com/gatsbyjs/gatsby/issues/15707
  const query = `
    {
      allWordpressPost(sort: {fields: date, order: DESC}, filter: {title: {ne: "Ignore"}, acf: {}}) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `;

  return graphql(query).then(result => {
    if (result.errors) {
      console.error(results.errors);
      reject(result.error);
    }

    const postEdges = result.data.allWordpressPost.edges;
    const template = path.resolve('./src/templates/project.js');

    postEdges.forEach(edge => {
      createPage({
        path: `/${edge.node.slug}`,
        component: template,
        context: {
          id: edge.node.id,
        },
      });
    });
  });
};