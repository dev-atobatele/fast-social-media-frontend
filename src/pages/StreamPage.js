// src/pages/StreamPage.js
import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import axios from 'axios';

export default function StreamPage({ filename }) {
  const videoRef = useRef(null);
  const [status, setStatus] = useState('Checking...');

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await axios.get(`/api/media/status/${filename}`);
      if (res.data === 'Ready') {
        setStatus('Ready');
        clearInterval(interval);

        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(`/api/media/stream/${filename}/index.m3u8`);
          hls.attachMedia(videoRef.current);
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [filename]);

  return (
    <div>
      <h3>Streaming: {filename}</h3>
      <p>Status: {status}</p>
      <video ref={videoRef} controls width="640" style={{ display: status === 'Ready' ? 'block' : 'none' }} />
    </div>
  );
}
