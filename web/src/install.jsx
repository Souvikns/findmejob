import React from 'react';
import {createRoot} from 'react-dom/client';
import DownloadPage from './DownloadPage';
import './styles.css';

// Named `install`, not `download`: macOS filesystems are case-insensitive, so
// a `download.jsx` beside `Download.jsx` is the same file. The page is still
// served at /download.html.
createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <DownloadPage />
    </React.StrictMode>,
);
