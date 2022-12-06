import { createUnzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createWriteStream, createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { usersError } from '../userUtlis.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourceFileURL = join(__dirname, 'files', 'archive.gz');
const targetFileURL = join(__dirname, 'files', 'fileToCompress.txt');

const decompress = async () => {
  // Write your code here
  try {
    const input = createReadStream(sourceFileURL);
    const gunzip = createUnzip();
    const output = createWriteStream(targetFileURL);
    pipeline(input, gunzip, output, (err) => {
      if (err) {
        usersError(err.code);
      }
    });
  } catch (err) {
    usersError(err.code);
  }
};

await decompress();
