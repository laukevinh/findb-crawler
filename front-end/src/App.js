import logo from './logo.svg';
import './App.css';
import HouseZipUrlContainer from './components/HouseZipUrlContainer';
import { useState } from 'react';
import HouseFdContainer from './components/HouseFdContainer';
import { Container, Divider, Grid, Header } from 'semantic-ui-react';

function App() {
  const [houseFdData, setHouseFdData] = useState([]);

  return (
    <div className="App">
      <Container>
        <Header as='h1' dividing>
          House Financial Disclosures Zip Urls
        </Header>
      </Container>
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
