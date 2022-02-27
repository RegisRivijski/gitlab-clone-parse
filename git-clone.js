const shell = require('shelljs');
const fs = require('fs');
const config = require('config');

const gitlabCloneOrigin = `${config.web.gitlab.schema}://"${config.git.userName}":"${config.git.password}"@${config.web.gitlab.hostname}`;

async function main() {
  const hrefs = fs.readFileSync('./hrefs.txt', 'utf-8').split('\n');
  let i = 0;
  for (const href of hrefs) {

    const group = href.split('/')[1];
    const project = href.split('/')[2];

    const workspacePath = '/var/www';
    const groupPath = `${workspacePath}/${group}`;
    const projectPath = `${groupPath}/${project}`;

    if (!fs.existsSync(groupPath)) {
      shell.cd(workspacePath);
      shell.mkdir(groupPath);
    }

    if (!fs.existsSync(projectPath)) {
      shell.cd(groupPath);
      shell.exec(`git clone ${gitlabCloneOrigin}${href}.git`);
    } else {
      shell.cd(projectPath);
      shell.exec(`git pull ${gitlabCloneOrigin}${href}.git`);
    }

    console.log('\x1b[33m', `[${++i}/${hrefs.length}]\t`, projectPath, '...', '\x1b[0m');
  }
  console.log('\x1b[36m', 'Done ...', '\x1b[0m');
}
main();
