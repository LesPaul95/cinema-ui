import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { App } from './components/App';
import * as stores from './stores';
import './index.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3A2E39',
    },
    secondary: {
      main: '#F2E6D7',
    },
    text: {
      secondary: '#C1B8AC',
    },
  },
});

console.log(theme);

ReactDOM.render(
  <Provider {...stores}>
    <Router>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
