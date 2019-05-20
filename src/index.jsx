import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import './index.css';
import App from './App';
import FilterStore from './stores';

ReactDOM.render(
  <Provider {...FilterStore}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
