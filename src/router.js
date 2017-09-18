import React from 'react';
import { Router, Route,Redirect } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Login from "./routes/Login.js";

import Home from "./routes/Home.js";

import Service from "./routes/Service.js";

import Persion from "./routes/Persion.js";

import App from "./routes/App.js";

import ApprovalMatters from "./routes/ApprovalMatters.js";

import Matter from "./routes/Matter.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route component={IndexPage}>
        <Redirect from="/" to="/home"/>
        <Route path="/home" component={Home} />
        <Route path="/service" component={Service} />
        <Route path="/persion" component={Persion} />
        <Route path="/ApprovalMatters" component={ApprovalMatters} />
        <Route path="/matter/:matter" component={Matter} />
      </Route>
      <Route path="/login" component={Login} />
      
    </Router>
  );
}

export default RouterConfig;
