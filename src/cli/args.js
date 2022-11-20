const parseArgs = () => {
  // Write your code here

  let message = process.argv.slice(2).toString();
  message = message.replaceAll(',--', ';');
  message = message.replaceAll('--', '');
  message = message.replaceAll(',', ' is ');
  message = message.replaceAll(';', ', ');
  console.log(message);
};

parseArgs();
