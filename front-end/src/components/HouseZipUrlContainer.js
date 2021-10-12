import React, { useState } from "react";
import { Button, Container, Divider, Grid, Header, Segment } from "semantic-ui-react";
import { API_URL } from "../constants";
import HouseZipUrl from "./HouseZipUrl";

function HouseZipUrlContainer(props) {
  const { setHouseFdData } = props;
  const [houseZipUrls, setHouseZipUrls] = useState([]);
  const [apiResponse, setApiResponse] = useState('');

  const getHouseZipUrls = () => {
    fetch(API_URL).then(response => {
      setApiResponse(response.status)
      return response.json();
    }).then(json => {
      json.sort((a, b) => {
        if (a.year < b.year)
          return -1;
        else if (a.year > b.year)
          return 1;
        return 0;
      });
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

  const renderHouseZipUrls = houseZipUrls => {
    return houseZipUrls.map(({ year, url, url_crawled_on }, index) => {
      return (
        <HouseZipUrl
          index={index}
          year={year}
          url={url}
          url_crawled_on={url_crawled_on}
          setHouseFdData={setHouseFdData}
        />
      );
    })
  }

  return (
    <Container>
      <Header as='h1'>
        House Financial Disclosures Zip Urls
      </Header>
      <Segment attached='top'>
        <Button small onClick={getHouseZipUrls}>SHOW</Button>
        <Button onClick={refreshHouseZipUrls}>REFRESH</Button>
        <Button onClick={deleteHouseZipUrls}>DELETE</Button>
      </Segment>
      <Segment attached>
        <Grid columns={3}>
          {renderHouseZipUrls(houseZipUrls)}
        </Grid>
      </Segment>
      <Segment attached='bottom'>
        {apiResponse ? `API Response ${apiResponse}` : ""}
      </Segment>
    </Container>
  );
}

export default HouseZipUrlContainer;