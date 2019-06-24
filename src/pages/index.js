import React from 'react';

import Layout from '../components/Layout';
import Header from '../components/Header';
import ProjectList from '../components/ProjectList';
import AboutMe from '../components/AboutMe';

// Todo: Obtain from CMS
const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'PHP',
  'React',
  'Drupal',
  'WordPress',
  'Jekyll',
  'Gatsby',
  'C#',
  'Photoshop',
  'Illustrator',
];

// Todo: Obtain from CMS
const interests = [
  'Video Games',
  'Board Games',
  'Psychology',
  'Bouldering',
  'Nutrition',
  'Bodybuilding',
];

const IndexPage = props => (
  <Layout
    header={
      <Header
        rightContent={<p>Hey! I'm a <em>front-end web engineer</em> with more than 10 years experience.</p>
      }>
        <AboutMe />
      </Header>
    }
  >
    <ProjectList />
  </Layout>
);

export default IndexPage;
