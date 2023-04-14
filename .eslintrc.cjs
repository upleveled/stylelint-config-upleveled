/** @type {import('@typescript-eslint/utils').TSESLint.Linter.Config} */
const config = {
  extends: ['upleveled'],
  overrides: [
    {
      files: ['**/*.cjs'],
      extends: ['eslint-config-upleveled'],
    },
  ],
};

module.exports = config;
