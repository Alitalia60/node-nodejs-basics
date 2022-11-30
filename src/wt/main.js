import { cpus } from 'node:os';
import { Worker, isMainThread } from 'node:worker_threads';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);
const cpusCounter = cpus().length;

const performCalculations = async () => {
  // Write your code here

  if (isMainThread) {
  }
  for (let index = 0; index < cpusCounter; index++) {
    // run worker;
    const worker = new Worker(join(__dirname, 'worker.js'));
  }
};

await performCalculations();
