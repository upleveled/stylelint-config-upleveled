/** @type {import('@typescript-eslint/utils').TSESLint.Linter.Config} */
const config = {
  extends: ['upleveled'],
  overrides: [
    {
      files: 'index.cjs',
    },
  ],
};

module.exports = config;
