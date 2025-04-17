import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

function Bayanat() {
  const [categories, setCategories] = useState([]);
  const [bayans, setBayans] = useState([]);

  const [title, setTitle] = useState('');
  const [tafseel, setTafseel] = useState('');
  const [date, setDate] = useState('');
  const [writerName, setWriterName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editTafseel, setEditTafseel] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editWriterName, setEditWriterName] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editSubcategories, setEditSubcategories] = useState([]);
  const [availableSubcategories, setAvailableSubcategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchBayans();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get('http://localhost:5000/api/categories');
    setCategories(res.data);
  };

  const fetchBayans = async () => {
    const res = await axios.get('http://localhost:5000/api/bayans');
    setBayans(res.data);
  };

  const handleCategoryChange = (e) => {
    const catId = e.target.value;
    setSelectedCategory(catId);
    const selectedCat = categories.find(cat => cat._id === catId);
    setSubcategories(selectedCat ? selectedCat.subcategories : []);
    setSelectedSubcategories([]);
  };

  const handleSubcategoryChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, opt => opt.value);
    setSelectedSubcategories(selected);
  };

  const handleAddBayan = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/bayans/add', {
        title,
        tafseel,
        date,
        writerName,
        category: selectedCategory,
        subcategories: selectedSubcategories
      });

      setTitle('');
      setTafseel('');
      setDate('');
      setWriterName('');
      setSelectedCategory('');
      setSelectedSubcategories([]);
      fetchBayans();
      alert('Bayan added successfully!');
    } catch (err) {
      console.error(err);
      alert('Error adding bayan.');
    }
  };

  const startEdit = (b) => {
    setEditingId(b._id);
    setEditTitle(b.title);
    setEditTafseel(b.tafseel);
    setEditDate(b.date ? b.date.slice(0, 16) : '');
    setEditWriterName(b.writerName);
    setEditCategory(b.category?._id || '');
    setEditSubcategories(b.subcategories);

    const selectedCat = categories.find(cat => cat._id === b.category?._id);
    setAvailableSubcategories(selectedCat ? selectedCat.subcategories : []);
  };

  const handleEditCategoryChange = (e) => {
    const catId = e.target.value;
    setEditCategory(catId);
    const selectedCat = categories.find(cat => cat._id === catId);
    setAvailableSubcategories(selectedCat ? selectedCat.subcategories : []);
    setEditSubcategories([]);
  };

  const handleEditSubcategoryChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, opt => opt.value);
    setEditSubcategories(selected);
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/bayans/${id}`, {
        title: editTitle,
        tafseel: editTafseel,
        date: editDate,
        writerName: editWriterName,
        category: editCategory,
        subcategories: editSubcategories
      });
      setEditingId(null);
      fetchBayans();
    } catch (err) {
      console.error('Error updating bayan:', err);
    }
  };

  const deleteBayan = async (id) => {
    if (window.confirm('Are you sure you want to delete this bayan?')) {
      try {
        await axios.delete(`http://localhost:5000/api/bayans/${id}`);
        fetchBayans();
      } catch (err) {
        console.error('Error deleting bayan:', err);
      }
    }
  };

  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h2>Add Bayan</h2>
        <form onSubmit={handleAddBayan}>
          <label>Select Category:</label>
          <select value={selectedCategory} onChange={handleCategoryChange} required>
            <option value="">--Select Category--</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>

          <br /><br />
          <label>Select Subcategories:</label>
          <select multiple value={selectedSubcategories} onChange={handleSubcategoryChange} required>
            {subcategories.map((sub, idx) => (
              <option key={idx} value={sub}>{sub}</option>
            ))}
          </select>

          <br /><br />
          <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
          <textarea placeholder="Tafseel" value={tafseel} onChange={e => setTafseel(e.target.value)} required />
          <input type="text" placeholder="Writer Name" value={writerName} onChange={e => setWriterName(e.target.value)} required />
          <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required />

          <br /><br />
          <button type="submit">Add Bayan</button>
        </form>

        <hr />

        <h2>📋 All Bayans</h2>
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Category</th>
              <th>Subcategories</th>
              <th>Title</th>
              <th>Tafseel</th>
              <th>Writer</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bayans.map(b => (
              editingId === b._id ? (
                <tr key={b._id}>
                  <td>
                    <select value={editCategory} onChange={handleEditCategoryChange} required>
                      <option value="">--Select Category--</option>
                      {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select multiple value={editSubcategories} onChange={handleEditSubcategoryChange}>
                      {availableSubcategories.map((sub, idx) => (
                        <option key={idx} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </td>
                  <td><input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} /></td>
                  <td><textarea value={editTafseel} onChange={e => setEditTafseel(e.target.value)} /></td>
                  <td><input type="text" value={editWriterName} onChange={e => setEditWriterName(e.target.value)} /></td>
                  <td><input type="datetime-local" value={editDate} onChange={e => setEditDate(e.target.value)} /></td>
                  <td>
                    <button onClick={() => saveEdit(b._id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={b._id}>
                  <td>{b.category?.name || 'N/A'}</td>
                  <td>{b.subcategories.join(', ')}</td>
                  <td>{b.title}</td>
                  <td>{b.tafseel}</td>
                  <td>{b.writerName}</td>
                  <td>{new Date(b.date).toLocaleString()}</td>
                  <td>
                    <button onClick={() => startEdit(b)}>Edit</button>
                    <button onClick={() => deleteBayan(b._id)}>Delete</button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Bayanat;
