import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

// Components
import Home from './components/HomePage/Home'
import Navbar from './components/Navbar/Navbar'
import CurrentLoc from './components/CurrentLoc/CurrentLoc'
import SpacePeople from './components/SpacePeople/SpacePeople'
import PassTimes from './components/PassTimes/PassTimes'

// styles
import './App.css'

function App() {

  return (
    <>
    <Router>
      <div className="App">
        <Navbar />
          <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route exact path="/currentlocation">
                <CurrentLoc refreshMs={10000}/>
            </Route>
            <Route exact path="/people">
                <SpacePeople />
            </Route>
            <Route exact path="/passtimes">
                <PassTimes />
            </Route>
          </Switch>
      </div>
    </Router>
    </>
  );
}

export default App

