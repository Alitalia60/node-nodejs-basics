import { readdir, stat } from 'node:fs/promises';
import path, { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { debugMsg, usersError } from '../userUtlis.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourceDirURL = join(__dirname, 'files');

const list = async () => {
  // Write your code here
  const files = await readdir(sourceDirURL).catch((err) =>
    usersError(err.code)
  );
  if (!files.length) {
    usersError(' Source dir is empty');
  }

  console.table(files);
  debugMsg(' File names printed');
};

await list();
