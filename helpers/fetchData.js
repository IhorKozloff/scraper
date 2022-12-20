const axios = require('axios');
const urlCreator = require('./urlCreator');

const fetchData = async (address) => {
  const url = urlCreator(address);

  const { data } = await axios.get(url, { headers: { 'Accept-Encoding': 'identity' } });

  return { markup: data, visitedUrl: url };
};

module.exports = fetchData;
