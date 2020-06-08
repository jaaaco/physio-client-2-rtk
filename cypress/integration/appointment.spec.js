/* eslint-disable no-undef */
/// <reference types="cypress" />

import faker from 'faker'
import moment from 'moment'

context('appointment', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.window().invoke('resetApp')
    cy.reload()
  })
  it('opens empty appointment list', () => {
    cy.wait(100)
    cy.get('[data-cy=top-navigation-APPOINTMENT').click()
    cy.get('.ui.header').contains('Jeszcze nie zarejestrowano żadnej wizyty')
  })
  it('adds new visit', () => {
    cy.newPatient()
    cy.get('[data-cy=new-appointment]').click()
    cy.get('[data-cy=description]').type(faker.lorem.sentence())
    cy.get('[data-cy=appointment-save-button]').click()
    cy.get('[data-cy=appointment-details').contains('Wizyta')
  })
  it('cancels adding new visit', () => {
    cy.newPatient()
    cy.get('[data-cy=new-appointment]').click()
    cy.get('[data-cy=appointment-cancel]').click()
    cy.get('[data-cy=patient-header-content]').contains('Szczegóły Pacjenta')
  })
  it('navigates to appointment details', () => {
    cy.newPatient()
    cy.newAppointment()
    cy.get('[data-cy=navigate-back]').click()
    cy.get('[data-cy=appointment-list] tbody tr:eq(0)').click()
    cy.get('[data-cy=appointment-details').contains('Wizyta')
  })
  it('edits appointment', () => {
    cy.newPatient()
    cy.newAppointment()
    cy.get('[data-cy=dropdown]').click().find('span').click()
    const newDescription = faker.lorem.sentence()
    cy.get('[data-cy=description]').clear().type(newDescription)
    // const newDate = moment(faker.date.past()).format('YYYY-MM-DD HH:mm:ss')
    // cy.get('[name=visitDate]').clear().type(newDate)
    cy.get('[data-cy=appointment-save-button]').click()
    cy.get('[data-cy=appointment-description').contains(newDescription)
    // cy.get('[data-cy=appointment-details').contains(newDate)
  })
  it('adds three visits on a general list', () => {
    cy.newPatient()
    cy.newAppointment()
    cy.newPatient(true)
    cy.newAppointment()

    cy.get('[data-cy=top-navigation-APPOINTMENT').click()
    cy.get('[data-cy=appointment-list] tbody').find('tr').should('have.length', 2)
  })
  it('filters visits by patient', () => {
    cy.newPatient()
    cy.newAppointment()
    cy.newPatient(true)
    cy.newAppointment()
    cy.get('[data-cy=navigate-back]').click()
    cy.get('[data-cy=appointment-list] tbody').find('tr').should('have.length', 1)
  })
})
