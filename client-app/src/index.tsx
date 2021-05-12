import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import NotFound from './components/NotFound';
import { createBrowserHistory } from "history";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from 'react-toastify';

export const history = createBrowserHistory();

ReactDOM.render(
  <>
    <ToastContainer position="bottom-right"/>
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact  component={ NotFound}/>
    </Switch>
    </Router>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
