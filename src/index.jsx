import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import './index.css';
import { App } from './App';
import * as stores from './stores';

ReactDOM.render(
  <Provider>
    <App {...stores} />
  </Provider>,
  document.getElementById('root'),
);
