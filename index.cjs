/** @type { import('stylelint').Config } */
const config = {
  extends: ['stylelint-config-recommended'],
  rules: {
    'no-descending-specificity': null,
    // Allow files without any styles
    'no-empty-source': null,
  },
  overrides: [
    {
      files: ['**/*.css', '**/*.scss', '**/*.sass', '**/*.less'],
      extends: ['stylelint-config-recommended-scss'],
      rules: {
        'scss/at-rule-no-unknown': [
          true,
          {
            ignoreAtRules: ['tailwind', 'theme'],
          },
        ],
        // Disable to avoid problems with Tailwind CSS direct
        // children selector classes eg. `*:w-full`
        //
        // TODO: Remove if support or a workaround gets added for
        // Tailwind CSS direct children selector classes
        // - https://github.com/stylelint-scss/stylelint-scss/issues/999
        'scss/operator-no-unspaced': null,
      },
    },
    {
      files: ['**/*.module.css', '**/*.module.scss', '**/*.module.sass'],
      extends: ['stylelint-config-css-modules'],
    },
    {
      files: [
        '**/*.js',
        '**/*.cjs',
        '**/*.mjs',
        '**/*.jsx',
        '**/*.ts',
        '**/*.tsx',
      ],
      customSyntax: 'postcss-styled-syntax',
    },
  ],
};

module.exports = config;
