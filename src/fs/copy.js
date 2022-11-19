import { mkdir, copyFile, readdir, constants } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { debugMsg, usersError } from '../debugMsgs.js';

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
};

copy();
