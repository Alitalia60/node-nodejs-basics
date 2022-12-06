import { createReadStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { stdout } from 'node:process';
import { fileURLToPath } from 'node:url';

import { usersError } from '../userUtlis.js';

let variant = 1; //var 1  using pipe, variant = 2 using events

const __dirname = dirname(fileURLToPath(import.meta.url));
const fileToReadURL = join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
  const input = createReadStream(fileToReadURL, { encoding: 'utf-8' });

  //var 1  using pipe
  if (variant === 1) {
    input
      .on('end', () => input.destroy())
      .on('error', (err) => usersError(err.code));

    input.pipe(stdout);
  } else {
    //var 2 using events
    input
      .on('data', (data) => {
        stdout.write(data);
      })
      .on('error', (err) => usersError(err.code))
      .on('end', () => input.destroy());
  }
};

await read();
