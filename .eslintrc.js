module.exports = {
  env: {
    browser: true,
    es2021: true,
    "cypress/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:json/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  ignorePatterns: ["*.png"],
  rules: {
    "prettier/prettier": "warn",
    "no-debugger": "off",
  },
  plugins: ["cypress"],
  globals: {
    module: true,
  },
};
