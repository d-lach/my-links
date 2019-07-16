export default {
    links: ['bitcoin', 'ethereum', 'monero', 'litecoin', 'ripple'],

    getTarget (link = null) {
        if (!link)
            link = this.links[0];
        return 'https://www.google.com/search?q=' + link;
    },

    getLinkData(link = null) {
        if (!link)
            link = this.links[0];

        return {
            link,
            target: this.getTarget(link)
        }
    }
}