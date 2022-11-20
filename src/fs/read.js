import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { debugMsg, usersError } from '../userUtlis.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const targetFileURL = join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
  try {
    const text = await readFile(targetFileURL, { encoding: 'utf8' });
    console.log(text);
  } catch (error) {
    usersError(' Error reading file');
  }
};

await read();
