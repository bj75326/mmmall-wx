// const defineJestConfig =
//   require('@tarojs/test-utils-react/dist/jest.js').default;
import defineJestConfig from '@tarojs/test-utils-react/dist/jest';

module.exports = defineJestConfig({
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/__tests__/?(*.)+(spec|test).[jt]s?(x)'],
});
