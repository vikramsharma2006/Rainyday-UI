import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import './App.css';
import Home from './components/home';
import Login from './components/login';
// import Register from './components/register';

class App extends Component {

  render() {
    return (

      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/home" exact component={Home} />
          <Route path="/login" exact component={Login} />
          {/* <Route path="/register" exact component={Register} /> */}
        </Switch>
      </Router>

    );
  }
}

export default App;

