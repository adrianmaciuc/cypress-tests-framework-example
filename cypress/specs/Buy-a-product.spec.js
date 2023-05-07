import { SELECTORS } from '../support/selectors'
import { faker } from '@faker-js/faker/locale/ro'

const { HOME_PAGE, PRODUCT, OTHER, SHIPPING, COMMON, HTML, PAYMENT, SUCCESS } = SELECTORS

// test data
let email = faker.internet.email()
let firstName = faker.name.firstName()
let lastName = faker.name.lastName()
let streetAddress = faker.address.streetAddress()
let city = faker.address.city()
let country = 'Romania'
let postCode = faker.address.zipCode()
let state = 'Cluj'
let phone = faker.phone.number()
// end of test data


describe('Purchase functionalities', () => {
	it('Add one item to cart ',{retries: 0}, () => {
		cy.visit('/')

		// Open first product from home page
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
		cy.get(OTHER.miniCartSubTotal).should('be.visible')
		cy.get(OTHER.miniCartDropDownProceedToCheckout).click()

		// fill in the info for shipping
		cy.url().should('include', 'checkout/#shipping')
		cy.get(SHIPPING.email).type(email)
		cy.get(SHIPPING.firstName).type(firstName)
		cy.get(SHIPPING.lastName).type(lastName)
		cy.get(SHIPPING.streetAddress).type(streetAddress)
		cy.get(SHIPPING.city).type(city)
		cy.get(SHIPPING.country).select(country)
		// once you change the country the page will render again to populate State/Province. We wait for the loader to finish
		cy.get(OTHER.loadingSpinner).should('not.exist')

		cy.get(SHIPPING.postCode).type(postCode)
		cy.get(OTHER.loadingSpinner).should('not.exist')
		cy.get(SHIPPING.stateSelect).select(state)
		cy.get(SHIPPING.phone).type(phone)
		cy.get(HTML.inputRadio).first().click()
		cy.get(COMMON.nextBtn).click()

		// assert all the values entered at shipping that are correctly stored
		cy.url().should('include', '#payment')
		cy.get(PAYMENT.shippingDetails).first().should('be.visible').then(function(addressDetails){
			expect(addressDetails[0].innerText).include(firstName)
			expect(addressDetails[0].innerText).include(lastName)
			expect(addressDetails[0].innerText).include(streetAddress)
			expect(addressDetails[0].innerText).include(city)
			expect(addressDetails[0].innerText).include(country)
			expect(addressDetails[0].innerText).include(postCode)
			expect(addressDetails[0].innerText).include(state)
			expect(addressDetails[0].innerText).include(phone)
		})
		cy.get(PAYMENT.placeOrderBtn).should('be.visible').click()

		// assert email and registration pops up
		cy.url().should('include', 'checkout/onepage/success/')
		cy.get(SUCCESS.createAccountAreaText).invoke('text').should('include', email)
	})
})