import React from 'react';
import {Switch, Route } from "react-router-dom";
import Detail from './components/Detail';
import HomeScreen from './components/HomeScreen';
import './App.css';

function App() {
  return (
    <div className="app">
        <Switch>
          <Route path='/' exact>
            <HomeScreen />
          </Route>
          <Route path ='/detail/:id'>
            <Detail />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
