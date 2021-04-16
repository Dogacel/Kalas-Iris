import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./components/UserContext";
import { AnnotationProvider } from "./components/AnnotationContext";

ReactDOM.render(
  <Router>
    <UserProvider>
      <AnnotationProvider>
        <App />
      </AnnotationProvider>
    </UserProvider>
  </Router>,
  document.getElementById("root")
);
