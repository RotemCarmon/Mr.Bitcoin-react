import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import HomePage from "./pages/HomePage";
import ContactPage from './pages/ContactPage';
import  ContactDetails from './pages/ContactDetails';
import  ContactEdit from './pages/ContactEdit';
import  StatisticPage from './pages/StatisticPage';
import SignupPage from './pages/SignupPage'
import AppHeader from './cmps/AppHeader'
import AppFooter from './cmps/AppFooter'

const history = createBrowserHistory();

function App() {
  return (
    <div className="App main-layout"> 
      <Router history={history} >
      <AppHeader />
        <main>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/contact" exact component={ContactPage} />
            <Route path="/contact/edit/:id?" exact component={ContactEdit} />
            <Route path="/contact/:id" exact component={ContactDetails} />
            <Route path="/statistic" component={StatisticPage} />
            <Route path="/signup" component={SignupPage} />
          </Switch>
        </main>
        <AppFooter />
      </Router>
    </div>
  );
}

export default App;
