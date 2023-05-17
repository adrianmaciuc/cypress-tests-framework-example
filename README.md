👋 Hi there! Welcome to the Cypress Tests Framework Example!

👨‍💻 This project, created by Adrian Maciuc - https://www.martioli.com - showcases a Cypress-based testing framework that tests an e-commerce website. The main goal is to provide end-to-end test coverage for https://magento.softwaretestingboard.com/.

## 📝 Overview

👀 This project includes:

1️⃣ Tests for the website 

2️⃣ Test data generated with faker library

3️⃣ Selectors and Routes design, inspired partially from the Page Object Model

4️⃣ Workflow to trigger a run in Github Actions upon push, together with reporting exported both locally and as artifacts on Github Actions

5️⃣ Design is developed for readability and does not use OOP or POM 

6️⃣ Uses ESLint for code quality and style and git for version control


## 📋 Specifications and Design

📌 All the specs in this repository are written exclusively to cover the testing of the website mentioned above.

📌 Maximum Readability. 

📌 Instead of using video recordings, we rely solely on screenshots. 

📌 We have adopted a similar design logic to the Page Object Model (POM). Refer to the files `support/selectors.js` and `support/routes.js` to understand better.

## 🎯 Testing approach

📌 Modular test logic and Reusable selectors 

📌 Test-Data is kept as external files and tests are built to work with various test-data 

📌 Avoid as much as possible implicit waits and use of contains method


## 📊 Testing Reports

💻 Github Actions will be triggered with each commit pushed to the repository, and the resulting Mochawesome reports can be found in the `/reports` folder or as artifacts on Github Actions.

## 🔧 Installation 

🚀 To get started with this project, simply follow these steps:

1️⃣ Clone the project

2️⃣ Run `npm install` 

3️⃣ Run `npx cypress run` or `npx cypress open` to execute the tests.
