import { dirname, join } from 'node:path';
import { stdout, stdin } from 'node:process';
import { Stream } from 'node:stream';
import { pipeline, Transform } from 'node:stream';
import { fileURLToPath } from 'node:url';

import { usersError } from '../userUtlis.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fileToReadURL = join(__dirname, 'files', 'fileToRead.txt');

const transform = async () => {
  const reversing = new Transform({
    transform(data, encoding, callback) {
      data = data.toString().trim().split('').reverse().join('');
      this.push(data + '\n');
      callback();
    },
  });
  pipeline(stdin, reversing, stdout, (err) => usersError(err.code));
};

await transform();
