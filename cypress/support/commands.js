/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import faker from 'faker'
import moment from 'moment'

Cypress.Commands.add('newPatient', (patientExists = false) => {
  cy.get('[data-cy=top-navigation-PATIENT').click()
  cy.get(`[data-cy=${patientExists ? 'new-patient' : 'new-patient-hero'}]`).click()
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  cy.get('[data-cy=first_name] input').type(firstName)
  cy.get('[data-cy=last_name] input').type(lastName)
  cy.get('[name=birthDate]').type(moment(faker.date.past()).format('YYYY-MM-DD'))
  cy.get('[data-cy=description]').type(faker.lorem.sentence())
  cy.get('[data-cy=patient-save-button]').click()
  cy.get('.ui.header').contains(`${firstName} ${lastName}`)
})

Cypress.Commands.add('newAppointment', () => {
  cy.get('[data-cy=new-appointment]').click()
  cy.get('[data-cy=description]').type(faker.lorem.sentence())
  cy.get('[data-cy=appointment-save-button]').click()
  cy.get('[data-cy=appointment-details').contains('Wizyta')
})
