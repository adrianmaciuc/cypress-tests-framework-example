import { SELECTORS } from '../support/selectors'
const { HOME_PAGE, NAVBAR } = SELECTORS

describe('Landing page', () => {
	it('Verify basic components of home page are loaded and links are crawlable', () => {
		cy.visit('/')
		cy.get(HOME_PAGE.blocksPromoLinks).should('have.length', 6)
		cy.get(HOME_PAGE.blocksPromoLinks).each(function(item){
			cy.request(item[0].href).its('status').should('eq', 200)
			cy.wait(3500)
		})

		cy.get(HOME_PAGE.productItem).should('have.length', 6)
		cy.get(HOME_PAGE.productItem).find(HOME_PAGE.productItemPhoto).each(function(item){
			cy.request(item[0].href).its('status').should('eq', 200)
			cy.wait(3500)
		})
	})

	it('Navigation and Footer links', () => {
		cy.visit('/')
		cy.get(HOME_PAGE.footerLinks).each(function(item){
			cy.request(item[0].href).its('status').should('eq', 200)
			cy.wait(3500)
		})

		cy.get(NAVBAR.navbarLinks).each(function(item){
			cy.request(item[0].href).its('status').should('eq', 200)
			cy.wait(3500)
		})
	})
})