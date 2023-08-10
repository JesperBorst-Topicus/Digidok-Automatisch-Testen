import { defineConfig } from 'cypress';
const webpack = require('@cypress/webpack-preprocessor');
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';

const cypressJsonConfig = {
  fileServerFolder: './',
  fixturesFolder: './cypress/fixtures',
  supportFile: './cypress/support/index.ts',
  video: false,
  videosFolder: './videos',
  excludeSpecPattern: ['*.{js,ts}', '**/ref/**/*.feature'],
  retries: 0,
  watchForFileChanges: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 10000,
  env: {
    "digidok_vragenlijst_timeout": 30000
  }
};

async function setupNodeEvents(
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
      'file:preprocessor',
      webpack({
        webpackOptions: {
          resolve: {
            extensions: ['.ts', '.js']
          },
          module: {
            rules: [
              {
                test: /\.ts$/,
                exclude: [/node_modules/],
                use: [
                  {
                    loader: 'ts-loader'
                  }
                ]
              },
              {
                test: /\.feature$/,
                use: [
                  {
                    loader: '@badeball/cypress-cucumber-preprocessor/webpack',
                    options: config
                  }
                ]
              }
            ]
          }
        }
      })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  e2e: {
    ...cypressJsonConfig,
    setupNodeEvents
  }
});
