module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    // Add the 'node' environment for server-side code (like using bcryptjs)
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        'linebreak-style': ['error', 'windows'],
        'no-console': 'off',
        'arrow-body-style': ['error', 'never'],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {},
};
