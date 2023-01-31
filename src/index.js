import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from './context/user'
import { InterviewedProvider } from './context/interviewed';
import { UtilsProvider } from './context/utils';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <InterviewedProvider>
        <UtilsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UtilsProvider>
      </InterviewedProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
