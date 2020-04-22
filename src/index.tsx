import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import * as serviceWorker from './serviceWorker';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    display: grid;
    justify-content: center;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
