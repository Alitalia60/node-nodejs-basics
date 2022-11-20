import process from 'node:process';
const parseEnv = () => {
  let outputText = '';
  const arrayKeysOfEnvVar = Object.keys(process.env);

  const arrayKeysWithRSS_ = arrayKeysOfEnvVar.filter((el) =>
    el.startsWith('RSS_')
  );

  arrayKeysWithRSS_.forEach(
    (el) =>
      (outputText += `${el}=${process.env[el]}${
        arrayKeysWithRSS_[arrayKeysWithRSS_.length - 1] === el ? '' : '; '
      }`)
  );
  console.log(outputText);
};

parseEnv();
