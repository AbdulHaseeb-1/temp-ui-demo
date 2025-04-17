import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout'; // Import your layout
import axios from 'axios';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSubcategories, setNewSubcategories] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [categoryNameEdit, setCategoryNameEdit] = useState('');
  const [categorySubcatsEdit, setCategorySubcatsEdit] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get('http://localhost:5000/api/categories');
    setCategories(res.data);
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const subcatArray = newSubcategories.split(',').map(sc => sc.trim());
      await axios.post('http://localhost:5000/api/categories/add', {
        name: newCategoryName,
        subcategories: subcatArray
      });
      setNewCategoryName('');
      setNewSubcategories('');
      fetchCategories();
      alert('Category added successfully!');
    } catch (err) {
      console.error(err);
      alert('Error adding category.');
    }
  };

  const startEditCategory = (cat) => {
    setEditingCategoryId(cat._id);
    setCategoryNameEdit(cat.name);
    setCategorySubcatsEdit(cat.subcategories.join(', '));
  };

  const saveCategoryEdit = async (id) => {
    try {
      const updated = {
        name: categoryNameEdit,
        subcategories: categorySubcatsEdit.split(',').map(s => s.trim())
      };
      await axios.put(`http://localhost:5000/api/categories/${id}`, updated);
      setEditingCategoryId(null);
      fetchCategories();
    } catch (err) {
      console.error('Error updating category:', err);
    }
  };

  const deleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`http://localhost:5000/api/categories/${id}`);
        fetchCategories();
      } catch (err) {
        console.error('Error deleting category:', err);
      }
    }
  };

  return (
    <Layout>
    <div style={{ padding: '20px' }}>
      <h2>Add New Category + Subcategories</h2>
      <form onSubmit={handleAddCategory}>
        <input type="text" placeholder="Category Name" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} required />
        <input type="text" placeholder="Subcategories (comma-separated)" value={newSubcategories} onChange={e => setNewSubcategories(e.target.value)} />
        <button type="submit">Add Category</button>
      </form>

      <hr />

      <h2>📂 All Categories</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Subcategories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            editingCategoryId === cat._id ? (
              <tr key={cat._id}>
                <td>
                  <input
                    type="text"
                    value={categoryNameEdit}
                    onChange={e => setCategoryNameEdit(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={categorySubcatsEdit}
                    onChange={e => setCategorySubcatsEdit(e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={() => saveCategoryEdit(cat._id)}>Save</button>
                  <button onClick={() => setEditingCategoryId(null)}>Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={cat._id}>
                <td>{cat.name}</td>
                <td>{cat.subcategories.join(', ')}</td>
                <td>
                  <button onClick={() => startEditCategory(cat)}>Edit</button>
                  <button onClick={() => deleteCategory(cat._id)}>Delete</button>
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

export default Categories;
