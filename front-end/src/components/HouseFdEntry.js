import React from "react";
import { Table } from "semantic-ui-react";

function HouseFdEntry(props) {
  const { index, prefix, last, first, suffix, filingtype,
    statedst, year, filingdate, docid } = props;

  return (
    <Table.Row className="text-center" key={index.toString()}>
      <Table.Cell>{index}</Table.Cell>
      <Table.Cell>{prefix}</Table.Cell>
      <Table.Cell>{last}</Table.Cell>
      <Table.Cell>{first}</Table.Cell>
      <Table.Cell>{suffix}</Table.Cell>
      <Table.Cell>{filingtype}</Table.Cell>
      <Table.Cell>{statedst}</Table.Cell>
      <Table.Cell>{year}</Table.Cell>
      <Table.Cell>{filingdate}</Table.Cell>
      <Table.Cell>{docid}</Table.Cell>
    </Table.Row>
  );
}

export default HouseFdEntry;