const parseArgs = () => {
  let arrayArgs = process.argv.slice(2);
  let arrayPairs = [];

  for (let index = 0; index < arrayArgs.length; index++) {
    const element = arrayArgs[index];
    if (element.startsWith('--')) {
      if (!arrayArgs[index + 1].startsWith('--')) {
        arrayPairs.push(
          ` ${element.replace('--', '')} is ${arrayArgs[index + 1]}`
        );
      }
    }
  }
  console.log(arrayPairs.toString());
};

parseArgs();
