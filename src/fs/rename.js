import { access, constants, rename as changeName } from 'node:fs/promises';
import { join, dirname } from 'node:path';

import { debugMsg, usersError } from '../userUtlis.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourceDirURL = join(__dirname, 'files');
const badFilegName = join(sourceDirURL, 'wrongFilename.txt');
const goodFileName = join(sourceDirURL, 'properFilename.md');

const rename = async () => {
  let existFile = false;
  await access(goodFileName, constants.F_OK)
    .then(() => (existFile = true))
    .catch(() => null);

  if (existFile) {
    usersError(' Target file already exists');
  }

  await changeName(badFilegName, goodFileName)
    .then(() => debugMsg(' File rename success'))
    .catch((err) => usersError(`Error changing name: ${err.code}`));
};

await rename();
