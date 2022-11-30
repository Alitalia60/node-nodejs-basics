import { parentPort, workerData } from 'node:worker_threads';
// n should be received from main thread
const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  console.log('fibo=', nthFibonacci(workerData));
  parentPort.postMessage(nthFibonacci(workerData));
  // parentPort.on('message', () => console.log('from main ' + workerData));
  // This function sends result of nthFibonacci computations to main thread
};

sendResult();
