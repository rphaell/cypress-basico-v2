/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

    beforeEach(() => {
        cy.visit('./src/index.html')

    })

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {

        const longText = 'teste, teste, teste, teste,, teste, teste, teste, t, teste, teste, teste, t, teste, teste, teste, t, teste, teste, teste, t, teste, teste, teste, t, teste, teste, teste, t, teste, teste, teste, t, teste, teste, teste, '
        cy.get('#firstName').type('Raphael', { delay: 0 })
        cy.get('#lastName').type('Almeida', { delay: 0 })
        cy.get('#email').type('phael@gmail.com', { delay: 0 })
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.get('.button').contains('Enviar').click()

        cy.get('.success').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Raphael', { delay: 0 })
        cy.get('#lastName').type('Almeida', { delay: 0 })
        cy.get('#email').type('phael1gmail.com', { delay: 0 })
        cy.get('#open-text-area').type('Oi.', { delay: 0 })
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('teste para validar que, se um valor não-numérico for digitado, seu valor continuará vazio.', () => {
        cy.get('#phone')
            .type('abcdsds', { delay: 0 })
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Raphael', { delay: 0 })
        cy.get('#lastName').type('Almeida', { delay: 0 })
        cy.get('#email').type('phael@gmail.com', { delay: 0 })
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('longText', { delay: 0 })
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('Raphael', { delay: 0 })
            .should('have.value', 'Raphael', { delay: 0 })
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Almeida', { delay: 0 })
            .should('have.value', 'Almeida', { delay: 0 })
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('phael92br@gmail.com', { delay: 0 })
            .should('have.value', 'phael92br@gmail.com', { delay: 0 })
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('123456', { delay: 0 })
            .should('have.value', '123456', { delay: 0 })
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })


})