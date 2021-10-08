import React from "react";
import HouseFdEntry from "./HouseFdEntry";

function HouseFdContainer(props) {
  const { houseFdData } = props;

  return (
    <table className="text-center">
      <thead>
        <td>index</td>
        <td>prefix</td>
        <td>last</td>
        <td>first</td>
        <td>suffix</td>
        <td>filingtype</td>
        <td>statedst</td>
        <td>year</td>
        <td>filingdate</td>
        <td>docid</td>
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