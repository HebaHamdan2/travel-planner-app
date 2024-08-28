module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  testEnvironment: "jsdom",
  setupFiles: ['./jest.setup.js'],
};
