import React from "react";
import HouseZipUrl from "./HouseZipUrl";

function HouseZipUrlContainer(props) {
  const { houseZipUrls, getHouseFdData } = props;

  const renderHouseZipUrls = houseZipUrls => {
    return houseZipUrls.map(({ year, url, url_crawled_on }, index) => {
      return (
        <HouseZipUrl
          index={index}
          year={year}
          url={url}
          url_crawled_on={url_crawled_on}
          getHouseFdData={getHouseFdData}
        />
      );
    })
  }

  return (
    <div className="text-center">
      {renderHouseZipUrls(houseZipUrls)}
    </div>
  );
}

export default HouseZipUrlContainer;