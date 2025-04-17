import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

function AdminSlider() {
  const [images, setImages] = useState([]);
  const [replaceFile, setReplaceFile] = useState({});

  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/slider/images');
      setImages(res.data);
    } catch (err) {
      console.error('Error fetching slider images', err);
    }
  };

  const handleReplaceChange = (e, filename) => {
    setReplaceFile(prev => ({ ...prev, [filename]: e.target.files[0] }));
  };

  const handleReplaceSubmit = async (filename) => {
    const file = replaceFile[filename];
    if (!file) return alert('No file selected');

    const formData = new FormData();
    formData.append('image1', file);

    await axios.post(`http://localhost:5000/api/slider/replace/${filename}`, formData);
    setReplaceFile({});
    fetchImages();
  };

  const deleteImage = async (filename) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    await axios.delete(`http://localhost:5000/api/slider/delete/${filename}`);
    fetchImages();
  };

  const handleNewUpload = async (e) => {
    e.preventDefault();
    const file = e.target.elements.image.files[0];
    if (!file) return alert('Select a file first');
    if (images.length >= 4) return alert('Maximum of 4 images allowed.');

    const formData = new FormData();
    formData.append('image1', file);
    await axios.post('http://localhost:5000/api/slider/upload', formData);
    e.target.reset();
    fetchImages();
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h2>🖼️ Admin Slider Control</h2>

        {images.length < 4 && (
          <div>
            <h3>➕ Upload New Image</h3>
            <form onSubmit={handleNewUpload}>
              <input type="file" name="image" accept="image/*" required />
              <button type="submit">Upload</button>
            </form>
          </div>
        )}

        <hr />

        <h3>📸 Uploaded Images</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {images.map((img, i) => (
            <div key={i} style={{ border: '1px solid #ddd', padding: '10px' }}>
              <img
                src={`http://localhost:5000/slider/${img}`}
                alt={`img-${i}`}
                style={{ width: '200px', height: 'auto', objectFit: 'contain' }}
              />
              <div style={{ marginTop: 10 }}>
                <button onClick={() => deleteImage(img)}>🗑️ Delete</button>
              </div>
              <div style={{ marginTop: 10 }}>
                <input type="file" onChange={(e) => handleReplaceChange(e, img)} />
                <button onClick={() => handleReplaceSubmit(img)}>✏️ Replace</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default AdminSlider;
