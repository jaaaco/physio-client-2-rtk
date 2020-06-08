import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import PouchDb from 'pouchdb'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

// expose store when run in Cypress
if (window.Cypress) {
  window.resetApp = async function () {
    const patients = new PouchDb('patients')
    await patients.destroy()

    const appointments = new PouchDb('appointments')
    await appointments.destroy()

    const settings = new PouchDb('settings')
    await settings.destroy()
  }
}
