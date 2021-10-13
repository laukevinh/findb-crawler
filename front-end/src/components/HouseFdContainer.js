import React from "react";
import { Container, Header, Table } from "semantic-ui-react";
import HouseFdEntry from "./HouseFdEntry";

function sortReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        }
      }
      return {
        column: action.column,
        data: [...state.data].sort((a, b) => {
          if (a[action.column] < b[action.column])
            return -1;
          else if (a[action.column] > b[action.column])
            return 1;
          return 0;
        }),
        direction: 'ascending',
      }
    default:
      throw new Error()
  }
}

function HouseFdContainer(props) {
  const [state, dispatch] = React.useReducer(sortReducer, {
    column: null,
    data: props.houseFdData,
    direction: null,
  })
  const { column, data, direction } = state
  const headerCellTitles = ['index', 'prefix', 'last', 'first',
    'suffix', 'filingtype', 'statedst', 'year', 'filingdate', 'docid'];

  return (
    <Container>
      <Header as='h1'>
        House Financial Disclosure Details
      </Header>
      <Table sortable celled>
        <Table.Header>
          <Table.Row>
            {
              headerCellTitles.map(title => {
                return (
                  <Table.HeaderCell
                    sorted={column === title ? direction : null}
                    onClick={() => dispatch({ type: 'CHANGE_SORT', column: title })}
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
            data.map((entry, index) => {
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