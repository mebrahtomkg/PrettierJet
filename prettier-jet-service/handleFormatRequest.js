import findPrettier from './findPrettier.js';
import { MAX_TXT_SIZE, PRETTIER_SUPPORTED_EXTS } from './constants.js';

const prettierPath = findPrettier();
if (!prettierPath) {
  console.error('Prettier installation not found!');
  process.exit(1);
}

const prettier = (await import(prettierPath)).default;

const handleFormatRequest = async (req, res) => {
  if (req.method !== 'POST' || req.url !== '/') {
    return res.writeHead(404).end();
  }

  req.on('error', (err) => {
    res.writeHead(400, {
      'Content-Type': 'text/plain',
      Connection: 'close'
    });
    res.end(`Request Error: ${err.message} : See console for more info.`);
    console.log(`Request Error: ${err.toString()}  ${err.stack}`);
  });

  let body = '';
  let size = 0;

  req.on('data', (chunk) => {
    size += chunk.length;

    if (size > MAX_TXT_SIZE) {
      console.log('Cannot format too big file!');
      return req.destroy();
    }

    body += chunk;
  });

  req.on('end', async () => {
    try {
      const filepath = req.headers['x-file-path'];

      if (!filepath) return res.writeHead(403).end('Missing file path');

      // Normalize path first (replace `\` with `/`)
      if (filepath.replace(/\\/g, '/').split('/').includes('..')) {
        return res.writeHead(403).end('File Path cannot contain `../`');
      }

      const ext = filepath
        .toLowerCase()
        .slice(
          Math.max(0, filepath.lastIndexOf('.')) || Number.POSITIVE_INFINITY
        );

      if (!ext || !PRETTIER_SUPPORTED_EXTS.includes(ext)) {
        return res
          .writeHead(403)
          .end(`Unsupported file type: ${ext || 'no extension'}`);
      }

      const options = await prettier.resolveConfig(filepath);
      const formattedText = await prettier.format(body, {
        ...options,
        filepath
      });

      res.writeHead(200, {
        'Content-Type': 'text/plain',
        Connection: 'close'
      });
      res.end(formattedText);
    } catch (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain',
        Connection: 'close'
      });
      res.end(`PrettierJet Error: ${err.message} : See console for more info.`);
      console.log(`PrettierJet Error: ${err.toString()}  ${err.stack}`);
    }
  });
};

export default handleFormatRequest;
