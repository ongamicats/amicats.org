const { formatter } = require('@lingui/format-json')

module.exports = {
  locales: ['pt-BR', 'en'],
  sourceLocale: 'pt-BR',
  catalogs: [
    {
      path: 'src/locales/{locale}/messages',
      include: ['src/**/*.{ts,tsx,js,jsx}'],
    },
  ],
  format: formatter({ lineNumbers: false }),
}
