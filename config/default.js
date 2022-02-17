const fs = require('fs');

module.exports = {
  web: {
    gitlab: {
      schema: 'https',
      hostname: 'gitlab.com',
      Cookie: fs.readFileSync('./cookie.txt', 'utf-8'),
    },
  },
  git: {
    userName: '',
    password: '',
  },
};
