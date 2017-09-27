import React from 'react';
import { Router, Route,Redirect } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Login from "./routes/Login.js";

import Home from "./routes/Home.js";

import Service from "./routes/Service.js";

import Persion from "./routes/Persion.js";



import ApprovalMatters from "./routes/approvalMatters/ApprovalMatters.js";
import Approval from "./routes/approvalMatters/Approval.js";
import ApprovalDone from "./routes/approvalMatters/ApprovalDone.js";

import Matter from "./routes/Matter.js";

function RouterConfig({ history,app }) {

  function requireAuth(nextState, replace, callback) {
    console.log(11111)
    // app._store.dispatch({
    //     type: 'app/enterAuth',
    //     payload: {},
    //     onComplete: callback
    // });
}
  




  return (
    <Router history={history}>
      <Route component={IndexPage} >
        <Redirect from="/" to="/home"/>
        <Route path="/home" component={Home} />
        <Route path="/service" component={Service} />
        <Route path="/persion" component={Persion} />
        <Route path="/approvalMatters" component={ApprovalMatters} >
          <Route path="/approvalMatters/approval"  component={Approval}></Route>
          <Route path="/approvalMatters/approvalDone"  component={ApprovalDone}></Route>
        </Route>
        <Route path="/matter/:matter" component={Matter} />
      </Route>
      <Route path="/login" component={Login} />
      
    </Router>
  );
}

export default RouterConfig;
