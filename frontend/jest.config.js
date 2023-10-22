module.exports = {
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "\\.(css|sass)$": "identity-obj-proxy"
  },
};
