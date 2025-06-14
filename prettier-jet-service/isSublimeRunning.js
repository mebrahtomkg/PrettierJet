import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

// Timeout for process checks (milliseconds)
const PROCESS_CHECK_TIMEOUT = 3000;

/**
 * Checks if Sublime Text is currently running
 * @returns {Promise<boolean>} True if Sublime Text is running
 */
const isSublimeRunning = async () => {
  const commands = {
    win32: {
      cmd: 'tasklist',
      args: ['/FI', 'IMAGENAME eq sublime_text.exe'],
      matcher: (stdout) => stdout.includes('sublime_text.exe')
    },
    darwin: {
      cmd: 'pgrep',
      args: ['-x', 'Sublime Text'],
      matcher: () => true // pgrep exits with 0 if found
    },
    linux: {
      cmd: 'ps',
      args: ['-e', '-o', 'comm='],
      matcher: (stdout) =>
        stdout.split('\n').some((proc) => proc.trim() === 'sublime_text')
    }
  };

  try {
    const platform = process.platform;
    const { cmd, args, matcher } = commands[platform] || commands.linux;

    const { stdout } = await execAsync([cmd, ...args].join(' '), {
      timeout: PROCESS_CHECK_TIMEOUT,
      windowsHide: true
    });

    return matcher(stdout);
  } catch (error) {
    console.log(
      'Sublime process running check error:',
      error.code,
      error.message
    );
    return false;
  }
};

export default isSublimeRunning;
