const shell = require('shelljs');
const fs = require('fs');
const config = require('config');

const gitlabCloneOrigin = `${config.web.gitlab.schema}://"${config.git.userName}":"${config.git.password}"@${config.web.gitlab.hostname}`;

async function main() {
  const hrefs = fs.readFileSync('./hrefs.txt', 'utf-8').split('\n');
  for (const href of hrefs) {
    try {
      const gitCommand = `git clone ${gitlabCloneOrigin}${href}`;
      console.log(gitCommand)
      shell.cd('/var/www');
      shell.exec(`git clone ${gitlabCloneOrigin}${href}`);
    } catch (e) {
      console.error(e.message);
    }
  }
}
main();