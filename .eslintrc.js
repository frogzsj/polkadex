module.exports = {
  parser: 'babel-eslint',
  extends: ['react-app'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier": "error",
    "react-hooks/exhaustive-deps": "off",
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
