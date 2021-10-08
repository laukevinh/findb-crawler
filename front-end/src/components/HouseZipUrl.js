import React from "react";
import { API_YEAR_URL } from "../constants";

function HouseZipUrl(props) {
  const { index, year, url, url_crawled_on, setHouseFdData } = props;

  const getHouseFdData = year => {
    fetch(API_YEAR_URL + year + '/').then(response => {
      return response.json();
    }).then(json => {
      setHouseFdData(json);
    }).catch(err => {
      console.log("Fetch error", err);
    })
  }

  return (
    <div className="text-center" key={index}>
      {year}: {url} ({url_crawled_on === null ? "N/A" : url_crawled_on})
      <button onClick={() => getHouseFdData(year)}>Show</button>
      <button>Refresh</button>
      <button>Delete</button>
    </div>
  );
}

export default HouseZipUrl;