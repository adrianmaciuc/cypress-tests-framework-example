import './commands'


Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test in case the web-app has errors
	// The app, not our tests
	return false
})

