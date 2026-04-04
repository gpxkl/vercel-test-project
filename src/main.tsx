
import React from 'react';
import ReactDOM from 'react-dom/client';
import FeedView from './components/Social/FeedView';
import '../globals.css';
import '../style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FeedView />
  </React.StrictMode>,
);
