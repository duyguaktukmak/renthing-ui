import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { store} from './store';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import App from './components/App';

ReactDOM.render((
  <Provider store={store}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
  </Provider>

), document.getElementById('root'));
