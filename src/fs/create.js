import { access, constants, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { debugMsg, usersError } from '../debugMsgs.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const targetDirURL = join(__dirname, 'files');
const fileURI = join(targetDirURL, 'fresh.txt');

const create = async () => {
  await access(targetDirURL, constants.W_OK).catch((err) =>
    usersError(' Access target dir error')
  );

  await writeFile(fileURI, 'I am fresh and young', { flag: 'wx' })
    .then(() => debugMsg(' Write file success'))
    .catch((err) => {
      usersError(' Attemp write file error');
    });
};

await create();
