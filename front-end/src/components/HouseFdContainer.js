import React from "react";
import HouseFdEntry from "./HouseFdEntry";

function HouseFdContainer(props) {
  const { houseFdData } = props;

  return (
    <table className="text-center">
      <thead>
        <tr>
          <th>index</th>
          <th>prefix</th>
          <th>last</th>
          <th>first</th>
          <th>suffix</th>
          <th>filingtype</th>
          <th>statedst</th>
          <th>year</th>
          <th>filingdate</th>
          <th>docid</th>
        </tr>
      </thead>
      <tbody>
        {
          houseFdData.map((entry, index) => {
            return (
              <HouseFdEntry
                index={index}
                {...entry}
              />
            )
          })
        }
      </tbody>
    </table>
  );
}

export default HouseFdContainer;