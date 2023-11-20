/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest'
  },
  // globalSetup: '<rootDir>/test/globalSetup.ts',
  // globalTeardown: '<rootDir>/test/globalTeardown.ts',
  // setupFilesAfterEnv: ['<rootDir>/test/setupFile.ts'],
  maxWorkers: 4,
  extensionsToTreatAsEsm: ['.ts']
}
