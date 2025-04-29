module.exports = {
  printWidth: 300, // 每行最大字符数，超出会换行
  tabWidth: 2, // 缩进使用 2 个空格
  useTabs: false, // 不使用 tab 缩进，使用空格
  semi: false, // 语句末尾不加分号
  singleQuote: true, // 使用单引号而不是双引号
  quoteProps: 'as-needed', // 仅在需要时为对象的属性名加引号
  jsxSingleQuote: false, // JSX 中不使用单引号
  trailingComma: 'none', // 不使用尾随逗号
  bracketSpacing: true, // 对象大括号内两边是否加空格 { foo: bar }
  bracketSameLine: false, // 多行 HTML（JSX、Vue）标签的右括号是否单独一行
  arrowParens: 'always', // 箭头函数参数总是加括号
  requirePragma: false, // 不需要在文件开头加特殊注释来格式化
  insertPragma: false, // 不自动在文件开头插入格式化注释
  proseWrap: 'never', // 不自动换行 markdown 文本
  htmlWhitespaceSensitivity: 'strict', // HTML 空格敏感度，严格模式
  vueIndentScriptAndStyle: true, // Vue 文件中的 <script> 和 <style> 标签内也缩进
  endOfLine: 'crlf' // 换行符使用 LF
}
