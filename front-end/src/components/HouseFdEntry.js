import React from "react";
import { Table } from "semantic-ui-react";

function HouseFdEntry(props) {
  const { index, doctype, prefix, last, first, suffix, filingtype,
    statedst, year, filingdate, docid } = props;
  const url = `https://disclosures-clerk.house.gov/public_disc/${doctype}-pdfs/${year}/${docid}.pdf`

  return (
    <Table.Row key={index.toString()}>
      <Table.Cell>{index}</Table.Cell>
      <Table.Cell>{prefix}</Table.Cell>
      <Table.Cell>{last}</Table.Cell>
      <Table.Cell>{first}</Table.Cell>
      <Table.Cell>{suffix}</Table.Cell>
      <Table.Cell>{filingtype}</Table.Cell>
      <Table.Cell>{statedst}</Table.Cell>
      <Table.Cell>{year}</Table.Cell>
      <Table.Cell>{filingdate}</Table.Cell>
      <Table.Cell >
        <a href={url} target='_blank'>{docid}</a>
      </Table.Cell>
    </Table.Row>
  );
}

export default HouseFdEntry;