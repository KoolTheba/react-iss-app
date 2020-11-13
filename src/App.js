import React from 'react'

// components
import Navbar from './components/Navbar'
import CurrentLoc from './components/CurrentLoc'
import SpacePeople from './components/SpacePeople'

// styles
import './App.css'

function App() {
  return (
    <>
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <main className="App-main">
        <CurrentLoc refreshMs={10000}/>
        <SpacePeople />
      </main>
    </div>
    </>
  );
}

export default App
