import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Alert from "./component/Alert";
import Landing from "./component/Landing";

import Register from "./component/auth/Register";
import Login from "./component/auth/Login";

import setAuthToken from "./UTILS/util";

import DashBoard from "./component/DashBoard";
import Tempo from "./component/sharing/Tempo";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const data = new Date().getFullYear();
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);

  return (
    <Router>
      <Alert />
      <Switch>
        <Route exact path="/" component={Landing}></Route>

        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/dashboard" component={DashBoard} />
        <Route exact path="/login" component={Login}></Route>
        <Route path="/get/links/:id" component={Tempo} />
      </Switch>
      <p className="foot">
        &copy;{data} All Rights Reserved <br />
        Developed By Gunratna More
      </p>
    </Router>
  );
};

export default App;
