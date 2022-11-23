import { createReadStream } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { stdout } from 'node:process';
import { fileURLToPath } from 'node:url';

import { usersError } from '../userUtlis.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourceDirURL = resolve(__dirname, 'files');
const targetFileURL = resolve(sourceDirURL, 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
  //check if node:crypto is accessible

  try {
    const { createHash } = await import('node:crypto');
    const hash = createHash('sha256');
    const rs = createReadStream(targetFileURL, { encoding: 'utf-8' });
    rs.on('error', (err) => usersError(` ReadStream: ${err.code}`));
    rs.pipe(hash).setEncoding('hex').pipe(stdout);
  } catch (err) {
    usersError(err.code);
  }
};

await calculateHash();
