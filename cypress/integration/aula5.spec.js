/// <reference types="cypress" />

describe('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('produtos/')
    });

    it('Deve ir para segunda pagina de produtos', () => {
        cy.get(':nth-child(2) > .page-numbers')
            .click()

        cy.get('.tbay-woocommerce-breadcrumb > :nth-child(3)').should('contain', 'Página 2')
    });

    it('Deve selecionar um produto da lista', () => {
        cy.get(':nth-child(2) > .page-numbers')
            .click()
        cy.get('[class="product-block grid"]')
            .eq(4)
            .click()

        cy.get('.tbay-woocommerce-breadcrumb > :nth-child(8)').should('contain', 'Atlas Fitness Tank')
    });

    it('Deve adicionar um produto ao carrinho', () => {
        var quantidade = 4
        cy.get(':nth-child(2) > .page-numbers')
            .click()
        cy.get('[class="product-block grid"]')
            .eq(4)
            .click()

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

    });

    it('Deve ver carrinho e concluir a compra', () => {
        cy.get('.woocommerce-message > .button')
            .click()
        cy.get('.breadcrumb > .active').should('contain', 'Carrinho')

        cy.get('.checkout-button')
            .click()
        cy.get('.page-title').should('contain', 'CHECKOUT')
    })

})
