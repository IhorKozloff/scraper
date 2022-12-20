const urlCreator = (address) => (address.startsWith('https://') || address.startsWith('http://') ? address : `https://${address}`);

module.exports = urlCreator;
