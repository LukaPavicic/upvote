import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginScreen from './screens/Auth/LoginScreen';

function App() {
  return (
    <Router>
      <div style={{width: "100%", height: "100vh"}}>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={HomeScreen}/>
          <Route exact path="/login" component={LoginScreen}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
