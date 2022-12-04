import { fork } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { debugMsg, usersError } from '../userUtlis.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const childURL = join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
  // Write your code here
  try {
    const child = fork(childURL, args);
    child.on('error', (err) => usersError(err));
    child.on('message', (mes) => debugMsg(msg));
  } catch (error) {
    usersError(error);
  }
};

spawnChildProcess(['--LOCAL', 'file1.txt', '--yes', 'false']);
