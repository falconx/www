import React from 'react';

import Layout from '../components/Layout';
import Header from '../components/Header';
import ProjectList from '../components/ProjectList';
import AboutMe from '../components/AboutMe';

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
