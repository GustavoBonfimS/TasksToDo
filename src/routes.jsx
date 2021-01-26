import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Forget from './pages/Forget';
import CreateUser from './pages/CreateUser';
import Home from './pages/Home';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Login} exact />
        <Route path='/forget' component={Forget} />
        <Route path='/home' component={Home} />
        <Route path='/create' component={CreateUser} />
      </Switch>
    </BrowserRouter>
  );
}
