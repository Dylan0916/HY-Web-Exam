import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './components/GlobalStyle';
import App from './components/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
