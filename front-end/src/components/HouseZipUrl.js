import React, { Component } from "react";

class HouseZipUrl extends Component {
  render() {
    return (
      <div className="text-center" key={this.props.index}>
        {this.props.year}: {this.props.url} ({this.props.crawled_on ? "N/A" : this.props.crawled_on})
      </div>
    );
  }
}

export default HouseZipUrl;