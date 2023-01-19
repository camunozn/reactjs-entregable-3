import { useEffect, useState } from 'react';
import axios from 'axios';
import LocationInfo from './assets/components/LocationInfo';
import ResidentInfo from './assets/components/ResidentInfo';
import headerImg from './assets/img/header-img.png';
import headerTitle from './assets/img/header-title.png';
import Pagination from './assets/components/Pagination';
import './App.css';

function App() {
  //////////////////////////////////////////////////////////////
  // States Declarations
  const [location, setLocation] = useState({});
  const [locationCount, setLocationCount] = useState(0);
  const [searchedLocation, setSearchedLocation] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [isHidden, setIsHidden] = useState(true);

  //////////////////////////////////////////////////////////////
  // Display random initial location
  // Get total number of locations
  useEffect(() => {
    axios
      .get('https://rickandmortyapi.com/api/location')
      .then(res => setLocationCount(res.data.info.count));
  }, []);

  // Calculate random ID
  const generateRandom = function (limit) {
    return Math.floor(Math.random() * limit);
  };
  // Set random location
  useEffect(() => {
    const initLocation = generateRandom(locationCount);
    axios
      .get(`https://rickandmortyapi.com/api/location/${initLocation}`)
      .then(res => setLocation(res.data));
  }, [locationCount]);

  //////////////////////////////////////////////////////////////
  // Search functionality
  // Get location suggestions from searched value
  useEffect(() => {
    if (searchedLocation) {
      axios
        .get(
          `https://rickandmortyapi.com/api/location?name=${searchedLocation}`
        )
        .then(res => setSearchSuggestions(res.data.results));
      setIsHidden(false);
    } else {
      setSearchSuggestions([]);
      setIsHidden(true);
    }
  }, [searchedLocation]);

  // Set selected location on click
  const selectLocation = suggestion => {
    setLocation(suggestion);
    setSearchedLocation('');
    setIsHidden(true);
  };

  //////////////////////////////////////////////////////////////
  // Pagination functionality
  const resultsPerPage = 10; //Magic number, should be in a config file
  const lastResultIndex = currPage * resultsPerPage;
  const firstResultIndex = lastResultIndex - resultsPerPage;
  const resultsCurrPage = location.residents?.slice(
    firstResultIndex,
    lastResultIndex
  );
  const totalPages = Math.ceil(location.residents?.length / resultsPerPage);
  const pagesArr = [];
  // Filling array with numbers of pages
  for (let i = 1; i <= totalPages; i++) {
    pagesArr.push(i);
  }
  // Function to change page when clicking on buttons
  const changePage = page => {
    setCurrPage(page);
  };
  // Reset current page number after a location change
  useEffect(() => {
    setCurrPage(1);
  }, [location]);

  return (
    <div className="App">
      <header className="header">
        <img
          className="header-title"
          src={headerTitle}
          alt="Rick and Morty header title"
        />
        <div className="search-box">
          <input
            className="input-search"
            type="text"
            placeholder="Type a location name"
            value={searchedLocation}
            onChange={e => {
              setSearchedLocation(e.target.value);
            }}
          />
          <ul className={`search-suggestions ${isHidden ? 'hidden' : ''}`}>
            {searchSuggestions.map(suggestion => (
              <li
                key={suggestion.id}
                onClick={() => selectLocation(suggestion)}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        </div>
      </header>
      <main>
        <section className="section-location">
          <div className="container">
            <LocationInfo location={location} />
          </div>
        </section>
        <section className="section-residents">
          <div className="container container--pagination flex">
            <Pagination
              pagesArr={pagesArr}
              currPage={currPage}
              totalPages={totalPages}
              changePage={changePage}
            />
          </div>
          <div className="container container--residents grid grid--2-cols">
            {resultsCurrPage?.map(resident => (
              <ResidentInfo key={resident} residentUrl={resident} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
