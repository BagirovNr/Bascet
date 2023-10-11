import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux'
import { Store } from './store';
import Favorits from './favorits';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={Store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path="/favorits" element={<Favorits />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
