module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  testEnvironment: "node",
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [
    "/node_modules/(?!your-module-to-transform).+\\.js$"
  ],
};
