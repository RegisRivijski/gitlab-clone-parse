const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const config = require('config');

const gitlabOrigin = `${config.web.gitlab.schema}://${config.web.gitlab.hostname}/dashboard/projects?non_archived=true&sort=latest_activity_desc`;

async function main() {
  const hrefs = [];
  const pages = [];
  const min = 1;
  const max = 17;
  for (let i = min; i <= max; i += 1) pages.push(i);
  for await (let i of pages) {
    const mainPage = await axios(`${gitlabOrigin}${i !== 1 ? '&page=' + i : ''}`, {
      withCredentials: true,
      headers: {
        Cookie: config.web.gitlab.Cookie,
      }
    })
      .then((response) => response.data)
      .catch((e) => { console.error('mainPage', e.message) });
    const $ = cheerio.load(mainPage);
    $('li div a[href].project').each((index, elem)=>{
      const href = $(elem).attr('href');
      hrefs.push(href);
      console.log(href, hrefs.length, '...');
    });
  }
  fs.writeFileSync('/mnt/d/Workspace/personal-projects/gitlab-clone-parse/hrefs.txt', hrefs.join('\n'));
  console.log('Done!..');
}
main();