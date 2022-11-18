const descr = {
  NEXIST: 'File or dir doesn`t exists',
  NDIR: 'URI is not a dir ',
  EXIST: 'URI already exists',
};

export default function usersError(code) {
  throw new Error(`\x1b[31m FS operation faled. ${descr[code]}.`);
}
