const aliases = require('module-alias-jest/register');

console.log(aliases.jest);

module.exports = {
  transform: {
    '^.+\\.(t)sx?$': 'ts-jest',
  },
  moduleNameMapper: aliases.jest,
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
