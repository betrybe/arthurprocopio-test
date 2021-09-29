import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { LoginPage, WalletPage } from './pages';

function App() {
  return (
    <Switch>
      <Route path="/carteira" exact>
        <WalletPage />
      </Route>
      <Route path="/" exact>
        <LoginPage />
      </Route>
    </Switch>
  );
}

export default App;
