import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div className="demo">
        <div id="app">
          <App />
        </div>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
