import { rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';

import { debugMsg, usersError } from '../userUtlis.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const toDeleteFileURL = join(__dirname, 'files', 'fileToRemove.txt');

console.log(toDeleteFileURL);

const remove = async () => {
  // Write your code here
  await rm(toDeleteFileURL)
    .then(() => debugMsg(' File deleting success'))
    .catch((err) => usersError(`Error deleting file: ${err.code}`));
};

await remove();
