import React, { Component } from "react";
import HouseZipUrl from "./HouseZipUrl";

class HouseZipUrlContainer extends Component {
  renderHouseZipUrls = houseZipUrls => {
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
  render() {
    return (
      <div className="text-center">
        {this.renderHouseZipUrls(this.props.houseZipUrls)}
      </div>
    );
  }
}

export default HouseZipUrlContainer;