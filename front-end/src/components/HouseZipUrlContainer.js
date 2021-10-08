import React, { useState } from "react";
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
    <div className="text-center">
      <div>
        {renderHouseZipUrls(houseZipUrls)}
      </div>
      <div>
        <button onClick={getHouseZipUrls}>SHOW</button>
        <button onClick={refreshHouseZipUrls}>REFRESH</button>
        <button onClick={deleteHouseZipUrls}>DELETE</button>
      </div>
      <div>
        {apiResponse ? `API Response ${apiResponse}` : ""}
      </div>
    </div>
  );
}

export default HouseZipUrlContainer;