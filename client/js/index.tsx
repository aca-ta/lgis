import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router';
import {applyMiddleware, compose, createStore, Reducer} from 'redux';
import {Lgis} from './components/lgis';
import {reducer} from './reducers';

const history = createBrowserHistory();

const store = createStore(
  connectRouter(history)(reducer),
  typeof window !== 'undefined' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  compose(
    applyMiddleware(
    routerMiddleware(history),
  ))
);

window.addEventListener(
  'load',
  () => {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Switch>
              <Route exact={true} component={Lgis} />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>,
      document.querySelector('#app'),
    );
  },
  false,
);
