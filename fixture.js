// import { playwrightTest } from '@axe-core/watcher';

// const API_KEY = '041e309b-618a-45d3-aa45-edf2a5beec76';

// const { test, expect } = playwrightTest({
//   axe: {
//     apiKey: API_KEY,
//   },
//   headless: false,
//   // Any other Playwright configuration you’d pass to chromium.launchPersistentContext() here
// });

// export { test, expect };

const { playwrightTest } = require('@axe-core/watcher');
const API_KEY = '041e309b-618a-45d3-aa45-edf2a5beec76';

module.exports = playwrightTest({
  axe: {
    apiKey: API_KEY, // Optional: for axe Developer Hub integration
  },
  headless: true, // Or true, depending on your Playwright config
  // Any other Playwright configuration you'd pass to chromium.launchPersistentContext() here
  channel: 'chromium',
});