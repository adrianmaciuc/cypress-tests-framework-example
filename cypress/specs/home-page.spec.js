import { SELECTORS } from '../support/selectors'
const HOME_PAGE = SELECTORS.HOME_PAGE

describe('Landing page', () => {
	it('Verify basic components of home page are loaded', () => {
		cy.visit('/')
		cy.get(HOME_PAGE.blocksPromoLinks).should('have.length', 6)
		cy.get(HOME_PAGE.blocksPromoLinks).each(function(item){
			cy.request(item[0].href).its('status').should('eq', 200)
			cy.wait(3500)
		})

		cy.get(HOME_PAGE.productItem).should('have.length', 6)
		cy.get(HOME_PAGE.productItem).each(function(item){
			cy.request(item[0].href).its('status').should('eq', 200)
			cy.wait(3500)
		})
	})
})