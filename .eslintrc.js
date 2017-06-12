module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    browser: true,
    jquery: true
  },
  globals: {
    $random_string: true,
    $foldable: true
  },
  rules: {
  }
};
