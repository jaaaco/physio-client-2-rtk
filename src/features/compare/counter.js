import { actions } from '../navigation/_redux'
import { Menu } from 'semantic-ui-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectors } from './_redux'

const CompareCounter = () => {
  const comparedScansCount = useSelector(selectors.count)
  const dispatch = useDispatch()
  return (
    <Menu.Item
      disabled={!comparedScansCount}
      name={`Porównaj (${comparedScansCount})`}
      onClick={() => dispatch(actions.navigate('COMPARE'))}
    />
  )
}

export default CompareCounter
