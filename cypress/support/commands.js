Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Raphael', { delay: 0 })
    cy.get('#lastName').type('Almeida', { delay: 0 })
    cy.get('#email').type('phael@gmail.com', { delay: 0 })
    cy.get('#open-text-area').type('teste', { delay: 0 })
    cy.contains('button','Enviar').click()
})