const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  viewportHeight: 1080,
  viewportWidth: 1920,
  watchForFileChanges: false,

  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
