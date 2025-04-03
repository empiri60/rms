const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 10000, 
    pageLoadTimeout: 60000,
    video: true,
    screenshotOnRunFailure: true, 
    supportFile: "cypress/support/e2e.js",
    
    setupNodeEvents(on, config) { 
    },
    experimentalSessionAndOrigin: true,
  },
});
