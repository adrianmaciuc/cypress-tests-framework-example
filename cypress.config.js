const { defineConfig } = require('cypress')
require('dotenv').config()

const baseUrl = process.env.baseUrl || 'https://google.com'

module.exports = defineConfig({
	e2e: {
		baseUrl: baseUrl,
		specPattern: '**/specs/*.spec.js',
		excludeSpecPattern: '**/devSpecs/*.spec.js',
		supportFile: 'cypress/support/index.js',
		defaultCommandTimeout: 15000,
    
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},

	env: {
		USERNAME: process.env.USERNAME,
		PASSWORD: process.env.PASSWORD,
	},
    
	screenshotsFolder: 'cypress/screenshots',
	videosFolder: 'cypress/videos',
	viewportWidth: 1280,
	viewportHeight: 720,
	videoUploadOnPasses: false,
	video: true,
	retries: 1,
	scrollBehavior: 'center',

	reporter: 'mochawesome',
	reporterOptions: {
		reportDir: 'cypress/reports',
		reportFilename: '[name].html',
		overwrite: true,
		html: true,
		json: false,
	},
      
})
