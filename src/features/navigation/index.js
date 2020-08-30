import React from 'react'
import { Input, Menu } from 'semantic-ui-react'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { actions, selectors } from './_redux'
import { actions as patientActions } from '../patients/_redux'
import { CompareCounter } from '../compare'

const Navigation = () => {
  const activeNavigation = useSelector(selectors.getNavigation)
  const dispatch = useDispatch()

  const items = [
    {
      name: 'Pacjenci',
      values: ['PATIENT', 'EDIT_PATIENT']
    },
    { name: 'Wizyty', values: ['APPOINTMENT'] },
    { name: 'Ustawienia', values: ['SETTINGS'] }
  ]

  return (
    <Menu data-cy='navigation' size='massive' pointing>
      {items.map(({ name, values }) => (
        <Menu.Item
          data-cy={`top-navigation-${values[0]}`}
          key={name}
          name={name}
          active={_.indexOf(values, activeNavigation) !== -1}
          onClick={() => {
            dispatch(patientActions.reset())
            dispatch(actions.navigate(values[0]))
          }}
        />
      ))}
      <Menu.Menu position='right'>
        <CompareCounter />
        <Menu.Item>
          <Input icon='search' placeholder='Szukaj...' />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

const NavigationSwitch = ({ map }) => {
  const navigation = useSelector(selectors.getNavigation)
  if (map[navigation]) {
    return map[navigation]
  }
  return map._default || null
}

export { Navigation, NavigationSwitch }
