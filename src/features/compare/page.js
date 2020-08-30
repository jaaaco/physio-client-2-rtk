import React from 'react'
import { Grid, GridColumn, Button, Header, Icon } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { actions, selectors } from './_redux'

const ComparePage = () => {
  const dispatch = useDispatch()
  const scans = useSelector(selectors.selectAll)

  return (
    <>
      {scans.length > 0 &&
        <Button
          data-cy='new-patient'
          floated='right'
          negative
          onClick={() => dispatch(actions.clear())}
        >
          <Icon name='trash' /> Wyczyść wszystkie
        </Button>
      }
      <Header as='h2'>
        <Icon name='group' />
        <Header.Content>
          Porównanie badań
          <Header.Subheader>Zsynchronizowane</Header.Subheader>
        </Header.Content>
      </Header>
      <Grid columns='3'>
        {scans.map(scanId => (
          <GridColumn key={scanId}>
            <p>TODO MeshViewer</p>
            <Button
              negative
              onClick={e => {
                e.stopPropagation()
                dispatch(actions.remove(scanId))
              }}
            >
              <Icon name='trash' />
              Usuń z porównania
            </Button>
          </GridColumn>
        ))}
      </Grid>
    </>
  )
}

export default ComparePage
