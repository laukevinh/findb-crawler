import logo from './logo.svg';
import './App.css';
import HouseZipUrlContainer from './components/HouseZipUrlContainer';
import { API_URL, API_YEAR_URL } from './constants';
import { useState } from 'react';

function App() {
  const [houseZipUrls, setHouseZipUrls] = useState([]);
  const [apiResponse, setApiResponse] = useState('');

  const getHouseZipUrls = () => {
    fetch(API_URL).then(response => {
      setApiResponse(response.status)
      return response.json();
    }).then(json => {
      setHouseZipUrls(json);
    }).catch(err => {
      console.log("Fetch error", err);
    })
  }

  const deleteHouseZipUrls = () => {
    fetch(API_URL, { method: 'DELETE' }).then(response => {
      setApiResponse(response.status);
    }).catch(err => {
      console.log("Fetch error", err);
    })
  }

  const refreshHouseZipUrls = () => {
    fetch(API_URL, { method: 'POST' }).then(response => {
      setApiResponse(response.status);
    }).catch(err => {
      console.log("Fetch error", err);
    })
  }

  const getHouseFdData = (year) => {
    fetch(API_YEAR_URL + year + '/').then(response => {
      return response.json();
    }).then(json => {
      console.log(json);
    }).catch(err => {
      console.log("Fetch error", err);
    })
  }

  const refreshHouseFdData = () => { }

  const deleteHouseFdData = () => { }

  return (
    <div className="App">
      <h2>House Financial Disclosures Zip Urls</h2>
      <HouseZipUrlContainer
        houseZipUrls={houseZipUrls}
        getHouseFdData={getHouseFdData}
      />
      <button onClick={getHouseZipUrls}>SHOW</button>
      <button onClick={refreshHouseZipUrls}>REFRESH</button>
      <button onClick={deleteHouseZipUrls}>DELETE</button>
      <div>
        {apiResponse ? `API Response ${apiResponse}` : ""}
      </div>
      <br />
      <br />
      <h2>Transactions</h2>
    </div>
  );
}

export default App;
