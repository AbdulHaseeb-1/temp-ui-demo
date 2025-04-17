import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import '../styles/Courses.css'; 

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    tafseel: '',
    image: null
  });

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/courses');
      setCourses(res.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('image', formData.image);
    data.append('title', formData.title);
    data.append('tafseel', formData.tafseel);

    try {
      await axios.post('http://localhost:5000/api/courses/add', data);
      setFormData({ title: '', tafseel: '', image: null });
      fetchCourses();
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`);
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <Layout>
    <div className="courses-container">
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="course-form">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} value={formData.title} required />
        <textarea name="tafseel" placeholder="Tafseel" onChange={handleChange} value={formData.tafseel} required />
        <input type="file" name="image" onChange={handleChange} accept="image/*" required />
        <button type="submit">Add Course</button>
      </form>

      <h2>All Courses</h2>
      <div className="course-list">
        {courses.map(course => (
          <div key={course._id} className="course-card">
            <img src={`http://localhost:5000${course.imageUrl}`} alt={course.title} />
            <h3>{course.title}</h3>
            <p>{course.tafseel}</p>
            <button onClick={() => handleDelete(course._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default Courses;
