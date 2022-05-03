import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react';
import 'flowbite';

const container = document.getElementById('root')!;
const root = createRoot(container);

let persistor = persistStore(store)

root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </PersistGate>
    </Provider>
);
