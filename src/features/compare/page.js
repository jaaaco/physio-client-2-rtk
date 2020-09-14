import React from 'react'
import { Segment, Grid, GridColumn, Button, Header, Icon } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { actions, selectors } from './_redux'
import { MeshViewerGroup } from '@dev3dbody/mesh-viewer'
import ScanLoad from '../scans/load'

const ComparePage = () => {
  const dispatch = useDispatch()
  const scans = useSelector(selectors.selectAll)

  if (!scans.length) {
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name='search' />
          Lista skanów do porównania jest pusta.
        </Header>
      </Segment>
    )
  }

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
      <MeshViewerGroup>
        <Grid columns='3'>
          {scans.map(scanId => (
            <GridColumn key={scanId}>
              <ScanLoad scanId={scanId} />
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
      </MeshViewerGroup>
    </>
  )
}

export default ComparePage
