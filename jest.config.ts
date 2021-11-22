// "path-exists", "root-check"
const es6Modules: string[] = [];

export default {
  clearMocks: true,
  // collectCoverage: true,
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  // roots: ['<rootDir>'],
  collectCoverageFrom: ['src/**/*.{ts,js,tsx,jsx}', '!src/bin/*.js'],
  // 配置有些包的源码是使用es6模块da
  transformIgnorePatterns: [
    ...es6Modules.map((item) => `<rootDir>/node_modules/(?!${item})`),
  ],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};
