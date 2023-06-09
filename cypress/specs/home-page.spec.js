import { SELECTORS } from '../support/selectors'
const { HOME_PAGE, NAVBAR, PRODUCT, BASE } = SELECTORS

describe('Landing page', () => {
	it('Verify basic components of home page are loaded and links are crawlable', () => {
		cy.visit('/')
		cy.get(HOME_PAGE.blocksPromoLinks).should('have.length', 6)
		cy.get(HOME_PAGE.blocksPromoLinks).each(function(item){
			cy.request(item[0].href).its('status').should('eq', 200)
			cy.wait(3500)
		})

		cy.get(PRODUCT.productItem).should('have.length', 6)
		cy.get(PRODUCT.productItem).find(PRODUCT.productItemPhoto).each(function(item){
			cy.request(item[0].href).its('status').should('eq', 200)
			cy.wait(3500)
		})
	})

	it('Navigation and Footer links', () => {
		cy.visit('/')
		cy.get(BASE.footerLinks).each(function(item){
			cy.request(item[0].href).its('status').should('eq', 200)
			cy.wait(3500)
		})

		cy.get(NAVBAR.navbarLinks).each(function(item){
			cy.request(item[0].href).its('status').should('eq', 200)
			cy.wait(3500)
		})
	})
})