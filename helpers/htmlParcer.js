const cheerio = require('cheerio');
const storage = require('../storage');
const getBaseUrl = require('./getBaseUrl');

const htmlParcer = ({ markup, visitedUrl }) => {
  const [protocol, baseUrl] = getBaseUrl(visitedUrl);
  const $ = cheerio.load(markup);

  $('a').each((i, el) => {
    const link = `${$(el).attr('href')}`;
    const isDownload = `${$(el).attr('download')}`;

    // invalid scenario

    if (isDownload === true) {
      return;
    }
    if (link === 'undefined') {
      return;
    }
    if (link === '') {
      return;
    }
    if (link.startsWith('tel:')) {
      return;
    }
    if (link.startsWith('#') || link.startsWith('/#') || link.startsWith('//#')) {
      return;
    }
    if (link === (`${visitedUrl}`) || link === (`${visitedUrl}/`) || link === visitedUrl || link === '/' || link === '//' || `https://${link}` === visitedUrl) {
      return;
    }

    // valid scenario for links

    if (link.startsWith('/')) {
      storage.addLinkToGo(`${protocol}//${baseUrl}${link}`);
      return;
    }
    if (link.startsWith('//')) {
      storage.addLinkToGo(`${protocol}//${baseUrl}${link}`);
      return;
    }
    if (link.startsWith('?')) {
      storage.addLinkToGo(`${protocol}//${baseUrl}${link}`);
      return;
    }

    // valid scenario for emails

    if (link.startsWith('mailto:')) {
      storage.addOneEmail(link.split(':')[1]);
      return;
    }

    // "Everything that is not forbidden is allowed" - Friedrich de Schiller.

    storage.addLinkToGo(link);
  });
};
module.exports = htmlParcer;
