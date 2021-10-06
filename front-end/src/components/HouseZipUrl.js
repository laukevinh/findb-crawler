import React from "react";

function HouseZipUrl(props) {
  const { index, year, url, url_crawled_on, getHouseFdData } = props;

  // , refreshHouseFdData, deleteHouseFdData

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