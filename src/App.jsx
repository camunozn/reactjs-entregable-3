import { useEffect, useState } from 'react';
import axios from 'axios';
import LocationInfo from './assets/components/LocationInfo';
import ResidentInfo from './assets/components/ResidentInfo';
import headerImg from './assets/img/header-img.png';
import headerTitle from './assets/img/header-title.png';
import './App.css';

function App() {
  const [rnmLocations, setRnmLocations] = useState({});
  const [rnmLocation, setRnmLocation] = useState({});
  const [rnmLocationSearch, setRnmLocationSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://rickandmortyapi.com/api/location')
      .then(res => setRnmLocations(res.data.info));
  }, []);

  console.log(rnmLocations);

  useEffect(() => {
    const initLocation = Math.floor(Math.random() * 126);
    axios
      .get(`https://rickandmortyapi.com/api/location/${initLocation}`)
      .then(res => setRnmLocation(res.data));
  }, []);

  console.log(rnmLocation);

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
        <div className="search-box">
          <input className="input-search" type="text" />
          <button className="btn btn--search">search location</button>
        </div>
      </header>
      <main>
        <section className="section-location">
          <div className="container">
            <LocationInfo />
          </div>
        </section>
        <section className="section-residents">
          <div className="container grid grid--2-cols">
            <ResidentInfo />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
