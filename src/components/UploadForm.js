// src/components/UploadForm.js
import React, { useState } from 'react';
import axios from 'axios';

export default function UploadForm({ token, onUpload }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    await axios.post('/api/media/upload', formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    onUpload(file.name);
  };

  return (
    <div>
      <h3>Upload Media</h3>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
