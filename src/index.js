import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-offline/semantic.min.css';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import { configureStore } from './store';
ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>
, document.getElementById('root'));
