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
import Loading from 'feature/indicator/Loading';

const container = document.getElementById('root')!;
const root = createRoot(container);

export let persistor = persistStore(store)
const loading = <Loading />
root.render(
  <Provider store={store}>
    <PersistGate loading={loading} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
