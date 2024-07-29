module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.[tj]sx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)',
    ],
    moduleFileExtensions: ['js', 'jsx'],
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy',
    },
  };
  