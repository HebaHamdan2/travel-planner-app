export default {
  setupFiles: ['<rootDir>/jest.setup.js'],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  testEnvironment: "jsdom",
};
