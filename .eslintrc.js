module.exports = {
  parser: 'babel-eslint',
  extends: ['react-app'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier": "error"
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
