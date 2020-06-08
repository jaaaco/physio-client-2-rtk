/// <reference types="cypress" />

import faker from 'faker'
import moment from 'moment'

context('setting', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.window().invoke('resetApp')
    cy.reload()
    cy.wait(100)
  })
  it('navigates to settings page', () => {
    cy.get('[data-cy=top-navigation-SETTINGS').click()
    cy.get('[data-cy=settings-list]').contains('Ustawienia')
  })
  it('updates setting', () => {
    cy.get('[data-cy=top-navigation-SETTINGS').click()
    cy.get('[data-cy=setting-value] input').clear().type('http://localhost:5555')
    cy.get('[data-cy=setting-save').click()

    cy.reload()
    cy.wait(100)
    cy.get('[data-cy=top-navigation-SETTINGS').click()
    cy.get('[data-cy=setting-value] input').should('have.value', 'http://localhost:5555')
  })
})
