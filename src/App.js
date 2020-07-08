import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import home from './components/home.jsx';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={home} />
      </Switch>
    </Router>
  );
}

export default App;
