import React, {Component} from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import AdminLayout from '../../Containers/Admin';
import HomePage from '../HomePage';
import IntlProviderWrapper from './IntlProvider';
import "./App.scss";

class App extends Component {
  render() {
    return (
      <IntlProviderWrapper>
        <HashRouter>
          <Switch>
            <Route exact path="/" name="Home" component={HomePage} />
            <Route path="/admin" name="Admin" component={AdminLayout} />
          </Switch>
        </HashRouter>
      </IntlProviderWrapper>
    );
  }
}

export default App;
