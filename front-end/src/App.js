import logo from './logo.svg';
import './App.css';
import HouseZipUrlContainer from './components/HouseZipUrlContainer';
import { API_URL, API_YEAR_URL } from './constants';
import { useState } from 'react';
import HouseFdContainer from './components/HouseFdContainer';

function App() {
  const [houseFdData, setHouseFdData] = useState([]);

  return (
    <div className="App">
      <h2>House Financial Disclosures Zip Urls</h2>
      <HouseZipUrlContainer
        houseFdData={houseFdData}
        setHouseFdData={setHouseFdData}
      />
      <br />
      <br />
      <h2>Transactions</h2>
      <HouseFdContainer houseFdData={houseFdData} />
    </div>
  );
}

export default App;
