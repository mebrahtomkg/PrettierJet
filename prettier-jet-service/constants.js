import { tmpdir } from "node:os";
import path from "node:path";

// Cross-platform temp file path
export const PORT_FILE_PATH = path.join(tmpdir(), "prettierjet.port");

export const MAX_TXT_SIZE = 5 * 1024 * 1024; // 5MB

export const PRETTIER_SUPPORTED_EXTS = [
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".ts",
  ".tsx",
  ".mts",
  ".cts",
  ".json",
  ".json5",
  ".jsonc",
  ".html",
  ".htm",
  ".xml",
  ".svg",
  ".css",
  ".scss",
  ".less",
  ".md",
  ".markdown",
  ".mdx",
  ".yaml",
  ".yml",
  ".toml",
  ".graphql",
  ".gql",
  ".vue",
  ".svelte",
];
