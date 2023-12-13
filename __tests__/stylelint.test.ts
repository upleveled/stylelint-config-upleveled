import { $ } from 'execa';
import { expect, test } from 'vitest';

test('run stylelint and expect errors', async () => {
  try {
    const stylelintOutput =
      await $`pnpm stylelint '**/*.{css,scss,less,js,tsx}'`;
    if (stylelintOutput.exitCode === 0) {
      throw new Error('No stylelint errors thrown');
    }
  } catch (error) {
    expect(error).toMatchSnapshot();
  }
});
