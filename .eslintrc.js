module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  root: true,
  extends: '@react-native-community',
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    radix: ['error', 'as-needed'],
  },
  settings: {
    'import/resolver': {
      typescript: {},
      'babel-module': {},
      node: {
        extensions: ['js', '.jsx', '.ts', '.tsx'],
      },
    },
    'import/core-modules': [
      '@storybook/theming',
      '@storybook/react-native',
      '@storybook/addon-knobs',
      '@storybook/addon-ondevice-knobs',
    ],
  },
};
