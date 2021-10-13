import logo from './logo.svg';
import './App.css';
import HouseZipUrlContainer from './components/HouseZipUrlContainer';
import { useState } from 'react';
import HouseFdContainer from './components/HouseFdContainer';
import { Divider } from 'semantic-ui-react';

function App() {
  const [houseFdData, setHouseFdData] = useState([]);

  return (
    <div className="App">
      <HouseZipUrlContainer
        houseFdData={houseFdData}
        setHouseFdData={setHouseFdData}
      />
      <Divider hidden />
      <HouseFdContainer houseFdData={houseFdData} />

    </div>
  );
}

export default App;
