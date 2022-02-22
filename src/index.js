import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from './context/user'
import { InterviewedProvider } from './context/interviewed';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <InterviewedProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </InterviewedProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
