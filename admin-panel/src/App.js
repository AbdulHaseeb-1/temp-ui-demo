import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import Questions from './pages/Questions';
import UserQuestions from './pages/UserQuestions';
import AdminSlider from './pages/AdminSlider';
import Bayanat from './pages/Bayanat'; // ✅ Import
import Courses from './pages/Courses';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/user-questions" element={<UserQuestions />} />
        <Route path="/admin-slider" element={<AdminSlider />} />
        <Route path="/bayanat" element={<Bayanat />} /> 
        <Route path="/courses" element={<Courses />} /> 
      </Routes>
    </Router>
  );
}

export default App;
