module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    indent: ['off', 2],
    'no-tabs': 'off',
    semi: ['off'],
    'no-mixed-spaces-and-tabs': [0],
    // quotes: [2, "single"],
    quotes: 'off',
    'space-before-function-paren': 0,
    'no-unused-vars': 'warn', //把该条提示信息转换成警告信息
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/max-attributes-per-line': ['off'],
    'linebreak-style': [0, 'error', 'windows'],
    'vue/singleline-html-element-content-newline': ['off'],
    '@typescript-eslint/no-explicit-any': ['off']
  }
}
