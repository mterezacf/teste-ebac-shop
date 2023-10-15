/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

describe('Exercicio - Testes End-to-end - Fluxo de pedido', () => {

    beforeEach(() => {
        cy.visit('produtos/')
    });

    it('Deve adicionar um produto ao carrinho', () => {
        var quantidade = 4

        let emailFaker = faker.internet.email()
        let nomeFaker = faker.person.firstName()
        let sobrenomeFaker = faker.person.lastName()
       
        cy.get(':nth-child(2) > .page-numbers')
            .click()

        cy.get('.tbay-woocommerce-breadcrumb > :nth-child(3)').should('contain', 'Página 2')

        cy.get('[class="product-block grid"]')
            .eq(4)
            .click()

        cy.get('.tbay-woocommerce-breadcrumb > :nth-child(8)').should('contain', 'Atlas Fitness Tank')

        cy.get('.button-variable-item-S').click()
        cy.get(':nth-child(2) > .value > .variable-items-wrapper > .variable-item').click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()

        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)

        cy.get('#primary-menu > .menu-item-629 > a')
            .click()

        cy.get(':nth-child(2) > .page-numbers')
            .click()
        cy.get('[class="product-block grid"]')
            .eq(5)
            .click()

        cy.get('.button-variable-item-S').click()
        cy.get('.button-variable-item-Blue').click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()

        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade + quantidade)

        cy.get('.woocommerce-message > .button')
            .click()
        cy.get('.breadcrumb > .active').should('contain', 'Carrinho')

        cy.get('.checkout-button')
            .click()
        cy.get('.breadcrumb > .active').should('contain', 'Checkout')

        cy.get('#billing_first_name_field > label').type(nomeFaker)
        cy.get('#billing_last_name').type(sobrenomeFaker)
        cy.get('#select2-billing_country-container').click().type('Brasil{enter}')
        cy.get('#billing_address_1').type('Rua Almirante')
        cy.get('#billing_city').type('Rio de Janeiro')
        cy.get('#select2-billing_state-container')
        cy.get('#billing_postcode').type('71458-999')
        cy.get('#billing_phone').type('9999-9999')
        cy.get('#billing_email').type(emailFaker)
        cy.get('#createaccount').click()
        cy.get('#account_password').type('teste@teste.123')
        cy.get('#payment_method_cod').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()

        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')

    });


})
