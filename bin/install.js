#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectPackageJsonPath = join(process.cwd(), 'package.json');
const projectPackageJson = JSON.parse(
  readFileSync(projectPackageJsonPath, 'utf-8'),
);

const projectDependencies = projectPackageJson.dependencies || {};
const projectDevDependencies = projectPackageJson.devDependencies || {};

if ('next' in projectDependencies) {
  // Remove previous patches in package.json
  if (projectPackageJson?.pnpm?.patchedDependencies) {
    projectPackageJson.pnpm.patchedDependencies = Object.fromEntries(
      Object.entries(projectPackageJson.pnpm.patchedDependencies).filter(
        ([packageName]) => !packageName.startsWith('next@'),
      ),
    );
  }
}

writeFileSync(
  projectPackageJsonPath,
  JSON.stringify(projectPackageJson, null, 2) + '\n',
);

const newDevDependenciesToInstall = ['stylelint'];

for (const projectDevDependency of Object.keys(projectDevDependencies)) {
  if (newDevDependenciesToInstall.includes(projectDevDependency)) {
    newDevDependenciesToInstall.splice(
      newDevDependenciesToInstall.indexOf(projectDevDependency),
      1,
    );
  }
}

console.log(
  `Installing ${newDevDependenciesToInstall.length} stylelint config dependencies...`,
);

execSync(
  newDevDependenciesToInstall.length > 0
    ? `pnpm add --save-dev ${newDevDependenciesToInstall.join(' ')}`
    : 'pnpm install',
  { stdio: 'inherit' },
);

console.log('✅ Done installing dependencies');

console.log('Writing config files...');

const templatePath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  'templates',
);

const templateFileNamesAndPaths =
  /** @type {{name: string, path: string}[]} */ (
    readdirSync(templatePath, { withFileTypes: true }).flatMap(
      (templateFileOrDirectory) => {
        return {
          name: templateFileOrDirectory.name,
          path: join(templatePath, templateFileOrDirectory.name),
        };
      },
    )
  );

for (const {
  name: templateFileName,
  path: templateFilePath,
} of templateFileNamesAndPaths) {
  // Don't copy Stylelint config for non-React / non-Next.js projects
  if (
    templateFileName === 'stylelint.config.cjs' &&
    !('react-scripts' in projectDependencies || 'next' in projectDependencies)
  ) {
    continue;
  }

  const filePathInProject = join(process.cwd(), templateFileName);

  try {
    writeFileSync(filePathInProject, readFileSync(templateFilePath, 'utf-8'));
    console.log(`Wrote ${templateFileName}`);
  } catch (err) {
    console.error('err', err);
  }
}

console.log('✅ Done updating config files');
