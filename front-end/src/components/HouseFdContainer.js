import React from "react";
import { Container, Header, Table } from "semantic-ui-react";
import HouseFdEntry from "./HouseFdEntry";

function HouseFdContainer(props) {
  const { houseFdData } = props;

  return (
    <Container>
      <Header as='h1'>
        House Financial Disclosure Details
      </Header>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>index</Table.HeaderCell>
            <Table.HeaderCell>prefix</Table.HeaderCell>
            <Table.HeaderCell>last</Table.HeaderCell>
            <Table.HeaderCell>first</Table.HeaderCell>
            <Table.HeaderCell>suffix</Table.HeaderCell>
            <Table.HeaderCell>filingtype</Table.HeaderCell>
            <Table.HeaderCell>statedst</Table.HeaderCell>
            <Table.HeaderCell>year</Table.HeaderCell>
            <Table.HeaderCell>filingdate</Table.HeaderCell>
            <Table.HeaderCell>docid</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
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
        </Table.Body>
      </Table>
    </Container>
  );
}

export default HouseFdContainer;