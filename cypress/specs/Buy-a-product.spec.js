import { SELECTORS } from '../support/selectors'
import { faker } from '../support'
const HOME_PAGE = SELECTORS.HOME_PAGE
const PRODUCT = SELECTORS.PRODUCT
const OTHER = SELECTORS.OTHER


describe('Purchase functionalities', () => {
	it('Add one item to cart ', () => {
		cy.visit('/')
		cy.intercept('GET', 'https://magento.softwaretestingboard.com/customer/section/load/**').as('addToCart')
		cy.get(HOME_PAGE.productItemInfo).first().click()
		cy.get(PRODUCT.sizeS).click()
		cy.get(PRODUCT.colorOrange).click()
		cy.get(PRODUCT.addToCartBtn).click()
		cy.get(PRODUCT.addToCartSuccessMsg).should('be.visible')
    
		cy.get(OTHER.miniCartCounter).invoke('text').then(function(cartNumber){
			expect(Number(cartNumber)).to.eq(1)
		})
		cy.wait('@addToCart').then(function({response}){
			expect(response.body.cart.summary_count).to.eq(1)
		})

		cy.get(OTHER.miniCart).click()
		cy.get('[id="top-cart-btn-checkout"]').click()

		cy.url().should('include', 'checkout/')
		cy.get('#shipping #customer-email').type(faker.internet.email())
		cy.get('[name="firstname"]').type(faker.name.firstName())
		cy.get('[name="lasttname"]').type(faker.name.lastName())
		cy.get('[name="street[0]"]').type(faker.address.streetAddress())
		cy.get('[name="city"]').type(faker.address.city())
		cy.get('[name="country_id"]').select('Romania')
		// once you change the country the will render again to populate State/Province. We wait for the loader to finish
		cy.get('[title="Loading..."]').should('not.exist')

		cy.get('[name="shippingAddress.region_id"] > div > select').select('Cluj')
		
	})
})