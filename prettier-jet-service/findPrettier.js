import { readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';

// Create require function for current module
const require = createRequire(import.meta.url);

const findPrettier = () => {
  try {
    // Method 1: Use npm root -g to find global node_modules
    const globalNodeModules = execSync('npm root -g', {
      encoding: 'utf-8'
    }).trim();

    const pathsToCheck = [
      join(globalNodeModules, 'prettier'),
      join(globalNodeModules, '..', 'prettier')
    ];

    // Method 2: Common global installation paths
    if (process.platform === 'win32') {
      pathsToCheck.push(
        join(process.env.APPDATA, 'npm', 'node_modules', 'prettier'),
        join(process.env.LOCALAPPDATA, 'npm', 'node_modules', 'prettier')
      );
    } else {
      pathsToCheck.push(
        join('/usr/local/lib/node_modules/prettier'),
        join('/usr/lib/node_modules/prettier'),
        join(process.env.HOME, '.npm-global/lib/node_modules/prettier'),
        join(
          process.env.HOME,
          '.nvm/versions/node',
          '*',
          'lib/node_modules/prettier'
        ),
        join(process.env.HOME, '.nodenv/versions/*/lib/node_modules/prettier')
      );
    }

    // Check all possible paths
    for (const modulePath of pathsToCheck) {
      try {
        // Handle glob patterns
        const resolvedPaths = modulePath.includes('*')
          ? readdirSync(dirname(modulePath))
              .filter(
                (dir) => dir.startsWith('v') || dir.match(/^\d+\.\d+\.\d+$/)
              )
              .map((dir) => modulePath.replace('*', dir))
          : [modulePath];

        for (const resolvedPath of resolvedPaths) {
          try {
            if (existsSync(resolvedPath)) {
              return require.resolve(resolvedPath);
            }
          } catch {}
        }
      } catch {}
    }
  } catch (error) {
    console.error('Error finding prettier:', error);
  }

  return null;
};

export default findPrettier;
