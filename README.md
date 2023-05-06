# cypress-tests-framework-example
Creating a framework from scratch and creating end to end tests for a e-commerce website

Here is what you are going to find here:

1. https://magento.softwaretestingboard.com/ is a testing website that we will try to provide coverage of it. Specs written in this repo will cover only this website
2. We are not going to use video recordings, only screenshots
3. We are not going to use Page Object Model but we will partially borrow similar design logic. See support/selectors.js and support/routes.js
4. We are going to run Github Actions with each commit pushed to github
5. Github Actions and local runs have mochawesome reports that you can see in the folder /reports or as artifacts on Github Actions
