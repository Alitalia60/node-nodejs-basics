import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createWriteStream, createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { usersError } from '../userUtlis.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourceFileURL = join(__dirname, 'files', 'fileToCompress.txt');
const targetFileURL = join(__dirname, 'files', 'archive.gz');

const compress = async () => {
  try {
    const input = createReadStream(sourceFileURL, { encoding: 'utf-8' });
    const gzip = createGzip();
    const output = createWriteStream(targetFileURL);
    pipeline(input, gzip, output, (err) => {
      if (err) {
        usersError(err.code);
      }
    });
  } catch (err) {
    usersError(err.code);
  }
};

await compress();
