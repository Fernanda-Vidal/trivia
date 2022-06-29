import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Trivia from './pages/Trivia';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/trivia" component={ Trivia } />
      </Switch>
    </div>
  );
}
