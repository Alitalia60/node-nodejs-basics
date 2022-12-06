import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { stdout } from 'node:process';
import { fileURLToPath } from 'node:url';

import { debugMsg, usersError } from '../userUtlis.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const targetFileURL = join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
  try {
    const text = await readFile(targetFileURL, { encoding: 'utf8' });
    stdout.write(text);
    debugMsg('File read success');
  } catch (error) {
    usersError(' Error reading file');
  }
};

await read();
