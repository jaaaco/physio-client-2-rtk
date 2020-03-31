import React from 'react'

import Flash from './features/flash'
import Navigation from './features/navigation'
import Switch from './features/switch'

const App = () => (
  <>
    <Navigation />
    <div style={{ margin: '2em' }}>
      <Switch />
    </div>
    <Flash />
  </>
)

export default App
