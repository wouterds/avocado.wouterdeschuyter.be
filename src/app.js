//@flow
import React from 'react';
import type { Node } from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import store from 'store';
import routes from 'routes';
import styles from 'app.css';
import 'styles/core.css';

const App = (): Node => (
  <Provider store={store}>
    <div className={styles.container}>
      <Switch>
        {routes.map(({ path, exact, component: Component }, index: number) => (
          <Route
            key={`route-${index}`}
            exact={exact}
            path={path}
            component={Component}
          />
        ))}
      </Switch>
    </div>
  </Provider>
);

export default App;
