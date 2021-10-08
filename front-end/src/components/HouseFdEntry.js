import React from "react";

function HouseFdEntry(props) {
  const { index, prefix, last, first, suffix, filingtype,
    statedst, year, filingdate, docid, created_on } = props;

  return (
    <tr className="text-center" key={index}>
      <td>{index}</td>
      <td>{prefix}</td>
      <td>{last}</td>
      <td>{first}</td>
      <td>{suffix}</td>
      <td>{filingtype}</td>
      <td>{statedst}</td>
      <td>{year}</td>
      <td>{filingdate}</td>
      <td>{docid}</td>
    </tr>
  );
}

export default HouseFdEntry;