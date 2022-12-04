(function () {

const { fetchData, htmlParcer } = require('./helpers');
const storage = require('./storage');

const website = process.argv[2];
let iterationCount = process.argv[3] || 3

const scraper = async (url) => {
    
    if (iterationCount === 0) {
        console.log("'Bottooooom!!!' (c) Pirates of the Caribbean: Dead Man's Chest");
        console.log('Here is result',storage.getEmails());
        return
    }

    console.log('Depth lvl', iterationCount)

    const dataToFetch = Array.isArray(url) ? [...url] : [`${url}`];

    storage.resetLinksToGo();

    const multipleRequest = await Promise.allSettled(dataToFetch.map(item => fetchData(item)));

    const onlyFullfilledResponses = multipleRequest.filter(item => item.status === 'fulfilled');
    
    onlyFullfilledResponses.forEach(({value}) => {
        storage.addLinkToHistory(value.visitedUrl);
        htmlParcer(value)
    })

    console.log(storage.getEmails());
    console.log(storage.getHistoryLinks());
    console.log(storage.getLinksToGo());
    iterationCount = iterationCount - 1;
    scraper(storage.getLinksToGo())
}

scraper(website);


})()

