/*
rename.js - implement function that renames file wrongFilename.txt to properFilename with extension .md
(if there's no file wrongFilename.txt or properFilename.md already exists Error with message FS operation failed must be thrown)
*/

import { access, constants, rename as changeName } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { debugMsg, usersError } from '../debugMsgs.js';

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
