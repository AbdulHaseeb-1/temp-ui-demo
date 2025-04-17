import React from 'react';
import Layout from '../components/Layout';
import ViewData from '../components/ViewData';
import UserForm from '../components/UserForm';
import SliderSection from '../components/SliderSection';

function Dashboard() {
  return (
    <Layout>
      <SliderSection />
      <ViewData />
      <UserForm />

    </Layout>
  );
}

export default Dashboard;
