import React from 'react';
import '../styles/Sidebar.css';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">🛠️ AdminPanel</div>
      <nav>
        <ul>
          <li><Link to="/">🏠 Dashboard</Link></li>
          <li><Link to="/categories">📂 Categories</Link></li>
          <li><Link to="/questions">📋 Questions</Link></li>
          <li><Link to="/user-questions">🙋 User Questions</Link></li>
          <li><Link to="/admin-slider">🖼️ Admin Slider</Link></li>
          <li><Link to="/bayanat">📖 Bayanat</Link></li> 
          <li><Link to="/courses">🎓 Courses</Link></li> 

        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
