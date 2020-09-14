/// <reference types="cypress" />

context('setting', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.window().invoke('resetApp')
    cy.reload()
    cy.wait(1000)
  })
  it('navigates to settings page', () => {
    cy.get('[data-cy=top-navigation-SETTINGS').click()
    cy.get('[data-cy=settings-list]').contains('Ustawienia')
  })
  it('updates setting', () => {
    cy.get('[data-cy=top-navigation-SETTINGS').click()
    cy.get('[data-cy=setting-value] input:eq(0)').clear().type('someotherhost')
    cy.get('[data-cy=setting-value] input:eq(1)').clear().type('8081')
    cy.get('[data-cy=setting-save').click()

    cy.reload()
    cy.wait(1000)
    cy.get('[data-cy=top-navigation-SETTINGS').click()
    cy.get('[data-cy=setting-value] input:eq(0)').should('have.value', 'someotherhost')
    cy.get('[data-cy=setting-value] input:eq(1)').should('have.value', '8081')
  })
})
