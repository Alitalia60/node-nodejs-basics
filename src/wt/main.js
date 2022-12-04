import { Worker, isMainThread } from 'node:worker_threads';
import { cpus } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { usersError } from '../userUtlis.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const workerURL = join(__dirname, './worker.js');

const performCalculations = async () => {
  if (isMainThread) {
    const arrPromises = [];
    for (let index = 0; index < cpus().length; index++) {
      arrPromises.push(createPromise(index));
    }
    try {
      await Promise.all(arrPromises).then((result) => {
        console.log(result);
      });
    } catch (error) {
      usersError(error);
    }
  }
};

function createPromise(index) {
  return new Promise((resolve, reject) => {
    const work = new Worker(workerURL, { workerData: 10 + index });
    work.on('message', (mes) => resolve(mes));
    work.on('error', (err) => reject(err));
  });
}

await performCalculations();
