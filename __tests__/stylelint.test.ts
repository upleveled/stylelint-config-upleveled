import { $ } from 'execa';
import { expect, test } from 'vitest';

test('Errors correctly reported with Stylelint config', async () => {
  const { stdout, stderr } = await $({
    reject: false,
  })`pnpm stylelint '**/*.{css,scss,less,js,tsx}'`;
  expect(stdout).toMatchSnapshot();
  expect(stderr).toMatchSnapshot();
});
