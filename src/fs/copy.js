import { stat, copyFile, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import usersError from '../usersError.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourceURL = join(__dirname, 'files');
const targetURL = join(__dirname, 'files_copy');

const copy = async () => {
  let files = [];
  let codeError = '';
  try {
    const stats = await stat(sourceURL);
    if (!stats.isDirectory()) {
      codeError = 'NDIR';
    } else {
      files = await readdir(targetURL);
      files.forEach(async (file) => {
        await copyFile(join(sourceURL, file), join(targetURL, file));
      });
    }
  } catch (error) {
    usersError('NEXIST');
  }
  if (codeError) {
    usersError(codeError);
  }
  //   if (!codeError) {
  //     try {
  //       const stats = await mkdir(join(__dirname, targetDir), {
  //         recursive: false,
  //       });
  //     } catch (error) {
  //       usersError('EXIST');
  //     }
  //   } else {
  //     usersError(codeError);
  //   }
};

copy();
