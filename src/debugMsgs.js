const debugMsgOn = true;

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
};

export function usersError(msg) {
  throw new Error(
    `${colors.red} FS operation faled${debugMsgOn ? '.' + msg : '.'}`
  );
}

export function debugMsg(msg) {
  console.log(`${colors.green}${debugMsgOn ? msg : '.'}`);
}
