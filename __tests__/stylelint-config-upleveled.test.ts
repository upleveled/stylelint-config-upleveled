import { execa } from 'execa';
import { expect, test } from 'vitest';

test('Errors correctly reported with Stylelint config', async () => {
  const { exitCode, stdout, stderr } = await execa({
    reject: false,
    preferLocal: true,
  })`stylelint '**/*.{css,scss,less,js,tsx}'`;
  expect(exitCode).toBe(2);
  expect(stdout).toMatchSnapshot();
  expect(stderr).toMatchSnapshot();
});
