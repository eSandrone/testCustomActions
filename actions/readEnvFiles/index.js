const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs')
const dotenv = require('dotenv')

try {
  // `who-to-greet` input defined in action metadata file
  const pathEnvFile = core.getInput('env-file-path');
  fs.readFile(pathEnvFile, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    core.setOutput("data", data);
    const variables = dotenv.parse(data);
    Object.entries(variables).forEach(f => core.exportVariable(f[0], f[1]));
    const payload = JSON.stringify(github.context.payload, undefined, 2)
  })
} catch (error) {
  core.setFailed(error.message);
}
