import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserQuestions() {
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserQuestions();
  }, []);

  const fetchUserQuestions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/user-questions');
      setQuestions(res.data);
    } catch (err) {
      console.error('Failed to load user questions', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await axios.delete(`http://localhost:5000/api/user-questions/${id}`);
        fetchUserQuestions();
      } catch (err) {
        alert('Failed to delete the question.');
      }
    }
  };

  const filteredQuestions = questions.filter(q => {
    if (filter === 'pending') return !q.isAnswered;
    if (filter === 'fulfilled') return q.isAnswered;
    return true;
  });

  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h2>User Submitted Questions</h2>

        {/* Filter Dropdown */}
        <div style={{ marginBottom: '15px' }}>
          <label>Filter: </label>
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="fulfilled">Fulfilled</option>
          </select>
        </div>

        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Province</th>
              <th>Address</th>
              <th>SelectContact</th>
              <th>Message</th>
              <th>Submitted At</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((q, idx) => (
                <tr key={idx}>
                  <td>{q.name}</td>
                  <td>{q.email}</td>
                  <td>{q.contact}</td>
                  <td>{q.province}</td>
                  <td>{q.address}</td>
                  <td>{q.select}</td>
                  <td>{q.message}</td>
                  <td>{new Date(q.createdAt).toLocaleString()}</td>
                  <td style={{ textAlign: 'center' }}>
                    {q.isAnswered ? (
                      <button disabled style={{ backgroundColor: 'lightgray', cursor: 'not-allowed' }}>
                        Answered
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          navigate('/questions', {
                            state: {
                              userQuestion: q.message,
                              userQuestionId: q._id
                            }
                          })
                        }
                        style={{ marginRight: '10px' }}
                      >
                        Answer
                      </button>
                    )}
                    <span
                      onClick={() => handleDelete(q._id)}
                      title="Delete"
                      style={{
                        cursor: 'pointer',
                        color: 'red',
                        fontSize: '18px',
                        marginLeft: '6px'
                      }}
                    >
                      🗑️
                    </span>
                  </td>
                  <td style={{ fontWeight: 'bold', color: q.isAnswered ? 'green' : 'orange' }}>
                    {q.isAnswered ? 'Fulfilled' : 'Pending'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ textAlign: 'center' }}>No questions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default UserQuestions;
