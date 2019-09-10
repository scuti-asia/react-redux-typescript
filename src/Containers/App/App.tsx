import React, {Component} from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import AdminLayout from '../../Containers/Admin';
import HomePage from '../HomePage';
import "./App.scss";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" name="Home" component={HomePage} />
          <Route path="/admin" name="Admin" component={AdminLayout} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
