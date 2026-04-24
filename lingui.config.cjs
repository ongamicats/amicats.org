// Lingui CLI configuration for @lingui/cli v6
// Locales: pt-BR and en
// Catalogs located at src/locales/{locale}/messages.json

module.exports = {
  locales: ["pt-BR", "en"],
  sourceLocale: "pt-BR",
  catalogs: [
    {
      path: "src/locales/{locale}/messages",
      include: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.js", "src/**/*.jsx"],
    },
  ],
  // Use json format for simple integration with the app (messages.json)
  // Use the official @lingui/format-json formatter so catalogs are
  // written as simple messages.json files. The package exports `formatter`.
  format: require('@lingui/format-json').formatter({ lineNumbers: false }),
};
