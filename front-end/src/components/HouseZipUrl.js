import React, { useState } from "react";
import { Button, ButtonGroup, Grid, Header } from "semantic-ui-react";
import { API_YEAR_URL } from "../constants";

function HouseZipUrl(props) {
  const { index, year, url, url_crawled_on, setHouseFdData } = props;
  const [lastCrawledDate, setLastCrawledDate] = useState(url_crawled_on);

  const getHouseFdData = year => {
    fetch(API_YEAR_URL + year + '/').then(response => {
      return response.json();
    }).then(json => {
      setHouseFdData(json);
    }).catch(err => {
      console.log("Fetch error", err);
    })
  }

  const refreshHouseFdData = year => {
    fetch(API_YEAR_URL + year + '/', { method: 'POST' }).then(response => {
      setLastCrawledDate(new Date().toLocaleDateString())
    }).catch(err => {
      console.log("Fetch error", err);
    })
  }

  const deleteHouseFdData = year => {
    fetch(API_YEAR_URL + year + '/', { method: 'DELETE' }).then(response => {
      setLastCrawledDate("N/A");
    }).catch(err => {
      console.log("Fetch error", err);
    })
  }

  return (
    <Grid.Column color={lastCrawledDate ? 'blue' : null}>
      <Grid.Row>
        <Header as='h3' inverted={lastCrawledDate !== null}>
          {year}
          <Header.Subheader>
            Last crawled: {lastCrawledDate ? lastCrawledDate.slice(0, 10) : "N/A"}
          </Header.Subheader>
        </Header>
      </Grid.Row>
      <Grid.Row>
        <ButtonGroup>
          <Button as='a' href={url}>Source</Button>
          <Button onClick={() => getHouseFdData(year)}>Show</Button>
          <Button onClick={() => refreshHouseFdData(year)}>Refresh</Button>
          <Button onClick={() => deleteHouseFdData(year)}>Delete</Button>
        </ButtonGroup>
      </Grid.Row>
    </Grid.Column>
  );
}

export default HouseZipUrl;