import { SELECTORS } from '../support/selectors'
import { ROUTES } from '../support/routes'
const filterProducts = require('../fixtures/DATA-filter-products')

const { PRODUCT_FILTERS, PRODUCT } = SELECTORS


describe('Filtering functionalities', () => {
	context('Filter functionalities', () => {
		// Test data. Mainly fetched or generated in context or before hooks to be used on all tests from the test suite
		let data = filterProducts()
		// End of test data

		it('Filter by style and price', () => {
			cy.visit('/' + ROUTES.womenTopsCategories.hoodies)
			cy.get(PRODUCT.productItem).should('have.length', 12)
			cy.get(PRODUCT_FILTERS.filterItem).contains(data.category1).click()
			cy.get(PRODUCT_FILTERS.filterItemActive).find(PRODUCT_FILTERS.item).contains(data.styleOption).should('be.visible').click()
			cy.get(PRODUCT.productItem).should('have.length', 9)

			cy.get(PRODUCT_FILTERS.filterItem).contains(data.category2).click()
			cy.get(PRODUCT_FILTERS.filterItemActive).find(PRODUCT_FILTERS.item).contains(data.priceOption).should('be.visible').click()
			cy.get(PRODUCT.productItem).should('have.length', 1)
		})
		it('Sorting products by Price', () => {
			cy.visit('/' + ROUTES.womenTopsCategories.brasNtanks)
			cy.get(PRODUCT.priceContainer).first().then((element)=>{
			// clean data and extract only price as integer
				data.valueBeforeSort = Number(element.text().split('$')[1].split('.')[0])
			})

			cy.get(PRODUCT.sorter).first().select('price')
			cy.get(PRODUCT.priceContainer).first().then((element)=>{
				data.valueAfterSort = Number(element.text().split('$')[1].split('.')[0])
				expect(data.valueBeforeSort).to.be.greaterThan(data.valueAfterSort)
			})
		})
	})
})