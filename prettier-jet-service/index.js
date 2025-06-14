import { writeFileSync, rmSync } from 'node:fs';
import { createServer } from 'node:http';
import { PORT_FILE_PATH } from './constants.js';
import isSublimeRunning from './isSublimeRunning.js';
import handleFormatRequest from './handleFormatRequest.js';

let monitorInterval;
const server = createServer(handleFormatRequest);

// Deletes port file if exists.
const removePortFile = () => {
  try {
    rmSync(PORT_FILE_PATH);
  } catch {}
};

const cleanShutdown = () => {
  clearInterval(monitorInterval);
  server.close();
  removePortFile();
  process.exit(0);
};

const shutdownIfSublimeClosed = async () => {
  try {
    const running = await isSublimeRunning();
    if (!running) {
      console.log('Sublime Text not running - shutting down...');
      cleanShutdown();
    }
  } catch (error) {
    console.error('Error checking Sublime status:', error);
  }
};

// Let OS choose a free port
server.listen(0, (err) => {
  if (err) {
    console.error('PrettierJet server failed to start:', err);
    return cleanShutdown();
  }

  removePortFile();

  const port = server.address().port;
  const mode = 0o600; // Secure permissions (owner-only)
  writeFileSync(PORT_FILE_PATH, port.toString(), { mode });
  console.log(`PrettierJet running on port ${port}`);

  // Start monitoring Sublime's status
  monitorInterval = setInterval(shutdownIfSublimeClosed, 60000); // Check every minute
});

// Handle process termination
process.on('exit', cleanShutdown);
process.on('SIGINT', cleanShutdown);
process.on('SIGTERM', cleanShutdown);
