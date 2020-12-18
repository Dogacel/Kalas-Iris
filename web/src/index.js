import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <div className="demo">
      <div id="app">
          <App />
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
);