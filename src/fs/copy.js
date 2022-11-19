import { mkdir, copyFile, readdir, constants } from 'node:fs/promises';
import { join, dirname } from 'node:path';

import { debugMsg, usersError } from '../userUtlis.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourceDirURL = join(__dirname, 'files');
const targetDirURL = join(__dirname, 'files_copy');

const copy = async () => {
  const files = await readdir(sourceDirURL).catch((err) =>
    usersError(err.code)
  );
  if (!files.length) {
    usersError(' Source dir is empty');
  }

  await mkdir(targetDirURL).catch((err) => usersError(' Dir already exists'));
  try {
    files.forEach(async (file) => {
      let fromFile = join(sourceDirURL, file);
      let toFile = join(targetDirURL, file);
      await copyFile(fromFile, toFile, constants.COPYFILE_EXCL);
    });
  } catch (err) {
    usersError(' Error copying files');
  }
  debugMsg(' Copy files success');
};

copy();
