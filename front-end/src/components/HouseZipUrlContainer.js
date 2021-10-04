import React from "react";
import HouseZipUrl from "./HouseZipUrl";

function HouseZipUrlContainer(props) {
  const { houseZipUrls } = props;

  const renderHouseZipUrls = houseZipUrls => {
    return houseZipUrls.map(({ year, url, crawled_on }, index) => {
      return (
        <HouseZipUrl
          index={index}
          year={year}
          url={url}
          crawled_on={crawled_on}
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