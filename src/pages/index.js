import React from 'react';

import Layout from '../components/Layout';
import Header from '../components/Header';
import ProjectList from '../components/ProjectList';

const IndexPage = props => (
  <Layout header={<Header />}>
    <ProjectList />
  </Layout>
);

export default IndexPage;
