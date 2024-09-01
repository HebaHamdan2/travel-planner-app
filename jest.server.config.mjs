/**
 * @type {import('jest').Config}
 */
const config = {
  // Transform files with Babel
  transform: {
    "^.+\\.js$": "babel-jest",
  },

  // Use jsdom environment for client-side code, node environment for server-side code
  testEnvironment: process.env.TEST_ENV === 'node' ? 'node' : 'jsdom',

  // Match test files
  testMatch: [
    "**/__test__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],

  // Automatically clear mock calls, instances, contexts, and results before every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Handle transformations of ESM
  transformIgnorePatterns: [
    "\\\\node_modules\\\\",
  ],

  // Setup files before each test
  setupFiles: ['<rootDir>/jest.setup.js'],
};

export default config;
