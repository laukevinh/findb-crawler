import React, { useState } from "react";
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
    <div className="text-center" key={index.toString()}>
      {year}: {url} ({lastCrawledDate === null ? "N/A" : lastCrawledDate})
      <button onClick={() => getHouseFdData(year)}>Show</button>
      <button onClick={() => refreshHouseFdData(year)}>Refresh</button>
      <button onClick={() => deleteHouseFdData(year)}>Delete</button>
    </div>
  );
}

export default HouseZipUrl;