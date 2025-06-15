import { readFile, writeFile, rm } from 'node:fs/promises';
import { createServer } from 'node:http';
import { PORT_FILE_PATH } from './constants.js';
import isSublimeRunning from './isSublimeRunning.js';
import handleFormatRequest from './handleFormatRequest.js';

let monitorInterval;
let port;
const server = createServer(handleFormatRequest);

const removePortFile = async () => {
  try {
    await rm(PORT_FILE_PATH);
  } catch {}
};

const readPort = async () => {
  try {
    return await readFile(PORT_FILE_PATH, 'utf8');
  } catch (err) {
    console.log('Reading port failed on server', err);
    return null;
  }
};

const cleanShutdown = async () => {
  clearInterval(monitorInterval);
  server.close();
  process.exit(0);
};

const shutdownIfNotNeeded = async () => {
  try {
    // If port is chaged in file, it means other instance is started.
    const savedPort = await readPort();
    if (savedPort?.trim?.() !== port.toString()) {
      console.log(
        'Another instance may be running with a different port. Shutting down...'
      );
      return await cleanShutdown();
    }

    const running = await isSublimeRunning();
    if (!running) {
      console.log('Sublime Text not running - shutting down...');
      await cleanShutdown();
    }
  } catch (error) {
    console.error('Error checking Sublime status:', error);
  }
};

// Let OS choose a free port
server.listen(0, async (err) => {
  if (err) {
    console.error('PrettierJet server failed to start:', err);
    return await cleanShutdown();
  }

  port = server.address().port;
  await removePortFile();
  try {
    const mode = 0o600; // Secure permissions (owner-only)
    await writeFile(PORT_FILE_PATH, port.toString(), { mode });
  } catch (e) {
    console.error('PrettierJet server failed to start:', e);
  }

  monitorInterval = setInterval(shutdownIfNotNeeded, 60000); // Check every minute
  console.log(`PrettierJet running on port ${port}`);
});

// Handle process termination
process.on('exit', cleanShutdown);
process.on('SIGINT', cleanShutdown);
process.on('SIGTERM', cleanShutdown);
