import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import  "./styles/global-css.css"
import store from './state/store/store';
import { Provider } from 'react-redux';
import { SnackbarProvider } from "notistack"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
    <Provider store={store}>
      <App />
      </Provider>
      </SnackbarProvider>
  </React.StrictMode>
);
