/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
        singleQuote: true, // 使用单引号，默认false
        semi: false, // 句尾加 ； 默认true
        bracketSpacing: true, // 对象内部使用 {a: b } 默认true
        arrowParens: 'avoid', // 箭头函数是否省去括号 默认 false
      },
    ],
  },
}
