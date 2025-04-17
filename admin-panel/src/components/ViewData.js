import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewData() {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editCategory, setEditCategory] = useState('');
  const [editSubcategories, setEditSubcategories] = useState([]);
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [editQuestion, setEditQuestion] = useState('');
  const [editAnswer, setEditAnswer] = useState('');
  const [editReference, setEditReference] = useState('');

  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [categoryNameEdit, setCategoryNameEdit] = useState('');
  const [categorySubcatsEdit, setCategorySubcatsEdit] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchQuestions();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get('http://localhost:5000/api/categories');
    setCategories(res.data);
  };

  const fetchQuestions = async () => {
    const res = await axios.get('http://localhost:5000/api/questions');
    setQuestions(res.data);
  };

  // === Question Handlers ===
  const startEdit = (q) => {
    setEditingId(q._id);
    setEditCategory(q.category?._id || '');
    setEditSubcategories(q.subcategories);
    setEditQuestion(q.question);
    setEditAnswer(q.answer);
    setEditReference(q.reference);

    const selectedCat = categories.find(cat => cat._id === q.category?._id);
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
      await axios.put(`http://localhost:5000/api/questions/${id}`, {
        category: editCategory,
        subcategories: editSubcategories,
        question: editQuestion,
        answer: editAnswer,
        reference: editReference
      });
      setEditingId(null);
      fetchQuestions();
    } catch (err) {
      console.error('Error updating question:', err);
    }
  };

  const deleteQuestion = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await axios.delete(`http://localhost:5000/api/questions/${id}`);
        fetchQuestions();
      } catch (err) {
        console.error('Error deleting question:', err);
      }
    }
  };

  // === Category Handlers ===
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
    <div style={{ padding: '20px' }}>
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


      <hr />

      <h2>📋 All Questions</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Category</th>
            <th>Subcategories</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Reference</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map(q => (
            editingId === q._id ? (
              <tr key={q._id}>
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
                <td>
                  <input
                    type="text"
                    value={editQuestion}
                    onChange={e => setEditQuestion(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editAnswer}
                    onChange={e => setEditAnswer(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editReference}
                    onChange={e => setEditReference(e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={() => saveEdit(q._id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={q._id}>
                <td>{q.category?.name || 'N/A'}</td>
                <td>{q.subcategories.join(', ')}</td>
                <td>{q.question}</td>
                <td>{q.answer}</td>
                <td>{q.reference}</td>
                <td>
                  <button onClick={() => startEdit(q)}>Edit</button>
                  <button onClick={() => deleteQuestion(q._id)}>Delete</button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewData;
