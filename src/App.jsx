import { useEffect, useState } from 'react';
import axios from 'axios';
import LocationInfo from './assets/components/LocationInfo';
import ResidentInfo from './assets/components/ResidentInfo';
import headerImg from './assets/img/header-img.png';
import headerTitle from './assets/img/header-title.png';
import './App.css';

function App() {
  const [locationCount, setLocationCount] = useState(0);
  const [location, setLocation] = useState({});
  const [locationId, setLocationId] = useState('');

  const generateRandom = function (limit) {
    return Math.floor(Math.random() * limit);
  };

  useEffect(() => {
    axios
      .get('https://rickandmortyapi.com/api/location')
      .then(res => setLocationCount(res.data.info.count));
  }, []);

  useEffect(() => {
    const initLocation = generateRandom(locationCount);

    axios
      .get(`https://rickandmortyapi.com/api/location/${initLocation}`)
      .then(res => setLocation(res.data));
  }, [locationCount]);

  const searchLocation = function () {
    axios
      .get(`https://rickandmortyapi.com/api/location/${locationId}`)
      .then(res => setLocation(res.data));
  };

  const headerBackground = {
    backgroundImage: `url(${headerImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top',
  };

  return (
    <div className="App">
      <header className="header" style={headerBackground}>
        <img
          className="header-title"
          src={headerTitle}
          alt="Rick and Morty header title"
        />
        <div className="search-box">
          <input
            className="input-search"
            type="number"
            placeholder="Type a location ID"
            value={locationId}
            onChange={e => setLocationId(e.target.value)}
          />
          <button className="btn btn--search" onClick={searchLocation}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </header>
      <main>
        <section className="section-location">
          <div className="container">
            <LocationInfo location={location} />
          </div>
        </section>
        <section className="section-residents">
          <div className="container grid grid--2-cols">
            {location.residents?.map(resident => (
              <ResidentInfo key={resident} residentUrl={resident} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
