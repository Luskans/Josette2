import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'flowbite';

const theme = localStorage.getItem('theme');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* <main className={`main ${theme ?? 'light'} text-foreground bg-background`}> */}
          <App />
        {/* </main> */}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
