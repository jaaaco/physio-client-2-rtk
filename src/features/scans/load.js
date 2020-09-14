import React, { useEffect } from 'react'
import ScanView from './view'
import { useDispatch, useSelector } from 'react-redux'
import { actions, selectors } from './_redux'

const ScanLoad = ({ scanId }) => {
  const dispatch = useDispatch()
  const loadedScans = useSelector(selectors.loadedScans)
  const loading = useSelector(selectors.loading)
  useEffect(() => {
    dispatch(actions.load(scanId))
  }, [dispatch, scanId])

  if (!scanId) {
    return null
  }

  return (
    <ScanView loading={loading} scan={loadedScans[scanId]} />
  )
}

export default ScanLoad
