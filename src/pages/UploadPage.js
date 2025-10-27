// src/pages/UploadPage.js
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import UploadForm from '../components/UploadForm';
import StreamPage from './StreamPage';

export default function UploadPage() {
  const { token } = useAuth();
  const [filename, setFilename] = useState('');

  return (
    <div>
      <UploadForm token={token} onUpload={setFilename} />
      {filename && <StreamPage filename={filename} />}
    </div>
  );
}
