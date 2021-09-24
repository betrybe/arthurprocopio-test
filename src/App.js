import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LoginPage, WalletPage } from './pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <Route path="/carteira" exact>
          <WalletPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
