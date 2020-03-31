import React from 'react'
import { Input, Menu } from 'semantic-ui-react'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { navigate, getNavigation } from './slice'

const getComparedScansCount = () => 0

const Navigation = () => {
  const activeNavigation = useSelector(getNavigation)
  const comparedScansCount = useSelector(getComparedScansCount)
  const dispatch = useDispatch()
  const items = [
    {
      name: 'Pacjenci',
      actions: ['PATIENT', 'EDIT_PATIENT']
    },
    { name: 'Wizyty', actions: ['APPOINTMENT'] },
    { name: 'Ustawienia', actions: ['SETTINGS'] }
  ]

  return (
    <Menu data-cy="navigation" size="massive" pointing>
      {items.map(({ name, actions }) => (
        <Menu.Item
          data-cy={`top-navigation-${actions[0]}`}
          key={name}
          name={name}
          active={_.indexOf(actions, activeNavigation) !== -1}
          onClick={() => {
            console.info({ navigate })
            dispatch(navigate(actions[0]))
          }}
        />
      ))}
      <Menu.Menu position="right">
        <Menu.Item
          disabled={!comparedScansCount}
          name={`Porównaj (${comparedScansCount})`}
          onClick={() => dispatch(navigate('COMPARE'))}
        />
        <Menu.Item>
          <Input icon="search" placeholder="Szukaj..." />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default Navigation
