const axios = require('axios');
const urlCreator = require('./urlCreator')

const fetchData = async (address) => {
    
    const url = urlCreator(address);

    const { data } = await axios.get(url);

    return {markup: data, visitedUrl: url};

};

module.exports = fetchData;