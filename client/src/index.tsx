import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
);
