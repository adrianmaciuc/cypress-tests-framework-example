import { SELECTORS } from '../support/selectors'

describe('Purchase functionalities', () => {
	it('Add one item to cart ', () => {
		cy.visit('/')
		cy.intercept('GET', 'https://magento.softwaretestingboard.com/customer/section/load/**').as('addToCart')
		cy.get('.product-item-info').first().click()
		cy.get('#option-label-size-143-item-167').click()
		cy.get('[id="option-label-color-93-item-56"]').click()
		cy.get('#product-addtocart-button').click()
		cy.get('[data-ui-id="message-success"]').should('be.visible')
    
		cy.get('.showcart > .counter').children().then(function(cart){
		
		})
		cy.wait('@addToCart').then(function(addtocart){
		
		})
	})
})