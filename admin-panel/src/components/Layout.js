import React from 'react';
import Sidebar from '../components/Sidebar';

function Layout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '220px', padding: '20px', flexGrow: 1 }}>
        {children}
      </div>
    </div>
  );
}

export default Layout;
