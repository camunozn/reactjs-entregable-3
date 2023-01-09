import { useState } from 'react';
import headerImg from './assets/img/header-img.png';
import headerTitle from './assets/img/header-title.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <img
          className="header-img"
          src={headerImg}
          alt="Rick and Morty header image"
        />
        <img
          className="header-title"
          src={headerTitle}
          alt="Rick and Morty header title"
        />
      </header>
      <main></main>
    </div>
  );
}

export default App;
