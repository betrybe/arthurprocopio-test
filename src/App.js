import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { LoginPage, WalletPage } from './pages';
import { MainLayout, MinimalLayout } from './layouts';

function App() {
  return (
    <Switch>
      <Route path="/carteira" exact>
        <MainLayout>
          <WalletPage />
        </MainLayout>
      </Route>
      <Route path="/" exact>
        <MinimalLayout>
          <LoginPage />
        </MinimalLayout>
      </Route>
    </Switch>
  );
}

export default App;
