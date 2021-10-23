import React, { useState } from "react";
import { Container, Header, Table } from "semantic-ui-react";
import HouseFdEntry from "./HouseFdEntry";

function HouseFdContainer(props) {
  const { houseFdData, setHouseFdData } = props;
  const [column, setColumn] = useState(null);
  const [isAscending, setIsAscending] = useState(true);

  const headerCellTitles = ['index', 'prefix', 'last', 'first',
    'suffix', 'filingtype', 'statedst', 'year', 'filingdate', 'docid'];

  const sortByColumn = (newColumn) => {
    let data = [];
    if (column === newColumn) {
      setIsAscending(!isAscending);
      data = houseFdData.slice().reverse();
    } else {
      setIsAscending(true);
      setColumn(newColumn);
      data = [...houseFdData].sort((a, b) => {
        if (a[newColumn] < b[newColumn])
          return -1;
        else if (a[newColumn] > b[newColumn])
          return 1;
        return 0;
      });
    }
    setHouseFdData(data);
  }

  const getDocType = (doctype) => {
    if (!doctype || typeof doctype !== "string" || doctype.toUpperCase() !== 'P') {
      return 'financial';
    }
    return 'ptr'
  }

  return (
    <Container>
      <Header as='h1'>
        House Financial Disclosure Details
      </Header>
      <Container style={{ overflow: 'auto', maxHeight: '600px' }}>
        <Table sortable celled >
          <Table.Header>
            <Table.Row>
              {
                headerCellTitles.map(title => {
                  return (
                    <Table.HeaderCell
                      sorted={column === title ?
                        (isAscending ? 'ascending' : 'descending')
                        : null
                      }
                      onClick={() => sortByColumn(title)}
                    >
                      {title}
                    </Table.HeaderCell>
                  );
                })
              }
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              houseFdData.map((entry, index) => {
                return (
                  <HouseFdEntry
                    index={index}
                    doctype={getDocType(entry.filingtype)}
                    {...entry}
                  />
                )
              })
            }
          </Table.Body>
        </Table>
      </Container>
    </Container>
  );
}

export default HouseFdContainer;