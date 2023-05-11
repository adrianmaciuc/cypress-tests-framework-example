import { SELECTORS } from '../support/selectors'
import { faker } from '@faker-js/faker/locale/ro'
const buyAProduct = require('../fixtures/DATA-Buy-a-product')

const { PRODUCT, OTHER, SHIPPING, COMMON, HTML, PAYMENT, SUCCESS_PURCHASE } = SELECTORS


describe('Purchase functionalities', () => {
	context('Purchase functionalities', () => {
		// Test data. Mainly fetched or generated in context or before hooks to be used on all tests from the test suite
		let data = buyAProduct(faker)
		// End of test data

		it('Add one item to cart and complete the order',{retries: 0} , () => {
			cy.visit('/')

			// We use intercept to confirm at a backend level that the item is added to cart
			cy.intercept('GET', 'https://magento.softwaretestingboard.com/customer/section/load/**').as('addToCart')
			
			// Open first product from home page
			cy.get(PRODUCT.productItemInfo).first().click()
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
			cy.get(OTHER.miniCartSubTotal).should('be.visible')
			cy.get(OTHER.miniCartDropDownProceedToCheckout).click()

			// fill in the info for shipping
			cy.url().should('include', 'checkout/#shipping')
			cy.get(SHIPPING.email).type(data.email)
			cy.get(SHIPPING.firstName).type(data.firstName)
			cy.get(SHIPPING.lastName).type(data.lastName)
			cy.get(SHIPPING.streetAddress).type(data.streetAddress)
			cy.get(SHIPPING.city).type(data.city)
			cy.get(SHIPPING.country).select(data.country)
			// once you change the country the page will render again to populate State/Province. We wait for the loader to finish
			cy.get(COMMON.loadingSpinner).should('not.exist')

			cy.get(SHIPPING.postCode).type(data.postCode)
			cy.get(COMMON.loadingSpinner).should('not.exist')
			cy.get(SHIPPING.stateSelect).select(data.state)
			cy.get(SHIPPING.phone).type(data.phone)
			cy.get(HTML.inputRadio).first().click()
			cy.get(COMMON.nextBtn).click()

			// assert all the values entered at shipping that are correctly stored
			cy.url().should('include', '#payment')
			cy.get(PAYMENT.shippingDetails).first().should('be.visible').then(function(addressDetails){
				expect(addressDetails[0].innerText).include(data.firstName)
				expect(addressDetails[0].innerText).include(data.lastName)
				expect(addressDetails[0].innerText).include(data.streetAddress)
				expect(addressDetails[0].innerText).include(data.city)
				expect(addressDetails[0].innerText).include(data.country)
				expect(addressDetails[0].innerText).include(data.postCode)
				expect(addressDetails[0].innerText).include(data.state)
				expect(addressDetails[0].innerText).include(data.phone)
			})
			cy.get(PAYMENT.placeOrderBtn).should('be.visible').click()

			// assert email and registration pops up
			cy.url().should('include', 'checkout/onepage/success/')
			cy.get(SUCCESS_PURCHASE.createAccountAreaText).invoke('text').should('include', data.email)
		})
	})
})