const storage = {
    emails: [],

    linksToGo: [],

    linksHistory: [],

    getEmails () {
        return this.emails
    },

    addOneEmail (email) {

        const existingEmail = this.emails.find(item => item === email);

        if(existingEmail === undefined) {
            this.emails.push(email)
        }
    },

    getHistoryLinks () {
        return this.linksHistory
    },
    getLinksToGo () {
        return this.linksToGo
    },


    addLinkToHistory (link) {

        if(this.linksHistory.indexOf(link) === -1) {
            this.linksHistory.push(link);
        }
    },

    addLinkToGo (link) {

        if(this.linksHistory.indexOf(link) === -1 && this.linksToGo.indexOf(link) === -1) {
            this.linksToGo.push(link);
        }
        
    },

    resetLinksToGo () {

        this.linksToGo.length = 0;
        
    },
};

module.exports = storage;