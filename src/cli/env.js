import process from 'node:process';
const parseEnv = () => {
  let outputText = '';
  const arrayKeysOfEnvVar = Object.keys(process.env);

  const arrayKeysWithRSS_ = arrayKeysOfEnvVar.filter((key) =>
    key.startsWith('RSS_')
  );

  arrayKeysWithRSS_.forEach(
    (key) =>
      (outputText += `${key}=${process.env[key]}${
        arrayKeysWithRSS_[arrayKeysWithRSS_.length - 1] === key ? '' : '; '
      }`)
  );
  console.log(outputText);
};

parseEnv();
