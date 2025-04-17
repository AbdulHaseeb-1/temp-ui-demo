import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useLocation } from 'react-router-dom';

function Questions() {
  const location = useLocation();
  const prefillQuestion = location.state?.userQuestion || '';
  const userQuestionId = location.state?.userQuestionId || null;

  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [question, setQuestion] = useState(prefillQuestion);
  const [answer, setAnswer] = useState('');
  const [reference, setReference] = useState('');
  const [fatwaTitle, setFatwaTitle] = useState('');
  const [arabicReferences, setArabicReferences] = useState('');
  const [fatwaSolvedDate, setFatwaSolvedDate] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editCategory, setEditCategory] = useState('');
  const [editSubcategories, setEditSubcategories] = useState([]);
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [editQuestion, setEditQuestion] = useState('');
  const [editAnswer, setEditAnswer] = useState('');
  const [editReference, setEditReference] = useState('');
  const [editFatwaTitle, setEditFatwaTitle] = useState('');
  const [editArabicReferences, setEditArabicReferences] = useState('');
  const [editFatwaSolvedDate, setEditFatwaSolvedDate] = useState('');

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

  const handleCategorySelect = (e) => {
    const catId = e.target.value;
    setSelectedCategory(catId);
    const selectedCat = categories.find(cat => cat._id === catId);
    setSubcategories(selectedCat ? selectedCat.subcategories : []);
    setSelectedSubcategories([]);
  };

  const handleSubcategorySelect = (e) => {
    const selected = Array.from(e.target.selectedOptions, opt => opt.value);
    setSelectedSubcategories(selected);
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/questions/add', {
        category: selectedCategory,
        subcategories: selectedSubcategories,
        question,
        answer,
        reference,
        fatwaTitle,
        arabicReferences,
        fatwaSolvedDate
      });

      if (userQuestionId) {
        await axios.put(`http://localhost:5000/api/user-questions/mark-answered/${userQuestionId}`);
      }

      setQuestion('');
      setAnswer('');
      setReference('');
      setFatwaTitle('');
      setArabicReferences('');
      setFatwaSolvedDate('');
      setSelectedSubcategories([]);
      fetchQuestions();
      alert('Question added successfully!');
    } catch (err) {
      console.error(err);
      alert('Error adding question.');
    }
  };

  const startEdit = (q) => {
    setEditingId(q._id);
    setEditCategory(q.category?._id || '');
    setEditSubcategories(q.subcategories);
    setEditQuestion(q.question);
    setEditAnswer(q.answer);
    setEditReference(q.reference);
    setEditFatwaTitle(q.fatwaTitle || '');
    setEditArabicReferences(q.arabicReferences || '');
    setEditFatwaSolvedDate(q.fatwaSolvedDate ? q.fatwaSolvedDate.slice(0, 16) : '');

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
        reference: editReference,
        fatwaTitle: editFatwaTitle,
        arabicReferences: editArabicReferences,
        fatwaSolvedDate: editFatwaSolvedDate
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

  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h2>Add Question</h2>
        <form onSubmit={handleAddQuestion}>
          <label>Select Category:</label>
          <select value={selectedCategory} onChange={handleCategorySelect} required>
            <option value="">--Select Category--</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>

          <br /><br />
          <label>Select Subcategories:</label>
          <select multiple value={selectedSubcategories} onChange={handleSubcategorySelect} required>
            {subcategories.map((sub, idx) => (
              <option key={idx} value={sub}>{sub}</option>
            ))}
          </select>

          <br /><br />
          <input type="text" placeholder="Question" value={question} onChange={e => setQuestion(e.target.value)} required />
          <input type="text" placeholder="Answer" value={answer} onChange={e => setAnswer(e.target.value)} required />
          <input type="text" placeholder="Arabic References" value={arabicReferences} onChange={e => setArabicReferences(e.target.value)} />
          <input type="text" placeholder="Reference" value={reference} onChange={e => setReference(e.target.value)} required/>
          <input type="text" placeholder="Fatwa Title" value={fatwaTitle} onChange={e => setFatwaTitle(e.target.value)}required />
          <input type="datetime-local" value={fatwaSolvedDate} onChange={e => setFatwaSolvedDate(e.target.value)}required />

          <br /><br />
          <button type="submit">Add Question</button>
        </form>

        <hr />

        <h2>📋 All Questions</h2>
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Category</th>
              <th>Subcategories</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Arabic References</th>
              <th>Reference</th>
              <th>Fatwa Title</th>
              <th>Fatwa Solved Date</th>
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
                  <td><input type="text" value={editQuestion} onChange={e => setEditQuestion(e.target.value)} /></td>
                  <td><input type="text" value={editAnswer} onChange={e => setEditAnswer(e.target.value)} /></td>
                  <td><input type="text" value={editArabicReferences} onChange={e => setEditArabicReferences(e.target.value)} /></td>
                  <td><input type="text" value={editReference} onChange={e => setEditReference(e.target.value)} /></td>
                  <td><input type="text" value={editFatwaTitle} onChange={e => setEditFatwaTitle(e.target.value)} /></td>
                  <td><input type="datetime-local" value={editFatwaSolvedDate} onChange={e => setEditFatwaSolvedDate(e.target.value)} /></td>
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
                  <td>{q.arabicReferences}</td>
                  <td>{q.reference}</td>
                  <td>{q.fatwaTitle}</td>
                  <td>{q.fatwaSolvedDate ? new Date(q.fatwaSolvedDate).toLocaleString() : ''}</td>
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
    </Layout>
  );
}

export default Questions;
