const urlCreator = (address) => {
    return address.startsWith('https://') || address.startsWith('http://') ? address : `https://${address}`;
};

module.exports = urlCreator;