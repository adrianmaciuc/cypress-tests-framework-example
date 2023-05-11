# Cypress Tests Framework Example

by Adrian Maciuc - https://www.martioli.com

## Overview

This project provides an example of a Cypress-based testing framework used for an e-commerce website. The aim is to provide end-to-end test coverage for https://magento.softwaretestingboard.com/. 

It includes : 
1. Tests for the website 
2. Test data generated with faker library
3. Selectors and Routes design, inspired partialy from Page Object Model
4. Workflow to trigger a run in Github Actions upon push, together with reporting exported both on local and artifacts on Github Actions
5. Design is developed for readability and does not use OOP or POM 

## Specifications

All the specs in this repository are written to cover the above testing website exclusively.

## Testing Approach

Instead of using video recordings, we will be relying solely on screenshots. While we are not using the Page Object Model (POM) in its entirety, we have adopted a similar design logic. Refer to the files `support/selectors.js` and `support/routes.js` to understand.

## Testing Reports

Github Actions will be triggered with each commit pushed to the repository, and the resulting Mochawesome reports can be found in the `/reports` folder or as artifacts on Github Actions.

## Installation 

1. Clone the project
2. npm install 
3. npx cypress run / npx cypress open