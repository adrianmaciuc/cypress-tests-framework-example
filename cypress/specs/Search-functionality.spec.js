import { SELECTORS } from '../support/selectors'
const { BASE, PRODUCT } = SELECTORS

let searchKeyword = 'hero'

describe('Search Functionalities', () => {
	it('Search from home page', () => {
		cy.visit('/')

		// we intercept suggestions
		cy.intercept('GET', '/search/ajax/suggest/**').as('suggestions')

		cy.get(BASE.searchInput).type(searchKeyword)

		// we assert that each suggestions contains the word we search for
		cy.wait('@suggestions').then(function({response}){
			cy.wrap(response.body).each(function(suggestion){
				expect(suggestion.title.toLowerCase()).to.contain(searchKeyword)
			})
		})
			.then(function(){

				// the reason this is in a 'then' is, we don't push for the search button until we finish with the above assertions
				cy.get(BASE.searchIconBtn).click()
			})

		// we use again 'then' in order to cleanup the data and avoid case sensitive failures on assertions
		cy.get(PRODUCT.productItemName).first().invoke('text').then(function(text){
			expect(text.toLowerCase()).to.contain(searchKeyword)
		}) 
	})
})