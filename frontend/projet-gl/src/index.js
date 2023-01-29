import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AnnoncesContextProvider } from './context/AnnoncesContext';
import { AuthContextProvider } from './context/authContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <AnnoncesContextProvider>
    <App />
    </AnnoncesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

