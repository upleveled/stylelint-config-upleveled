/** @type {import('stylelint').Config} */
const config = {
  extends: ['stylelint-config-recommended'],
  rules: {
    // TODO: Configure ignoreAtRules in
    // nesting-selector-no-missing-scoping-root rule once it
    // exists:
    // - https://github.com/stylelint/stylelint/issues/8728
    // - https://github.com/stylelint/stylelint/issues/8406#issuecomment-3185835523
    //
    // ```
    // 'nesting-selector-no-missing-scoping-root': [
    //   true,
    //   {
    //     ignoreAtRules: ['utility'],
    //   },
    // ]
    // ```
    //
    // For now, it can be disabled manually in CSS like this:
    //
    // ```
    // /* stylelint-disable nesting-selector-no-missing-scoping-root -- TODO: Modify stylelint-config-upleveled to configure ignoreAtRules in rule once it exists https://github.com/stylelint/stylelint/issues/8728 https://github.com/stylelint/stylelint/issues/8406#issuecomment-3185835523 */
    // ```
    // Allow ordering of selectors not descending in specificity
    // - https://stylelint.io/user-guide/rules/no-descending-specificity/
    'no-descending-specificity': null,
    // Allow empty files without any styles
    // - https://stylelint.io/user-guide/rules/no-empty-source/
    'no-empty-source': null,
  },
  overrides: [
    {
      files: [
        '**/*.scss',
        '**/*.sass',
        '**/*.less',
        // Tailwind CSS with PostCSS features
        '**/*.css',
      ],
      extends: ['stylelint-config-recommended-scss'],
      rules: {
        'at-rule-no-deprecated': [
          true,
          {
            ignoreAtRules: ['apply'],
          },
        ],
        'scss/at-rule-no-unknown': [
          true,
          {
            ignoreAtRules: [
              // Configuration taken from
              // stylelint-config-tailwindcss
              // - https://github.com/zhilidali/stylelint-config-tailwindcss/blob/188cf5c210c23d3f7be285d8cae4a7c1620fdefb/index.js#L4-L26
              //
              // Tailwind CSS v4
              'custom-variant',
              'plugin',
              'source',
              'theme',
              'utility',
              'variant',
              // Tailwind CSS v3
              'apply',
              'config',
              'layer',
              'tailwind',
              // Tailwind CSS v1, v2
              'responsive',
              'screen',
              'variants',
            ],
          },
        ],
        // Configuration taken from stylelint-config-tailwindcss
        // - https://github.com/zhilidali/stylelint-config-tailwindcss/blob/188cf5c210c23d3f7be285d8cae4a7c1620fdefb/index.js#L27-L32
        'scss/function-no-unknown': [
          true,
          {
            ignoreFunctions: ['theme'],
          },
        ],
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
      rules: {
        // TODO: Remove this configuration once
        // nesting-selector-no-missing-scoping-root no longer
        // causes false positives for CSS-in-JS
        // - https://github.com/stylelint/stylelint/issues/8727
        'nesting-selector-no-missing-scoping-root': null,
      },
    },
  ],
};

export default config;
