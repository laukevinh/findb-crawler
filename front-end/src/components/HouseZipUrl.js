import React from "react";

function HouseZipUrl(props) {
  const { index, year, url, crawled_on } = props;

  return (
    <div className="text-center" key={index}>
      {year}: {url} ({crawled_on === undefined ? "N/A" : crawled_on})
    </div>
  );
}

export default HouseZipUrl;