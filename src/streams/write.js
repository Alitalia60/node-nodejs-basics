import { createWriteStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { stdin } from 'node:process';
import { fileURLToPath } from 'node:url';

import { usersError } from '../userUtlis.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fileToReadURL = join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
  const output = createWriteStream(fileToReadURL, { encoding: 'utf-8' });
  output
    .on('error', (err) => usersError(err.code))
    .on('finish', () => output.destroy());
  stdin.pipe(output);
};

await write();
