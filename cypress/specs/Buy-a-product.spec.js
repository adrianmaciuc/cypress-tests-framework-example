import { SELECTORS } from '../support/selectors'
import { faker } from '@faker-js/faker/locale/ro'
import buyAProduct from '../fixtures/DATA-Buy-a-product'

const { PRODUCT, OTHER, SHIPPING, COMMON, HTML, PAYMENT, SUCCESS_PURCHASE } = SELECTORS


describe('Purchase functionalities', () => {
	context('Orders', () => {
		let testData = buyAProduct(faker)

		it('Add one item to cart and complete the order' , () => {

			// open base Url
			cy.visit('/')

			// We use intercept to confirm at a backend level that the item is added to cart
			cy.intercept('GET', 'https://magento.softwaretestingboard.com/customer/section/load/**').as('addToCart')
			
			// Open nth product from home page
			cy.get(PRODUCT.productItemInfo).first().click()

			cy.get(PRODUCT.sizeS).click()
			cy.get(PRODUCT.colorOrange).click()

			cy.get(PRODUCT.addToCartBtn).click()
			cy.get(PRODUCT.addToCartSuccessMsg).should('be.visible')
  
			// assert number of items in cart
			cy.get(OTHER.miniCartCounter).invoke('text').then(function(cartNumber){
				expect(Number(cartNumber)).to.eq(1)
			})

			// assert network call to confirm backend values sent correctly
			cy.wait('@addToCart').then(function({response}){
				expect(response.body.cart.summary_count).to.eq(1)
			})

			cy.get(OTHER.miniCart).click()
			cy.get(OTHER.miniCartSubTotal).should('be.visible')
			cy.get(OTHER.miniCartDropDownProceedToCheckout).click()

			cy.url().should('include', 'checkout/#shipping')

			// fill in the info for shipping
			cy.get(SHIPPING.email).type(testData.email)
			cy.get(SHIPPING.firstName).type(testData.firstName)
			cy.get(SHIPPING.lastName).type(testData.lastName)
			cy.get(SHIPPING.streetAddress).type(testData.streetAddress)
			cy.get(SHIPPING.city).type(testData.city)
			cy.get(SHIPPING.country).select(testData.country)

			// once you change the country the page will render again to populate State/Province. We wait for the loader to finish
			cy.get(COMMON.loadingSpinner).should('not.exist')
			cy.get(SHIPPING.postCode).type(testData.postCode)
			cy.get(COMMON.loadingSpinner).should('not.exist')
			cy.get(SHIPPING.stateSelect).select(testData.state)
			cy.get(SHIPPING.phone).type(testData.phone)
			cy.get(HTML.inputRadio).first().click()

			cy.get(COMMON.nextBtn).click()

			cy.url().should('include', '#payment')

			// assert all the values entered at shipping are correctly saved at payment page
			cy.get(PAYMENT.shippingDetails).should('be.visible').then(function(addressDetails){
				expect(addressDetails[0].innerText).include(testData.firstName)
				expect(addressDetails[0].innerText).include(testData.lastName)
				expect(addressDetails[0].innerText).include(testData.streetAddress)
				expect(addressDetails[0].innerText).include(testData.city)
				expect(addressDetails[0].innerText).include(testData.country)
				expect(addressDetails[0].innerText).include(testData.postCode)
				expect(addressDetails[0].innerText).include(testData.state)
				expect(addressDetails[0].innerText).include(testData.phone)
			})
			cy.get(PAYMENT.placeOrderBtn).should('be.visible').click()

			cy.url().should('include', 'checkout/onepage/success/')

			// assert email and registration pops up
			cy.get(SUCCESS_PURCHASE.createAccountAreaText).invoke('text').should('include', testData.email)
		})
	})
})