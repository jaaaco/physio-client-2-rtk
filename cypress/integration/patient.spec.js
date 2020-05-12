/// <reference types="cypress" />

import faker from 'faker'
import moment from 'moment'

context('patient', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.window().invoke('resetApp')
    cy.reload()
  })
  it('opens empty patient list', () => {
    cy.get('.ui.header').contains('Jeszcze nie zarejestrowano żadnego pacjenta')
  })
  it('shows validation errors', () => {
    cy.get('[data-cy=new-patient-hero]').click()
    cy.get('[data-cy=patient-save-button]').click()
    cy.get('[data-cy=first_name]').parent().should('have.class', 'error')
    cy.get('[data-cy=last_name]').parent().should('have.class', 'error')
    cy.get('[data-cy=validation-error-message')
      .should('be.visible')
  })
  it('edits patient from patient details page', () => {
    cy.get('[data-cy=new-patient-hero]').click()
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    cy.get('[data-cy=first_name] input').type(firstName)
    cy.get('[data-cy=last_name] input').type(lastName)
    cy.get('[name=birthDate]').type(moment(faker.date.past()).format('YYYY-MM-DD'))
    cy.get('[data-cy=description]').type(faker.lorem.sentence())
    cy.get('[data-cy=patient-save-button]').click()
    cy.get('[data-cy=dropdown-button-icon]').click().find('span').click()

    const newFirstName = faker.name.firstName()
    const newLastName = faker.name.lastName()
    const newDescription = faker.lorem.sentence()

    cy.get('[data-cy=first_name] input').clear().type(newFirstName)
    cy.get('[data-cy=last_name] input').clear().type(newLastName)
    cy.get('[name=birthDate]').clear().type(moment(faker.date.past()).format('YYYY-MM-DD'))
    cy.get('[data-cy=description]').clear().type(newDescription)
    cy.get('[data-cy=patient-save-button]').click()

    cy.get('.ui.header').contains(`${newFirstName} ${newLastName}`)
    cy.get('[data-cy=top-navigation-PATIENT]').click()
    cy.get('[data-cy=data-name-cell]').contains(`${newFirstName} ${newLastName}`)
    cy.get('.ui.header').contains('1 rekordów')
  })
  it('cancels adding new patient', () => {
    cy.get('[data-cy=new-patient-hero]').click()
    cy.get('[data-cy=patient-cancel-button]').click()
    cy.get('.ui.header').contains('Jeszcze nie zarejestrowano żadnego pacjenta')
  })
  it('adds new patient', () => {
    cy.get('[data-cy=new-patient-hero]').click()
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    cy.get('[data-cy=first_name] input').type(firstName)
    cy.get('[data-cy=last_name] input').type(lastName)
    cy.get('[name=birthDate]').type(moment(faker.date.past()).format('YYYY-MM-DD'))
    cy.get('[data-cy=description]').type(faker.lorem.sentence())
    cy.get('[data-cy=patient-save-button]').click()
    cy.get('.ui.header').contains(`${firstName} ${lastName}`)
    cy.get('[data-cy=top-navigation-PATIENT]').click()
    cy.get('[data-cy=data-name-cell]').contains(`${firstName} ${lastName}`)
    cy.get('.ui.header').contains('1 rekordów')
  })

  it('adds two patients and navigates to one patient details', () => {
    cy.get('[data-cy=new-patient-hero]').click()
    const firstName = faker.name.firstName()
    const lastName = 'A' + faker.name.lastName()
    cy.get('[data-cy=first_name] input').type(firstName)
    cy.get('[data-cy=last_name] input').type(lastName)
    cy.get('[name=birthDate]').type(moment(faker.date.past()).format('YYYY-MM-DD'))
    cy.get('[data-cy=description]').type(faker.lorem.sentence())
    cy.get('[data-cy=patient-save-button]').click()
    cy.get('[data-cy=top-navigation-PATIENT]').click()

    cy.get('[data-cy=new-patient]').click()

    const secondFirstName = faker.name.firstName()
    const secondLastName = 'B' + faker.name.lastName()
    cy.get('[data-cy=first_name] input').type(secondFirstName)
    cy.get('[data-cy=last_name] input').type(secondLastName)
    cy.get('[name=birthDate]').type(moment(faker.date.past()).format('YYYY-MM-DD'))
    cy.get('[data-cy=description]').type(faker.lorem.sentence())
    cy.get('[data-cy=patient-save-button]').click()
    cy.get('[data-cy=top-navigation-PATIENT]').click()

    cy.get('.ui.header').contains('2 rekordów')
    cy.get('[data-cy=data-name-cell]:eq(0)').contains(`${firstName} ${lastName}`)
    cy.get('[data-cy=data-name-cell]:eq(1)').contains(`${secondFirstName} ${secondLastName}`)
      .click()

    cy.get('.ui.header').contains(`${secondFirstName} ${secondLastName}`)
  })

  it('removes patient', () => {
    cy.get('[data-cy=new-patient-hero]').click()
    const firstName = faker.name.firstName()
    const lastName = 'A' + faker.name.lastName()
    cy.get('[data-cy=first_name] input').type(firstName)
    cy.get('[data-cy=last_name] input').type(lastName)
    cy.get('[name=birthDate]').type(moment(faker.date.past()).format('YYYY-MM-DD'))
    cy.get('[data-cy=description]').type(faker.lorem.sentence())
    cy.get('[data-cy=patient-save-button]').click()
    cy.get('[data-cy=top-navigation-PATIENT]').click()

    cy.get('[data-cy=new-patient]').click()

    const secondFirstName = faker.name.firstName()
    const secondLastName = 'B' + faker.name.lastName()

    cy.get('[data-cy=first_name] input').type(secondFirstName)
    cy.get('[data-cy=last_name] input').type(secondLastName)
    cy.get('[name=birthDate]').type(moment(faker.date.past()).format('YYYY-MM-DD'))
    cy.get('[data-cy=description]').type(faker.lorem.sentence())
    cy.get('[data-cy=patient-save-button]').click()
    cy.get('[data-cy=top-navigation-PATIENT]').click()

    cy.get('[data-cy=data-name-cell]:eq(0)').contains(`${firstName} ${lastName}`)
    cy.get('[data-cy=data-name-cell]:eq(1)').click()

    cy.get('[data-cy=dropdown-button-icon]').click().find('span').click()
    cy.get('[data-cy=patient-delete-button]').click()

    cy.get('[data-cy=data-name-cell]:eq(0)').contains(`${firstName} ${lastName}`)
    cy.get('.ui.header').contains('1 rekordów')
  })
})
