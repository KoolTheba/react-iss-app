import React from 'react'

// components
import Navbar from './components/Navbar'
import CurrentLoc from './components/CurrentLoc'

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
      </main>
    </div>
    </>
  );
}

export default App
