const { formatter } = require('@lingui/format-json')

module.exports = {
  locales: ['pt-BR', 'en'],
  sourceLocale: 'pt-BR',
  catalogs: [
    {
      path: 'src/locales/{locale}/messages',
      include: ['src/**/*.{ts,tsx,js,jsx}'],
      exclude: ['**/*.test.*', '**/__tests__/**'],
    },
  ],
  format: formatter({ lineNumbers: false }),
}
