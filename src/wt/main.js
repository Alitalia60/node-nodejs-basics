import { Worker, isMainThread } from 'node:worker_threads';
import { cpus, userInfo } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { usersError } from '../userUtlis.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const workerURL = join(__dirname, './worker.js');

const performCalculations = async () => {
  const arrResult = [];
  const arrPromises = [];
  for (let index = 0; index < cpus().length; index++) {
    const work = new Worker(workerURL, { workerData: 10 + index });
    work.on('message', (mes) => {
      arrResult.push(mes);
    });
  }
  console.log(arrResult);
};

await performCalculations();
