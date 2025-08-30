import { tmpdir } from 'node:os';
import path from 'node:path';
import { readFile } from 'node:fs/promises';

// Cross-platform temp file path
export const PORT_FILE_PATH = path.join(tmpdir(), 'prettierjet.port');

export const MAX_TXT_SIZE = 1 * 1024 * 1024; // 1MB

const CONFIG_FILE_PATH = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  'config.json'
);

let config;

try {
  const data = await readFile(CONFIG_FILE_PATH, 'utf8');

  config = JSON.parse(data);
} catch (error) {
  console.error('Failed to load config file: ', error);
  process.exit(0);
}

export const PRETTIER_SUPPORTED_EXTS = config.supportedExtensions;
