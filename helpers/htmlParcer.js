const storage = require('../storage');
const cheerio = require('cheerio');

const htmlParcer = ({markup, visitedUrl}) => {
    
    const $ = cheerio.load(markup);

    $('a').each((i, el) => {

        const link = `${$(el).attr('href')}`;
        const isDownload = `${$(el).attr('download')}`;

        // invalid scenario

        if (isDownload === true) {
            return
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

        //valid scenario for links

        if (link.startsWith('/')) {
            storage.addLinkToGo(`${visitedUrl}${link}`); 
            return ;
        }
        if (link.startsWith('//')) {
            storage.addLinkToGo(`${visitedUrl}${link}`); 
            return ;
        }
        if (link.startsWith('?')) {
            storage.addLinkToGo(`${visitedUrl}${link}`); 
            return ;
        }

        // valid scenario for emails

        if(link.startsWith('mailto:')) {
            storage.addOneEmail(link.split(':')[1]);
            return
        }

        //"Everything that is not forbidden is allowed" - Friedrich de Schiller.

        storage.addLinkToGo(link);
    })
}
module.exports = htmlParcer;