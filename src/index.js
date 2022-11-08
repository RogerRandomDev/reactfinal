import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/main.css';
import App from './App';

import { createContext } from 'react';
const context = createContext();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <context.Provider value={'hi'}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </context.Provider>
);
