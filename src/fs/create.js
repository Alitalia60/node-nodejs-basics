import { stat, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import usersError from '../usersError.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fileName = 'fresh.txt';
const targetFolder = 'files';
const fileURI = join(__dirname, targetFolder, fileName);

const create = async () => {
  let codeError = '';
  try {
    const stats = await stat(join(__dirname, targetFolder));
    if (!stats.isDirectory()) {
      codeError = 'NDIR';
    }
  } catch (error) {
    usersError('NEXIST');
  }
  if (!codeError) {
    try {
      await writeFile(fileURI, 'I am fresh and young', { flag: 'wx' });
    } catch (error) {
      usersError('EXIST');
    }
  } else {
    usersError(codeError);
  }
};

await create();
