// Lingui CLI configuration
// Phase 1: migrate to official .po workflow (gettext PO files)
// Locales: pt-BR and en
// Catalogs are written as PO files under src/locales/{locale}/messages.po

module.exports = {
  locales: ['pt-BR', 'en'],
  sourceLocale: 'pt-BR',
  catalogs: [
    {
      // keep logical basename 'messages' — formatter determines final extension
      path: 'src/locales/{locale}/messages',
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js', 'src/**/*.jsx'],
    },
  ],
  // Use the official PO formatter so catalogs are produced as gettext .po files.
  // This aligns with the Lingui Vite example (vite-project-react-babel) and
  // enforces a single-source-of-truth .po workflow (no JSON hybrid catalogs).
  format: require('@lingui/format-po').formatter({ lineNumbers: false }),
};
