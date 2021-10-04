import logo from './logo.svg';
import './App.css';
import HouseZipUrlContainer from './components/HouseZipUrlContainer';
import { API_URL } from './constants';
import { useState } from 'react';

function App() {
  const [houseZipUrls, setHouseZipUrls] = useState([]);

  const getHouseZipUrls = () => {
    fetch(API_URL).then(response => {
      return response.json();
    }).then(json => {
      setHouseZipUrls(json);
    }).catch(err => {
      console.log("Fetch error", err);
    })
  }

  return (
    <div className="App">
      <h2>House Financial Disclosures Zip Urls</h2>
      <HouseZipUrlContainer houseZipUrls={houseZipUrls} />
      <button onClick={getHouseZipUrls}>GET</button>
    </div>
  );
}

export default App;
