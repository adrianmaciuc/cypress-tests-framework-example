import './commands'
import { faker } from '@faker-js/faker/locale/en'

Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test
	return false
})

