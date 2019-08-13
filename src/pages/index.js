import React from 'react';
import { Helmet } from 'react-helmet';

import Layout from '../components/Layout';
import Header from '../components/Header';
import ProjectList from '../components/ProjectList';

const IndexPage = props => (
  <Layout header={<Header />}>
    <Helmet>
        <title>Matt Layton Portfolio</title>
      </Helmet>

    <ProjectList />
  </Layout>
);

export default IndexPage;
