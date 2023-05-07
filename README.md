# Cypress Tests Framework Example

by Adrian Maciuc - https://www.martioli.com

## Overview

This project provides an example of how to create a Cypress-based testing framework from scratch for an e-commerce website. The aim is to provide end-to-end test coverage for https://magento.softwaretestingboard.com/.

## Specifications

All the specs in this repository are written to cover this testing website exclusively.

## Testing Approach

Instead of using video recordings, we will be relying solely on screenshots. While we are not using the Page Object Model (POM) in its entirety, we have adopted a similar design logic. Refer to the files `support/selectors.js` and `support/routes.js` for examples.

## Testing Reports

Github Actions will be triggered with each commit pushed to the repository, and the resulting Mochawesome reports can be found in the `/reports` folder or as artifacts on Github Actions.