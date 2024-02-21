import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'flowbite';
import 'react-image-crop/dist/ReactCrop.css';

const theme = localStorage.getItem('theme');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <div className={`app ${theme ?? 'light'} text-foreground bg-background`}>
          <App />
        </div>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
