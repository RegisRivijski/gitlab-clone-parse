const shell = require('shelljs');
const fs = require('fs');
const config = require('config');

const gitlabCloneOrigin = `${config.web.gitlab.schema}://"${config.git.userName}":"${config.git.password}"@${config.web.gitlab.hostname}`;

async function main() {
  const hrefs = fs.readFileSync('./hrefs.txt', 'utf-8').split('\n');
  for (const href of hrefs) {
    const projectPath = '/var/www';
    const project = href.split('/')[2];
    if (!fs.existsSync(`${projectPath}/${project}`)) {
      shell.cd(projectPath);
      shell.exec(`git clone ${gitlabCloneOrigin}${href}.git`);
    } else {
      shell.cd(`${projectPath}/${project}`);
      shell.exec(`git pull ${gitlabCloneOrigin}${href}.git`);
    }
  }
}
main();